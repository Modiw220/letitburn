import type { PrivacyRightGroup } from '../types/privacy'

export const privacyRightsGroups: PrivacyRightGroup[] = [
  {
    id: 'eea-uk',
    region: 'European Economic Area, United Kingdom, and similar regions',
    introduction:
      'Depending on applicable law and the circumstances, you may have some or all of the following rights:',
    rights: [
      'Access to personal information',
      'Correction of inaccurate information',
      'Deletion in certain circumstances',
      'Restriction of processing',
      'Objection to certain processing',
      'Data portability where applicable',
      'Withdrawal of consent where processing is consent-based',
      'Complaint to a supervisory authority',
    ],
    notes: [
      'Exercising a right may require identity verification.',
      'Some information may need to be retained for legal, security, or accounting reasons.',
    ],
  },
  {
    id: 'california-us',
    region: 'California and certain other United States jurisdictions',
    introduction:
      'Depending on applicable law and the circumstances, residents may have rights such as:',
    rights: [
      'Know or access personal information',
      'Correct inaccurate personal information',
      'Delete personal information in certain circumstances',
      'Opt out of sale or sharing where applicable',
      'Limit certain uses of sensitive personal information where applicable',
      'Non-discrimination for exercising privacy rights',
    ],
    notes: [
      'We do not sell private notes or quiz-answer content.',
      'Available rights and response timelines depend on the law that applies to your request.',
    ],
  },
  {
    id: 'other-regions',
    region: 'Other regions',
    introduction: 'Other privacy rights may apply based on your country or state.',
    rights: [],
    notes: [
      'Contact us using the verified privacy contact method when it is available.',
      'We will respond according to applicable law and operational capacity.',
    ],
  },
]
