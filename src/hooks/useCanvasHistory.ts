import { useCallback, useRef, useState } from 'react'
import { MAX_HISTORY } from '../types/drawing'

export function useCanvasHistory(
  captureSnapshot: () => ImageData | null,
  restoreSnapshot: (snapshot: ImageData) => void,
) {
  const historyRef = useRef<ImageData[]>([])
  const indexRef = useRef(0)
  const [revision, setRevision] = useState(0)
  const captureRef = useRef(captureSnapshot)
  const restoreRef = useRef(restoreSnapshot)

  captureRef.current = captureSnapshot
  restoreRef.current = restoreSnapshot

  const syncState = useCallback(() => {
    setRevision((value) => value + 1)
  }, [])

  const resetHistory = useCallback(() => {
    const initial = captureRef.current()
    if (!initial) return
    historyRef.current = [initial]
    indexRef.current = 0
    syncState()
  }, [syncState])

  const pushSnapshot = useCallback(() => {
    const snapshot = captureRef.current()
    if (!snapshot) return

    const trimmed = historyRef.current.slice(0, indexRef.current + 1)
    trimmed.push(snapshot)

    if (trimmed.length > MAX_HISTORY) {
      trimmed.shift()
    } else {
      indexRef.current += 1
    }

    historyRef.current = trimmed
    indexRef.current = trimmed.length - 1
    syncState()
  }, [syncState])

  const undo = useCallback(() => {
    if (indexRef.current <= 0) return false
    indexRef.current -= 1
    const snapshot = historyRef.current[indexRef.current]
    if (snapshot) restoreRef.current(snapshot)
    syncState()
    return true
  }, [syncState])

  const redo = useCallback(() => {
    if (indexRef.current >= historyRef.current.length - 1) return false
    indexRef.current += 1
    const snapshot = historyRef.current[indexRef.current]
    if (snapshot) restoreRef.current(snapshot)
    syncState()
    return true
  }, [syncState])

  const canUndo = revision >= 0 && indexRef.current > 0
  const canRedo =
    revision >= 0 && indexRef.current < historyRef.current.length - 1

  return {
    resetHistory,
    pushSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
