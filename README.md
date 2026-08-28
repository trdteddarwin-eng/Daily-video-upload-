# Daily Short Video

> One finance/money-psychology short video. Every day. Zero human in the loop.

A self-driving content pipeline: a Claude Routine picks the topic and writes the
script, GitHub Actions renders the video with Remotion, KIE narrates the
scenes, and a Telegram bot delivers the finished MP4 to a channel. The whole
loop runs unattended on a cron and survives partial failures without aborting
the day's run.

---

## What this is

This repo is one half of a two-part system:

1. **Brain** — a Claude Routine that wakes up daily, reads the last 90 days of
   used topics (`topics-used.json`), invents a new one, writes a 6-scene script,
   writes the Remotion scene components, and commits everything to `main`.
2. **Hands** — a GitHub Actions workflow (this repo) that picks up the
   committed content, generates audio, measures durations, patches the
   Remotion composition, renders the MP4, generates metadata, and delivers
   over Telegram.

The split matters: the brain is non-deterministic and lives in a managed agent
session; the hands are deterministic Python + Remotion that runs the same way
every time on a fresh Ubuntu runner.

---

## Features

- **AI-written topics with dedup.** The Routine reads `topics-used.json` and
  picks something it hasn't covered in the last 90 days.
- **6-scene compositions.** A standard structure (`Scene1..Scene6`) so the
  composition file is predictable and CI can patch it.
- **TTS via KIE API.** Each scene's narration is synthesized as its own MP3.
- **Resilient narration generation.** Up to 5 retries per scene with
  exponential backoff (15 → 45 → 120 → 300 → 600 s). If a scene still fails
  after that, a silent MP3 of estimated duration is written so the render
  still completes — better a video with one silent scene than no video at all.
- **Audio-driven composition.** After audio is generated, the render step
  measures each MP3 with `ffprobe`, patches `SCENE_DURATIONS` and `Audio`
  imports into `Main.tsx`, then renders.
- **Auto-generated metadata.** A second model call writes TikTok title +
  YouTube Shorts title + caption + hashtags from the script.
- **Provider fallback.** Metadata generation uses Anthropic directly when
  `ANTHROPIC_API_KEY` is set, falls back to OpenRouter (`anthropic/claude-sonnet-4.5`)
  if not.
- **Telegram delivery.** Final MP4 is posted to a configured chat with the
  metadata as caption.
- **Failure alerts.** Permanent TTS failures and run errors ping Telegram with
  a marker file so downstream steps know.
- **Three trigger paths.** Manual (`gh workflow run`), Routine API
  (`repository_dispatch: render-video`), or auto-trigger on content push.
- **Artifact retention.** Every run uploads `video.mp4` + `topic.json` +
  `script.json` + `metadata.json` for 7 days so failed runs can be debugged.

---

## Tech stack

- **Remotion** 4.0.242 — programmatic video rendering
- **React** 18.3 — composition components
- **TypeScript** 5.5
- **Python** 3.11 — the pipeline scripts (no extra Python deps; stdlib only)
- **KIE API** — TTS (ElevenLabs-class voices) via `https://api.kie.ai`
- **Anthropic API** (Claude Sonnet 4.5) — metadata generation
- **OpenRouter** — fallback provider for metadata
- **Telegram Bot API** — delivery + alerts
- **ffmpeg + ffprobe** — installed on the runner for muxing + duration probes
- **GitHub Actions** (ubuntu-latest) — orchestration

No database. State lives in three JSON files at the repo root:
`topic.json`, `script.json`, `topics-used.json`.

---

## Quick start

You don't need to run this locally to ship a video — the cloud workflow does
it on `main`. But local rendering is useful for testing scene changes:

```bash
git clone https://github.com/trdteddarwin-eng/Daily-video-upload-.git
cd Daily-video-upload-
npm install
```

Place valid `topic.json`, `script.json`, and `src/DAILY/Main.tsx` at the repo
root (you can copy the current ones from `main`). Then:

```bash
# Generate audio (needs KIE_API_KEY)
KIE_API_KEY=... python3 pipeline/generate_audio.py

# Render
python3 pipeline/render_video.py

# Generate caption/hashtags (needs ANTHROPIC_API_KEY or OPENROUTER_API_KEY)
ANTHROPIC_API_KEY=... python3 pipeline/generate_metadata.py

# Optionally deliver (needs TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=... python3 pipeline/send_telegram.py
```

Output lands in `out/video.mp4`.

To trigger the cloud workflow manually:

```bash
gh workflow run daily-short.yml
```

---

## Project structure

```
.
├── .github/workflows/daily-short.yml   # CI: 30-min timeout, 6-step pipeline
├── ROUTINE.md                          # Brain's instruction set (read by the
│                                       #   Claude Routine each morning)
├── pipeline/
│   ├── generate_audio.py               # KIE TTS — 5-retry backoff, silent fallback
│   ├── render_video.py                 # ffprobe → patch Main.tsx → Remotion render
│   ├── generate_metadata.py            # Claude → titles + caption + hashtags
│   └── send_telegram.py                # Multipart MP4 upload to bot
├── src/
│   ├── Root.tsx                        # 60s composition at 1080×1920, 30fps
│   ├── DAILY/Main.tsx                  # Series of Scene1..Scene6
│   └── index.ts                        # Remotion entry
├── public/audio/                       # KIE-generated MP3s land here at run time
├── out/                                # Final video.mp4 lands here
├── topic.json                          # Today's chosen topic
├── script.json                         # Today's 6-scene script
├── topics-used.json                    # 90-day topic memory
├── remotion.config.ts
└── tsconfig.json                       # FROZEN — see ROUTINE.md top
```

