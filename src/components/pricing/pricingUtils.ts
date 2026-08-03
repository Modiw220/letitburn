import {
  BadgeCheck,
  CalendarOff,
  FileDown,
  Files,
  FileText,
  Headphones,
  PackageOpen,
  Palette,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react'

export const UPGRADE_ACCENT_COLORS = {
  blue: '#668AFF',
  lavender: '#9A68F5',
  gold: '#F6B93B',
  green: '#7FC69A',
  purple: '#9A68F5',
  cyan: '#46CAD4',
  orange: '#FF7A2F',
} as const

const upgradeIcons: Record<string, LucideIcon> = {
  'file-text': FileText,
  files: Files,
  'file-down': FileDown,
  'calendar-off': CalendarOff,
  'badge-check': BadgeCheck,
  palette: Palette,
  'sliders-horizontal': SlidersHorizontal,
  headphones: Headphones,
  'package-open': PackageOpen,
}

export function getUpgradeIcon(name: string): LucideIcon {
  return upgradeIcons[name] ?? FileText
}

export function getBillingLabel(billingType: string, durationDays?: number): string {
  if (billingType === 'time-limited' && durationDays) {
    return `Time-limited one-time · ${durationDays} days`
  }
  if (billingType === 'one-time-per-pack') {
    return 'One-time per pack'
  }
  return 'One-time'
}
