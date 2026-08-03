import { useCallback, useEffect, useMemo, useState } from 'react'
import { privacySections } from '../data/privacySections'

const defaultExpanded = new Set([privacySections[0]?.id ?? 'privacy-promise'])

export function usePrivacyAccordions(initialHash?: string) {
  const allIds = useMemo(() => privacySections.map((section) => section.id), [])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(defaultExpanded))
  const [expandAllMode, setExpandAllMode] = useState(false)

  const expandSection = useCallback((id: string) => {
    setExpandedIds((prev) => new Set(prev).add(id))
  }, [])

  const toggleSection = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    setExpandedIds(new Set(allIds))
    setExpandAllMode(true)
  }, [allIds])

  const collapseOptional = useCallback(() => {
    setExpandedIds(new Set(defaultExpanded))
    setExpandAllMode(false)
  }, [])

  const toggleExpandAll = useCallback(() => {
    if (expandAllMode) {
      collapseOptional()
    } else {
      expandAll()
    }
  }, [collapseOptional, expandAll, expandAllMode])

  useEffect(() => {
    if (!initialHash) return
    const id = initialHash.replace(/^#/, '')
    if (allIds.includes(id)) {
      expandSection(id)
    }
  }, [allIds, expandSection, initialHash])

  return {
    expandedIds,
    expandAllMode,
    toggleSection,
    expandSection,
    expandAll,
    collapseOptional,
    toggleExpandAll,
    isExpanded: (id: string) => expandedIds.has(id),
  }
}
