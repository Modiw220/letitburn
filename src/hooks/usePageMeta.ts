import { useEffect, useMemo } from 'react'
import { buildQuizItemListStructuredData } from '../utils/quizStructuredData'

interface PageMetaOptions {
  title: string
  description: string
  canonicalPath: string
  structuredData?: Record<string, unknown>
}

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

export function usePageMeta({
  title,
  description,
  canonicalPath,
  structuredData,
}: PageMetaOptions) {
  useEffect(() => {
    const origin = window.location.origin
    const canonicalUrl = `${origin}${canonicalPath}`

    document.title = title
    upsertMeta('description', description)
    upsertMeta('og:title', title, 'property')
    upsertMeta('og:description', description, 'property')
    upsertMeta('og:url', canonicalUrl, 'property')
    upsertMeta('og:type', 'website', 'property')
    upsertLink('canonical', canonicalUrl)

    const scriptId = 'page-structured-data'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    if (structuredData) {
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    } else if (script) {
      script.remove()
    }

    return () => {
      const existing = document.getElementById(scriptId)
      existing?.remove()
    }
  }, [title, description, canonicalPath, structuredData])
}

export function useQuizzesPageMeta() {
  const structuredData = useMemo(() => buildQuizItemListStructuredData(), [])

  usePageMeta({
    title: 'Free Self-Reflection Quizzes | Let It Burn',
    description:
      'Explore short self-reflection quizzes about emotional wellbeing, stress, burnout, mood, personality, attachment, and relationship patterns.',
    canonicalPath: '/quizzes',
    structuredData,
  })
}
