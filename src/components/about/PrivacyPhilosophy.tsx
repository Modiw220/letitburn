import { Link } from 'react-router-dom'
import { privacyPrinciples } from '../../data/privacyPrinciples'
import PrivacyPrincipleCard from './PrivacyPrincipleCard'

export default function PrivacyPhilosophy() {
  return (
    <section
      id="privacy"
      className="about-anchor-section mt-16 md:mt-20"
      aria-labelledby="privacy-heading"
    >
      <h2 id="privacy-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Privacy is part of the experience.
      </h2>
      <p className="mt-4 max-w-[720px] text-sm leading-relaxed text-text-muted md:text-base">
        People use these tools during personal moments. Privacy should therefore influence how
        features are designed, not appear later as a legal afterthought.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {privacyPrinciples.map((principle) => (
          <PrivacyPrincipleCard key={principle.id} principle={principle} />
        ))}
      </div>

      <p className="mt-8 max-w-[720px] text-sm leading-relaxed text-text-muted">
        Technical infrastructure may still process limited information needed to deliver and secure
        the website, such as connection data or error information. The goal is to avoid collecting
        sensitive content that is not needed.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <Link
          to="/privacy"
          className="min-h-[44px] inline-flex items-center text-sm text-calm-cyan underline-offset-2 hover:underline"
        >
          Read the Privacy Policy
        </Link>
        <Link
          to="/safety-resources"
          className="min-h-[44px] inline-flex items-center text-sm text-calm-cyan underline-offset-2 hover:underline"
        >
          View Safety Resources
        </Link>
      </div>
    </section>
  )
}
