import { QUIZ_REPORT_PRICE } from '../data/quizPricing'

export function formatQuizPrice(amount?: number, currency: 'USD' = 'USD'): string {
  if (amount === undefined || amount === QUIZ_REPORT_PRICE.amount) {
    return QUIZ_REPORT_PRICE.display
  }

  if (currency === 'USD') {
    return `$${amount}`
  }

  return `${amount} ${currency}`
}
