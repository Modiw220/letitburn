import {
  Download,
  Eraser,
  MoreHorizontal,
  Paintbrush,
  PaintBucket,
  Palette,
  PenLine,
  Pipette,
  Redo2,
  Ruler,
  Trash2,
  Undo2,
  X,
} from 'lucide-react'
import { useEffect } from 'react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import type { DrawingTool } from '../../types/drawing'

interface MobileDrawingToolbarProps {
  tool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onOpenColors: () => void
  onOpenSizes: () => void
  moreOpen: boolean
  onToggleMore: () => void
  onClear: () => void
  onDownload: () => void
  onScrollToTemplates: () => void
  onShowShortcuts: () => void
  isExporting: boolean
  coloringMode?: boolean
  activeColor: string
}

export default function MobileDrawingToolbar({
  tool,
  onToolChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenColors,
  onOpenSizes,
  moreOpen,
  onToggleMore,
  onClear,
  onDownload,
  onScrollToTemplates,
  onShowShortcuts,
  isExporting,
  coloringMode = false,
  activeColor,
}: MobileDrawingToolbarProps) {
  const sheetRef = useFocusTrap(moreOpen)

  useEffect(() => {
    if (!moreOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onToggleMore()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [moreOpen, onToggleMore])

  const btnClass = (active = false) =>
    `flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border ${
      active
        ? 'border-accent-purple bg-accent-purple/20 text-text-main'
        : 'border-border-card text-text-muted'
    }`

  return (
    <>
      <div
        className="drawing-mobile-toolbar flex items-center gap-2 overflow-x-auto border-t border-border-card bg-bg-secondary/95 px-2 py-2 backdrop-blur-md lg:hidden"
        role="toolbar"
        aria-label="Mobile drawing tools"
      >
        <span
          className="h-9 w-9 shrink-0 rounded-full border border-white/20"
          style={{ backgroundColor: activeColor }}
          aria-label={`Active color ${activeColor}`}
        />

        <button
          type="button"
          className={btnClass(tool === 'pen')}
          aria-label="Pen"
          aria-pressed={tool === 'pen'}
          onClick={() => onToolChange('pen')}
        >
          <PenLine className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass(tool === 'brush')}
          aria-label="Brush"
          aria-pressed={tool === 'brush'}
          onClick={() => onToolChange('brush')}
        >
          <Paintbrush className="h-5 w-5" />
        </button>
        {coloringMode && (
          <button
            type="button"
            className={btnClass(tool === 'fill')}
            aria-label="Fill"
            aria-pressed={tool === 'fill'}
            onClick={() => onToolChange('fill')}
          >
            <PaintBucket className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          className={btnClass(tool === 'eyedropper')}
          aria-label="Eyedropper"
          aria-pressed={tool === 'eyedropper'}
          onClick={() => onToolChange('eyedropper')}
        >
          <Pipette className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass(tool === 'eraser')}
          aria-label="Eraser"
          aria-pressed={tool === 'eraser'}
          onClick={() => onToolChange('eraser')}
        >
          <Eraser className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass()}
          aria-label="Undo"
          disabled={!canUndo}
          onClick={onUndo}
        >
          <Undo2 className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass()}
          aria-label="Redo"
          disabled={!canRedo}
          onClick={onRedo}
        >
          <Redo2 className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass()}
          aria-label="Colors"
          onClick={onOpenColors}
        >
          <Palette className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass()}
          aria-label="Brush size"
          onClick={onOpenSizes}
        >
          <Ruler className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={btnClass()}
          aria-label="More tools"
          aria-expanded={moreOpen}
          onClick={onToggleMore}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {moreOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={onToggleMore}
          />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="More drawing options"
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-border-card bg-bg-secondary p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-text-main">
                More options
              </h3>
              <button
                type="button"
                onClick={onToggleMore}
                aria-label="Close"
                className="rounded-lg p-2 text-text-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => {
                  onClear()
                  onToggleMore()
                }}
                className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-left text-text-main hover:bg-white/5"
              >
                <Trash2 className="h-5 w-5" /> Clear Canvas
              </button>
              <button
                type="button"
                disabled={isExporting}
                onClick={() => {
                  onDownload()
                  onToggleMore()
                }}
                className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-left text-text-main hover:bg-white/5 disabled:opacity-50"
              >
                <Download className="h-5 w-5" /> Download
              </button>
              <button
                type="button"
                onClick={() => {
                  onScrollToTemplates()
                  onToggleMore()
                }}
                className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-left text-text-main hover:bg-white/5"
              >
                Templates
              </button>
              <button
                type="button"
                onClick={() => {
                  onShowShortcuts()
                  onToggleMore()
                }}
                className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-left text-text-main hover:bg-white/5"
              >
                Keyboard shortcuts
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
