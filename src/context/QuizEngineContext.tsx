import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizLeaveWarning } from '../hooks/useQuizLeaveWarning'
import { useQuizPayment } from '../hooks/useQuizPayment'
import { computeBasicResult } from '../hooks/useQuizScoring'
import type { QuizDefinition, QuizAnswer, QuizStage } from '../types/quizEngine'
import { ANSWER_OPTIONS } from '../types/quizEngine'
import type { BasicQuizResult, FullReflectionReport } from '../types/quizResults'
import { buildFullReport } from '../utils/buildFullReport'

export interface QuizEngineContextValue {
  definition: QuizDefinition
  stage: QuizStage
  currentQuestionIndex: number
  currentQuestion: QuizDefinition['questions'][number]
  answers: QuizAnswer[]
  basicResult: BasicQuizResult | null
  fullReport: FullReflectionReport | null
  liveMessage: string
  calculationError: string | null
  isComplete: boolean
  paymentStatus: ReturnType<typeof useQuizPayment>['status']
  paymentError: string | null
  isMockPayment: boolean
  isReportUnlocked: boolean
  accessToken: string | null
  leaveDialogOpen: boolean
  restartDialogOpen: boolean
  exitDialogOpen: boolean
  setAnswer: (questionId: string, value: 0 | 1 | 2 | 3 | 4) => void
  getAnswer: (questionId: string) => 0 | 1 | 2 | 3 | 4 | undefined
  beginQuiz: () => void
  goNext: () => void
  goPrevious: () => void
  goToReview: () => void
  calculateResult: () => void
  goToQuestionsFromReview: () => void
  unlockReport: () => void
  returnToFreeResult: () => void
  startCheckout: () => Promise<void>
  simulateMockPayment: (outcome: 'success' | 'cancelled' | 'failed') => Promise<void>
  requestExit: () => void
  confirmExit: () => void
  cancelExit: () => void
  requestRestart: () => void
  confirmRestart: () => void
  cancelRestart: () => void
  requestLeave: () => void
  confirmLeave: () => void
  stayOnQuiz: () => void
}

const QuizEngineContext = createContext<QuizEngineContextValue | null>(null)

