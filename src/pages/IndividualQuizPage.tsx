import { useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import QuizExperience from '../components/quiz-engine/QuizExperience'
import { getQuizDefinition, isQuizImplemented } from '../data/quizDefinitions'
import { QuizEngineProvider } from '../context/QuizEngineContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'
import QuizComingSoonPage from './QuizComingSoonPage'

interface IndividualQuizPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function ImplementedQuizContent() {
  const reducedMotion = useReducedMotion()

  return (
    <main
      className={`quiz-individual-page relative py-8 md:py-12 ${
        reducedMotion ? 'quiz-individual-page--reduced' : ''
      }`}
    >
      <div className="quiz-individual-glow" aria-hidden="true" />
      <div className="content-container relative z-[1]">
        <QuizExperience />
      </div>
    </main>
  )
}

export default function IndividualQuizPage({ theme, onToggleTheme }: IndividualQuizPageProps) {
  const { quizSlug = '' } = useParams<{ quizSlug: string }>()
  const definition = getQuizDefinition(quizSlug)
  const implemented = isQuizImplemented(quizSlug)

  usePageMeta({
    title:
      quizSlug === 'emotional-wellbeing-check-in'
        ? 'Emotional Wellbeing Check-In | Let It Burn'
        : definition
          ? `${definition.title} | Let It Burn`
          : 'Quiz Not Found | Let It Burn',
    description:
      quizSlug === 'emotional-wellbeing-check-in'
        ? 'Complete a short private self-reflection check-in about emotions, energy, connection, and recovery. Includes a free basic result.'
        : definition?.introDescription ?? 'Self-reflection quiz on Let It Burn.',
    canonicalPath: `/quizzes/${quizSlug}`,
  })

  if (!definition || !implemented) {
    return <QuizComingSoonPage theme={theme} onToggleTheme={onToggleTheme} />
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <QuizEngineProvider definition={definition}>
        <ImplementedQuizContent />
      </QuizEngineProvider>
      <Footer />
    </>
  )
}
