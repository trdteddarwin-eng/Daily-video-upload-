# Daily Video Upload

Automated daily finance/money-psychology short video pipeline.

## Architecture

```
Claude Routine (9am daily, cloud)
  ↓ generates topic + script + scene code, commits to repo
  ↓ dispatches GitHub Actions workflow
GitHub Actions (Ubuntu runner)
  ↓ generates TTS audio (KIE API)
  ↓ renders video (Remotion)
  ↓ generates metadata (titles, captions, hashtags)
  ↓ uploads to Telegram
```

## Required Files (committed by Routine before dispatch)

- `topic.json` — today's topic object
- `script.json` — 6-scene narration script
- `src/DAILY/Main.tsx` — Remotion composition with Scene1..Scene6

## Required GitHub Secrets

- `KIE_API_KEY` — for ElevenLabs TTS via KIE
- `TELEGRAM_BOT_TOKEN` — bot for delivery
- `TELEGRAM_CHAT_ID` — destination chat
- `ANTHROPIC_API_KEY` (or `OPENROUTER_API_KEY`) — for metadata generation

## Manual Test

```bash
gh workflow run daily-short.yml
```

## Triggered by Routine

The Claude Routine calls:
```
POST https://api.github.com/repos/trdteddarwin-eng/Daily-video-upload-/dispatches
{ "event_type": "render-video" }
```

## Local Dev

```bash
npm install
# Place topic.json, script.json, src/DAILY/Main.tsx manually
python3 pipeline/generate_audio.py
python3 pipeline/render_video.py
python3 pipeline/generate_metadata.py
python3 pipeline/send_telegram.py
```