---

## Engineering notes

These are the non-obvious choices, with a short reason for each. Read them if
you're trying to understand why the pipeline survives bad days.

**Audio-driven composition rather than fixed durations.** Remotion compositions
typically declare scene durations up front. This pipeline measures the *actual*
duration of each generated MP3 with `ffprobe`, adds a 30-frame buffer, and
patches the `SCENE_DURATIONS` array (and the `Audio` import) into `Main.tsx`
on every run. The upside: narration is never cut off, every scene runs exactly
as long as the spoken line plus a beat. The trade-off: the composition file
gets rewritten by CI before render, so local diffs to `Main.tsx` need to be
re-committed after a CI run.

**Silent-MP3 fallback for permanent TTS failure.** KIE is a third-party with
its own outages. If a single scene's audio fails after 5 retries (with backoff
`15s → 45s → 120s → 300s → 600s`, ~17 min total), the pipeline writes a
silent MP3 sized to the scene's estimated speech duration and continues. A
silent scene in a finished video is recoverable; a missing day in a daily
channel is not. The failure is logged, a Telegram alert fires, and a marker
file (`tts_failure.txt`) tells downstream steps what happened.

**Provider fallback for metadata.** `generate_metadata.py` prefers Anthropic's
API directly when `ANTHROPIC_API_KEY` is set (lower latency, no proxy quota),
and falls back to OpenRouter's `anthropic/claude-sonnet-4.5` if it isn't.
This means the workflow runs whether the user paid for Anthropic credits or is
routing everything through OpenRouter — a small reliability win for a daily
process.

**Topic memory is a JSON file, not a database.** `topics-used.json` records
every topic with its date. The Routine reads it to dedupe, and appends to it
when committing. At one entry per day, this stays under a thousand lines for
years and avoids the operational tax of a real DB for a pipeline that runs
once a day. Sometimes flat-file is the right answer.

**Three trigger paths because content cadence is messy.** The workflow
listens for (a) manual dispatch (for testing), (b) `repository_dispatch:
render-video` (called by the Routine), and (c) `push` to specific content
paths (`src/DAILY/Main.tsx`, `topic.json`, `script.json`). The push trigger
means you can ship a new video by editing a JSON in the GitHub UI on a phone.

**Routine ↔ CI separation.** The Routine is non-deterministic — it picks topics,
writes copy, designs scenes. The CI is deterministic — it renders, measures,
delivers. Crossing that line either way breaks the build: the Routine shouldn't
care about ffprobe; the CI shouldn't be inventing topics. `ROUTINE.md`
documents the contract.

**tsconfig sanitization step.** A prior renderer break came from
`"ignoreDeprecations"` being set to an invalid value. CI now runs a tiny
Python regex that strips that key from `tsconfig.json` before render, defending
against a self-inflicted footgun if a future Routine session re-adds it.

**Always-uploaded artifacts.** The `if: always()` on the upload step means
even failed runs leave `video.mp4` (partial), `topic.json`, `script.json`,
and `metadata.json` attached to the run for 7 days. Debugging a failed day
becomes a one-click download instead of re-running the whole pipeline.

---

## Deployment

This repo *is* its own deployment. The workflow runs on every dispatch or
content-path push to `main`.

### Required GitHub Actions secrets

| Secret | Used by | Purpose |
|---|---|---|
| `KIE_API_KEY` | `generate_audio.py` | TTS generation |
| `ANTHROPIC_API_KEY` *(or)* | `generate_metadata.py` | Caption/hashtag generation |
| `OPENROUTER_API_KEY` | `generate_metadata.py` | Same, fallback path |
| `TELEGRAM_BOT_TOKEN` | `send_telegram.py` + alerts | Bot identity |
| `TELEGRAM_CHAT_ID` | `send_telegram.py` + alerts | Where to deliver |

### Triggering a run from outside (e.g. the Routine)

```http
POST https://api.github.com/repos/trdteddarwin-eng/Daily-video-upload-/dispatches
Authorization: Bearer <PAT-with-repo-scope>
Content-Type: application/json

{ "event_type": "render-video" }
```

---

## Roadmap / known limits

- **No formal eval on topic quality.** The Routine picks topics; a human reads
  them in Telegram. Adding a lightweight LLM-judge eval would catch the
  occasional dud topic before render burns runner minutes.
- **Single delivery destination.** Telegram is the only sink. Adding
  TikTok/YouTube Shorts uploaders is a follow-on (the metadata already
  generates platform-specific copy in anticipation).
- **No retry on render failure.** TTS retries; the Remotion render does not.
  A renderer crash today means no video today. The artifact bundle helps
  diagnose, but auto-retry would be cheap.
- **No CI for the Routine.** The Routine is just an instruction file and a
  scheduled session — there's no test harness ensuring it generates a valid
  `script.json` before pushing. Adding a JSON schema check + a render dry-run
  before commit would close the loop.

---

## License

No license file is currently committed. Treat the repo as source-available
for portfolio review; ask before reusing the pipeline in production.
