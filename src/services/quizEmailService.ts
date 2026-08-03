import type { FullReflectionReport } from '../types/quizResults'

export interface EmailReportInput {
  accessToken: string
  quizId: string
  recipientEmail: string
  includeScoreInSubject: boolean
  report: FullReflectionReport
}

export interface EmailReportResult {
  sent: boolean
  message: string
}

export function isEmailDeliveryConfigured(): boolean {
  return Boolean(import.meta.env.VITE_QUIZ_EMAIL_API)
}

export async function sendQuizReportEmail(
  input: EmailReportInput,
): Promise<EmailReportResult> {
  if (!isEmailDeliveryConfigured()) {
    return {
      sent: false,
      message: 'Email delivery is not configured yet. You can still download your PDF.',
    }
  }

  const response = await fetch(import.meta.env.VITE_QUIZ_EMAIL_API as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: input.accessToken,
      quizId: input.quizId,
      recipientEmail: input.recipientEmail,
      includeScoreInSubject: input.includeScoreInSubject,
      reportSummary: {
        title: 'Emotional Wellbeing Full Reflection Report',
        generatedAt: input.report.generatedAt,
        totalScore: input.report.basicResult.totalScore,
        rangeLabel: input.report.basicResult.range.label,
      },
    }),
  })

  if (!response.ok) {
    return {
      sent: false,
      message: 'The email could not be sent. Check the address or download the PDF instead.',
    }
  }

  return { sent: true, message: 'Your report has been sent.' }
}
