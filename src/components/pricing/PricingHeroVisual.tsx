import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function PricingHeroVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`pricing-hero-visual relative mx-auto flex h-48 w-full max-w-md items-center justify-center md:h-56 ${
        reducedMotion ? 'pricing-hero-visual--reduced' : ''
      }`}
      aria-hidden="true"
    >
      <div className="pricing-hero-orbit" />
      <div className="pricing-hero-center">
        <div className="pricing-hero-flame" />
      </div>
      <span className="pricing-hero-symbol pricing-hero-symbol--report" />
      <span className="pricing-hero-symbol pricing-hero-symbol--palette" />
      <span className="pricing-hero-symbol pricing-hero-symbol--wave" />
      <span className="pricing-hero-symbol pricing-hero-symbol--shield" />
    </div>
  )
}
