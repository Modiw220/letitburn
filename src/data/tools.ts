import { Brain, Flame, Palette, AudioLines, type LucideIcon } from 'lucide-react'

export interface ToolCardData {
  id: string
  title: string
  description: string
  linkText: string
  href: string
  icon: LucideIcon
  accent: 'orange' | 'purple' | 'cyan' | 'blue'
}

export const tools: ToolCardData[] = [
  {
    id: 'burn-thoughts',
    title: 'Burn Your Thoughts',
    description:
      'Write whatever is on your mind and watch it disappear. Release. Let go. Breathe.',
    linkText: 'Start Releasing',
    href: '/burn-thoughts',
    icon: Flame,
    accent: 'orange',
  },
  {
    id: 'relaxing-drawing',
    title: 'Relaxing Drawing',
    description:
      'Color, draw, and create something beautiful. Give your mind room to slow down.',
    linkText: 'Start Drawing',
    href: '/relaxing-drawing',
    icon: Palette,
    accent: 'purple',
  },
  {
    id: 'sounds',
    title: 'White Noise',
    description:
      'Calming sounds for sleep, focus, reflection, or simply feeling better.',
    linkText: 'Play Sounds',
    href: '/sounds',
    icon: AudioLines,
    accent: 'cyan',
  },
  {
    id: 'quizzes',
    title: 'Self-Reflection Quizzes',
    description:
      'Discover more about yourself through thoughtful, science-informed quizzes.',
    linkText: 'Take a Quiz',
    href: '/quizzes',
    icon: Brain,
    accent: 'blue',
  },
]
