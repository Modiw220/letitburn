import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { fulfillCheckoutSession, type PurchaseRow } from '../_shared/fulfillment.ts'
import { getStripe } from '../_shared/stripe.ts'
import { AuthError, requireUser } from '../_shared/supabase.ts'

type VerifyBody = {
  sessionId?: string
  productId?: string
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
    const productId = body.productId?.trim()

    if (!sessionId || !productId) {
      return errorResponse('sessionId and productId are required')
    }

    const { data: purchase, error } = await admin
      .from('purchases')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .eq('user_id', user.id)
      .maybeSingle()
    if (error) throw error

    let row = purchase as PurchaseRow | null
    let entitlementType: string | undefined
    let expiresAt: string | null | undefined

    if (!row || row.status !== 'completed') {
      const stripe = getStripe()
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status !== 'paid' && session.status !== 'complete') {
        return jsonResponse({
          verified: false,
          errorMessage: 'Upgrade payment is not completed yet.',
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
      entitlementType = fulfilled.entitlementType
      expiresAt = fulfilled.expiresAt
    } else {
      const fulfilled = await fulfillCheckoutSession(admin, {
        id: sessionId,
        payment_intent: row.stripe_payment_intent_id,
        payment_status: 'paid',
      })
      entitlementType = fulfilled.entitlementType
      expiresAt = fulfilled.expiresAt
    }

    if (!row || row.product_id !== productId) {
      return jsonResponse({
        verified: false,
        errorMessage: 'This payment does not match the requested product.',
      })
    }

    if (!entitlementType) {
      const { data: entitlement } = await admin
        .from('entitlements')
        .select('entitlement_type, expires_at')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      entitlementType = entitlement?.entitlement_type
      expiresAt = entitlement?.expires_at ?? null
    }

    return jsonResponse({
      verified: true,
      productId,
      amountMinor: row.amount_minor,
      currency: row.currency,
      entitlementType,
      expiresAt: expiresAt ?? undefined,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return errorResponse(error.message, 401)
    }
    console.error('upgrade-verify error', error)
    return jsonResponse({
      verified: false,
      errorMessage: error instanceof Error ? error.message : 'Verification failed',
    })
  }
})
