# Let It Burn Cinematic UI Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved dark-mode-first cinematic visual refresh across Let It Burn's shared chrome, immersive tools, discovery pages, and trust pages without changing route names or core feature flows.

**Architecture:** Keep the redesign presentation-first. Introduce a small shared set of page-shell, hero, and trust-strip primitives plus a route archetype helper, then recompose existing pages around those primitives rather than rewriting business logic. Use server-rendered Vitest assertions for new UI structure coverage because the repo does not currently include a browser-like component test harness.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS 4, Vitest 4, React Router 7, lucide-react

## Global Constraints

- Existing route names and core tool flows remain unchanged.
- Existing palette direction stays recognizable: orange as emotional lead, cyan as reassurance/support, purple as restrained atmospheric accent.
- No backend or payment-flow redesign is included unless a UI issue requires a very small interface adjustment.
- Existing privacy-first messaging stays, but repeated reassurance blocks should be consolidated.
- `/contact` and `/safety-resources` remain valid destinations.
- This pass is dark-mode-first. Light mode remains supported but intentionally simpler.
- Preserve accessibility, privacy signaling, and reduced-motion behavior.

---

## File Map

- `src/utils/pageArchetypes.ts`: central route-to-archetype mapping and shell-class helpers for discovery, immersive, and editorial pages.
- `src/components/common/PageShell.tsx`: shared wrapper that exposes archetype data attributes and consistent shell spacing.
- `src/components/common/PageHero.tsx`: shared cinematic hero wrapper for discovery, immersive, and editorial variants.
- `src/components/common/TrustStrip.tsx`: compact reassurance surface used instead of repeated stacked support cards.
- `src/index.css`: font imports, theme tokens, surface taxonomy, and dark-mode-first visual utilities.
- `src/components/common/Logo.tsx`, `src/components/common/ThemeToggle.tsx`, `src/components/layout/*`: global brand, navigation, and footer refinements.
- `src/components/home/*`, `src/components/burn/*`, `src/components/drawing/*`, `src/components/sounds/*`: immersive/discovery UI recomposition.
- `src/components/quizzes/*`, `src/components/quiz-engine/*`, `src/components/pricing/*`: discovery page scanability and onboarding cleanup.
- `src/components/about/*`, `src/components/privacy/*`, `src/components/support/*`, `src/pages/ContactPage.tsx`, `src/pages/SafetyResourcesPage.tsx`: quieter editorial/trust page treatment.
- `src/**/*.test.ts[x]`: static markup and helper coverage added where the repo currently lacks UI structure tests.

### Task 1: Build cinematic page primitives and route archetype helpers

**Files:**
- Create: `src/utils/pageArchetypes.ts`
- Create: `src/utils/pageArchetypes.test.ts`
- Create: `src/components/common/PageShell.tsx`
- Create: `src/components/common/PageHero.tsx`
- Create: `src/components/common/TrustStrip.tsx`
- Create: `src/components/common/PageShell.test.tsx`
- Modify: `src/components/common/PageSectionIntro.tsx`
- Modify: `src/components/common/SupportCallout.tsx`

**Interfaces:**
- Consumes: existing `children` composition patterns from `src/pages/*.tsx`
- Produces: `type PageArchetype = 'immersive' | 'discovery' | 'editorial'`
- Produces: `getPageArchetype(pathname: string): PageArchetype`
- Produces: `getPageShellClass(archetype: PageArchetype): string`
- Produces: `PageShell(props: { archetype: PageArchetype; as?: 'main' | 'section' | 'div'; className?: string; children: React.ReactNode }): JSX.Element`
- Produces: `PageHero(props: { variant: PageArchetype; eyebrow?: string; title: React.ReactNode; description?: React.ReactNode; align?: 'left' | 'center'; meta?: React.ReactNode; actions?: React.ReactNode; children?: React.ReactNode; className?: string }): JSX.Element`
- Produces: `TrustStrip(props: { tone?: 'calm' | 'support' | 'warning'; items: Array<{ label: string; value?: string; href?: string }>; action?: React.ReactNode; className?: string }): JSX.Element`

- [ ] **Step 1: Write the failing tests**

```tsx
// src/utils/pageArchetypes.test.ts
import { describe, expect, it } from 'vitest'
import { getPageArchetype, getPageShellClass } from './pageArchetypes'

describe('pageArchetypes', () => {
  it('maps immersive, discovery, and editorial routes to stable shell types', () => {
    expect(getPageArchetype('/')).toBe('discovery')
    expect(getPageArchetype('/burn-thoughts')).toBe('immersive')
    expect(getPageArchetype('/sounds')).toBe('immersive')
    expect(getPageArchetype('/about')).toBe('editorial')
    expect(getPageShellClass('editorial')).toBe('page-shell page-shell--editorial')
  })
})

// src/components/common/PageShell.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import PageHero from './PageHero'
import PageShell from './PageShell'
import TrustStrip from './TrustStrip'

describe('cinematic common primitives', () => {
  it('renders shell and hero data hooks for CSS and page tests', () => {
    const html = renderToStaticMarkup(
      <PageShell archetype="discovery">
        <PageHero
          variant="discovery"
          eyebrow="Start here"
          title="A quieter page shell"
          description="Discovery pages need stronger hierarchy."
        />
        <TrustStrip
          tone="calm"
          items={[{ label: 'Private by default', value: 'No account needed' }]}
        />
      </PageShell>,
    )

    expect(html).toContain('data-page-archetype="discovery"')
    expect(html).toContain('data-hero-variant="discovery"')
    expect(html).toContain('data-trust-tone="calm"')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/utils/pageArchetypes.test.ts src/components/common/PageShell.test.tsx`

