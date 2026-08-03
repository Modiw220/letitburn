import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useHashNavigation(onHashChange?: (hash: string) => void) {
  const reducedMotion = useReducedMotion()

  const scrollToHash = useCallback(
    (hash: string) => {
      const id = hash.replace(/^#/, '')
      if (!id) return
      const element = document.getElementById(id)
      if (!element) return
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      onHashChange?.(id)
    },
    [onHashChange, reducedMotion],
  )

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      window.requestAnimationFrame(() => scrollToHash(hash))
    }

    const handleHashChange = () => {
      scrollToHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [scrollToHash])

  return { scrollToHash }
}

export function useActivePrivacySection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
