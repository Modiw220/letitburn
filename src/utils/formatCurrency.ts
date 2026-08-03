export function formatCurrency(amount: number, currency: 'USD' = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCurrencyWithCode(amount: number, currency: 'USD' = 'USD'): string {
  return `${formatCurrency(amount, currency)} ${currency}`
}
