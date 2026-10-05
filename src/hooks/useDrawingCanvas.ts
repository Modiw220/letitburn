import { useCallback, useRef } from 'react'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '../types/drawing'

import { CANVAS_SURFACE_COLOR } from '../utils/canvasPixels'

const CANVAS_BG = CANVAS_SURFACE_COLOR

function setupCanvas(
  canvas: HTMLCanvasElement,
  logicalWidth: number,
  logicalHeight: number,
) {
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.floor(logicalWidth * dpr)
  canvas.height = Math.floor(logicalHeight * dpr)
  canvas.style.width = '100%'
  canvas.style.height = 'auto'
  canvas.style.aspectRatio = `${logicalWidth} / ${logicalHeight}`

  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}

export function useDrawingCanvas() {
  const artworkRef = useRef<HTMLCanvasElement>(null)
  const templateRef = useRef<HTMLCanvasElement>(null)
  const initializedRef = useRef(false)

  const initCanvases = useCallback(() => {
    const artwork = artworkRef.current
    const template = templateRef.current
    if (!artwork || !template) return false

    const artworkCtx = setupCanvas(artwork, CANVAS_WIDTH, CANVAS_HEIGHT)
    const templateCtx = setupCanvas(template, CANVAS_WIDTH, CANVAS_HEIGHT)
    if (!artworkCtx || !templateCtx) return false

    artworkCtx.fillStyle = CANVAS_BG
    artworkCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    templateCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    initializedRef.current = true
    return true
  }, [])

  const getArtworkContext = useCallback(() => {
    const canvas = artworkRef.current
    if (!canvas) return null
    return canvas.getContext('2d')
  }, [])

  const getTemplateContext = useCallback(() => {
    const canvas = templateRef.current
    if (!canvas) return null
    return canvas.getContext('2d')
  }, [])

  const clearArtwork = useCallback(
    (options?: { transparent?: boolean }) => {
      const ctx = getArtworkContext()
      if (!ctx) return
      ctx.globalCompositeOperation = 'source-over'
      if (options?.transparent) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      } else {
        ctx.fillStyle = CANVAS_BG
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      }
    },
    [getArtworkContext],
  )

  const clearTemplate = useCallback(() => {
    const ctx = getTemplateContext()
    if (!ctx) return
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }, [getTemplateContext])

  const captureArtworkSnapshot = useCallback((): ImageData | null => {
    const canvas = artworkRef.current
    if (!canvas) return null

    const offscreen = document.createElement('canvas')
    offscreen.width = CANVAS_WIDTH
    offscreen.height = CANVAS_HEIGHT
    const offCtx = offscreen.getContext('2d')
    if (!offCtx) return null

    offCtx.drawImage(canvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    return offCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }, [])

  const restoreArtworkSnapshot = useCallback(
    (snapshot: ImageData) => {
      const ctx = getArtworkContext()
      if (!ctx) return

      const offscreen = document.createElement('canvas')
      offscreen.width = CANVAS_WIDTH
      offscreen.height = CANVAS_HEIGHT
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return

      offCtx.putImageData(snapshot, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      ctx.drawImage(offscreen, 0, 0)
    },
    [getArtworkContext],
  )

  const exportComposition = useCallback(async (): Promise<Blob | null> => {
    const artwork = artworkRef.current
    const template = templateRef.current
    if (!artwork || !template) return null

    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = CANVAS_WIDTH
    exportCanvas.height = CANVAS_HEIGHT
    const ctx = exportCanvas.getContext('2d')
    if (!ctx) return null

    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(artwork, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(template, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    return new Promise((resolve) => {
      exportCanvas.toBlob((blob) => resolve(blob), 'image/png')
    })
  }, [])

  return {
    artworkRef,
    templateRef,
    initCanvases,
    getArtworkContext,
    getTemplateContext,
    clearArtwork,
    clearTemplate,
    captureArtworkSnapshot,
    restoreArtworkSnapshot,
    exportComposition,
    isInitialized: () => initializedRef.current,
  }
}
