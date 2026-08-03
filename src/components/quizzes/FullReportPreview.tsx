import { BookOpen, Download, FileText, Lightbulb, Sparkles } from 'lucide-react'
import { QUIZ_REPORT_PRICE } from '../../data/quizPricing'

const reportContents = [
  { icon: FileText, text: 'Expanded explanation of the result' },
  { icon: Sparkles, text: 'Breakdown of answer patterns' },
  { icon: Lightbulb, text: 'Key areas to reflect on' },
  { icon: BookOpen, text: 'Practical journaling prompts' },
  { icon: Lightbulb, text: 'Suggested next steps' },
  { icon: Sparkles, text: 'Relevant Let It Burn tools' },
  { icon: Download, text: 'Downloadable PDF when implemented later' },
]

export default function FullReportPreview() {
  return (
    <section
      className="mt-16 md:mt-20"
      aria-labelledby="full-report-heading"
    >
      <h2
        id="full-report-heading"
        className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        What is included in the optional full report?
      </h2>

      <div className="mt-8 rounded-2xl border border-border-card bg-bg-card/60 p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-support-gold/30 bg-support-gold/10 px-3 py-1 text-xs font-medium text-support-gold">
            Available after completing a quiz
          </span>
          <span className="text-sm font-medium text-text-main">
            Optional full report: {QUIZ_REPORT_PRICE.display}
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {reportContents.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm text-text-muted">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-calm-cyan" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-text-muted">
          The report is educational and reflective. It is not a clinical assessment or diagnosis.
        </p>
      </div>
    </section>
  )
}
