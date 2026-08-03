import { Link } from 'react-router-dom'

export default function AboutSafetySection() {
  return (
    <section
      id="safety"
      className="about-anchor-section mt-16 md:mt-20"
      aria-labelledby="safety-heading"
    >
      <h2 id="safety-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Quiet tools have limits.
      </h2>

      <div className="mt-6 max-w-[720px] space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          Let It Burn can provide a private moment for writing, calming activity, or reflection. It
          cannot assess immediate risk, diagnose a condition, or provide emergency help.
        </p>
        <p>
          If you feel that you may be in immediate danger, contact local emergency services or a
          trusted person who can help you reach appropriate support.
        </p>
      </div>

      <p className="mt-6">
        <Link
          to="/safety-resources"
          className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.06]"
        >
          View Safety Resources
        </Link>
      </p>

      <p className="mt-6 max-w-[720px] text-sm text-text-muted">
        This platform is intended to complement healthy support, not replace it.
      </p>
    </section>
  )
}
