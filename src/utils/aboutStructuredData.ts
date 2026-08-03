export function buildAboutPageStructuredData(origin?: string) {
  const base = origin ?? (typeof window !== 'undefined' ? window.location.origin : '')
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Let It Burn',
    description:
      'Learn what Let It Burn is, why anonymous emotional release matters, and how the platform approaches privacy, safety, and self-reflection.',
    url: `${base}/about`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Let It Burn',
    },
  }
}
