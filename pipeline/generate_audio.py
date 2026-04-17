#!/usr/bin/env python3
"""Cloud: Generate 6 TTS audio files from script.json via KIE API."""
import json
import os
import sys
import time
import urllib.request

KIE_KEY = os.environ["KIE_API_KEY"]
API = "https://api.kie.ai"

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT_PATH = os.path.join(BASE, "script.json")
AUDIO_DIR = os.path.join(BASE, "public", "audio")

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"


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


def create_and_poll(text, max_attempts=60):
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
        print(f"  createTask error: {e}")
        return None
    if not resp or resp.get("code") != 200:
        msg = resp.get("msg", "unknown") if resp else "no response"
        print(f"  API error: {msg}")
        if "Credits insufficient" in msg or "balance" in msg:
            print("  >>> KIE API OUT OF CREDITS <<<")
            sys.exit(2)
        return None
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
            return json.loads(d.get("resultJson", "{}")).get("resultUrls", [])
        if state in ("failed", "error", "fail"):
            print(f"  failed: {d.get('failMsg', 'unknown')}")
            return None
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
            print(f"  download attempt {attempt + 1} failed: {e}")
            time.sleep(5)
    return False


def main():
    with open(SCRIPT_PATH) as f:
        scenes = json.load(f)

    os.makedirs(AUDIO_DIR, exist_ok=True)
    failed = []

    for scene in scenes:
        num = scene["scene"]
        text = scene["narration"]
        out = os.path.join(AUDIO_DIR, f"scene_{num:02d}.mp3")

        if os.path.exists(out) and os.path.getsize(out) > 5000:
            print(f"  [{num}/{len(scenes)}] SKIP")
            continue

        print(f"  [{num}/{len(scenes)}] {text[:55]}...")
        urls = create_and_poll(text)
        if urls and download(urls[0], out):
            print(f"    OK ({os.path.getsize(out)} bytes)")
        else:
            print("    FAILED")
            failed.append(num)

    print(f"\n{len(scenes) - len(failed)}/{len(scenes)} succeeded")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
