import { Brain, CircleDot } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function QuizzesHero() {
  const reducedMotion = useReducedMotion()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative text-center" aria-labelledby="quizzes-hero-heading">
      <div
        className={`quizzes-hero-visual mx-auto mb-8 flex h-36 w-36 items-center justify-center md:h-44 md:w-44 ${
          reducedMotion ? 'quizzes-hero-visual--reduced' : ''
        }`}
        aria-hidden="true"
      >
        <div className="quizzes-hero-orbit quizzes-hero-orbit--1" />
        <div className="quizzes-hero-orbit quizzes-hero-orbit--2" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Brain className="h-9 w-9 text-accent-purple/80" strokeWidth={1.25} />
        </div>
        <span className="quizzes-hero-dot quizzes-hero-dot--1">
          <CircleDot className="h-3 w-3 text-calm-cyan/70" />
        </span>
        <span className="quizzes-hero-dot quizzes-hero-dot--2">?</span>
        <span className="quizzes-hero-dot quizzes-hero-dot--3">?</span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-calm-cyan">
        Self-Reflection Quizzes
      </p>
      <h1
        id="quizzes-hero-heading"
        className="quizzes-intro-heading mx-auto mt-3 max-w-3xl font-heading text-3xl font-semibold leading-tight text-text-main md:text-4xl lg:text-[2.75rem]"
      >
        Understand yourself a little better.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-text-muted md:text-base">
        Short, thoughtful quizzes designed to help you notice patterns, reflect on how you feel,
        and decide what may support you next.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          className="btn-primary-glow min-h-[48px] w-full rounded-xl border border-fire-orange/40 bg-fire-orange/15 px-6 py-3 text-sm font-semibold text-bright-orange transition-transform hover:-translate-y-0.5 sm:w-auto"
          onClick={() => scrollTo('quiz-list')}
        >
          Browse All Quizzes
        </button>
        <button
          type="button"
          className="min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.08] sm:w-auto"
          onClick={() => scrollTo('how-it-works')}
        >
          How It Works
        </button>
      </div>
    </section>
  )
}
