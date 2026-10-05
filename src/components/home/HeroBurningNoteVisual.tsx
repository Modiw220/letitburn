import { useReducedMotion } from '../../hooks/useReducedMotion'
import burningNotePng from '../../assets/hero-burning-note-bowl.png'

const burningNoteWebp = Object.values(
  import.meta.glob<string>('../../assets/hero-burning-note-bowl.webp', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)[0]

const heroBurnImageClassName = 'hero-burning-note-img'

function HeroBurnMedia() {
  if (burningNoteWebp) {
    return (
      <picture className="hero-burning-note-media">
        <source srcSet={burningNoteWebp} type="image/webp" />
        <img
          src={burningNotePng}
          alt=""
          className={heroBurnImageClassName}
          loading="eager"
          decoding="async"
        />
      </picture>
    )
  }

  return (
    <img
      src={burningNotePng}
      alt=""
      className={heroBurnImageClassName}
      loading="eager"
      decoding="async"
    />
  )
}

export default function HeroBurningNoteVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`hero-burning-note-visual relative mx-auto w-full max-w-[min(100%,540px)] ${
        reducedMotion ? 'hero-burning-note-visual--reduced' : ''
      }`}
      aria-hidden="true"
    >
      <div className="hero-burning-note-glow pointer-events-none absolute inset-0 scale-110" />

      <div className="hero-burning-note-stage relative">
        <HeroBurnMedia />

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
