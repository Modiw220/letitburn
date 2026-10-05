import { Link } from 'react-router-dom'
import AboutHeroVisual from './AboutHeroVisual'
import AboutPullQuote from './AboutPullQuote'

export default function AboutHero() {
  const scrollToPrivacy = () => {
    document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-calm-cyan">
            About Let It Burn
          </p>
          <h1
            id="about-hero-heading"
            className="mt-3 font-heading text-3xl font-semibold leading-tight text-text-main md:text-4xl"
          >
            A private place to release, reset, and reflect.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-text-muted md:text-base">
            Let It Burn is a collection of simple tools for moments when your thoughts feel crowded,
            your energy feels low, or you need a quiet activity without creating an account or
            explaining yourself.
          </p>

          <div className="mt-8">
            <AboutPullQuote>
              We are not here to diagnose you. We are here to give you a private moment to breathe.
            </AboutPullQuote>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/10 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/15"
            >
              Explore the Tools
            </Link>
            <button
              type="button"
              className="min-h-[48px] rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.08]"
              onClick={scrollToPrivacy}
            >
              Read Our Privacy Approach
            </button>
          </div>

          <p className="mt-5 text-sm text-text-muted">
            No account is required for core release and relaxation tools. An account is only needed for purchases and restore.
          </p>
        </div>

        <AboutHeroVisual />
      </div>
    </section>
  )
}
