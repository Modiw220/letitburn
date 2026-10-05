import { invokeFunction } from '../lib/invokeFunction'
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
  return Boolean(import.meta.env.VITE_SUPABASE_URL)
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

  try {
    return await invokeFunction<EmailReportResult>(
      'send-quiz-report-email',
      {
        accessToken: input.accessToken,
        quizId: input.quizId,
        recipientEmail: input.recipientEmail,
        includeScoreInSubject: input.includeScoreInSubject,
        reportSummary: {
          title: `${input.report.quizTitle} Full Reflection Report`,
          generatedAt: input.report.generatedAt,
          totalScore: input.report.basicResult.totalScore,
          rangeLabel: input.report.basicResult.range.label,
        },
      },
      { requireAuth: true },
    )
  } catch (error) {
    return {
      sent: false,
      message:
        error instanceof Error
          ? error.message
          : 'The email could not be sent. Check the address or download the PDF instead.',
    }
  }
}
