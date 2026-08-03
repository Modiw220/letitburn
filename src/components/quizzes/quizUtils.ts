import {
  BatteryLow,
  Cloud,
  CloudRain,
  Gauge,
  HeartHandshake,
  HeartPulse,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { QuizAccent, QuizCategory, QuizIconName } from '../../types/quizzes'
import { getCategoryLabel } from '../../data/quizCategories'

export const QUIZ_ACCENT_COLORS: Record<QuizAccent, string> = {
  cyan: '#46CAD4',
  blue: '#668AFF',
  orange: '#FF8124',
  purple: '#9A68F5',
  'muted-blue': '#6F8FAF',
  lavender: '#B49AF5',
  pink: '#E695B2',
  green: '#7FC69A',
}

const iconMap: Record<QuizIconName, LucideIcon> = {
  'heart-pulse': HeartPulse,
  gauge: Gauge,
  'battery-low': BatteryLow,
  cloud: Cloud,
  'cloud-rain': CloudRain,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  users: Users,
}

export function getQuizIcon(icon: QuizIconName): LucideIcon {
  return iconMap[icon]
}

export function formatQuizCategoryBadge(category: QuizCategory): string {
  return getCategoryLabel(category).toUpperCase()
}
