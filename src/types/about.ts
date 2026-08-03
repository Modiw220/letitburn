export type AboutAccent = 'orange' | 'cyan' | 'purple' | 'gold' | 'blue' | 'green'

export interface AboutFeature {
  id: string
  title: string
  description: string
  icon: string
  accent: AboutAccent
}

export interface PlatformBoundary {
  id: string
  title: string
  description: string
  icon: string
}

export interface PrivacyPrinciple {
  id: string
  title: string
  description: string
  icon: string
}

export interface ProductPrinciple {
  id: string
  title: string
  description: string
}

export interface AboutToolLink {
  id: string
  title: string
  moment: string
  description: string
  actionLabel: string
  route: string
  icon: string
  accent: AboutAccent
}
