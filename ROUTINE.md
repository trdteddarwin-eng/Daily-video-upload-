# Daily Routine Instructions

> ## ⛔ DO NOT TOUCH tsconfig.json
> The tsconfig.json in this repo is frozen. It compiles fine as-is.
> If `npx tsc --noEmit` shows deprecation warnings (like TS5107 for `moduleResolution: "node"`), **IGNORE THEM** — they are warnings, not errors, and the workflow handles them. DO NOT add `"ignoreDeprecations"` — previous attempts have used invalid values and broken the build. Only fix actual compilation errors in Scene code.

---

You are the "brain" of the daily short video pipeline. You run in a Claude Routine session every morning at 9 AM. Your job: pick a topic, write a script, write Remotion scene code, commit everything, then trigger the GitHub Actions workflow that does the rendering + delivery.

Repo: `trdteddarwin-eng/Daily-video-upload-` (you're cloned into it at session start).

---

## Step 1: Pick a Fresh Topic

Read `topics-used.json` to see which topics have been used in the last 90 days. Generate a NEW topic for today that:

- Is about personal finance, money psychology, or wealth behavior
- Has a specific, contrarian, or surprising angle (not generic "How to Save Money")
- Includes concrete numbers/stats that make it shareable
- Works as a 60-second TikTok/YouTube Short
- Is instantly clickable — curiosity-inducing, not educational-sounding

**GOOD examples:**
- "The Psychology Trick Banks Use to Keep You Broke"
- "Why Millionaires Keep Exactly $2,467 in Their Checking"
- "The $47 Daily Habit That Steals Your Retirement"

**BAD examples:**
- "How to Save Money"
- "Investing for Beginners"
- "Budgeting Tips"

Write the topic to `topic.json` in this exact format:
```json
{
  "title": "Under 60 chars. Clickable.",
  "hook": "The one-sentence opening that pulls viewers in",
  "angle": "What makes this different from generic finance content",
  "audience": "Who specifically benefits",
  "key_numbers": ["stat 1", "stat 2", "stat 3"]
}
```

Then append to `topics-used.json`:
```json
{
  "topics": [
    ...existing entries,
    {"date": "YYYY-MM-DD", "title": "...", "hook": "..."}
  ]
}
```

---

## Step 2: Write a 6-Scene Script

Write `script.json` — an array of 6 scenes, each ~8-10 seconds of narration.

**HARD RULES (from a real production session):**

1. Every scene's narration must match its visual — be specific
2. If the topic implies numbered items, verbally say "number one," "number two," etc.
3. End each scene with a natural bridge to the next (no stop-start)
4. Conversational tone — contractions, casual phrasing ("here's the thing", "wild right?")
5. Scene 1 sets up what the viewer is about to learn
6. Scene 6 is the CTA/payoff
7. Visuals must be RECOGNIZABLE OBJECTS (credit card, house, piggy bank, person silhouette, car, etc.) — NOT abstract shapes
8. Include specific numbers from the topic

**Length: 2-3 sentences per scene, ~22-25 words. Fits in 8-10 seconds of speech.**

Format:
```json
[
  {
    "scene": 1,
    "narration": "Exact spoken words",
    "visual": "Specific description of objects, animations, text overlays",
    "accent_color": "amber"
  }
]
```

All 6 scenes share ONE `accent_color`:
- `amber` (#F59E0B) — wealth, urgency, time
- `green` (#10B981) — growth, money, success
- `red` (#EF4444) — danger, debt, warnings
- `orange` (#F97316) — impulse, spending
- `blue` (#3B82F6) — trust, structure, stability

---

## Step 3: Write Remotion Scene Code

Write `src/DAILY/Main.tsx` — a complete Remotion composition with all 6 scenes.

**Template structure** (600-1000 lines total):

```tsx
import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B'; // matches scene's accent_color
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  // ... animations
  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Visual that matches narration */}
    </FadeScene>
  );
};

// ... Scene2-Scene6

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
```

**CRITICAL VISUAL RULES:**

1. **Visuals MUST match narration.** If narration says "credit card," render an SVG credit card. "House" = triangle roof + rectangle. "Person" = circle head + body. NEVER abstract shapes.
2. SVG icons only, 10-30 path commands each. No external images.
3. Every animation uses `useCurrentFrame()` + `interpolate()` + `spring()`. NEVER CSS transitions or `@keyframes`.
4. NEVER use `Math.random()`.
5. Include counters, progress bars, growing bars, spring-in reveals.
6. Resolution will be 1080x1920 (vertical 9:16).
7. Alternate dark/light backgrounds between scenes.
8. NEVER have duplicate property names in object literals (e.g., two `position:` keys — causes TS error).
9. When wrapping `Array(n)`, always guard: `Math.max(0, Math.floor(n))` to prevent negative-length crashes.
10. Scene components accept `{ dur?: number }` prop.

Run `npx tsc --noEmit` locally if possible before committing to catch TS errors.

---

## Step 4: Commit + Dispatch

Commit these files to main:
- `topic.json`
- `script.json`
- `src/DAILY/Main.tsx`
- `topics-used.json`

Then **trigger the render workflow using `mcp__github__push_files`** (this is the only reliable method in this environment — `gh` CLI is not available and `$GITHUB_TOKEN` is not set):

```
mcp__github__push_files(
  owner  = "trdteddarwin-eng",
  repo   = "Daily-video-upload-",
  branch = "main",
  message = "Trigger render: <topic title>",
  files  = [{ path: "topic.json", content: <exact current topic.json content> }]
)
```

This creates a push commit on `topic.json` (a workflow trigger path), which fires `daily-short.yml` via its `push` rule. **Always do this step even though you already did `git push` — the git push alone has proven unreliable for triggering delivery.**

Do NOT rely on:
- `gh workflow run` — `gh` CLI is not installed
- `curl` + `$GITHUB_TOKEN` — token is not available in this environment

That's the end of your job. The workflow handles audio generation, rendering, metadata, and Telegram delivery.

---

## Done State

When you finish, you should have:
- ✓ Committed `topic.json`, `script.json`, `src/DAILY/Main.tsx`, updated `topics-used.json`
- ✓ Triggered the daily-short workflow via `mcp__github__push_files`
- ✓ Brief status message confirming the topic picked

Do NOT:
- Run `npm install` or render video yourself (that's the workflow's job)
- Call KIE or Telegram APIs (the workflow handles those)
- Modify `.github/workflows/` or `pipeline/` (those are tested and stable)
