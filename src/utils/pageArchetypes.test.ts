import { describe, expect, it } from 'vitest'
import { getPageArchetype, getPageShellClass } from './pageArchetypes'

describe('pageArchetypes', () => {
  it('maps immersive, discovery, and editorial routes to stable shell types', () => {
    expect(getPageArchetype('/')).toBe('discovery')
    expect(getPageArchetype('/burn-thoughts')).toBe('immersive')
    expect(getPageArchetype('/sounds')).toBe('immersive')
    expect(getPageArchetype('/about')).toBe('editorial')
    expect(getPageShellClass('editorial')).toBe('page-shell page-shell--editorial')
  })
})