Expected: FAIL with module resolution errors for `./pageArchetypes`, `./PageShell`, `./PageHero`, or `./TrustStrip`

- [ ] **Step 3: Write the minimal implementation**

```ts
// src/utils/pageArchetypes.ts
export type PageArchetype = 'immersive' | 'discovery' | 'editorial'

const ARCHETYPE_ROUTES: Array<[prefix: string, archetype: PageArchetype]> = [
  ['/burn-thoughts', 'immersive'],
  ['/relaxing-drawing', 'immersive'],
  ['/sounds', 'immersive'],
  ['/quizzes/', 'immersive'],
  ['/quizzes', 'discovery'],
  ['/pricing', 'discovery'],
  ['/about', 'editorial'],
  ['/privacy', 'editorial'],
  ['/support', 'editorial'],
  ['/contact', 'editorial'],
  ['/safety-resources', 'editorial'],
  ['/', 'discovery'],
]

export function getPageArchetype(pathname: string): PageArchetype {
  const match = ARCHETYPE_ROUTES.find(([prefix]) =>
    prefix === '/' ? pathname === '/' : pathname.startsWith(prefix),
  )

  return match?.[1] ?? 'discovery'
}

export function getPageShellClass(archetype: PageArchetype): string {
  return `page-shell page-shell--${archetype}`
}
```

```tsx
// src/components/common/PageShell.tsx
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { getPageShellClass, type PageArchetype } from '../../utils/pageArchetypes'

type PageShellProps<T extends ElementType = 'main'> = {
  archetype: PageArchetype
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export default function PageShell<T extends ElementType = 'main'>({
  archetype,
  as,
  className = '',
  children,
  ...rest
}: PageShellProps<T>) {
  const Tag = (as ?? 'main') as ElementType

  return (
    <Tag
      data-page-archetype={archetype}
      className={`${getPageShellClass(archetype)} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
```

```tsx
// src/components/common/PageHero.tsx
import type { ReactNode } from 'react'
import type { PageArchetype } from '../../utils/pageArchetypes'