export function QuizEngineProvider({
  definition,
  children,
}: {
  definition: QuizDefinition
  children: ReactNode
}) {
  const navigate = useNavigate()
  const questionHeadingRef = useRef<HTMLHeadingElement>(null)
  const basicResultRef = useRef<BasicQuizResult | null>(null)

  const [stage, setStage] = useState<QuizStage>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [basicResult, setBasicResult] = useState<BasicQuizResult | null>(null)
  const [verifiedReport, setVerifiedReport] = useState<FullReflectionReport | null>(null)
  const [calculationError, setCalculationError] = useState<string | null>(null)
  const [liveMessage, setLiveMessage] = useState('')
  const [exitDialogOpen, setExitDialogOpen] = useState(false)
  const [restartDialogOpen, setRestartDialogOpen] = useState(false)

  const announce = useCallback((message: string) => {
    setLiveMessage(message)
  }, [])

  const resetSensitiveState = useCallback(() => {
    setStage('intro')
    setCurrentQuestionIndex(0)
    setAnswers([])
    setBasicResult(null)
    basicResultRef.current = null
    setVerifiedReport(null)
    setCalculationError(null)
  }, [])

  const payment = useQuizPayment({
    quizId: definition.id,
    quizSlug: definition.slug,
    reportLabel: 'Emotional Wellbeing Full Reflection Report',
    onVerified: () => {
      const result = basicResultRef.current
      if (result) {
        setVerifiedReport(buildFullReport(definition, result))
      }
      setStage('full-report')
    },
    announce,
  })

  const clearAll = useCallback(() => {
    resetSensitiveState()
    payment.resetPayment()
    announce('Quiz answers cleared')
  }, [announce, payment, resetSensitiveState])

  const currentQuestion = definition.questions[currentQuestionIndex]
  const isComplete = answers.length === definition.questions.length

  const fullReport = useMemo(() => {
    if (verifiedReport) return verifiedReport
    if (!basicResult) return null
    return buildFullReport(definition, basicResult)
  }, [basicResult, definition, verifiedReport])

  const shouldWarnLeave =
    (answers.length > 0 || basicResult !== null) &&
    stage !== 'intro' &&
    !payment.isReportUnlocked

  const leaveWarning = useQuizLeaveWarning(shouldWarnLeave, () => {
    clearAll()
    navigate('/quizzes')
  })

  useEffect(() => {
    return () => {
      setAnswers([])
      setBasicResult(null)
      basicResultRef.current = null
      setVerifiedReport(null)
    }
  }, [])

  const setAnswer = useCallback(
    (questionId: string, value: 0 | 1 | 2 | 3 | 4) => {
      const label = ANSWER_OPTIONS.find((o) => o.value === value)?.label ?? ''
      setAnswers((prev) => {
        const existing = prev.find((a) => a.questionId === questionId)
        if (existing) {
          return prev.map((a) =>
            a.questionId === questionId ? { ...a, value } : a,
          )
        }
        return [...prev, { questionId, value }]
      })
      announce(`Answer selected: ${label}`)
    },
    [announce],
  )

  const getAnswer = useCallback(
    (questionId: string) => answers.find((a) => a.questionId === questionId)?.value,
    [answers],
  )

  const focusQuestion = useCallback(() => {
    window.requestAnimationFrame(() => {
      questionHeadingRef.current?.focus()
    })
  }, [])

  const beginQuiz = useCallback(() => {
    setStage('questions')
    setCurrentQuestionIndex(0)
    announce('Question 1 of 12')
    focusQuestion()
  }, [announce, focusQuestion])

  const goNext = useCallback(() => {
    if (currentQuestionIndex < definition.questions.length - 1) {
      const next = currentQuestionIndex + 1
      setCurrentQuestionIndex(next)
      announce(`Question ${next + 1} of ${definition.questions.length}`)
      focusQuestion()
    }
  }, [announce, currentQuestionIndex, definition.questions.length, focusQuestion])

  const goPrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prev = currentQuestionIndex - 1
      setCurrentQuestionIndex(prev)
      announce(`Question ${prev + 1} of ${definition.questions.length}`)
      focusQuestion()
    }
  }, [announce, currentQuestionIndex, definition.questions.length, focusQuestion])

  const goToReview = useCallback(() => setStage('review'), [])
  const goToQuestionsFromReview = useCallback(() => {
    setStage('questions')
    setCurrentQuestionIndex(0)
    focusQuestion()
  }, [focusQuestion])

  const calculateResult = useCallback(() => {
    setCalculationError(null)
    const result = computeBasicResult(definition, answers)
    if (!result) {
      setCalculationError('We could not prepare your result. Please try again.')
      setStage('error')
      return
    }
    setBasicResult(result)
    basicResultRef.current = result
    setStage('basic-result')
    announce('Your free reflection result is ready')
  }, [answers, announce, definition])

  const unlockReport = useCallback(() => setStage('payment'), [])
  const returnToFreeResult = useCallback(() => {
    setStage('basic-result')
    payment.resetPayment()
  }, [payment])

  const requestExit = useCallback(() => setExitDialogOpen(true), [])
  const cancelExit = useCallback(() => setExitDialogOpen(false), [])
  const confirmExit = useCallback(() => {
    setExitDialogOpen(false)
    clearAll()
    navigate('/quizzes')
  }, [clearAll, navigate])

  const requestRestart = useCallback(() => setRestartDialogOpen(true), [])
  const cancelRestart = useCallback(() => setRestartDialogOpen(false), [])
  const confirmRestart = useCallback(() => {
    setRestartDialogOpen(false)
    clearAll()
  }, [clearAll])

  const value = useMemo<QuizEngineContextValue>(
    () => ({
      definition,
      stage,
      currentQuestionIndex,
      currentQuestion,
      answers,
      basicResult,
      fullReport,
      liveMessage,
      calculationError,
      isComplete,
      paymentStatus: payment.status,
      paymentError: payment.errorMessage,
      isMockPayment: payment.isMockMode,
      isReportUnlocked: payment.isReportUnlocked,
      accessToken: payment.accessToken,
      leaveDialogOpen: leaveWarning.leaveDialogOpen,
      restartDialogOpen,
      exitDialogOpen,
      setAnswer,
      getAnswer,
      beginQuiz,
      goNext,
      goPrevious,
      goToReview,
      calculateResult,
      goToQuestionsFromReview,
      unlockReport,
      returnToFreeResult,
      startCheckout: payment.startCheckout,
      simulateMockPayment: payment.simulateMockPayment,
      requestExit,
      confirmExit,
      cancelExit,
      requestRestart,
      confirmRestart,
      cancelRestart,
      requestLeave: leaveWarning.requestLeave,
      confirmLeave: leaveWarning.confirmLeave,
      stayOnQuiz: leaveWarning.stay,
    }),
    [
      definition,
      stage,
      currentQuestionIndex,
      currentQuestion,
      answers,
      basicResult,
      fullReport,
      liveMessage,
      calculationError,
      isComplete,
      payment,
      leaveWarning,
      restartDialogOpen,
      exitDialogOpen,
      setAnswer,
      getAnswer,
      beginQuiz,
      goNext,
      goPrevious,
      goToReview,
      calculateResult,
      goToQuestionsFromReview,
      unlockReport,
      returnToFreeResult,
      requestExit,
      confirmExit,
      cancelExit,
      requestRestart,
      confirmRestart,
      cancelRestart,
    ],
  )

  return (
    <QuizEngineContext.Provider value={value}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
      <h2 ref={questionHeadingRef} tabIndex={-1} className="sr-only">
        {stage === 'questions'
          ? `Question ${currentQuestionIndex + 1} of ${definition.questions.length}`
          : ''}
      </h2>
    </QuizEngineContext.Provider>
  )
}

export function useQuizEngine() {
  const ctx = useContext(QuizEngineContext)
  if (!ctx) throw new Error('useQuizEngine must be used within QuizEngineProvider')
  return ctx
}

export const useQuizNavigation = useQuizEngine
