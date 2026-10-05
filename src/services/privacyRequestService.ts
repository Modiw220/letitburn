import { invokeFunction } from '../lib/invokeFunction'
import type { PrivacyRequestInput, PrivacyRequestResult } from '../types/privacy'

export interface PrivacyRequestService {
  submitRequest(input: PrivacyRequestInput): Promise<PrivacyRequestResult>
}

class SupabasePrivacyRequestService implements PrivacyRequestService {
  async submitRequest(input: PrivacyRequestInput): Promise<PrivacyRequestResult> {
    return invokeFunction<PrivacyRequestResult>(
      'submit-privacy-request',
      {
        email: input.email,
        requestType: input.type,
        details: input.details,
      },
      { requireAuth: true },
    )
  }
}

export function getPrivacyRequestService(): PrivacyRequestService {
  return new SupabasePrivacyRequestService()
}