export default function PageHero({
  variant,
  eyebrow,
  title,
  description,
  align = 'left',
  meta,
  actions,
  children,
  className = '',
}: {
  variant: PageArchetype
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  meta?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      data-hero-variant={variant}
      className={`surface-hero-stage hero-align-${align} ${className}`.trim()}
    >
      {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
      <div className="hero-copy">
        <h1 className="hero-title">{title}</h1>
        {description ? <div className="hero-description">{description}</div> : null}
        {meta ? <div className="hero-meta">{meta}</div> : null}
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}
```

```tsx
// src/components/common/TrustStrip.tsx
import type { ReactNode } from 'react'

export default function TrustStrip({
  tone = 'calm',
  items,
  action,
  className = '',
}: {
  tone?: 'calm' | 'support' | 'warning'
  items: Array<{ label: string; value?: string; href?: string }>
  action?: ReactNode
  className?: string
}) {
  return (
    <div data-trust-tone={tone} className={`surface-trust-strip ${className}`.trim()}>
      <ul className="trust-strip-grid">
        {items.map((item) => (
          <li key={`${item.label}-${item.value ?? item.href ?? 'item'}`}>
            <span className="trust-strip-label">{item.label}</span>
            {item.href ? (
              <a href={item.href} className="trust-strip-link">
                {item.value ?? item.href}
              </a>
            ) : (
              <span className="trust-strip-value">{item.value}</span>
            )}
          </li>
        ))}
      </ul>
      {action ? <div className="trust-strip-action">{action}</div> : null}
    </div>
  )
}
```

```tsx
// src/components/common/PageSectionIntro.tsx and SupportCallout.tsx
// Extend both components with `variant?: 'discovery' | 'immersive' | 'editorial'`
// and `data-surface` attributes so later tasks can restyle them without branching logic.
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/utils/pageArchetypes.test.ts src/components/common/PageShell.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/pageArchetypes.ts src/utils/pageArchetypes.test.ts src/components/common/PageShell.tsx src/components/common/PageHero.tsx src/components/common/TrustStrip.tsx src/components/common/PageShell.test.tsx src/components/common/PageSectionIntro.tsx src/components/common/SupportCallout.tsx
git commit -m "feat: add cinematic page primitives"
```

### Task 2: Rebuild the global visual system, typography, and shared chrome

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/common/Logo.tsx`
- Modify: `src/components/common/ThemeToggle.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/MobileMenu.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/NavItem.tsx`
- Create: `src/components/layout/Header.test.tsx`
- Create: `src/components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `PageArchetype`, `PageShell`, and shared surface classes from Task 1
- Produces: header and footer markup with stable hooks `data-header-shell="cinematic"` and `data-footer-shell="cinematic"`
- Produces: font tokens `--font-display`, `--font-ui`, `--font-accent`
- Produces: surface utility classes `surface-hero-stage`, `surface-editorial-panel`, `surface-tool-stage`, `surface-trust-strip`

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/layout/Header.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders the cinematic navigation shell with compact theme controls', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Header theme="dark" onToggleTheme={() => undefined} />
      </MemoryRouter>,
    )

    expect(html).toContain('data-header-shell="cinematic"')
    expect(html).toContain('data-theme-toggle="compact"')
  })
})

// src/components/layout/Footer.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('groups links by intent and exposes the cinematic footer shell', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(html).toContain('data-footer-shell="cinematic"')
    expect(html).toContain('Tools')
    expect(html).toContain('Trust')
    expect(html).toContain('Support')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/layout/Header.test.tsx src/components/layout/Footer.test.tsx`

Expected: FAIL because the expected `data-*` hooks and grouped footer labels do not exist yet

- [ ] **Step 3: Write the minimal implementation**

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

@theme {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-ui: 'Manrope', system-ui, sans-serif;
  --font-accent: 'Caveat', 'Kalam', cursive;
  --color-bg-main: #040a14;
  --color-bg-secondary: #091321;
  --color-bg-elevated: rgba(10, 19, 33, 0.88);
  --color-bg-editorial: rgba(13, 22, 35, 0.72);
}

.surface-hero-stage { border-radius: 32px; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(18px); }
.surface-editorial-panel { border-radius: 28px; border: 1px solid rgba(255,255,255,0.08); background: var(--color-bg-editorial); }
.surface-tool-stage { border-radius: 28px; border: 1px solid rgba(255,255,255,0.1); background: linear-gradient(180deg, rgba(13,22,35,0.94), rgba(8,14,24,0.88)); }
.surface-trust-strip { display: grid; gap: 1rem; border-radius: 20px; border: 1px solid rgba(70,202,212,0.16); background: rgba(8,18,28,0.72); }
.hero-title { font-family: var(--font-display); letter-spacing: -0.02em; line-height: 0.98; }
```

```tsx
// src/components/common/ThemeToggle.tsx
export default function ThemeToggle(...) {
  return (
    <button
      type="button"
      data-theme-toggle="compact"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="theme-toggle theme-toggle--compact"
      onClick={onToggle}
    >
      ...
    </button>
  )
}
```

```tsx
// src/components/layout/Header.tsx
<header
  data-header-shell="cinematic"
  className="cinematic-nav-shell sticky top-0 z-50 border-b border-white/[0.08] bg-bg-main/84 backdrop-blur-xl"
>
  <div className="content-container flex h-[72px] items-center justify-between gap-3">
    <Logo className="max-w-[210px]" />
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
      ...
    </nav>
    <div className="flex items-center gap-2">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <MobileMenuButton ... />
    </div>
  </div>
</header>
```

```tsx
// src/components/layout/Footer.tsx
<footer data-footer-shell="cinematic" className="border-t border-white/[0.08] bg-black/20">
  <div className="content-container grid gap-8 py-10 md:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
    <div>...</div>
    <section aria-labelledby="footer-tools"><h2 id="footer-tools">Tools</h2>...</section>
    <section aria-labelledby="footer-trust"><h2 id="footer-trust">Trust</h2>...</section>
    <section aria-labelledby="footer-support"><h2 id="footer-support">Support</h2>...</section>
  </div>
</footer>
```

```tsx
// src/components/layout/MobileMenu.tsx and NavItem.tsx
// Add clearer active/open styling, stronger overlay depth, and shared nav item spacing
// while keeping the existing route targets unchanged.
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/layout/Header.test.tsx src/components/layout/Footer.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/common/Logo.tsx src/components/common/ThemeToggle.tsx src/components/layout/Header.tsx src/components/layout/MobileMenu.tsx src/components/layout/Footer.tsx src/components/layout/NavItem.tsx src/components/layout/Header.test.tsx src/components/layout/Footer.test.tsx
git commit -m "feat: refresh cinematic typography and site chrome"
```

### Task 3: Recompose the home page and Burn Thoughts into stronger cinematic stages

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/ToolsSection.tsx`
- Modify: `src/components/home/ToolCard.tsx`
- Modify: `src/components/home/SupportSection.tsx`
- Modify: `src/components/home/TrustSection.tsx`
- Modify: `src/pages/BurnThoughtsPage.tsx`
- Modify: `src/components/burn/BurnExperience.tsx`
- Modify: `src/components/burn/PrivacyNotice.tsx`
- Modify: `src/components/burn/CompletionActions.tsx`
- Create: `src/components/home/HomeCinematicSections.test.tsx`
- Create: `src/components/burn/BurnExperience.test.tsx`

**Interfaces:**
- Consumes: `PageShell`, `PageHero`, `TrustStrip`, `SupportCallout`
- Produces: `HomePage` wrapped with `PageShell archetype="discovery"`
- Produces: `BurnThoughtsPage` wrapped with `PageShell archetype="immersive"`
- Produces: stable data hooks `data-home-tools="featured-grid"` and `data-burn-stage="writing"`

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/home/HomeCinematicSections.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import HeroSection from './HeroSection'
import ToolsSection from './ToolsSection'
import TrustSection from './TrustSection'

describe('home cinematic composition', () => {
  it('renders a discovery hero, curated tool grid, and compact trust strip', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <HeroSection />
        <ToolsSection />
        <TrustSection />
      </MemoryRouter>,
    )

    expect(html).toContain('data-hero-variant="discovery"')
    expect(html).toContain('data-home-tools="featured-grid"')
    expect(html).toContain('Need immediate help?')
  })
})

