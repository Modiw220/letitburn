import SupportHeroVisual from './SupportHeroVisual'

export default function SupportHero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12" aria-labelledby="support-hero-heading">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-support-gold">
          Support This Space
        </p>
        <h1
          id="support-hero-heading"
          className="mt-3 font-heading text-3xl font-semibold leading-tight text-text-main md:text-4xl lg:text-[2.75rem]"
        >
          Help keep this quiet place open.
        </h1>
        <p className="mt-5 text-base font-medium leading-relaxed text-text-main md:text-lg">
          Keep the private tools available before the donation question ever appears.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
          Let It Burn was built for quiet moments: to write, release, breathe, draw, listen, or
          reflect without explaining yourself first.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn-primary-glow min-h-[48px] rounded-xl border border-fire-orange/40 bg-fire-orange/15 px-6 py-3 text-sm font-semibold text-bright-orange transition-transform hover:-translate-y-0.5"
            onClick={() => scrollTo('donate')}
          >
            Choose an Amount
          </button>
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.08]"
            onClick={() => scrollTo('impact')}
          >
            See What Donations Support
          </button>
        </div>

        <p className="mt-5 text-sm text-text-muted">
          Donating is optional. The core emotional-release tools are intended to remain accessible.
        </p>
      </div>

      <SupportHeroVisual />
    </section>
  )
}
