import {
  Download,
  Eraser,
  Paintbrush,
  PaintBucket,
  PenLine,
  Pipette,
  Redo2,
  Trash2,
  Undo2,
} from 'lucide-react'
import type { DrawingTool } from '../../types/drawing'

interface DrawingToolbarProps {
  tool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onDownload: () => void
  isExporting: boolean
  layout?: 'vertical' | 'horizontal'
  coloringMode?: boolean
  activeColor: string
}

interface ToolButtonProps {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

function ToolButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'border-accent-purple bg-accent-purple/20 text-text-main'
          : 'border-border-card text-text-muted hover:border-white/25 hover:text-text-main'
      }`}
    >
      {children}
    </button>
  )
}

export default function DrawingToolbar({
  tool,
  onToolChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onDownload,
  isExporting,
  layout = 'vertical',
  coloringMode = false,
  activeColor,
}: DrawingToolbarProps) {
  const isVertical = layout === 'vertical'

  return (
    <div
      className={
        isVertical
          ? 'flex flex-col gap-2'
          : 'flex flex-wrap items-center justify-center gap-2'
      }
      role="toolbar"
      aria-label="Drawing tools"
    >
      <div
        className={`flex items-center gap-2 rounded-xl border border-border-card bg-bg-secondary/70 p-2 ${
          isVertical ? 'flex-col' : ''
        }`}
        aria-label="Active color"
      >
        <span
          className="h-8 w-8 rounded-full border border-white/20"
          style={{ backgroundColor: activeColor }}
          title={`Active color ${activeColor}`}
        />
        {!isVertical && (
          <span className="font-mono text-xs text-text-muted">{activeColor}</span>
        )}
      </div>

      <ToolButton
        label="Pen"
        active={tool === 'pen'}
        onClick={() => onToolChange('pen')}
      >
        <PenLine className="h-5 w-5" />
      </ToolButton>
      <ToolButton
        label="Brush"
        active={tool === 'brush'}
        onClick={() => onToolChange('brush')}
      >
        <Paintbrush className="h-5 w-5" />
      </ToolButton>
      {coloringMode && (
        <ToolButton
          label="Fill"
          active={tool === 'fill'}
          onClick={() => onToolChange('fill')}
        >
          <PaintBucket className="h-5 w-5" />
        </ToolButton>
      )}
      <ToolButton
        label="Eyedropper"
        active={tool === 'eyedropper'}
        onClick={() => onToolChange('eyedropper')}
      >
        <Pipette className="h-5 w-5" />
      </ToolButton>
      <ToolButton
        label="Eraser"
        active={tool === 'eraser'}
        onClick={() => onToolChange('eraser')}
      >
        <Eraser className="h-5 w-5" />
      </ToolButton>
      <ToolButton label="Undo" disabled={!canUndo} onClick={onUndo}>
        <Undo2 className="h-5 w-5" />
      </ToolButton>
      <ToolButton label="Redo" disabled={!canRedo} onClick={onRedo}>
        <Redo2 className="h-5 w-5" />
      </ToolButton>
      <ToolButton label="Clear canvas" onClick={onClear}>
        <Trash2 className="h-5 w-5" />
      </ToolButton>
      <ToolButton
        label="Download artwork"
        disabled={isExporting}
        onClick={onDownload}
      >
        <Download className="h-5 w-5" />
      </ToolButton>
    </div>
  )
}
