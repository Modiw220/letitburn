import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import PageHero from './PageHero'
import PageShell from './PageShell'
import TrustStrip from './TrustStrip'

describe('cinematic common primitives', () => {
  it('renders shell and hero data hooks for CSS and page tests', () => {
    const html = renderToStaticMarkup(
      <PageShell archetype="discovery">
        <PageHero
          variant="discovery"
          eyebrow="Start here"
          title="A quieter page shell"
          description="Discovery pages need stronger hierarchy."
        />
        <TrustStrip
          tone="calm"
          items={[{ label: 'Private by default', value: 'No account needed' }]}
        />
      </PageShell>,
    )

    expect(html).toContain('data-page-archetype="discovery"')
    expect(html).toContain('data-hero-variant="discovery"')
    expect(html).toContain('data-trust-tone="calm"')
  })
})
