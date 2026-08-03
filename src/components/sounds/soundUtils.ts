import {
  AudioWaveform,
  CloudLightning,
  CloudRain,
  Coffee,
  Flame,
  Radio,
  Trees,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import type { SoundAccent } from '../../types/sounds'

const iconMap: Record<SoundAccent, LucideIcon> = {
  rain: CloudRain,
  ocean: Waves,
  fireplace: Flame,
  forest: Trees,
  thunderstorm: CloudLightning,
  'brown-noise': AudioWaveform,
  'pink-noise': Radio,
  cafe: Coffee,
}

export function getSoundIcon(accent: SoundAccent): LucideIcon {
  return iconMap[accent]
}

export function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}
