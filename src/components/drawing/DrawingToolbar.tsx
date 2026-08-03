import {
  Download,
  Eraser,
  Paintbrush,
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
      <ToolButton
        label="Brush"
        active={tool === 'brush'}
        onClick={() => onToolChange('brush')}
      >
        <Paintbrush className="h-5 w-5" />
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
