import { Link } from 'react-router-dom'

export default function SupportSafetyNotice() {
  return (
    <section className="mt-6 text-sm text-text-muted">
      <p>
        Let It Burn provides self-reflection and relaxation tools. It is not therapy, medical care,
        or an emergency service.{' '}
        <Link to="/safety-resources" className="text-calm-cyan underline-offset-2 hover:underline">
          View safety resources
        </Link>
      </p>
    </section>
  )
}
