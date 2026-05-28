#!/usr/bin/env python3
"""Cloud: Upload MP4 + metadata package to Telegram.

Delivery is resilient: if metadata.json is missing, unparseable, or partial,
we synthesize a fallback from topic.json and merge any real metadata over it.
Delivery only fails (exit 1) on genuine Telegram API errors or a missing video.
"""
import json
import os
import sys
import uuid
from datetime import datetime
from urllib import request

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "7181205338")

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_PATH = os.path.join(BASE, "out", "video.mp4")
TOPIC_PATH = os.path.join(BASE, "topic.json")
METADATA_PATH = os.path.join(BASE, "metadata.json")


def send_text(text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    body = json.dumps({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}).encode("utf-8")
    req = request.Request(url, data=body, method="POST", headers={"Content-Type": "application/json"})
    with request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def send_video(path, caption=""):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendVideo"
    boundary = f"----BOUNDARY{uuid.uuid4().hex}"
    body = []
    body.append(f"--{boundary}\r\n".encode())
    body.append(b'Content-Disposition: form-data; name="chat_id"\r\n\r\n')
    body.append(f"{CHAT_ID}\r\n".encode())
    if caption:
        body.append(f"--{boundary}\r\n".encode())
        body.append(b'Content-Disposition: form-data; name="caption"\r\n\r\n')
        body.append(caption.encode("utf-8") + b"\r\n")
    with open(path, "rb") as f:
        data = f.read()
    body.append(f"--{boundary}\r\n".encode())
    body.append(f'Content-Disposition: form-data; name="video"; filename="{os.path.basename(path)}"\r\n'.encode())
    body.append(b"Content-Type: video/mp4\r\n\r\n")
    body.append(data)
    body.append(f"\r\n--{boundary}--\r\n".encode())
    full = b"".join(body)
    req = request.Request(url, data=full, method="POST", headers={
        "Content-Type": f"multipart/form-data; boundary={boundary}",
        "Content-Length": str(len(full)),
    })
    with request.urlopen(req, timeout=600) as r:
        return json.loads(r.read().decode("utf-8"))


def fallback_metadata(topic):
    """Synthesize a metadata package from topic.json when metadata.json is unusable."""
    title = topic.get("title", "Daily Short")
    hook = topic.get("hook", title)
    key_numbers = topic.get("key_numbers", [])
    if not isinstance(key_numbers, list):
        key_numbers = []
    key_numbers = [str(n) for n in key_numbers]

    description_parts = [hook]
    if key_numbers:
        description_parts.append("\n".join(key_numbers))
    description_parts.append("#finance #money")
    description = "\n\n".join(description_parts)

    return {
        "tiktok": {
            "caption": hook[:140],
            "hashtags": ["#finance", "#money", "#moneytok", "#personalfinance", "#financialliteracy"],
        },
        "youtube_short": {
            "title": title[:60],
            "title_alternatives": [],
            "description": description,
            "tags": ["finance", "money", "personal finance", "money psychology"],
        },
        "hook_line": title,
    }


def merge_metadata(fallback, real):
    """Merge real metadata over the fallback so real values win and missing ones fall back."""
    if not isinstance(real, dict):
        return fallback
    merged = dict(fallback)
    for key, default_val in fallback.items():
        real_val = real.get(key)
        if isinstance(default_val, dict) and isinstance(real_val, dict):
            sub = dict(default_val)
            for sk, sv in real_val.items():
                if sv is not None:
                    sub[sk] = sv
            merged[key] = sub
        elif real_val is not None:
            merged[key] = real_val
    # Carry over any extra top-level keys present only in real metadata.
    for key, val in real.items():
        if key not in merged and val is not None:
            merged[key] = val
    return merged


def load_metadata(topic):
    """Load metadata.json resiliently, falling back to topic.json-derived data."""
    fallback = fallback_metadata(topic)
    if not os.path.exists(METADATA_PATH):
        print("metadata.json missing/invalid — using topic.json fallback")
        return fallback
    try:
        with open(METADATA_PATH) as f:
            real = json.load(f)
    except (ValueError, OSError) as e:
        print(f"metadata.json missing/invalid ({e}) — using topic.json fallback")
        return fallback
    if not isinstance(real, dict):
        print("metadata.json missing/invalid — using topic.json fallback")
        return fallback
    return merge_metadata(fallback, real)


def format_message(topic, metadata):
    tiktok = metadata.get("tiktok", {}) or {}
    yt = metadata.get("youtube_short", {}) or {}
    parts = [
        f"<b>📱 DAILY SHORT — {datetime.now().strftime('%b %d')}</b>",
        "",
        f"<b>Topic:</b> {topic.get('title', 'Daily Short')}",
        "",
        f"<b>━━━ TIKTOK ━━━</b>",
        f"<b>Caption:</b> {tiktok.get('caption', '')}",
        f"<b>Hashtags:</b> {' '.join(tiktok.get('hashtags', []))}",
        "",
        f"<b>━━━ YOUTUBE SHORT ━━━</b>",
        f"<b>Title:</b> {yt.get('title', '')}",
    ]
    for t in yt.get("title_alternatives", []) or []:
        parts.append(f"  alt: {t}")
    parts += [
        f"<b>Description:</b> {yt.get('description', '')}",
        f"<b>Tags:</b> {', '.join(yt.get('tags', []))}",
        f"<b>Hook overlay:</b> {metadata.get('hook_line', '')}",
    ]
    return "\n".join(parts)


def main():
    if not os.path.exists(VIDEO_PATH):
        print(f"ERROR: {VIDEO_PATH} not found")
        sys.exit(1)

    with open(TOPIC_PATH) as f:
        topic = json.load(f)
    metadata = load_metadata(topic)

    print("Sending package text...")
    text_resp = send_text(format_message(topic, metadata))
    if not text_resp.get("ok"):
        print(f"ERROR sending text: {text_resp}")
        sys.exit(1)
    print(f"  text OK (msg_id {text_resp['result']['message_id']})")

    tiktok = metadata.get("tiktok", {}) or {}
    caption = tiktok.get("caption", "") + "\n" + " ".join(tiktok.get("hashtags", []))
    size_mb = os.path.getsize(VIDEO_PATH) / 1024 / 1024
    print(f"Uploading video ({size_mb:.1f} MB)...")
    video_resp = send_video(VIDEO_PATH, caption)
    if not video_resp.get("ok"):
        print(f"ERROR uploading video: {video_resp}")
        sys.exit(1)
    print(f"✓ Delivered to {CHAT_ID} (msg_id {video_resp['result']['message_id']})")


if __name__ == "__main__":
    main()
