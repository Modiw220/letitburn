import { ArrowLeft, Clock, ListChecks } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { getQuizBySlug } from '../data/quizzes'
import { usePageMeta } from '../hooks/usePageMeta'

interface QuizComingSoonPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function QuizComingSoonContent() {
  const { quizSlug } = useParams<{ quizSlug: string }>()
  const quiz = quizSlug ? getQuizBySlug(quizSlug) : undefined

  usePageMeta({
    title: quiz
      ? `${quiz.title} | Let It Burn`
      : 'Quiz Not Found | Let It Burn',
    description: quiz
      ? quiz.description
      : 'The requested quiz could not be found.',
    canonicalPath: quiz ? `/quizzes/${quiz.slug}` : '/quizzes',
  })

  if (!quiz) {
    return (
      <main className="content-container py-16 text-center md:py-24">
        <h1 className="font-heading text-3xl font-semibold text-text-main">Quiz not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">
          That quiz is not available yet. Browse the full list to find a reflection quiz that fits
          you.
        </p>
        <Link
          to="/quizzes"
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-text-main transition-colors hover:bg-white/[0.08]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to All Quizzes
        </Link>
      </main>
    )
  }

  return (
    <main className="content-container py-12 md:py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border-card bg-bg-card/70 px-6 py-10 text-center md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-calm-cyan">
          Self-Reflection Quiz
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-text-main">{quiz.title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
          {quiz.description}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          <li className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {quiz.estimatedMinutes} minutes
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            {quiz.questionCount} questions
          </li>
        </ul>

        <p className="mt-8 text-base text-text-main">
          The complete quiz experience will be built next.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Self-reflection only. Not a diagnosis.
        </p>

        <Link
          to="/quizzes"
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/15"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to All Quizzes
        </Link>
      </div>
    </main>
  )
}

export default function QuizComingSoonPage({ theme, onToggleTheme }: QuizComingSoonPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <QuizComingSoonContent />
      <Footer />
    </>
  )
}
