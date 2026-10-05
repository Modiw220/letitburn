import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import {
  ensureReportAccessToken,
  fulfillCheckoutSession,
  type PurchaseRow,
} from '../_shared/fulfillment.ts'
import { getStripe } from '../_shared/stripe.ts'
import { AuthError, requireUser } from '../_shared/supabase.ts'

type VerifyBody = {
  sessionId?: string
  quizId?: string
}

Deno.serve(async (req) => {
  const options = handleOptions(req)
  if (options) return options

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  try {
    const { user, admin } = await requireUser(req)
    const body = (await req.json()) as VerifyBody
    const sessionId = body.sessionId?.trim()
    const quizId = body.quizId?.trim()

    if (!sessionId || !quizId) {
      return errorResponse('sessionId and quizId are required')
    }

    const { data: purchase, error } = await admin
      .from('purchases')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .eq('user_id', user.id)
      .maybeSingle()
    if (error) throw error

    let row = purchase as PurchaseRow | null

    if (!row || row.status !== 'completed') {
      const stripe = getStripe()
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status !== 'paid' && session.status !== 'complete') {
        return jsonResponse({
          verified: false,
          errorMessage: 'Payment is not completed yet.',
        })
      }
      const fulfilled = await fulfillCheckoutSession(admin, {
        id: session.id,
        payment_intent: session.payment_intent,
        payment_status: session.payment_status,
        metadata: session.metadata,
        amount_total: session.amount_total,
        currency: session.currency,
      })
      row = fulfilled.purchase
    }

    if (!row || row.user_id !== user.id) {
      return jsonResponse({
        verified: false,
        errorMessage: 'Purchase not found for this account.',
      })
    }

    const purchaseQuizId = row.quiz_id ?? quizId
    if (purchaseQuizId !== quizId) {
      return jsonResponse({
        verified: false,
        errorMessage: 'This payment does not match the requested quiz.',
      })
    }

    const accessToken = await ensureReportAccessToken(admin, {
      userId: user.id,
      quizId,
      purchaseId: row.id,
    })

    return jsonResponse({
      verified: true,
      accessToken,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return errorResponse(error.message, 401)
    }
    console.error('quiz-report-verify error', error)
    return jsonResponse({
      verified: false,
      errorMessage: error instanceof Error ? error.message : 'Verification failed',
    })
  }
})
