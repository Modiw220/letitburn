import { Link } from 'react-router-dom'

interface QuizSafetyNoticeProps {
  className?: string
}

export default function QuizSafetyNotice({ className = '' }: QuizSafetyNoticeProps) {
  return (
    <p className={`text-sm text-text-muted ${className}`}>
      Let It Burn is not an emergency service.{' '}
      <Link to="/safety-resources" className="text-calm-cyan underline-offset-2 hover:underline">
        If you are worried about your immediate safety, view safety resources.
      </Link>
    </p>
  )
}
