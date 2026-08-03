import { useCallback, useEffect, useRef, useState } from 'react'
import type { BurnStage } from '../types/burn'

interface UseBurnSequenceOptions {
  onAnnounce: (message: string) => void
}

export function useBurnSequence({ onAnnounce }: UseBurnSequenceOptions) {
  const [stage, setStage] = useState<BurnStage>('writing')
  const [note, setNote] = useState('')
  const [burnSnapshot, setBurnSnapshot] = useState<string | null>(null)
  const noteRef = useRef(note)
  noteRef.current = note

  useEffect(() => {
    return () => {
      noteRef.current = ''
      setNote('')
      setBurnSnapshot(null)
    }
  }, [])

  const requestBurn = useCallback(() => {
    if (!note.trim()) return
    setStage('confirming')
  }, [note])

  const cancelConfirm = useCallback(() => {
    setStage('writing')
  }, [])

  const confirmBurn = useCallback(() => {
    const snapshot = noteRef.current
    if (!snapshot.trim()) {
      setStage('writing')
      return
    }

    setBurnSnapshot(snapshot)
    setNote('')
    noteRef.current = ''
    setStage('burning')
    onAnnounce('Burning started')
    onAnnounce('The note has been cleared')
  }, [onAnnounce])

  const completeBurnAnimation = useCallback(() => {
    setBurnSnapshot(null)
    setStage('breathing')
    onAnnounce('Breathing exercise started')
  }, [onAnnounce])

  const completeBreathing = useCallback(() => {
    setStage('complete')
    onAnnounce('Burning complete')
  }, [onAnnounce])

  const resetExperience = useCallback(() => {
    setNote('')
    noteRef.current = ''
    setBurnSnapshot(null)
    setStage('writing')
  }, [])

  const clearNote = useCallback(() => {
    setNote('')
    noteRef.current = ''
  }, [])

  const isBurnInProgress =
    stage === 'confirming' ||
    stage === 'burning' ||
    stage === 'breathing'

  return {
    stage,
    note,
    setNote,
    burnSnapshot,
    requestBurn,
    cancelConfirm,
    confirmBurn,
    completeBurnAnimation,
    completeBreathing,
    resetExperience,
    clearNote,
    isBurnInProgress,
  }
}
