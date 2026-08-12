import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { AuthError, requireUser } from '../_shared/supabase.ts'
import { sha256Hex } from '../_shared/tokens.ts'

type ReportSummary = {
  title?: string
  generatedAt?: string
  totalScore?: number
  rangeLabel?: string
}

type EmailBody = {
  accessToken?: string
  quizId?: string
  recipientEmail?: string
  includeScoreInSubject?: boolean
  reportSummary?: ReportSummary
}

Deno.serve(async (req) => {
  const options = handleOptions(req)
  if (options) return options

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  try {
    const { user, admin } = await requireUser(req)
    const body = (await req.json()) as EmailBody
    const accessToken = body.accessToken?.trim()
    const quizId = body.quizId?.trim()
    const recipientEmail = body.recipientEmail?.trim()
    const includeScoreInSubject = Boolean(body.includeScoreInSubject)
    const summary = body.reportSummary ?? {}

    if (!accessToken || !quizId || !recipientEmail) {
      return errorResponse('accessToken, quizId, and recipientEmail are required')
    }
    if (!recipientEmail.includes('@')) {
      return errorResponse('recipientEmail is invalid')
    }

    const tokenHash = await sha256Hex(accessToken)
    const { data: tokenRow, error: tokenError } = await admin
      .from('report_access_tokens')
      .select('id, user_id, quiz_id')
      .eq('token_hash', tokenHash)
      .maybeSingle()
    if (tokenError) throw tokenError

    if (!tokenRow || tokenRow.user_id !== user.id || tokenRow.quiz_id !== quizId) {
      return errorResponse('Invalid report access token', 403)
    }

    const resendKey = Deno.env.get('RESEND_API_KEY')
    if (!resendKey) {
      return jsonResponse({
        sent: false,
        message:
          'Email delivery is queued pending Resend configuration. Your report access remains available on this page and via PDF download.',
      })
    }

    const fromAddress = Deno.env.get('RESEND_FROM_EMAIL') || 'Let It Burn <reports@letitburn.app>'
    const subjectScore =
      includeScoreInSubject && typeof summary.totalScore === 'number'
        ? ` (score ${summary.totalScore})`
        : ''
    const subject = `${summary.title || 'Your Let It Burn reflection report'}${subjectScore}`

    const html = `
      <div style="font-family: Georgia, serif; color: #1c1917; line-height: 1.5;">
        <h1 style="font-size: 22px;">${summary.title || 'Your reflection report'}</h1>
        <p>Thanks for reflecting with Let It Burn.</p>
        ${
          summary.rangeLabel
            ? `<p><strong>Range:</strong> ${summary.rangeLabel}</p>`
            : ''
        }
        ${
          typeof summary.totalScore === 'number'
            ? `<p><strong>Score:</strong> ${summary.totalScore}</p>`
            : ''
        }
        ${
          summary.generatedAt
            ? `<p><strong>Generated:</strong> ${summary.generatedAt}</p>`
            : ''
        }
        <p>This report is for personal reflection and is not a medical or psychological diagnosis.</p>
        <p>Open Let It Burn to view or download your full report while you still have access on this device.</p>
      </div>
    `

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipientEmail],
        subject,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const detail = await resendResponse.text()
      console.error('Resend error', detail)
      return jsonResponse({
        sent: false,
        message: 'The email could not be sent. Check the address or download the PDF instead.',
      })
    }

    return jsonResponse({
      sent: true,
      message: 'Your report has been sent.',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return errorResponse(error.message, 401)
    }
    console.error('send-quiz-report-email error', error)
    return jsonResponse({
      sent: false,
      message: error instanceof Error ? error.message : 'Email delivery failed',
    })
  }
})
