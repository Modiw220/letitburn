import { useCallback, useRef } from 'react'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../types/drawing'

export function useTemplateCanvas(
  templateRef: React.RefObject<HTMLCanvasElement | null>,
  getTemplateContext: () => CanvasRenderingContext2D | null,
) {
  const currentSourceRef = useRef<string | null>(null)

  const drawTemplate = useCallback(
    async (source: string): Promise<boolean> => {
      const ctx = getTemplateContext()
      if (!ctx) return false

      try {
        const image = new Image()
        image.decoding = 'async'
        image.src = source

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve()
          image.onerror = () => reject(new Error('Template load failed'))
        })

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        const scale = Math.min(
          CANVAS_WIDTH / image.width,
          CANVAS_HEIGHT / image.height,
        ) * 0.85

        const width = image.width * scale
        const height = image.height * scale
        const x = (CANVAS_WIDTH - width) / 2
        const y = (CANVAS_HEIGHT - height) / 2

        ctx.drawImage(image, x, y, width, height)
        currentSourceRef.current = source
        return true
      } catch {
        return false
      }
    },
    [getTemplateContext],
  )

  const removeTemplate = useCallback(() => {
    const ctx = getTemplateContext()
    if (!ctx) return
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    currentSourceRef.current = null
  }, [getTemplateContext])

  const hasTemplate = useCallback(
    () => currentSourceRef.current !== null,
    [],
  )

  return {
    drawTemplate,
    removeTemplate,
    hasTemplate,
    templateCanvasRef: templateRef,
  }
}
