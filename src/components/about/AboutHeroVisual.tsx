import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function AboutHeroVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`about-hero-visual relative mx-auto flex h-52 w-full max-w-xs items-center justify-center md:h-60 ${
        reducedMotion ? 'about-hero-visual--reduced' : ''
      }`}
      aria-hidden="true"
    >
      <div className="about-hero-visual-glow" />

      <div className="about-hero-stages flex items-center gap-3 md:gap-5">
        <div className="about-hero-stage about-hero-stage--release">
          <div className="about-hero-note" />
          <span className="about-hero-stage-label">Release</span>
        </div>

        <div className="about-hero-stage-connector" />

        <div className="about-hero-stage about-hero-stage--pause">
          <div className="about-hero-ember" />
          <span className="about-hero-stage-label">Pause</span>
        </div>

        <div className="about-hero-stage-connector" />

        <div className="about-hero-stage about-hero-stage--breathe">
          <div className="about-hero-circle" />
          <span className="about-hero-stage-label">Breathe</span>
        </div>
      </div>
    </div>
  )
}
