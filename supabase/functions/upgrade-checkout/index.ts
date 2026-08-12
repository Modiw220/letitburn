import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { getSiteUrl, getStripe } from '../_shared/stripe.ts'
import { AuthError, requireUser } from '../_shared/supabase.ts'

type CheckoutBody = {
  productId?: string
  expectedPriceMinor?: number
  currency?: string
  packId?: string
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
    const productId = body.productId?.trim()
    const packId = body.packId?.trim() || null
    const currency = (body.currency || 'USD').toUpperCase()

    if (!productId) {
      return errorResponse('productId is required')
    }

    const { data: product, error: productError } = await admin
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('active', true)
      .maybeSingle()
    if (productError) throw productError
    if (!product) {
      return errorResponse('Product not found or inactive', 404)
    }

    let amountMinor = product.amount_minor as number
    let productTitle = product.title as string

    if (packId) {
      const { data: pack, error: packError } = await admin
        .from('content_packs')
        .select('*')
        .eq('id', packId)
        .eq('active', true)
        .maybeSingle()
      if (packError) throw packError
      if (!pack || pack.product_id !== productId) {
        return errorResponse('Pack not found for this product', 404)
      }
      amountMinor = pack.amount_minor
      productTitle = `${product.title}: ${pack.title}`
    }

    if (
      typeof body.expectedPriceMinor === 'number' &&
      body.expectedPriceMinor !== amountMinor
    ) {
      return errorResponse('Price changed. Refresh the page and try again.', 409)
    }

    if (!amountMinor || amountMinor < 1) {
      return errorResponse('Product price is not configured')
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
            unit_amount: amountMinor,
            product_data: {
              name: productTitle,
              metadata: {
                productId,
                ...(packId ? { packId } : {}),
              },
            },
          },
        },
      ],
      success_url: `${siteUrl}/pricing?session_id={CHECKOUT_SESSION_ID}&product_id=${encodeURIComponent(productId)}`,
      cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
      client_reference_id: user.id,
      customer_email: user.email ?? undefined,
      metadata: {
        purchaseType: 'upgrade',
        productId,
        userId: user.id,
        ...(packId ? { packId } : {}),
      },
    })

    const { error } = await admin.from('purchases').insert({
      user_id: user.id,
      product_id: productId,
      purchase_type: 'upgrade',
      amount_minor: amountMinor,
      currency,
      status: 'pending',
      stripe_session_id: session.id,
      metadata: {
        entitlementType: product.entitlement_type,
        ...(packId ? { packId } : {}),
      },
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
    console.error('upgrade-checkout error', error)
    return errorResponse(error instanceof Error ? error.message : 'Checkout failed', 500)
  }
})
