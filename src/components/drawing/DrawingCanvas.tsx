import { ChevronDown } from 'lucide-react'
import type { RefObject } from 'react'
import type { DrawingTool } from '../../types/drawing'

interface DrawingCanvasProps {
  artworkRef: RefObject<HTMLCanvasElement | null>
  templateRef: RefObject<HTMLCanvasElement | null>
  tool: DrawingTool
  brushSize: number
  showTemplateHint: boolean
  onPointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerUp: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerLeave: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerCancel: (event: React.PointerEvent<HTMLCanvasElement>) => void
  cursorPosition: { x: number; y: number } | null
  showCursor: boolean
}

export default function DrawingCanvas({
  artworkRef,
  templateRef,
  tool,
  brushSize,
  showTemplateHint,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  cursorPosition,
  showCursor,
}: DrawingCanvasProps) {
  return (
    <div className="drawing-canvas-shell relative">
      <div className="drawing-surface relative overflow-hidden rounded-xl border border-[#E8E2D6] bg-[#FAF8F3] shadow-inner">
        <canvas
          ref={artworkRef}
          className="drawing-canvas-layer block w-full touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
          onPointerCancel={onPointerCancel}
          aria-label="Interactive drawing canvas. Use a pointer, touch screen, or stylus to draw."
        />
        <canvas
          ref={templateRef}
          className="drawing-canvas-layer pointer-events-none absolute inset-0 block w-full"
          aria-hidden="true"
        />

        {showTemplateHint && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F3]/85 p-6 text-center">
            <p className="max-w-xs text-sm text-[#6B5A45]">
              Choose a template below to begin coloring.
            </p>
            <ChevronDown
              className="mt-3 h-5 w-5 animate-bounce text-accent-purple"
              aria-hidden="true"
            />
          </div>
        )}

        {showCursor && cursorPosition && (
          <div
            className="pointer-events-none absolute z-10 hidden rounded-full border-2 border-text-main/40 md:block"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              width: brushSize,
              height: brushSize,
              transform: 'translate(-50%, -50%)',
              backgroundColor:
                tool === 'eraser' ? 'transparent' : 'currentColor',
              opacity: tool === 'eraser' ? 1 : 0.25,
              borderStyle: tool === 'eraser' ? 'dashed' : 'solid',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}
