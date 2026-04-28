#!/usr/bin/env python3
"""Cloud: Generate 6 TTS audio files from script.json via KIE API.

Robustness:
  - Retry transient KIE failures up to 5 times with exponential backoff
  - On permanent failure for a scene, write a SILENT mp3 with estimated
    duration so the render step still completes (better a video with one
    silent scene than no video at all)
  - On any permanent failures, post a Telegram alert and write a marker
    file so downstream steps know
  - NEVER exits non-zero on partial failure — render step handles it
"""
import json
import os
import subprocess
import sys
import time
import urllib.parse
import urllib.request

KIE_KEY = os.environ["KIE_API_KEY"]
TG_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
TG_CHAT = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
API = "https://api.kie.ai"

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT_PATH = os.path.join(BASE, "script.json")
AUDIO_DIR = os.path.join(BASE, "public", "audio")
ALERT_MARKER = os.path.join(BASE, "tts_failure.txt")

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"

# Retry schedule (seconds between createTask attempts on transient failure)
RETRY_BACKOFFS = [15, 45, 120, 300, 600]


def post_json(url, body):
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST", headers={
        "Authorization": f"Bearer {KIE_KEY}",
        "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def get_json(url):
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {KIE_KEY}"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode("utf-8"))


def telegram_alert(text):
    if not TG_TOKEN or not TG_CHAT:
        return
    try:
        url = f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage"
        body = urllib.parse.urlencode({
            "chat_id": TG_CHAT,
            "text": text,
            "parse_mode": "HTML",
        }).encode()
        urllib.request.urlopen(url, data=body, timeout=15).read()
    except Exception as e:
        print(f"  telegram_alert error: {e}")


def create_and_poll_once(text, max_attempts=60):
    """One attempt — returns (urls, transient_error_bool, fatal_error_str)."""
    try:
        resp = post_json(f"{API}/api/v1/jobs/createTask", {
            "model": "elevenlabs/text-to-dialogue-v3",
            "input": {
                "dialogue": [{"text": text, "voice": "Liam"}],
                "stability": 0.5,
                "language_code": "en",
            }
        })
    except Exception as e:
        return None, True, f"createTask exception: {e}"
    if not resp or resp.get("code") != 200:
        msg = resp.get("msg", "unknown") if resp else "no response"
        if "Credits insufficient" in msg or "balance" in msg:
            return None, False, f"FATAL: out of KIE credits ({msg})"
        return None, True, f"createTask error: {msg}"
    tid = resp["data"]["taskId"]
    for _ in range(max_attempts):
        time.sleep(4)
        try:
            r2 = get_json(f"{API}/api/v1/jobs/recordInfo?taskId={tid}")
        except Exception:
            continue
        d = r2.get("data", {})
        state = d.get("state", "")
        if state == "success":
            return json.loads(d.get("resultJson", "{}")).get("resultUrls", []), False, None
        if state in ("failed", "error", "fail"):
            fail_msg = d.get("failMsg", "unknown")
            # KIE's "internal error, please try again later" is transient
            transient = "internal error" in fail_msg.lower() or "try again" in fail_msg.lower()
            return None, transient, f"task {state}: {fail_msg}"
    return None, True, "polling timeout"


def create_and_poll_with_retry(text, scene_num):
    """Retry transient failures with exponential backoff. Fatal errors abort."""
    last_err = None
    for attempt in range(len(RETRY_BACKOFFS) + 1):
        urls, transient, err = create_and_poll_once(text)
        if urls:
            return urls
        last_err = err
        if not transient:
            print(f"    {err}")
            if err and err.startswith("FATAL"):
                telegram_alert(f"⚠️ <b>Daily video pipeline halted</b>\nScene {scene_num}: {err}")
                sys.exit(2)
            return None
        if attempt < len(RETRY_BACKOFFS):
            wait = RETRY_BACKOFFS[attempt]
            print(f"    transient: {err}  → retry in {wait}s ({attempt + 1}/{len(RETRY_BACKOFFS)})")
            time.sleep(wait)
    print(f"    gave up after {len(RETRY_BACKOFFS)} retries: {last_err}")
    return None


def download(url, path, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r:
                with open(path, "wb") as f:
                    f.write(r.read())
            if os.path.getsize(path) > 500:
                return True
        except Exception as e:
            print(f"    download attempt {attempt + 1} failed: {e}")
            time.sleep(5)
    return False


def estimate_seconds(text):
    """~165 wpm reading speed = 0.36s/word. Min 4s, max 20s per scene."""
    words = max(1, len(text.split()))
    seconds = max(4.0, min(20.0, words * 0.36))
    return seconds


def write_silent_mp3(path, seconds):
    """Generate a silent mp3 of given duration via ffmpeg.

    Render step measures the file's duration, so the silent placeholder
    keeps the scene timing intact and the rest of the video survives.
    """
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
        "-t", f"{seconds:.2f}",
        "-c:a", "libmp3lame", "-b:a", "128k",
        path,
    ]
    r = subprocess.run(cmd, capture_output=True)
    return r.returncode == 0 and os.path.exists(path) and os.path.getsize(path) > 500


def main():
    with open(SCRIPT_PATH) as f:
        scenes = json.load(f)

    os.makedirs(AUDIO_DIR, exist_ok=True)
    failed = []
    silent_fallbacks = []

    for scene in scenes:
        num = scene["scene"]
        text = scene["narration"]
        out = os.path.join(AUDIO_DIR, f"scene_{num:02d}.mp3")

        if os.path.exists(out) and os.path.getsize(out) > 5000:
            print(f"  [{num}/{len(scenes)}] SKIP")
            continue

        print(f"  [{num}/{len(scenes)}] {text[:55]}...")
        urls = create_and_poll_with_retry(text, num)
        if urls and download(urls[0], out):
            print(f"    OK ({os.path.getsize(out)} bytes)")
            continue

        # Permanent failure — generate silent fallback so render still runs
        seconds = estimate_seconds(text)
        if write_silent_mp3(out, seconds):
            print(f"    FALLBACK: silent {seconds:.1f}s ({os.path.getsize(out)} bytes)")
            silent_fallbacks.append(num)
        else:
            print("    FAILED — no audio + no silent fallback")
            failed.append(num)

    print(f"\n{len(scenes) - len(failed) - len(silent_fallbacks)}/{len(scenes)} succeeded")

    if silent_fallbacks or failed:
        # Mark for downstream + alert user
        with open(ALERT_MARKER, "w") as f:
            f.write(f"silent_fallbacks: {silent_fallbacks}\nhard_failed: {failed}\n")
        msg_lines = ["⚠️ <b>Daily video — TTS issues</b>"]
        if silent_fallbacks:
            msg_lines.append(f"Silent fallback used for scenes: {silent_fallbacks}")
            msg_lines.append("(video will ship, but those scenes have no narration)")
        if failed:
            msg_lines.append(f"Hard failures (no audio + no silent): {failed}")
        telegram_alert("\n".join(msg_lines))

    # NEVER exit 1 here — render step decides whether to proceed
    if failed and not silent_fallbacks:
        # Truly catastrophic: nothing produced at all
        sys.exit(1)


if __name__ == "__main__":
    main()
