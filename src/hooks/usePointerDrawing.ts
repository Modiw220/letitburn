import { useCallback, useRef } from 'react'
import { CANVAS_HEIGHT, CANVAS_WIDTH, type DrawingTool } from '../types/drawing'

interface Point {
  x: number
  y: number
}

interface UsePointerDrawingOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  tool: DrawingTool
  color: string
  brushSize: number
  disabled?: boolean
  onStrokeStart?: () => void
  onStrokeComplete?: () => void
  onDrawing?: () => void
}

function getCanvasPoint(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): Point {
  const rect = canvas.getBoundingClientRect()

  return {
    x: ((clientX - rect.left) / rect.width) * CANVAS_WIDTH,
    y: ((clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
  }
}

function drawSegment(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  tool: DrawingTool,
  color: string,
  brushSize: number,
) {
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = brushSize

  if (tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = 'rgba(0,0,0,1)'
  } else {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = color
  }

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
}

export function usePointerDrawing({
  canvasRef,
  tool,
  color,
  brushSize,
  disabled = false,
  onStrokeStart,
  onStrokeComplete,
  onDrawing,
}: UsePointerDrawingOptions) {
  const isDrawingRef = useRef(false)
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const lastPointRef = useRef<Point | null>(null)
  const rafRef = useRef<number | null>(null)
  const pendingPointRef = useRef<Point | null>(null)
  const settingsRef = useRef({ tool, color, brushSize })
  settingsRef.current = { tool, color, brushSize }

  const flushDraw = useCallback(() => {
    rafRef.current = null
    const canvas = activeCanvasRef.current ?? canvasRef.current
    const point = pendingPointRef.current
    const last = lastPointRef.current
    if (!canvas || !point || !last) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { tool: t, color: c, brushSize: size } = settingsRef.current
    drawSegment(ctx, last, point, t, c, size)
    lastPointRef.current = point
    pendingPointRef.current = null
  }, [canvasRef])

  const scheduleDraw = useCallback(
    (point: Point) => {
      pendingPointRef.current = point
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(flushDraw)
    },
    [flushDraw],
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (disabled) return
      const canvas = event.currentTarget

      event.preventDefault()
      canvas.setPointerCapture(event.pointerId)
      activeCanvasRef.current = canvas

      const point = getCanvasPoint(canvas, event.clientX, event.clientY)
      isDrawingRef.current = true
      lastPointRef.current = point
      onStrokeStart?.()
      onDrawing?.()

      const ctx = canvas.getContext('2d')
      if (ctx) {
        const { tool: t, color: c, brushSize: size } = settingsRef.current
        ctx.globalCompositeOperation =
          t === 'eraser' ? 'destination-out' : 'source-over'
        ctx.fillStyle = t === 'eraser' ? 'rgba(0,0,0,1)' : c
        ctx.beginPath()
        ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    },
    [disabled, onDrawing, onStrokeStart],
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current || disabled) return

      event.preventDefault()
      const canvas = event.currentTarget
      const point = getCanvasPoint(canvas, event.clientX, event.clientY)
      scheduleDraw(point)
    },
    [disabled, scheduleDraw],
  )

  const endStroke = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return
      const canvas = event.currentTarget

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        flushDraw()
      }

      isDrawingRef.current = false
      activeCanvasRef.current = null
      lastPointRef.current = null
      pendingPointRef.current = null

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.globalCompositeOperation = 'source-over'

      onStrokeComplete?.()
    },
    [flushDraw, onStrokeComplete],
  )

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp: endStroke,
    handlePointerLeave: endStroke,
    handlePointerCancel: endStroke,
    isDrawingRef,
  }
}
