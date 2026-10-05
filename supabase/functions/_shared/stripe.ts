import Stripe from 'https://esm.sh/stripe@14.25.0?target=deno'

let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  const key = Deno.env.get('STRIPE_SECRET_KEY')
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })
  }
  return stripeClient
}

export function getSiteUrl(): string {
  const siteUrl = Deno.env.get('SITE_URL')
  if (!siteUrl) {
    throw new Error('Missing SITE_URL')
  }
  return siteUrl.replace(/\/$/, '')
}
