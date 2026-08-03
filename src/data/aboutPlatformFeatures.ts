import type { AboutFeature } from '../types/about'

export const aboutPlatformFeatures: AboutFeature[] = [
  {
    id: 'release',
    title: 'A place to release',
    description: 'Write something you want to let go of and clear it without saving it.',
    icon: 'flame',
    accent: 'orange',
  },
  {
    id: 'pause',
    title: 'A place to pause',
    description: 'Use calming activities when you need less noise and fewer demands.',
    icon: 'wind',
    accent: 'cyan',
  },
  {
    id: 'create',
    title: 'A place to create',
    description: 'Draw or color without needing to be productive or skilled.',
    icon: 'palette',
    accent: 'purple',
  },
  {
    id: 'reflect',
    title: 'A place to reflect',
    description:
      'Use gentle questions to notice patterns without assigning yourself a diagnosis.',
    icon: 'compass',
    accent: 'gold',
  },
]
