interface QuizPrivacyNoticeProps {
  className?: string
}

export default function QuizPrivacyNotice({ className = '' }: QuizPrivacyNoticeProps) {
  return (
    <p className={`text-sm text-text-muted ${className}`}>
      Your answers stay in this browser session and are cleared when you leave.
    </p>
  )
}
