import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import { generateAccessToken, sha256Hex } from './tokens.ts'

export type PurchaseRow = {
  id: string
  user_id: string | null
  product_id: string | null
  purchase_type: string
  amount_minor: number
  currency: string
  status: string
  stripe_session_id: string | null
  stripe_payment_intent_id?: string | null
  quiz_id: string | null
  metadata: Record<string, unknown>
  completed_at?: string | null
}

type ProductRow = {
  id: string
  entitlement_type: string
  duration_days: number | null
}

const BUNDLE_GRANTS: Array<{ productId: string; packId: string | null }> = [
  { productId: 'sound-mixer', packId: null },
  { productId: 'coloring-packs', packId: 'botanical-calm' },
  { productId: 'premium-sounds', packId: 'night-rain' },
  { productId: 'extended-report', packId: null },
]

export async function markPurchaseCompleted(
  admin: SupabaseClient,
  purchaseId: string,
  paymentIntentId?: string | null,
): Promise<void> {
  const { error } = await admin
    .from('purchases')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      ...(paymentIntentId ? { stripe_payment_intent_id: paymentIntentId } : {}),
    })
    .eq('id', purchaseId)
  if (error) throw error
}

export async function createReportAccessToken(
  admin: SupabaseClient,
  input: { userId: string; quizId: string; purchaseId: string | null },
): Promise<string> {
  const raw = generateAccessToken()
  const tokenHash = await sha256Hex(raw)

  if (input.purchaseId) {
    const { data: existing } = await admin
      .from('report_access_tokens')
      .select('id')
      .eq('purchase_id', input.purchaseId)
      .maybeSingle()
    if (existing?.id) {
      const { error } = await admin
        .from('report_access_tokens')
        .update({ token_hash: tokenHash, quiz_id: input.quizId })
        .eq('id', existing.id)
      if (error) throw error
      return raw
    }
  }

  const { error } = await admin.from('report_access_tokens').insert({
    user_id: input.userId,
    quiz_id: input.quizId,
    token_hash: tokenHash,
    purchase_id: input.purchaseId,
  })
  if (error) throw error
  return raw
}

/** Webhook-safe: create once per purchase; do not rotate an existing hash. */
export async function ensureReportAccessTokenRow(
  admin: SupabaseClient,
  input: { userId: string; quizId: string; purchaseId: string },
): Promise<void> {
  const { data: existing } = await admin
    .from('report_access_tokens')
    .select('id')
    .eq('purchase_id', input.purchaseId)
    .maybeSingle()
  if (existing) return

  const raw = generateAccessToken()
  const tokenHash = await sha256Hex(raw)
  const { error } = await admin.from('report_access_tokens').insert({
    user_id: input.userId,
    quiz_id: input.quizId,
    token_hash: tokenHash,
    purchase_id: input.purchaseId,
  })
  if (error) throw error
}

export async function ensureReportAccessToken(
  admin: SupabaseClient,
  input: { userId: string; quizId: string; purchaseId: string | null },
): Promise<string> {
  return createReportAccessToken(admin, input)
}

async function upsertEntitlement(
  admin: SupabaseClient,
  input: {
    userId: string
    productId: string
    entitlementType: string
    packId: string | null
    expiresAt: string | null
    sourcePurchaseId: string
  },
): Promise<void> {
  let query = admin
    .from('entitlements')
    .select('id')
    .eq('user_id', input.userId)
    .eq('product_id', input.productId)
  query = input.packId === null ? query.is('pack_id', null) : query.eq('pack_id', input.packId)
  const { data: existing, error: selectError } = await query.maybeSingle()
  if (selectError) throw selectError

  if (existing?.id) {
    const { error } = await admin
      .from('entitlements')
      .update({
        entitlement_type: input.entitlementType,
        expires_at: input.expiresAt,
        source_purchase_id: input.sourcePurchaseId,
      })
      .eq('id', existing.id)
    if (error) throw error
    return
  }

  const { error } = await admin.from('entitlements').insert({
    user_id: input.userId,
    product_id: input.productId,
    entitlement_type: input.entitlementType,
    pack_id: input.packId,
    expires_at: input.expiresAt,
    source_purchase_id: input.sourcePurchaseId,
  })
  if (error) throw error
}

function expiresAtFromDuration(durationDays: number | null | undefined): string | null {
  if (!durationDays || durationDays <= 0) return null
  const expires = new Date()
  expires.setUTCDate(expires.getUTCDate() + durationDays)
  return expires.toISOString()
}

