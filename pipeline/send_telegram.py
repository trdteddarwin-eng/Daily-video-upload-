#!/usr/bin/env python3
"""Cloud: Upload MP4 + metadata package to Telegram."""
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


def format_message(topic, metadata):
    tiktok = metadata["tiktok"]
    yt = metadata["youtube_short"]
    parts = [
        f"<b>📱 DAILY SHORT — {datetime.now().strftime('%b %d')}</b>",
        "",
        f"<b>Topic:</b> {topic['title']}",
        "",
        f"<b>━━━ TIKTOK ━━━</b>",
        f"<b>Caption:</b> {tiktok['caption']}",
        f"<b>Hashtags:</b> {' '.join(tiktok['hashtags'])}",
        "",
        f"<b>━━━ YOUTUBE SHORT ━━━</b>",
        f"<b>Title:</b> {yt['title']}",
    ]
    for t in yt.get("title_alternatives", []):
        parts.append(f"  alt: {t}")
    parts += [
        f"<b>Description:</b> {yt['description']}",
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
    with open(METADATA_PATH) as f:
        metadata = json.load(f)

    print("Sending package text...")
    send_text(format_message(topic, metadata))

    caption = metadata["tiktok"]["caption"] + "\n" + " ".join(metadata["tiktok"]["hashtags"])
    size_mb = os.path.getsize(VIDEO_PATH) / 1024 / 1024
    print(f"Uploading video ({size_mb:.1f} MB)...")
    send_video(VIDEO_PATH, caption)
    print(f"✓ Delivered to {CHAT_ID}")


if __name__ == "__main__":
    main()
