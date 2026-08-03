import type { AboutToolLink } from '../types/about'

export const aboutToolLinks: AboutToolLink[] = [
  {
    id: 'burn-thoughts',
    title: 'Burn Your Thoughts',
    moment: 'When something feels stuck in your head.',
    description:
      'Write privately and release the note through a symbolic burning experience.',
    actionLabel: 'Write and Release',
    route: '/burn-thoughts',
    icon: 'flame',
    accent: 'orange',
  },
  {
    id: 'drawing',
    title: 'Relaxing Drawing',
    moment: 'When words feel like too much.',
    description: 'Use color and movement without needing to explain what you feel.',
    actionLabel: 'Start Drawing',
    route: '/relaxing-drawing',
    icon: 'palette',
    accent: 'purple',
  },
  {
    id: 'sounds',
    title: 'Nature Sounds',
    moment: 'When you need steadiness around you.',
    description: 'Choose a simple sound for rest, focus, or a quieter atmosphere.',
    actionLabel: 'Play a Sound',
    route: '/sounds',
    icon: 'volume',
    accent: 'cyan',
  },
  {
    id: 'quizzes',
    title: 'Self-Reflection Quizzes',
    moment: 'When you want to understand a pattern.',
    description:
      'Answer short questions and receive a neutral, non-diagnostic reflection.',
    actionLabel: 'Browse Quizzes',
    route: '/quizzes',
    icon: 'clipboard',
    accent: 'blue',
  },
]
