import {
  CircleDollarSign,
  EyeOff,
  Flame,
  HandHeart,
  Heart,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export const IMPACT_ACCENT_COLORS = {
  orange: '#FF7A2F',
  cyan: '#46CAD4',
  purple: '#9A68F5',
  gold: '#F6B93B',
} as const

export const TIER_ACCENT_COLORS = IMPACT_ACCENT_COLORS

const tierIcons: Record<string, LucideIcon> = {
  flame: Flame,
  shield: ShieldCheck,
  heart: Heart,
  'hand-heart': HandHeart,
}

const impactIcons: Record<string, LucideIcon> = {
  flame: Flame,
  server: Server,
  sparkles: Sparkles,
  shield: EyeOff,
}

export function getTierIcon(name: string): LucideIcon {
  return tierIcons[name] ?? CircleDollarSign
}

export function getImpactIcon(name: string): LucideIcon {
  return impactIcons[name] ?? Sparkles
}
