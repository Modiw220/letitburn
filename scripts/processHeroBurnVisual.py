"""Process hero burn visual assets: remove dark backgrounds, preserve animation."""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

THRESHOLD = 12
FRINGE_MAX = 28


def remove_dark_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = rgba.load()

    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= width or y >= height or visited[y][x]:
            continue

        red, green, blue, _alpha = pixels[x, y]
        if max(red, green, blue) > THRESHOLD:
            continue

        visited[y][x] = True
        queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    for y in range(height):
        for x in range(width):
            red, green, blue, _alpha = pixels[x, y]
            if visited[y][x]:
                pixels[x, y] = (red, green, blue, 0)
                continue

            peak = max(red, green, blue)
            if peak <= THRESHOLD:
                pixels[x, y] = (red, green, blue, 0)
            elif peak <= FRINGE_MAX:
                alpha = int(255 * ((peak - THRESHOLD) / (FRINGE_MAX - THRESHOLD)))
                pixels[x, y] = (red, green, blue, max(0, min(255, alpha)))

    return rgba


def process_asset(source: Path, png_out: Path, webp_out: Path) -> None:
    image = Image.open(source)
    is_animated = bool(getattr(image, "is_animated", False)) and image.n_frames > 1

    if is_animated:
        frames: list[Image.Image] = []
        durations: list[int] = []

        for index in range(image.n_frames):
            image.seek(index)
            frames.append(remove_dark_background(image))
            durations.append(max(20, int(image.info.get("duration", 80))))

        png_out.parent.mkdir(parents=True, exist_ok=True)
        frames[0].save(png_out, optimize=True)
        frames[0].save(
            webp_out,
            save_all=True,
            append_images=frames[1:],
            duration=durations,
            loop=0,
            lossless=True,
            method=6,
        )
        print(f"Saved animated WebP ({len(frames)} frames) -> {webp_out}")
        print(f"Saved PNG fallback -> {png_out}")
        return

    still = remove_dark_background(image)
    png_out.parent.mkdir(parents=True, exist_ok=True)
    still.save(png_out, optimize=True)
    if webp_out.exists():
        webp_out.unlink()
    print(f"Saved transparent PNG -> {png_out}")


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if source is None:
        matches = list((root / "assets").glob("*burning-note-bowl-loop*"))
        if not matches:
            raise SystemExit("Provide a source GIF/image path.")
        source = matches[0]

    assets_dir = root / "src" / "assets"
    process_asset(
        source,
        assets_dir / "hero-burning-note-bowl.png",
        assets_dir / "hero-burning-note-bowl.webp",
    )


if __name__ == "__main__":
    main()
