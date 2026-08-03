export type PageArchetype = 'immersive' | 'discovery' | 'editorial'

const ARCHETYPE_ROUTES: Array<[prefix: string, archetype: PageArchetype]> = [
  ['/burn-thoughts', 'immersive'],
  ['/relaxing-drawing', 'immersive'],
  ['/sounds', 'immersive'],
  ['/quizzes/', 'immersive'],
  ['/quizzes', 'discovery'],
  ['/pricing', 'discovery'],
  ['/about', 'editorial'],
  ['/privacy', 'editorial'],
  ['/support', 'editorial'],
  ['/contact', 'editorial'],
  ['/safety-resources', 'editorial'],
  ['/', 'discovery'],
]

export function getPageArchetype(pathname: string): PageArchetype {
  const match = ARCHETYPE_ROUTES.find(([prefix]) =>
    prefix === '/' ? pathname === '/' : pathname.startsWith(prefix),
  )

  return match?.[1] ?? 'discovery'
}

export function getPageShellClass(archetype: PageArchetype): string {
  return `page-shell page-shell--${archetype}`
}
