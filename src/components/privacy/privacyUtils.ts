import {
  AudioWaveform,
  Brain,
  Clock,
  Cookie,
  CreditCard,
  EyeOff,
  FileClock,
  Flame,
  Heart,
  LockKeyhole,
  Mail,
  MessageCircle,
  Palette,
  RectangleHorizontal,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from 'lucide-react'

const privacyIcons: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  flame: Flame,
  palette: Palette,
  'audio-waveform': AudioWaveform,
  brain: Brain,
  'credit-card': CreditCard,
  mail: Mail,
  cookie: Cookie,
  'rectangle-ad': RectangleHorizontal,
  'lock-keyhole': LockKeyhole,
  clock: Clock,
  users: Users,
  'file-clock': FileClock,
  'message-circle': MessageCircle,
  heart: Heart,
  'eye-off': EyeOff,
  'sliders-horizontal': SlidersHorizontal,
  settings2: Settings2,
  lock: LockKeyhole,
  leaf: Heart,
}

export const PRIVACY_ACCENT_COLORS = {
  purple: '#9A68F5',
  orange: '#FF7A2F',
  cyan: '#46CAD4',
  blue: '#668AFF',
  gold: '#F6B93B',
} as const

export function getPrivacyIcon(name: string): LucideIcon {
  return privacyIcons[name] ?? ShieldCheck
}
