import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { fulfillCheckoutSession, type PurchaseRow } from '../_shared/fulfillment.ts'
import { getStripe } from '../_shared/stripe.ts'
import { getServiceRoleClient, optionalUser } from '../_shared/supabase.ts'

type VerifyBody = {
  sessionId?: string
}

Deno.serve(async (req) => {
  const options = handleOptions(req)
  if (options) return options

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  try {
    await optionalUser(req)
    const admin = getServiceRoleClient()
    const body = (await req.json()) as VerifyBody
    const sessionId = body.sessionId?.trim()
    if (!sessionId) {
      return errorResponse('sessionId is required')
    }

    let { data: purchase, error } = await admin
      .from('purchases')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .maybeSingle()
    if (error) throw error

    let row = purchase as PurchaseRow | null

    if (!row || row.status !== 'completed') {
      const stripe = getStripe()
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status !== 'paid' && session.status !== 'complete') {
        return jsonResponse({
          verified: false,
          errorMessage: 'Donation payment is not completed yet.',
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
    } else {
      await fulfillCheckoutSession(admin, {
        id: sessionId,
        payment_intent: row.stripe_payment_intent_id,
        payment_status: 'paid',
      })
    }

    const { data: donation } = await admin
      .from('donations')
      .select('*')
      .eq('purchase_id', row.id)
      .maybeSingle()

    return jsonResponse({
      verified: true,
      amount: Number((row.amount_minor / 100).toFixed(2)),
      currency: row.currency,
      reference: donation?.reference ?? row.stripe_session_id,
      completedAt: row.completed_at ?? donation?.created_at ?? new Date().toISOString(),
    })
  } catch (error) {
    console.error('donation-verify error', error)
    return jsonResponse({
      verified: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : 'We could not verify the donation. Please check with your payment provider before trying again.',
    })
  }
})
