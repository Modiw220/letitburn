import { useCallback, useRef } from 'react'
import { CANVAS_HEIGHT, CANVAS_WIDTH, type DrawingTool } from '../types/drawing'
import { floodFillArtwork } from '../utils/canvasFloodFill'
import { sampleCompositeColor } from '../utils/canvasColor'
import type { TemplateContentBounds } from '../utils/templateProcessing'

interface Point {
  x: number
  y: number
}

interface UsePointerDrawingOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  templateCanvasRef?: React.RefObject<HTMLCanvasElement | null>
  getTemplateBounds?: () => TemplateContentBounds | null
  tool: DrawingTool
  color: string
  brushSize: number
  disabled?: boolean
  onStrokeStart?: () => void
  onStrokeComplete?: () => void
  onDrawing?: () => void
  onColorPick?: (color: string) => void
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

function isStrokeTool(tool: DrawingTool): tool is 'pen' | 'brush' | 'eraser' {
  return tool === 'pen' || tool === 'brush' || tool === 'eraser'
}

function getStrokeWidth(tool: 'pen' | 'brush' | 'eraser', brushSize: number): number {
  if (tool === 'pen') return Math.max(1, brushSize * 0.4)
  if (tool === 'brush') return brushSize
  return brushSize
}

function applyStrokeStyle(
  ctx: CanvasRenderingContext2D,
  tool: 'pen' | 'brush' | 'eraser',
  color: string,
  brushSize: number,
) {
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = getStrokeWidth(tool, brushSize)

  if (tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = 'rgba(0,0,0,1)'
    ctx.fillStyle = 'rgba(0,0,0,1)'
    return
  }

  ctx.globalCompositeOperation = 'source-over'
  ctx.strokeStyle = color
  ctx.fillStyle = color

  if (tool === 'brush') {
    ctx.globalAlpha = 0.92
  } else {
    ctx.globalAlpha = 1
  }
}

function drawSegment(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  tool: 'pen' | 'brush' | 'eraser',
  color: string,
  brushSize: number,
) {
  applyStrokeStyle(ctx, tool, color, brushSize)
  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
  ctx.globalAlpha = 1
}

export function usePointerDrawing({
  canvasRef,
  templateCanvasRef,
  getTemplateBounds,
  tool,
  color,
  brushSize,
  disabled = false,
  onStrokeStart,
  onStrokeComplete,
  onDrawing,
  onColorPick,
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

    const { tool: activeTool, color: activeColor, brushSize: size } =
      settingsRef.current
    if (!isStrokeTool(activeTool)) return

    drawSegment(ctx, last, point, activeTool, activeColor, size)
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

      const point = getCanvasPoint(canvas, event.clientX, event.clientY)
      const { tool: activeTool, color: activeColor } = settingsRef.current

      if (activeTool === 'eyedropper') {
        const picked = sampleCompositeColor(
          canvas,
          templateCanvasRef?.current ?? null,
          point.x,
          point.y,
        )
        if (picked) {
          onColorPick?.(picked)
        }
        return
      }

      if (activeTool === 'fill') {
        onStrokeStart?.()
        onDrawing?.()
        floodFillArtwork(
          canvas,
          templateCanvasRef?.current ?? null,
          point.x,
          point.y,
          activeColor,
          getTemplateBounds?.() ?? null,
        )
        onStrokeComplete?.()
        return
      }

      if (!isStrokeTool(activeTool)) return

      canvas.setPointerCapture(event.pointerId)
      activeCanvasRef.current = canvas

      isDrawingRef.current = true
      lastPointRef.current = point
      onStrokeStart?.()
      onDrawing?.()

      const ctx = canvas.getContext('2d')
      if (ctx) {
        const { brushSize: size } = settingsRef.current
        applyStrokeStyle(ctx, activeTool, activeColor, size)
        ctx.beginPath()
        ctx.arc(
          point.x,
          point.y,
          getStrokeWidth(activeTool, size) / 2,
          0,
          Math.PI * 2,
        )
        ctx.fill()
        ctx.globalAlpha = 1
      }
    },
    [
      disabled,
      getTemplateBounds,
      onColorPick,
      onDrawing,
      onStrokeComplete,
      onStrokeStart,
      templateCanvasRef,
    ],
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
      if (ctx) {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }

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
