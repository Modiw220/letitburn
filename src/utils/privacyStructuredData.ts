export function buildPrivacyStructuredData(origin?: string) {
  const base = origin ?? (typeof window !== 'undefined' ? window.location.origin : '')
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Privacy Policy | Let It Burn',
    description:
      'Learn how Let It Burn handles private notes, drawings, sound preferences, quiz answers, payments, reports, cookies, advertising, and privacy rights.',
    url: `${base}/privacy`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Let It Burn',
    },
  }
}
