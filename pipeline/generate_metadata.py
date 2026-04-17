#!/usr/bin/env python3
"""Cloud: Generate TikTok + YouTube Shorts metadata from topic + script."""
import json
import os
import sys
import urllib.request

ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
OPENROUTER_KEY = os.environ.get("OPENROUTER_API_KEY", "")

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOPIC_PATH = os.path.join(BASE, "topic.json")
SCRIPT_PATH = os.path.join(BASE, "script.json")
OUT_PATH = os.path.join(BASE, "metadata.json")


def call_claude(prompt, max_tokens=2000):
    """Prefer Anthropic direct if key present, else OpenRouter."""
    if ANTHROPIC_KEY:
        body = json.dumps({
            "model": "claude-sonnet-4-5",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
        }).encode("utf-8")
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=body, method="POST",
            headers={
                "x-api-key": ANTHROPIC_KEY,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            }
        )
        with urllib.request.urlopen(req, timeout=60) as r:
            resp = json.loads(r.read().decode("utf-8"))
        return resp["content"][0]["text"]

    if OPENROUTER_KEY:
        body = json.dumps({
            "model": "anthropic/claude-sonnet-4.5",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
        }).encode("utf-8")
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/chat/completions",
            data=body, method="POST",
            headers={
                "Authorization": f"Bearer {OPENROUTER_KEY}",
                "Content-Type": "application/json",
            }
        )
        with urllib.request.urlopen(req, timeout=60) as r:
            resp = json.loads(r.read().decode("utf-8"))
        return resp["choices"][0]["message"]["content"]

    print("ERROR: neither ANTHROPIC_API_KEY nor OPENROUTER_API_KEY set")
    sys.exit(1)


def main():
    with open(TOPIC_PATH) as f:
        topic = json.load(f)
    with open(SCRIPT_PATH) as f:
        scenes = json.load(f)

    narration = " ".join(s["narration"] for s in scenes)

    prompt = f"""You write viral TikTok captions and YouTube Short metadata.

TOPIC: "{topic['title']}"
HOOK: {topic['hook']}
FULL NARRATION: {narration}

Return ONLY JSON:
{{
  "tiktok": {{
    "caption": "Under 140 chars. Hook-forward.",
    "hashtags": ["#finance", "..."]
  }},
  "youtube_short": {{
    "title": "Under 60 chars. Clickable.",
    "title_alternatives": ["Alt 1", "Alt 2"],
    "description": "3-5 sentences with hashtags + CTA.",
    "tags": ["finance", "money", "..."]
  }},
  "hook_line": "First-frame overlay text"
}}

No markdown fences. JSON only."""

    response = call_claude(prompt).strip()
    if response.startswith("```"):
        response = response.split("```")[1]
        if response.startswith("json"):
            response = response[4:]
        response = response.strip().rstrip("`").rstrip()

    try:
        metadata = json.loads(response)
    except json.JSONDecodeError:
        print(f"ERROR: invalid JSON:\n{response[:500]}")
        sys.exit(1)

    with open(OUT_PATH, "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"Metadata → {OUT_PATH}")
    print(f"Title: {metadata['youtube_short']['title']}")


if __name__ == "__main__":
    main()
