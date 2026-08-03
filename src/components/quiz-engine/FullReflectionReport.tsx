import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import { generateQuizPdf } from '../../hooks/useQuizPdf'
import { isEmailDeliveryConfigured } from '../../services/quizEmailService'
import CalmingExercises from './CalmingExercises'
import DimensionBreakdown, { DimensionSummaryStrip } from './DimensionBreakdown'
import QuizDisclaimer from './QuizDisclaimer'
import QuizEmailDelivery from './QuizEmailDelivery'
import QuizPdfDownload from './QuizPdfDownload'
import QuizSafetyNotice from './QuizSafetyNotice'
import ReflectionPrompts from './ReflectionPrompts'

export default function FullReflectionReport() {
  const { fullReport, requestRestart, isReportUnlocked, accessToken } = useQuizEngine()
  const [pdfError, setPdfError] = useState<string | null>(null)
  const [liveMessage, setLiveMessage] = useState('')

  if (!fullReport || !isReportUnlocked) return null

  const handleDownload = () => {
    try {
      setPdfError(null)
      generateQuizPdf(fullReport)
      setLiveMessage('PDF downloaded')
    } catch {
      setPdfError('The PDF could not be created. Your report is still available on this page.')
    }
  }

  return (
    <section className="mx-auto max-w-[960px]" aria-labelledby="full-report-heading">
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>

      <div className="quiz-stage-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-support-gold">
          Full Reflection Report
        </p>
        <h2 id="full-report-heading" className="mt-2 font-heading text-2xl font-semibold text-text-main md:text-3xl">
          Emotional Wellbeing Check-In
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">{fullReport.summary}</p>
        <DimensionSummaryStrip />

        <div className="mt-8 space-y-10">
          <DimensionBreakdown />
          <ReflectionPrompts />
          <CalmingExercises />

          <section aria-labelledby="suggested-tools-heading">
            <h3 id="suggested-tools-heading" className="font-heading text-xl font-semibold text-text-main">
              Suggested Let It Burn tools
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/burn-thoughts" className="text-calm-cyan hover:underline">
                  Write and Release
                </Link>
              </li>
              <li>
                <Link to="/sounds" className="text-calm-cyan hover:underline">
                  Listen to a Calming Sound
                </Link>
              </li>
              <li>
                <Link to="/relaxing-drawing" className="text-calm-cyan hover:underline">
                  Try Relaxing Drawing
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <QuizDisclaimer className="mt-8" />
        <QuizSafetyNotice className="mt-4" />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <QuizPdfDownload onDownload={handleDownload} error={pdfError} />
        </div>

        <QuizEmailDelivery
          report={fullReport}
          onAnnounce={setLiveMessage}
          emailConfigured={isEmailDeliveryConfigured()}
          accessToken={accessToken}
        />

        <button
          type="button"
          className="mt-8 text-sm text-text-muted transition-colors hover:text-text-main"
          onClick={requestRestart}
        >
          Take the Check-In Again
        </button>
      </div>
    </section>
  )
}
