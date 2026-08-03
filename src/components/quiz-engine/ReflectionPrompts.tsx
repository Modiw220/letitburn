import { useQuizEngine } from '../../hooks/useQuizEngine'

export default function ReflectionPrompts() {
  const { fullReport } = useQuizEngine()
  if (!fullReport) return null

  return (
    <section aria-labelledby="reflection-prompts-heading">
      <h3 id="reflection-prompts-heading" className="font-heading text-xl font-semibold text-text-main">
        Personalized reflection prompts
      </h3>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-text-muted">
        {fullReport.prompts.map((prompt) => (
          <li key={prompt}>{prompt}</li>
        ))}
      </ol>
    </section>
  )
}
