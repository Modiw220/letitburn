import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { AuthError, requireUser } from '../_shared/supabase.ts'

type PrivacyBody = {
  email?: string
  requestType?: string
  details?: string
}

Deno.serve(async (req) => {
  const options = handleOptions(req)
  if (options) return options

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  try {
    const { user, admin } = await requireUser(req)
    const body = (await req.json()) as PrivacyBody
    const email = body.email?.trim()
    const requestType = body.requestType?.trim()
    const details = body.details?.trim() || null

    if (!email || !email.includes('@')) {
      return errorResponse('A valid email is required')
    }
    if (!requestType) {
      return errorResponse('requestType is required')
    }

    const { data, error } = await admin
      .from('privacy_requests')
      .insert({
        user_id: user.id,
        email,
        request_type: requestType,
        details,
        status: 'received',
      })
      .select('id')
      .single()
    if (error) throw error

    return jsonResponse({
      submitted: true,
      reference: data.id,
      message: 'Your privacy request has been received.',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return errorResponse(error.message, 401)
    }
    console.error('submit-privacy-request error', error)
    return errorResponse(
      error instanceof Error ? error.message : 'Unable to submit privacy request',
      500,
    )
  }
})