// src/components/burn/BurnExperience.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import BurnExperience from './BurnExperience'

describe('BurnExperience', () => {
  it('renders the writing stage as a connected cinematic tool surface', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <BurnExperience />
      </MemoryRouter>,
    )

    expect(html).toContain('data-burn-stage="writing"')
    expect(html).toContain('Write what you want to let go of.')
    expect(html).toContain('Your note is not saved')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/home/HomeCinematicSections.test.tsx src/components/burn/BurnExperience.test.tsx`

Expected: FAIL because the new hero and stage hooks are not wired into the current components

- [ ] **Step 3: Write the minimal implementation**

```tsx
// src/pages/HomePage.tsx
<PageShell archetype="discovery">
  <HeroSection />
  <ToolsSection />
  <SupportSection />
  <TrustSection />
</PageShell>
```

```tsx
// src/components/home/HeroSection.tsx
<PageHero
  variant="discovery"
  eyebrow="Private release and gentle tools"
  title={
    <>
      <span className="block">Write it.</span>
      <span className="block text-fire-orange">Burn it.</span>
      <span className="block text-calm-cyan">Breathe.</span>
    </>
  }
  description="A private space to release thoughts, relax, and reflect."
  meta={...}
  actions={...}
>
  <div className="hero-cinematic-image" aria-hidden="true" />
</PageHero>
```

```tsx
// src/components/home/ToolsSection.tsx
<section data-home-tools="featured-grid" ...>
  <PageSectionIntro
    variant="discovery"
    eyebrow="Choose a starting point"
    title="A different tool for each kind of pause."
    description="Some moments need release. Others need color, sound, or a quieter reflection."
  />
  <div className="grid gap-5 xl:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
    {tools.map((tool, index) => (
      <ToolCard key={tool.id} tool={tool} featured={index === 0} />
    ))}
  </div>
</section>
```

```tsx
// src/components/home/TrustSection.tsx
<TrustStrip
  tone="calm"
  items={[
    { label: 'Anonymous', value: 'No account needed' },
    { label: 'Private', value: 'Your note stays with you' },
  ]}
  action={
    <Link to="/safety-resources" className="trust-strip-link">
      Need immediate help? View safety resources.
    </Link>
  }
/>
```

```tsx
// src/components/burn/BurnExperience.tsx
const stageData = stage === 'confirming' ? 'writing' : stage

return (
  <div data-burn-stage={stageData} className="burn-page relative min-h-[calc(100vh-78px)]">
    <div className="burn-page-content ...">
      {showWriting ? (
        <PageHero
          variant="immersive"
          eyebrow="Private release space"
          title="Write what you want to let go of."
          description="This space is yours. Write freely, without judgment."
          meta={...}
        />
      ) : null}

      <section className="surface-tool-stage burn-writing-stage">
        <div className="burn-stage-status">Write → Burn → Breathe</div>
        <WritingPaper ... />
        <div className="burn-action-dock">
          <PrivacyNotice />
          <div className="burn-primary-actions">...</div>
        </div>
      </section>

      <TrustStrip
        tone="support"
        items={[{ label: 'Support boundary', value: 'Let It Burn is a reflection tool, not emergency support.' }]}
        action={<Link to="/safety-resources">Need immediate help? View safety resources.</Link>}
      />
    </div>
  </div>
)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/home/HomeCinematicSections.test.tsx src/components/burn/BurnExperience.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.tsx src/components/home/HeroSection.tsx src/components/home/ToolsSection.tsx src/components/home/ToolCard.tsx src/components/home/SupportSection.tsx src/components/home/TrustSection.tsx src/pages/BurnThoughtsPage.tsx src/components/burn/BurnExperience.tsx src/components/burn/PrivacyNotice.tsx src/components/burn/CompletionActions.tsx src/components/home/HomeCinematicSections.test.tsx src/components/burn/BurnExperience.test.tsx
git commit -m "feat: add cinematic home and burn page staging"
```

### Task 4: Rework Relaxing Drawing and Sounds around focused tool stages

**Files:**
- Modify: `src/pages/RelaxingDrawingPage.tsx`
- Modify: `src/components/drawing/DrawingWorkspace.tsx`
- Modify: `src/components/drawing/DrawingToolbar.tsx`
- Modify: `src/components/drawing/MobileDrawingToolbar.tsx`
- Modify: `src/components/drawing/ModeSelector.tsx`
- Modify: `src/components/drawing/DrawingSupportPanel.tsx`
- Modify: `src/components/drawing/PremiumPreview.tsx`
- Modify: `src/pages/SoundsPage.tsx`
- Modify: `src/components/sounds/SoundsHero.tsx`
- Modify: `src/components/sounds/FeaturedSoundPlayer.tsx`
- Modify: `src/components/sounds/SoundLibrary.tsx`
- Modify: `src/components/sounds/PremiumSoundPreview.tsx`
- Modify: `src/components/sounds/SoundSupportPanel.tsx`
- Modify: `src/components/sounds/SoundPrivacyNotice.tsx`
- Create: `src/components/drawing/DrawingWorkspace.test.tsx`
- Create: `src/components/sounds/FeaturedSoundPlayer.test.tsx`

**Interfaces:**
- Consumes: `PageShell`, `PageHero`, `TrustStrip`, `PageSectionIntro`
- Produces: `data-drawing-zone="workspace"` and `data-sound-stage="featured-player"`
- Produces: quieter roadmap/upsell surfaces separated from active tool controls

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/drawing/DrawingWorkspace.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import DrawingWorkspace from './DrawingWorkspace'

describe('DrawingWorkspace', () => {
  it('renders a primary workspace zone before support and roadmap content', () => {
    const html = renderToStaticMarkup(<DrawingWorkspace />)

    expect(html).toContain('data-drawing-zone="workspace"')
    expect(html).toContain('data-drawing-zone="support"')
  })
})

// src/components/sounds/FeaturedSoundPlayer.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { SoundPlayerProvider } from '../../context/SoundPlayerContext'
import FeaturedSoundPlayer from './FeaturedSoundPlayer'

describe('FeaturedSoundPlayer', () => {
  it('renders the cinematic featured-player stage even before a sound is chosen', () => {
    const html = renderToStaticMarkup(
      <SoundPlayerProvider>
        <FeaturedSoundPlayer />
      </SoundPlayerProvider>,
    )

    expect(html).toContain('data-sound-stage="featured-player"')
    expect(html).toContain('Choose a sound')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/drawing/DrawingWorkspace.test.tsx src/components/sounds/FeaturedSoundPlayer.test.tsx`

Expected: FAIL because the new data zones and empty-state copy are not in the current markup

- [ ] **Step 3: Write the minimal implementation**

```tsx
// src/pages/RelaxingDrawingPage.tsx
<PageShell archetype="immersive" className="drawing-page">
  <DrawingWorkspace />
</PageShell>
```

```tsx
// src/components/drawing/DrawingWorkspace.tsx
<PageHero
  variant="immersive"
  eyebrow="Quiet studio"
  title="Draw slowly. Keep only what helps."
  description="Choose a mode, settle into the canvas, and use support only when you need it."
/>
<section data-drawing-zone="workspace" className="surface-tool-stage drawing-workspace">...</section>
<aside data-drawing-zone="support" className="surface-editorial-panel">...</aside>
<section data-drawing-zone="roadmap" className="surface-editorial-panel surface-editorial-panel--quiet">...</section>
```

```tsx
// src/components/drawing/DrawingToolbar.tsx and MobileDrawingToolbar.tsx
// Group color, brush, undo/redo, and download actions into stronger tactile clusters
// and reduce flat repeated button chrome on small screens.
```

```tsx
// src/pages/SoundsPage.tsx and src/components/sounds/SoundsHero.tsx
<PageShell archetype="immersive" className="sounds-page">
  <SoundsHero />
  ...
</PageShell>
```

```tsx
// src/components/sounds/FeaturedSoundPlayer.tsx
<section data-sound-stage="featured-player" className="surface-tool-stage sound-featured-player">
  {!selectedSound ? (
    <div className="sound-empty-stage">
      <p className="sound-empty-eyebrow">Choose a sound</p>
      <h2 className="sound-empty-title">Start with one steady atmosphere.</h2>
      <p className="sound-empty-copy">Rain, waves, and other free soundscapes stay separate from future premium tools.</p>
    </div>
  ) : (
    ...
  )}
</section>
```

```tsx
// src/components/sounds/SoundLibrary.tsx, PremiumSoundPreview.tsx, SoundSupportPanel.tsx, SoundPrivacyNotice.tsx
// Separate free library, future premium preview, support, and privacy into distinct blocks
// instead of one continuous card rhythm.
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/drawing/DrawingWorkspace.test.tsx src/components/sounds/FeaturedSoundPlayer.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/RelaxingDrawingPage.tsx src/components/drawing/DrawingWorkspace.tsx src/components/drawing/DrawingToolbar.tsx src/components/drawing/MobileDrawingToolbar.tsx src/components/drawing/ModeSelector.tsx src/components/drawing/DrawingSupportPanel.tsx src/components/drawing/PremiumPreview.tsx src/pages/SoundsPage.tsx src/components/sounds/SoundsHero.tsx src/components/sounds/FeaturedSoundPlayer.tsx src/components/sounds/SoundLibrary.tsx src/components/sounds/PremiumSoundPreview.tsx src/components/sounds/SoundSupportPanel.tsx src/components/sounds/SoundPrivacyNotice.tsx src/components/drawing/DrawingWorkspace.test.tsx src/components/sounds/FeaturedSoundPlayer.test.tsx
git commit -m "feat: stage drawing and sounds as cinematic tools"
```

### Task 5: Tighten discovery flows for quizzes and pricing

**Files:**
- Modify: `src/pages/QuizzesPage.tsx`
- Modify: `src/components/quizzes/QuizzesHero.tsx`
- Modify: `src/components/quizzes/QuizFilters.tsx`
- Modify: `src/components/quizzes/QuizGrid.tsx`
- Modify: `src/components/quizzes/QuizCard.tsx`
- Modify: `src/components/quizzes/QuizDisclaimer.tsx`
- Modify: `src/components/quizzes/QuizSupportPanel.tsx`
- Modify: `src/pages/IndividualQuizPage.tsx`
- Modify: `src/components/quiz-engine/QuizIntro.tsx`
- Modify: `src/pages/PricingPage.tsx`
- Modify: `src/components/pricing/PricingHero.tsx`
- Modify: `src/components/pricing/FreeCoreSection.tsx`
- Modify: `src/components/pricing/UpgradeCatalogue.tsx`
- Modify: `src/components/pricing/PricingComparisonTable.tsx`
- Modify: `src/components/pricing/PricingConfigurationWarning.tsx`
- Create: `src/components/quizzes/QuizzesDiscoveryLayout.test.tsx`
- Create: `src/components/quiz-engine/QuizIntro.test.tsx`
- Create: `src/components/pricing/PricingDiscoveryLayout.test.tsx`

**Interfaces:**
- Consumes: `PageShell`, `PageHero`, `TrustStrip`, shared surface classes
- Produces: featured “start here” quiz path, compact editorial filter bar, improved quiz onboarding, faster pricing comparison flow
- Produces: `data-quiz-feature="start-here"` and `data-pricing-flow="free-vs-upgrades"`

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/quizzes/QuizzesDiscoveryLayout.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import QuizzesHero from './QuizzesHero'
import QuizFilters from './QuizFilters'

describe('quizzes discovery layout', () => {
  it('renders a featured starting path and compact editorial filters', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <QuizzesHero />
        <QuizFilters />
      </MemoryRouter>,
    )

    expect(html).toContain('data-quiz-feature="start-here"')
    expect(html).toContain('data-quiz-filters="editorial"')
  })
})

