#!/usr/bin/env python3
"""Cloud: Measure audio durations, patch Main.tsx, render video."""
import json
import os
import re
import subprocess
import sys

FPS = 30
BUFFER_FRAMES = 30

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE, "public", "audio")
MAIN_TSX = os.path.join(BASE, "src", "DAILY", "Main.tsx")
ROOT_TSX = os.path.join(BASE, "src", "Root.tsx")
OUT_DIR = os.path.join(BASE, "out")


def measure(path):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", path],
        capture_output=True, text=True
    )
    return float(r.stdout.strip())


def patch_main_tsx(durations):
    """Inject SCENE_DURATIONS + wire Audio into every SceneN."""
    with open(MAIN_TSX) as f:
        code = f.read()

    # Ensure Audio + staticFile imports
    if "staticFile" not in code or "Audio" not in code:
        code = re.sub(
            r"import \{([^}]*)\} from 'remotion';",
            lambda m: f"import {{{m.group(1).rstrip()}, Audio, staticFile}} from 'remotion';"
            if "Audio" not in m.group(1) else m.group(0),
            code, count=1
        )

    # Replace existing SCENE_DURATIONS (if any)
    durations_str = "const SCENE_DURATIONS = [" + ", ".join(str(d) for d in durations) + "];"
    if re.search(r"const SCENE_DURATIONS\s*=\s*\[[^\]]*\];", code):
        code = re.sub(r"const SCENE_DURATIONS\s*=\s*\[[^\]]*\];", durations_str, code)
    else:
        # Insert after imports
        code = re.sub(
            r"((?:^import[^\n]*\n)+)",
            r"\1\n" + durations_str + "\n",
            code, count=1, flags=re.MULTILINE
        )

    # Update Series.Sequence durationInFrames
    seq_counter = [0]
    def replace_dur(m):
        idx = seq_counter[0]
        seq_counter[0] += 1
        return f"durationInFrames={{SCENE_DURATIONS[{idx}]}}"
    code = re.sub(r"durationInFrames=\{[^}]+\}", replace_dur, code)

    # Wire audio + dur into each SceneN tag
    scene_counter = [0]
    def replace_scene(m):
        idx = scene_counter[0]
        scene_counter[0] += 1
        num = idx + 1
        name = m.group(1)
        return (
            f"<{name} dur={{SCENE_DURATIONS[{idx}]}} />\n"
            f"          <Audio src={{staticFile('audio/scene_{num:02d}.mp3')}} volume={{1}} />"
        )
    code = re.sub(r"<(Scene\d+)(?:\s[^/>]*)?\s*/>", replace_scene, code)

    with open(MAIN_TSX, "w") as f:
        f.write(code)

    return sum(durations)


def patch_root_tsx(total):
    with open(ROOT_TSX) as f:
        code = f.read()
    code = re.sub(
        r"durationInFrames=\{\d+\}",
        f"durationInFrames={{{total}}}",
        code, count=1
    )
    with open(ROOT_TSX, "w") as f:
        f.write(code)


def main():
    durations = []
    for i in range(1, 100):
        path = os.path.join(AUDIO_DIR, f"scene_{i:02d}.mp3")
        if not os.path.exists(path):
            break
        seconds = measure(path)
        frames = int(seconds * FPS) + BUFFER_FRAMES
        durations.append(frames)
        print(f"Scene {i}: {seconds:.2f}s → {frames} frames")

    if not durations:
        print("ERROR: no audio files")
        sys.exit(1)

    total = sum(durations)
    print(f"Total: {total} frames = {total / FPS:.1f}s")

    print("Patching Main.tsx...")
    patch_main_tsx(durations)
    print("Patching Root.tsx...")
    patch_root_tsx(total)

    print("TypeScript check...")
    ts = subprocess.run(["npx", "tsc", "--noEmit"], cwd=BASE, capture_output=True, text=True)
    if ts.returncode != 0:
        print("TS errors:")
        print((ts.stdout or ts.stderr)[-3000:])
        sys.exit(1)
    print("TS OK.")

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "video.mp4")
    print(f"Rendering → {out_path}...")

    result = subprocess.run(
        ["npx", "remotion", "render", "src/index.ts", "DAILY-Short", out_path],
        cwd=BASE, capture_output=True, text=True
    )
    if result.returncode != 0:
        print("Render failed:")
        print((result.stdout or "")[-2000:])
        print((result.stderr or "")[-2000:])
        sys.exit(1)

    size_mb = os.path.getsize(out_path) / 1024 / 1024
    print(f"Render complete: {out_path} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
