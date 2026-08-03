import {
  AlertTriangle,
  ClipboardList,
  Compass,
  Database,
  EyeOff,
  Flame,
  MessageSquareOff,
  Palette,
  Stethoscope,
  Trash2,
  UserRoundX,
  Users,
  Volume2,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import type { AboutAccent } from '../../types/about'

export const ABOUT_ACCENT_COLORS: Record<AboutAccent, string> = {
  orange: '#FF7A2F',
  cyan: '#46CAD4',
  purple: '#9A68F5',
  gold: '#F6B93B',
  blue: '#668AFF',
  green: '#7FC69A',
}

const aboutIcons: Record<string, LucideIcon> = {
  flame: Flame,
  wind: Wind,
  palette: Palette,
  compass: Compass,
  'stethoscope-off': Stethoscope,
  'message-off': MessageSquareOff,
  alert: AlertTriangle,
  users: Users,
  'database-off': Database,
  'user-off': UserRoundX,
  'eye-off': EyeOff,
  trash: Trash2,
  volume: Volume2,
  clipboard: ClipboardList,
}

export function getAboutIcon(name: string): LucideIcon {
  return aboutIcons[name] ?? Compass
}