// src/components/quiz-engine/QuizIntro.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { QuizEngineProvider } from '../../context/QuizEngineContext'
import { getQuizDefinition } from '../../data/quizDefinitions'
import QuizIntro from './QuizIntro'

describe('QuizIntro', () => {
  it('sets expectations before the quiz begins', () => {
    const definition = getQuizDefinition('emotional-wellbeing-check-in')
    if (!definition) throw new Error('Quiz definition missing')

    const html = renderToStaticMarkup(
      <MemoryRouter>
        <QuizEngineProvider definition={definition}>
          <QuizIntro />
        </QuizEngineProvider>
      </MemoryRouter>,
    )

    expect(html).toContain('What happens next')
    expect(html).toContain('Time estimate')
  })
})

// src/components/pricing/PricingDiscoveryLayout.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import PricingHero from './PricingHero'
import FreeCoreSection from './FreeCoreSection'

describe('pricing discovery layout', () => {
  it('leads with the free core versus upgrades decision', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <PricingHero />
        <FreeCoreSection />
      </MemoryRouter>,
    )

    expect(html).toContain('data-pricing-flow="free-vs-upgrades"')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/quizzes/QuizzesDiscoveryLayout.test.tsx src/components/quiz-engine/QuizIntro.test.tsx src/components/pricing/PricingDiscoveryLayout.test.tsx`

Expected: FAIL because the discovery hooks and onboarding copy do not exist yet

- [ ] **Step 3: Write the minimal implementation**

```tsx
// src/pages/QuizzesPage.tsx
<PageShell archetype="discovery" className="quizzes-page">
  <QuizzesHero />
  <QuizFilters />
  <QuizGrid />
  <QuizSupportPanel />
</PageShell>
```

```tsx
// src/components/quizzes/QuizzesHero.tsx
<PageHero
  variant="discovery"
  eyebrow="Reflective check-ins"
  title="Start with the quiz that asks the least from you."
  description="A small set of private check-ins, with one clear place to begin."
>
  <div data-quiz-feature="start-here" className="surface-editorial-panel">
    <p className="feature-label">Start here</p>
    <Link to="/quizzes/emotional-wellbeing-check-in">Emotional wellbeing check-in</Link>
  </div>
</PageHero>
```

```tsx
// src/components/quizzes/QuizFilters.tsx
<section data-quiz-filters="editorial" className="surface-editorial-panel compact-filter-bar">
  ...
</section>
```

```tsx
// src/components/quiz-engine/QuizIntro.tsx
<section className="surface-tool-stage quiz-stage-card">
  <PageSectionIntro
    variant="immersive"
    eyebrow="Before you begin"
    title={quiz.title}
    description={quiz.shortDescription}
  />
  <div className="quiz-intro-expectations">
    <div><span>Time estimate</span><strong>{quiz.estimatedMinutes} minutes</strong></div>
    <div><span>Privacy</span><strong>No sign-in required</strong></div>
    <div><span>What happens next</span><strong>You answer, review, then choose whether to keep the result.</strong></div>
  </div>
  <button ...>Start quiz</button>
</section>
```

```tsx
// src/pages/PricingPage.tsx and src/components/pricing/PricingHero.tsx
<PageShell archetype="discovery" className="pricing-page">
  <PricingHero />
  <FreeCoreSection />
  <UpgradeCatalogue />
  ...
</PageShell>
```

```tsx
// src/components/pricing/FreeCoreSection.tsx
<section data-pricing-flow="free-vs-upgrades" className="surface-editorial-panel">
  <PageSectionIntro
    variant="discovery"
    eyebrow="Free core first"
    title="Use the essentials for free. Add depth only if it helps."
    description="The first decision is simple: stay with the free tools or explore optional upgrades."
  />
  ...
</section>
```

```tsx
// src/components/pricing/PricingConfigurationWarning.tsx
// Keep the warning rendered only when configuration is invalid and visually subordinate it
// with a compact `surface-trust-strip` treatment.
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/quizzes/QuizzesDiscoveryLayout.test.tsx src/components/quiz-engine/QuizIntro.test.tsx src/components/pricing/PricingDiscoveryLayout.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/QuizzesPage.tsx src/components/quizzes/QuizzesHero.tsx src/components/quizzes/QuizFilters.tsx src/components/quizzes/QuizGrid.tsx src/components/quizzes/QuizCard.tsx src/components/quizzes/QuizDisclaimer.tsx src/components/quizzes/QuizSupportPanel.tsx src/pages/IndividualQuizPage.tsx src/components/quiz-engine/QuizIntro.tsx src/pages/PricingPage.tsx src/components/pricing/PricingHero.tsx src/components/pricing/FreeCoreSection.tsx src/components/pricing/UpgradeCatalogue.tsx src/components/pricing/PricingComparisonTable.tsx src/components/pricing/PricingConfigurationWarning.tsx src/components/quizzes/QuizzesDiscoveryLayout.test.tsx src/components/quiz-engine/QuizIntro.test.tsx src/components/pricing/PricingDiscoveryLayout.test.tsx
git commit -m "feat: streamline quizzes and pricing discovery flows"
```

### Task 6: Quiet the editorial and trust pages, then run full regression checks

**Files:**
- Modify: `src/pages/AboutPage.tsx`
- Modify: `src/components/about/AboutHero.tsx`
- Modify: `src/components/about/PlatformDefinition.tsx`
- Modify: `src/components/about/PlatformBoundaries.tsx`
- Modify: `src/components/about/PrivacyPhilosophy.tsx`
- Modify: `src/components/about/AboutClosingSection.tsx`
- Modify: `src/pages/PrivacyPage.tsx`
- Modify: `src/components/privacy/PrivacyHero.tsx`
- Modify: `src/components/privacy/PrivacySummary.tsx`
- Modify: `src/components/privacy/PrivacyRightSidebar.tsx`
- Modify: `src/components/privacy/PrivacyConfigurationWarning.tsx`
- Modify: `src/pages/SupportPage.tsx`
- Modify: `src/components/support/SupportHero.tsx`
- Modify: `src/components/support/DonationSection.tsx`
- Modify: `src/components/support/OtherWaysToSupport.tsx`
- Modify: `src/components/support/FinalSupportMessage.tsx`
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/pages/SafetyResourcesPage.tsx`
- Create: `src/pages/TrustPagesLayout.test.tsx`

**Interfaces:**
- Consumes: `PageShell`, `PageHero`, `TrustStrip`, `surface-editorial-panel`
- Produces: quieter editorial-first compositions for about, privacy, support, contact, and safety resources
- Produces: compact state-aware configuration warnings and fewer simultaneous support widgets

- [ ] **Step 1: Write the failing test**

```tsx
// src/pages/TrustPagesLayout.test.tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import AboutPage from './AboutPage'
import PrivacyPage from './PrivacyPage'
import SupportPage from './SupportPage'

const noop = () => undefined

describe('trust page layouts', () => {
  it('renders editorial shells with quieter support density', () => {
    const aboutHtml = renderToStaticMarkup(
      <MemoryRouter>
        <AboutPage theme="dark" onToggleTheme={noop} />
      </MemoryRouter>,
    )
    const privacyHtml = renderToStaticMarkup(
      <MemoryRouter>
        <PrivacyPage theme="dark" onToggleTheme={noop} />
      </MemoryRouter>,
    )
    const supportHtml = renderToStaticMarkup(
      <MemoryRouter>
        <SupportPage theme="dark" onToggleTheme={noop} />
      </MemoryRouter>,
    )

    expect(aboutHtml).toContain('data-page-archetype="editorial"')
    expect(privacyHtml).toContain('data-page-archetype="editorial"')
    expect(supportHtml).toContain('data-page-archetype="editorial"')
    expect(supportHtml).toContain('Other ways to help')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/pages/TrustPagesLayout.test.tsx`

Expected: FAIL because the page shells and quieter editorial composition are not fully wired through the current trust pages

- [ ] **Step 3: Write the minimal implementation**

```tsx
// src/pages/AboutPage.tsx, src/pages/PrivacyPage.tsx, src/pages/SupportPage.tsx
<PageShell archetype="editorial" className="about-page">...</PageShell>
<PageShell archetype="editorial" className="privacy-page">...</PageShell>
<PageShell archetype="editorial" className="support-page">...</PageShell>
```

```tsx
// src/components/about/AboutHero.tsx
<PageHero
  variant="editorial"
  eyebrow="What Let It Burn is"
  title="Private tools for release, reflection, and quieter recovery."
  description="A paced editorial introduction that explains what the product is, what it is not, and why privacy shapes the experience."
/>
```

```tsx
// src/components/privacy/PrivacyHero.tsx and PrivacySummary.tsx
// Simplify the first screens, move noisy configuration messaging into a compact trust strip,
// and reduce simultaneous side-widget competition.
```

```tsx
// src/components/support/DonationSection.tsx
<section className="surface-tool-stage donation-panel">
  <PageSectionIntro
    variant="editorial"
    eyebrow="Support the quiet core"
    title="If this project helps, support it without pressure."
    description="The donation choice comes earlier; the long narrative moves below the amount chooser."
  />
  ...
</section>
```

```tsx
// src/pages/ContactPage.tsx and src/pages/SafetyResourcesPage.tsx
// Apply the editorial shell, shared hero, and compact trust-strip treatment
// so these routes look like first-class destinations instead of utility pages.
```

- [ ] **Step 4: Run the tests and full regression commands**

Run: `npx vitest run src/pages/TrustPagesLayout.test.tsx && npm run test && npm run build`

Expected: PASS for the trust-page layout test, then a clean full Vitest run, then a successful production build

- [ ] **Step 5: Run the final manual QA sweep**

```bash
npm run dev
```

Expected:
- Verify desktop and mobile layouts on `/`, `/burn-thoughts`, `/relaxing-drawing`, `/sounds`, `/quizzes`, `/quizzes/emotional-wellbeing-check-in`, `/about`, `/pricing`, `/privacy`, `/support`, `/contact`, and `/safety-resources`
- Verify header, footer, and in-page CTA destinations
- Verify keyboard/focus behavior for navigation, accordions, drawing controls, sound controls, and quiz flow
- Verify reduced-motion behavior on immersive pages

- [ ] **Step 6: Commit**

```bash
git add src/pages/AboutPage.tsx src/components/about/AboutHero.tsx src/components/about/PlatformDefinition.tsx src/components/about/PlatformBoundaries.tsx src/components/about/PrivacyPhilosophy.tsx src/components/about/AboutClosingSection.tsx src/pages/PrivacyPage.tsx src/components/privacy/PrivacyHero.tsx src/components/privacy/PrivacySummary.tsx src/components/privacy/PrivacyRightSidebar.tsx src/components/privacy/PrivacyConfigurationWarning.tsx src/pages/SupportPage.tsx src/components/support/SupportHero.tsx src/components/support/DonationSection.tsx src/components/support/OtherWaysToSupport.tsx src/components/support/FinalSupportMessage.tsx src/pages/ContactPage.tsx src/pages/SafetyResourcesPage.tsx src/pages/TrustPagesLayout.test.tsx
git commit -m "feat: complete cinematic trust-page refresh"
```

## Self-Review

- Spec coverage:
  - Shared typography, surface taxonomy, and dark-mode-first rules are covered by Tasks 1-2.
  - Home, Burn Thoughts, Relaxing Drawing, and Sounds are covered by Tasks 3-4.
  - Quizzes, individual quiz onboarding, and Pricing are covered by Task 5.
  - About, Privacy, Support, Contact, Safety Resources, and final QA are covered by Task 6.
- Placeholder scan: no `TBD`, `TODO`, or cross-task “same as above” references remain.
- Type consistency:
  - `PageArchetype` stays `immersive | discovery | editorial` throughout.
  - `PageShell`, `PageHero`, and `TrustStrip` signatures stay consistent across tasks.
