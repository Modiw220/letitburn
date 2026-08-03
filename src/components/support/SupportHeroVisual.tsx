import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function SupportHeroVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`support-hero-visual relative mx-auto flex h-56 w-full max-w-sm items-center justify-center md:h-64 ${
        reducedMotion ? 'support-hero-visual--reduced' : ''
      }`}
      aria-hidden="true"
    >
      <div className="support-hero-glow" />
      <div className="support-hero-hands relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <div className="support-hero-flame flex h-16 w-16 items-center justify-center rounded-full bg-fire-orange/20">
          <div className="h-8 w-8 rounded-full bg-gradient-to-t from-fire-orange to-bright-orange shadow-[0_0_24px_rgba(255,122,47,0.45)]" />
        </div>
      </div>
      <span className="support-ember support-ember--1" />
      <span className="support-ember support-ember--2" />
      <span className="support-ember support-ember--3" />
    </div>
  )
}
