import { errorResponse, handleOptions, jsonResponse } from '../_shared/cors.ts'
import { getServiceRoleClient, optionalUser } from '../_shared/supabase.ts'

type ContactBody = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

Deno.serve(async (req) => {
  const options = handleOptions(req)
  if (options) return options

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  try {
    const { user } = await optionalUser(req)
    const admin = getServiceRoleClient()
    const body = (await req.json()) as ContactBody
    const name = body.name?.trim() || null
    const email = body.email?.trim()
    const subject = body.subject?.trim() || null
    const message = body.message?.trim()

    if (!email || !email.includes('@')) {
      return errorResponse('A valid email is required')
    }
    if (!message) {
      return errorResponse('message is required')
    }

    const { data, error } = await admin
      .from('contact_messages')
      .insert({
        user_id: user?.id ?? null,
        name,
        email,
        subject,
        message,
      })
      .select('id')
      .single()
    if (error) throw error

    return jsonResponse({
      submitted: true,
      id: data.id,
      message: 'Thanks. Your message has been received.',
    })
  } catch (error) {
    console.error('submit-contact error', error)
    return errorResponse(error instanceof Error ? error.message : 'Unable to submit message', 500)
  }
})
