import { errorResponse, jsonResponse } from '../_shared/cors.ts'
import { fulfillCheckoutSession } from '../_shared/fulfillment.ts'
import { getStripe } from '../_shared/stripe.ts'
import { getServiceRoleClient } from '../_shared/supabase.ts'

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  if (!webhookSecret) {
    return errorResponse('Missing STRIPE_WEBHOOK_SECRET', 500)
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return errorResponse('Missing stripe-signature header', 400)
  }

  try {
    const stripe = getStripe()
    const body = await req.text()
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as {
        id: string
        payment_intent?: string | { id: string } | null
        payment_status?: string | null
        metadata?: Record<string, string> | null
        amount_total?: number | null
        currency?: string | null
      }

      const admin = getServiceRoleClient()
      await fulfillCheckoutSession(admin, session)
    }

    return jsonResponse({ received: true })
  } catch (error) {
    console.error('stripe-webhook error', error)
    return errorResponse(
      error instanceof Error ? error.message : 'Webhook handler failed',
      400,
    )
  }
})
