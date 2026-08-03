import { Link } from 'react-router-dom'

export default function AboutClosingSection() {
  return (
    <section className="about-closing mt-16 text-center md:mt-20" aria-labelledby="closing-heading">
      <h2
        id="closing-heading"
        className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        Use what feels helpful. Leave what does not.
      </h2>
      <p className="mx-auto mt-5 max-w-[640px] text-sm leading-relaxed text-text-muted md:text-base">
        You do not need to complete every tool or understand everything you feel before beginning.
        Choose the smallest action that feels manageable.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/burn-thoughts"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-fire-orange/40 bg-fire-orange/10 px-6 py-3 text-sm font-semibold text-bright-orange transition-colors hover:bg-fire-orange/15"
        >
          Start Releasing
        </Link>
        <Link
          to="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.08]"
        >
          Explore All Tools
        </Link>
      </div>

      <p className="mt-6 text-sm text-text-muted">Take your time.</p>
    </section>
  )
}
