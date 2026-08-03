import { useCallback, useEffect, useState } from 'react'
import { useBlocker } from 'react-router-dom'

export function useUnsavedArtworkWarning(hasArtwork: boolean) {
  const [showDialog, setShowDialog] = useState(false)
  const blocker = useBlocker(hasArtwork)

  useEffect(() => {
    if (!hasArtwork) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasArtwork])

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setShowDialog(true)
    }
  }, [blocker.state])

  const confirmLeave = useCallback(() => {
    setShowDialog(false)
    if (blocker.state === 'blocked') {
      blocker.proceed()
    }
  }, [blocker])

  const cancelLeave = useCallback(() => {
    setShowDialog(false)
    if (blocker.state === 'blocked') {
      blocker.reset()
    }
  }, [blocker])

  return {
    showLeaveDialog: showDialog,
    confirmLeave,
    cancelLeave,
  }
}
