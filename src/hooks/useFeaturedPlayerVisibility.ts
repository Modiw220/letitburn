import { useEffect, useState, type RefObject } from 'react'

export function useFeaturedPlayerVisibility(featuredRef: RefObject<HTMLElement | null>) {
  const [isFeaturedVisible, setIsFeaturedVisible] = useState(true)

  useEffect(() => {
    const element = featuredRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeaturedVisible(entry.isIntersecting)
      },
      { threshold: 0.15, rootMargin: '-40px 0px 0px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [featuredRef])

  return isFeaturedVisible
}
