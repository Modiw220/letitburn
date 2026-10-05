import { Headphones } from 'lucide-react'

export default function SoundsHero() {
  const scrollToLibrary = () => {
    document.getElementById('sound-library')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative rounded-[28px] border border-border-card bg-bg-card/40 px-5 py-8 text-center md:px-8 md:py-10"
      aria-labelledby="sounds-hero-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-calm-cyan">
        Calming Sound Space
      </p>
      <h1
        id="sounds-hero-heading"
        className="sounds-intro-heading mx-auto mt-3 max-w-3xl font-heading text-3xl font-semibold leading-tight text-text-main md:text-4xl lg:text-[2.75rem]"
      >
        Find a sound and let the world soften.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-text-muted md:text-base">
        Choose a steady background sound for rest, focus, reflection, or a quieter moment.
      </p>

      <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Headphones className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
          No account needed to listen
        </span>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <span>Play one sound at a time</span>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <span>Your settings stay on this device</span>
      </div>

      <button
        type="button"
        className="mt-8 min-h-[44px] rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.08]"
        onClick={scrollToLibrary}
      >
        Browse sounds
      </button>

      <div className="mt-8 grid gap-3 text-left md:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-text-main">
            For a hard-to-settle room
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Start with rain, waves, or a steady noise bed.
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-text-main">
            For focus without pressure
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Choose one sound and let it stay simple. No mixer needed.
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-text-main">
            For privacy first
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Preferences stay on this device. The sounds do not need an account.
          </p>
        </div>
      </div>
    </section>
  )
}
