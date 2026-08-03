import { useCallback, useEffect, useState } from 'react'
import { useBlocker } from 'react-router-dom'

export function useQuizLeaveWarning(shouldWarn: boolean, onConfirmLeave: () => void) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const blocker = useBlocker(shouldWarn)

  useEffect(() => {
    if (!shouldWarn) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [shouldWarn])

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setDialogOpen(true)
    }
  }, [blocker.state])

  const confirmLeave = useCallback(() => {
    setDialogOpen(false)
    onConfirmLeave()
    if (blocker.state === 'blocked') {
      blocker.proceed()
    }
  }, [blocker, onConfirmLeave])

  const stay = useCallback(() => {
    setDialogOpen(false)
    if (blocker.state === 'blocked') {
      blocker.reset()
    }
  }, [blocker])

  const requestLeave = useCallback(() => {
    if (shouldWarn) {
      setDialogOpen(true)
    } else {
      onConfirmLeave()
    }
  }, [onConfirmLeave, shouldWarn])

  return {
    leaveDialogOpen: dialogOpen,
    requestLeave,
    confirmLeave,
    stay,
  }
}