export async function grantPurchaseEntitlements(
  admin: SupabaseClient,
  purchase: PurchaseRow,
): Promise<{ entitlementType?: string; expiresAt?: string | null }> {
  if (purchase.purchase_type === 'donation') {
    const { data: existing } = await admin
      .from('donations')
      .select('id')
      .eq('purchase_id', purchase.id)
      .maybeSingle()
    if (!existing) {
      const { error } = await admin.from('donations').insert({
        user_id: purchase.user_id,
        purchase_id: purchase.id,
        amount_minor: purchase.amount_minor,
        currency: purchase.currency,
        reference: purchase.stripe_session_id,
      })
      if (error) throw error
    }
    return {}
  }

  if (!purchase.user_id) {
    return {}
  }

  const productId = purchase.product_id
  const packId =
    typeof purchase.metadata?.packId === 'string' ? purchase.metadata.packId : null

  if (purchase.purchase_type === 'quiz_report') {
    const quizId =
      purchase.quiz_id ??
      (typeof purchase.metadata?.quizId === 'string' ? purchase.metadata.quizId : null)
    if (quizId) {
      await ensureReportAccessTokenRow(admin, {
        userId: purchase.user_id,
        quizId,
        purchaseId: purchase.id,
      })
    }
    const sku = productId ?? 'full-quiz-report'
    const { data: product } = await admin
      .from('products')
      .select('id, entitlement_type, duration_days')
      .eq('id', sku)
      .maybeSingle()
    await upsertEntitlement(admin, {
      userId: purchase.user_id,
      productId: sku,
      entitlementType: (product as ProductRow | null)?.entitlement_type ?? 'single-report',
      packId: null,
      expiresAt: null,
      sourcePurchaseId: purchase.id,
    })
    return {
      entitlementType: (product as ProductRow | null)?.entitlement_type ?? 'single-report',
      expiresAt: null,
    }
  }

  if (!productId) {
    return {}
  }

  const { data: product, error: productError } = await admin
    .from('products')
    .select('id, entitlement_type, duration_days')
    .eq('id', productId)
    .maybeSingle()
  if (productError) throw productError
  if (!product) {
    throw new Error(`Unknown product ${productId}`)
  }

  const typed = product as ProductRow
  const expiresAt = expiresAtFromDuration(typed.duration_days)

  if (typed.entitlement_type === 'bundle' || productId === 'relaxation-bundle') {
    for (const grant of BUNDLE_GRANTS) {
      const { data: child } = await admin
        .from('products')
        .select('id, entitlement_type, duration_days')
        .eq('id', grant.productId)
        .maybeSingle()
      await upsertEntitlement(admin, {
        userId: purchase.user_id,
        productId: grant.productId,
        entitlementType: (child as ProductRow | null)?.entitlement_type ?? 'feature-access',
        packId: grant.packId,
        expiresAt: null,
        sourcePurchaseId: purchase.id,
      })
    }
    await upsertEntitlement(admin, {
      userId: purchase.user_id,
      productId,
      entitlementType: 'bundle',
      packId: null,
      expiresAt: null,
      sourcePurchaseId: purchase.id,
    })
    return { entitlementType: 'bundle', expiresAt: null }
  }

  await upsertEntitlement(admin, {
    userId: purchase.user_id,
    productId,
    entitlementType: typed.entitlement_type,
    packId,
    expiresAt,
    sourcePurchaseId: purchase.id,
  })

  if (typed.entitlement_type === 'single-report' || typed.entitlement_type === 'download') {
    const quizId =
      purchase.quiz_id ??
      (typeof purchase.metadata?.quizId === 'string' ? purchase.metadata.quizId : null)
    if (quizId) {
      await ensureReportAccessTokenRow(admin, {
        userId: purchase.user_id,
        quizId,
        purchaseId: purchase.id,
      })
    }
  }

  return { entitlementType: typed.entitlement_type, expiresAt }
}

export async function fulfillCheckoutSession(
  admin: SupabaseClient,
  session: {
    id: string
    payment_intent?: string | { id: string } | null
    payment_status?: string | null
    metadata?: Record<string, string> | null
    amount_total?: number | null
    currency?: string | null
  },
): Promise<{
  purchase: PurchaseRow
  entitlementType?: string
  expiresAt?: string | null
}> {
  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null

  const { data: purchase, error } = await admin
    .from('purchases')
    .select('*')
    .eq('stripe_session_id', session.id)
    .maybeSingle()
  if (error) throw error
  if (!purchase) {
    throw new Error(`No purchase found for session ${session.id}`)
  }

  const row = purchase as PurchaseRow
  if (row.status !== 'completed') {
    await markPurchaseCompleted(admin, row.id, paymentIntentId)
    row.status = 'completed'
    row.completed_at = new Date().toISOString()
    if (paymentIntentId) row.stripe_payment_intent_id = paymentIntentId
  }

  const granted = await grantPurchaseEntitlements(admin, row)
  return { purchase: row, ...granted }
}
