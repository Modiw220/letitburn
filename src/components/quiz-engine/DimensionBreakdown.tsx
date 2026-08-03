import { useQuizEngine } from '../../hooks/useQuizEngine'
import { DIMENSION_LABELS } from '../../types/quizEngine'
import { getDimensionInterpretationLabel } from '../../utils/interpretDimensionScore'

export default function DimensionBreakdown() {
  const { fullReport } = useQuizEngine()
  if (!fullReport) return null

  return (
    <div className="space-y-6">
      {fullReport.dimensionBreakdowns.map((section) => (
        <section
          key={section.dimension}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
          aria-labelledby={`dimension-${section.dimension}`}
        >
          <h3 id={`dimension-${section.dimension}`} className="font-heading text-lg font-semibold text-text-main">
            {section.title}
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            {section.score} out of {section.maximumScore} ·{' '}
            {getDimensionInterpretationLabel(section.interpretation)}
          </p>
          {section.explanation.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-relaxed text-text-muted">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-sm text-text-main">
            <span className="font-medium">Reflection question:</span> {section.reflectionQuestion}
          </p>
          <p className="mt-2 text-sm text-text-muted">
            <span className="font-medium text-text-main">Practical suggestion:</span>{' '}
            {section.practicalSuggestion}
          </p>
        </section>
      ))}
    </div>
  )
}

export function DimensionSummaryStrip() {
  const { fullReport } = useQuizEngine()
  if (!fullReport) return null

  return (
    <p className="text-sm text-text-muted">
      Strongest current support: {DIMENSION_LABELS[fullReport.strongestDimension]}. Area that may
      need more attention: {DIMENSION_LABELS[fullReport.attentionDimension]}.
    </p>
  )
}
