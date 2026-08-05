# Let It Burn

A private mental wellness space to release difficult thoughts, relax through creative tools, listen to calming sounds, and complete self-reflection quizzes.

## Tech stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS v4
- Lucide React icons
- React Router

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Hero image

Place the cinematic hero image at:

```
src/assets/hero-burning-note.webp
```

Then update the import in `src/components/home/HeroSection.tsx`:

```tsx
import heroImage from '../../assets/hero-burning-note.webp'
```

A starter PNG is included at `src/assets/hero-burning-note.png`. Replace it with your own `.webp` asset for production. If the image fails to load, a gradient fallback is shown automatically.

Recommended image: paper note burning in a fire bowl, dark mountains and water at night, warm fire glow against a cool navy sky.

## Optional fire sound

Place a low-volume paper-burning audio file at:

```
public/audio/burn-paper.mp3
```

Users can enable it via the “Fire sound” toggle on the Burn Your Thoughts page. Only the sound preference is stored in `localStorage` — never note content. The page works normally if the file is missing.

## Project structure

```
src/
  assets/
  components/
    common/       Logo, ThemeToggle
    home/         Hero, Tools, Support, Trust sections
    layout/       Header, Footer, MobileMenu
  data/           tools.ts, trustItems.ts
  hooks/          useTheme.ts
  pages/          HomePage.tsx
```

## Routes (prepared for future pages)

| Path | Status |
|------|--------|
| `/` | Homepage |
| `/burn-thoughts` | Burn Your Thoughts — write & release notes |
| `/relaxing-drawing` | Relaxing Drawing — canvas & coloring templates |
| `/sounds` | Planned |
| `/quizzes` | Planned |
| `/safety-resources` | Planned |
| `/privacy` | Planned |
| `/contact` | Planned |

## Features

- Responsive layout (1440px, 1024px, 768px, 430px, 375px)
- Sticky header with accessible mobile navigation
- Dark mode default with light mode toggle (saved to `localStorage`)
- Reduced motion support
- Keyboard focus styles and semantic HTML
