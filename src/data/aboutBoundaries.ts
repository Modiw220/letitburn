import type { PlatformBoundary } from '../types/about'

export const aboutBoundaries: PlatformBoundary[] = [
  {
    id: 'not-diagnostic',
    title: 'Not a diagnostic service',
    description:
      'The website does not determine whether you have a medical or psychological condition.',
    icon: 'stethoscope-off',
  },
  {
    id: 'not-therapy',
    title: 'Not therapy',
    description:
      'The tools do not replace a therapist, doctor, counsellor, or other qualified professional.',
    icon: 'message-off',
  },
  {
    id: 'not-emergency',
    title: 'Not emergency support',
    description:
      'The website is not designed to respond to immediate danger or crisis situations.',
    icon: 'alert',
  },
  {
    id: 'not-social',
    title: 'Not a social network',
    description:
      'Your release does not need likes, comments, followers, or public validation.',
    icon: 'users',
  },
]
