import type { PrivacyRequestInput, PrivacyRequestResult } from '../types/privacy'

export interface PrivacyRequestService {
  submitRequest(input: PrivacyRequestInput): Promise<PrivacyRequestResult>
}

export class UnconfiguredPrivacyRequestService implements PrivacyRequestService {
  async submitRequest(): Promise<PrivacyRequestResult> {
    return {
      submitted: false,
      message:
        'Privacy requests are not configured yet. Please use the verified privacy contact method when it becomes available.',
    }
  }
}

export function getPrivacyRequestService(): PrivacyRequestService {
  return new UnconfiguredPrivacyRequestService()
}
