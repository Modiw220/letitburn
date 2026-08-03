import { useQuizEngine } from '../../hooks/useQuizEngine'

export default function CalmingExercises() {
  const { fullReport } = useQuizEngine()
  if (!fullReport) return null

  return (
    <section aria-labelledby="calming-exercises-heading">
      <h3 id="calming-exercises-heading" className="font-heading text-xl font-semibold text-text-main">
        Calming exercises
      </h3>
      <ul className="mt-4 space-y-4">
        {fullReport.exercises.map((exercise) => (
          <li key={exercise.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="font-medium text-text-main">{exercise.title}</p>
            <p className="mt-2 text-sm text-text-muted">{exercise.instructions}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-text-muted">Stop any exercise that feels uncomfortable.</p>
    </section>
  )
}
