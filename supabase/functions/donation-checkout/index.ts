import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { getSiteUrl, getStripe } from '../_shared/stripe.ts'
import { optionalUser } from '../_shared/supabase.ts'

type CheckoutBody = {
  amount?: number
  amountInMinorUnits?: number
  currency?: string
}

Deno.serve(async (req) => {
  const options = handleOptions(req)
  if (options) return options

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  try {
    const { user, admin } = await optionalUser(req)
    const body = (await req.json()) as CheckoutBody
    const amountInMinorUnits = body.amountInMinorUnits
    const amount = body.amount
    const currency = (body.currency || 'USD').toUpperCase()

    if (!amountInMinorUnits || amountInMinorUnits < 100) {
      return errorResponse('Minimum donation is 100 minor units')
    }

    const siteUrl = getSiteUrl()
    const stripe = getStripe()
    const displayAmount =
      typeof amount === 'number' ? amount : Number((amountInMinorUnits / 100).toFixed(2))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: amountInMinorUnits,
            product_data: {
              name: 'Let It Burn Donation',
              description: `Voluntary donation of ${displayAmount} ${currency}`,
            },
          },
        },
      ],
      success_url: `${siteUrl}/support?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/support?checkout=cancelled`,
      client_reference_id: user?.id,
      customer_email: user?.email ?? undefined,
      metadata: {
        purchaseType: 'donation',
        productId: 'donation',
        userId: user?.id ?? '',
        amount: String(displayAmount),
      },
    })

    const { error } = await admin.from('purchases').insert({
      user_id: user?.id ?? null,
      product_id: 'donation',
      purchase_type: 'donation',
      amount_minor: amountInMinorUnits,
      currency,
      status: 'pending',
      stripe_session_id: session.id,
      metadata: { amount: displayAmount },
    })
    if (error) throw error

    return jsonResponse({
      sessionId: session.id,
      checkoutUrl: session.url,
    })
  } catch (error) {
    console.error('donation-checkout error', error)
    return errorResponse(error instanceof Error ? error.message : 'Checkout failed', 500)
  }
})
