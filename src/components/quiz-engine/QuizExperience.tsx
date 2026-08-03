import { useQuizEngine } from '../../hooks/useQuizEngine'
import BasicQuizResult from './BasicQuizResult'
import ExitQuizDialog from './ExitQuizDialog'
import FullReflectionReport from './FullReflectionReport'
import PaymentVerification from './PaymentVerification'
import QuizIntro from './QuizIntro'
import QuizPaymentPanel from './QuizPaymentPanel'
import QuizQuestion from './QuizQuestion'
import QuizReview from './QuizReview'
import RestartQuizDialog from './RestartQuizDialog'

function QuizErrorState() {
  const { calculationError, calculateResult, goToQuestionsFromReview } = useQuizEngine()

  return (
    <section className="quiz-stage-card mx-auto max-w-[960px] text-center" role="alert">
      <h2 className="font-heading text-2xl font-semibold text-text-main">Something went wrong</h2>
      <p className="mt-3 text-sm text-text-muted">
        {calculationError ?? 'We could not prepare your result. Please try again.'}
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-5 py-3 text-sm font-semibold text-calm-cyan"
          onClick={calculateResult}
        >
          Try Again
        </button>
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted"
          onClick={goToQuestionsFromReview}
        >
          Review Answers
        </button>
      </div>
    </section>
  )
}

export default function QuizExperience() {
  const { stage, paymentStatus } = useQuizEngine()

  const showPaymentVerification =
    stage === 'payment' &&
    (paymentStatus === 'verifying' || paymentStatus === 'creating-session')

  return (
    <>
      {stage === 'intro' && <QuizIntro />}
      {stage === 'questions' && <QuizQuestion />}
      {stage === 'review' && <QuizReview />}
      {stage === 'basic-result' && <BasicQuizResult />}
      {stage === 'payment' &&
        (showPaymentVerification ? <PaymentVerification /> : <QuizPaymentPanel />)}
      {stage === 'full-report' && <FullReflectionReport />}
      {stage === 'error' && <QuizErrorState />}
      <ExitQuizDialog />
      <RestartQuizDialog />
    </>
  )
}
