import { useReducedMotion } from '../../hooks/useReducedMotion'
import burningNoteVisual from '../../assets/hero-burning-note-bowl.png'

export default function HeroBurningNoteVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`hero-burning-note-visual relative mx-auto w-full max-w-[420px] ${
        reducedMotion ? 'hero-burning-note-visual--reduced' : ''
      }`}
      aria-hidden="true"
    >
      <div className="hero-burning-note-glow pointer-events-none absolute inset-0 scale-110" />

      <div className="hero-burning-note-stage relative">
        <img
          src={burningNoteVisual}
          alt=""
          className="hero-burning-note-img relative z-[1] h-auto max-h-[min(440px,52vh)] w-full object-contain"
          loading="eager"
        />

        <span className="hero-burning-note-ember hero-burning-note-ember--1" />
        <span className="hero-burning-note-ember hero-burning-note-ember--2" />
        <span className="hero-burning-note-ember hero-burning-note-ember--3" />
        <span className="hero-burning-note-ember hero-burning-note-ember--4" />
        <span className="hero-burning-note-ember hero-burning-note-ember--5" />
        <span className="hero-burning-note-ember hero-burning-note-ember--6" />
      </div>
    </div>
  )
}
