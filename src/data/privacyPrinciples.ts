import type { PrivacyPrinciple } from '../types/about'

export const privacyPrinciples: PrivacyPrinciple[] = [
  {
    id: 'collect-less',
    title: 'Collect less',
    description:
      'Sensitive content should not be stored when the feature does not require storage.',
    icon: 'database-off',
  },
  {
    id: 'require-less',
    title: 'Require less',
    description: 'Core tools should not require an account simply to begin.',
    icon: 'user-off',
  },
  {
    id: 'observe-less',
    title: 'Observe less',
    description:
      'Private writing and quiz answers should not be used for advertising profiles or unnecessary analytics.',
    icon: 'eye-off',
  },
  {
    id: 'clear-intentionally',
    title: 'Clear intentionally',
    description:
      'Content designed to disappear should be removed from active application state when the experience ends.',
    icon: 'trash',
  },
]
