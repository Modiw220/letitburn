import {
  Leaf,
  ShieldCheck,
  Unlock,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface TrustItemData {
  id: string
  title: string
  text: string
  icon: LucideIcon
  accent: 'cyan' | 'purple' | 'green' | 'orange'
  linkText?: string
  linkHref?: string
}

export const trustItems: TrustItemData[] = [
  {
    id: 'private-safe',
    title: 'Private & Safe',
    text: 'Everything you do stays private and anonymous.',
    icon: ShieldCheck,
    accent: 'cyan',
  },
  {
    id: 'no-signup',
    title: 'No Sign Up',
    text: 'Core features work without an account. Sign in only to restore optional purchases.',
    icon: Unlock,
    accent: 'purple',
  },
  {
    id: 'made-for-you',
    title: 'Made for You',
    text: 'Tools to help you relax, reflect, and feel lighter.',
    icon: Leaf,
    accent: 'green',
  },
  {
    id: 'you-matter',
    title: 'You Matter',
    text: "If you're struggling, please reach out for support.",
    icon: Users,
    accent: 'orange',
    linkText: 'Get Help →',
    linkHref: '/safety-resources',
  },
]
