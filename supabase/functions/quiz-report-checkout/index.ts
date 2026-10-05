import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { getSiteUrl, getStripe } from '../_shared/stripe.ts'
import { AuthError, requireUser } from '../_shared/supabase.ts'

type CheckoutBody = {
  quizId?: string
  quizSlug?: string
  reportLabel?: string
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
    const { user, admin } = await requireUser(req)
    const body = (await req.json()) as CheckoutBody
    const quizId = body.quizId?.trim()
    const quizSlug = body.quizSlug?.trim()
    const reportLabel = body.reportLabel?.trim() || 'Full Quiz Report'
    const amountInMinorUnits = body.amountInMinorUnits
    const currency = (body.currency || 'USD').toUpperCase()

    if (!quizId || !quizSlug) {
      return errorResponse('quizId and quizSlug are required')
    }
    if (!amountInMinorUnits || amountInMinorUnits < 1) {
      return errorResponse('amountInMinorUnits must be a positive integer')
    }

    const siteUrl = getSiteUrl()
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: amountInMinorUnits,
            product_data: {
              name: reportLabel,
              metadata: { quizId, quizSlug },
            },
          },
        },
      ],
      success_url: `${siteUrl}/quizzes/${quizSlug}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/quizzes/${quizSlug}?checkout=cancelled`,
      client_reference_id: user.id,
      customer_email: user.email ?? undefined,
      metadata: {
        purchaseType: 'quiz_report',
        productId: 'full-quiz-report',
        quizId,
        quizSlug,
        userId: user.id,
      },
    })

    const { error } = await admin.from('purchases').insert({
      user_id: user.id,
      product_id: 'full-quiz-report',
      purchase_type: 'quiz_report',
      amount_minor: amountInMinorUnits,
      currency,
      status: 'pending',
      stripe_session_id: session.id,
      quiz_id: quizId,
      metadata: { quizSlug, reportLabel },
    })
    if (error) throw error

    return jsonResponse({
      sessionId: session.id,
      checkoutUrl: session.url,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return errorResponse(error.message, 401)
    }
    console.error('quiz-report-checkout error', error)
    return errorResponse(error instanceof Error ? error.message : 'Checkout failed', 500)
  }
})
