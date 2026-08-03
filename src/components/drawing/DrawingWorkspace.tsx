import { Palette } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { creativePrompts } from '../../data/creativePrompts'
import { useCanvasHistory } from '../../hooks/useCanvasHistory'
import { useDrawingCanvas } from '../../hooks/useDrawingCanvas'
import { usePointerDrawing } from '../../hooks/usePointerDrawing'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTemplateCanvas } from '../../hooks/useTemplateCanvas'
import { useUnsavedArtworkWarning } from '../../hooks/useUnsavedArtworkWarning'
import type { ColoringTemplate, DrawingMode, DrawingTool } from '../../types/drawing'
import {
  DEFAULT_BRUSH_SIZE,
  DEFAULT_COLOR,
} from '../../types/drawing'
import BrushSizeControl from './BrushSizeControl'
import ClearCanvasDialog from './ClearCanvasDialog'
import ColorPalette from './ColorPalette'
import CreativePrompt from './CreativePrompt'
import DownloadToast from './DownloadToast'
import DrawingCanvas from './DrawingCanvas'
import DrawingDialog from './DrawingDialog'
import DrawingPrivacyNotice from './DrawingPrivacyNotice'
import DrawingSupportPanel from './DrawingSupportPanel'
import DrawingToolbar from './DrawingToolbar'
import KeyboardShortcutsDialog from './KeyboardShortcutsDialog'
import LeaveArtworkDialog from './LeaveArtworkDialog'
import MobileDrawingToolbar from './MobileDrawingToolbar'
import ModeSelector from './ModeSelector'
import NewCanvasDialog from './NewCanvasDialog'
import PremiumPreview from './PremiumPreview'
import TemplateGallery from './TemplateGallery'

function randomPrompt() {
  return creativePrompts[Math.floor(Math.random() * creativePrompts.length)]
}

function formatFilename() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')
  return `let-it-burn-artwork-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}.png`
}

export default function DrawingWorkspace() {
  const reducedMotion = useReducedMotion()
  const templateGalleryRef = useRef<HTMLDivElement>(null)

  const [mode, setMode] = useState<DrawingMode>('blank')
  const [tool, setTool] = useState<DrawingTool>('brush')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [customColor, setCustomColor] = useState(DEFAULT_COLOR)
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE)
  const [hasArtwork, setHasArtwork] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  )
  const [isExporting, setIsExporting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState(randomPrompt)
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [showCursor, setShowCursor] = useState(false)

  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [newCanvasDialogOpen, setNewCanvasDialogOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [pendingMode, setPendingMode] = useState<DrawingMode | null>(null)
  const [blankDownloadConfirm, setBlankDownloadConfirm] = useState(false)
  const [mobilePanel, setMobilePanel] = useState<'colors' | 'sizes' | null>(
    null,
  )
  const [moreOpen, setMoreOpen] = useState(false)
  const [canvasError, setCanvasError] = useState(false)

  const canvasApi = useDrawingCanvas()
  const {
    artworkRef,
    templateRef,
    initCanvases,
    getTemplateContext,
    clearArtwork,
    captureArtworkSnapshot,
    restoreArtworkSnapshot,
    exportComposition,
  } = canvasApi

  const history = useCanvasHistory(captureArtworkSnapshot, restoreArtworkSnapshot)
  const { resetHistory, pushSnapshot, undo, redo, canUndo, canRedo } = history
  const templateApi = useTemplateCanvas(templateRef, getTemplateContext)
  const { showLeaveDialog, confirmLeave, cancelLeave } =
    useUnsavedArtworkWarning(hasArtwork)

  const announce = useCallback((message: string) => {
    setStatusMessage(message)
  }, [])

  const handleStrokeComplete = useCallback(() => {
    pushSnapshot()
    setHasArtwork(true)
  }, [pushSnapshot])

  const pointer = usePointerDrawing({
    canvasRef: artworkRef,
    tool,
    color,
    brushSize,
    onStrokeComplete: handleStrokeComplete,
  })

  const pointerRef = useRef(pointer)
  pointerRef.current = pointer

  useEffect(() => {
    const ok = initCanvases()
    if (!ok) {
      setCanvasError(true)
      return
    }
    resetHistory()
  }, [initCanvases, resetHistory])

  useEffect(() => {
    if (toastMessage) {
      const timer = window.setTimeout(() => setToastMessage(null), 3000)
      return () => window.clearTimeout(timer)
    }
  }, [toastMessage])

  const applyModeChange = useCallback(
    async (nextMode: DrawingMode) => {
      setMode(nextMode)
      if (nextMode === 'blank') {
        setSelectedTemplateId(null)
        templateApi.removeTemplate()
      }
      clearArtwork()
      resetHistory()
      setHasArtwork(false)
      setPendingMode(null)
      setNewCanvasDialogOpen(false)
    },
    [clearArtwork, resetHistory, templateApi],
  )

  const requestModeChange = useCallback(
    (nextMode: DrawingMode) => {
      if (nextMode === mode) return
      if (hasArtwork) {
        setPendingMode(nextMode)
        setNewCanvasDialogOpen(true)
        return
      }
      void applyModeChange(nextMode)
    },
    [applyModeChange, hasArtwork, mode],
  )

  const handleSelectTemplate = useCallback(
    async (template: ColoringTemplate) => {
      const loaded = await templateApi.drawTemplate(template.source)
      if (!loaded) {
        setToastMessage('This template could not be loaded.')
        return
      }
      setSelectedTemplateId(template.id)
      setMode('template')
      announce('Template selected')
    },
    [announce, templateApi],
  )

  const handleRemoveTemplate = useCallback(() => {
    templateApi.removeTemplate()
    setSelectedTemplateId(null)
    announce('Template removed')
  }, [announce, templateApi])

  const performDownload = useCallback(async () => {
    setIsExporting(true)
    try {
      const blob = await exportComposition()
      if (!blob) throw new Error('Export failed')

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = formatFilename()
      link.click()
      URL.revokeObjectURL(url)

      setToastMessage('Your artwork has been downloaded.')
      announce('Download completed')
    } catch {
      setToastMessage('The image could not be downloaded. Please try again.')
    } finally {
      setIsExporting(false)
      setBlankDownloadConfirm(false)
    }
  }, [announce, exportComposition])

  const handleDownload = useCallback(() => {
    if (!hasArtwork && !selectedTemplateId) {
      setBlankDownloadConfirm(true)
      return
    }
    void performDownload()
  }, [hasArtwork, performDownload, selectedTemplateId])

  const handleClear = useCallback(() => {
    clearArtwork()
    pushSnapshot()
    setHasArtwork(false)
    setClearDialogOpen(false)
    announce('Canvas cleared')
  }, [announce, clearArtwork, pushSnapshot])

  const handleUndo = useCallback(() => {
    if (undo()) announce('Undo completed')
  }, [announce, undo])

  const handleRedo = useCallback(() => {
    if (redo()) announce('Redo completed')
  }, [announce, redo])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        clearDialogOpen ||
        newCanvasDialogOpen ||
        shortcutsOpen ||
        showLeaveDialog ||
        blankDownloadConfirm
      ) {
        return
      }

      const mod = event.metaKey || event.ctrlKey

      if (event.key === 'b' || event.key === 'B') {
        setTool('brush')
        announce('Brush selected')
      } else if (event.key === 'e' || event.key === 'E') {
        setTool('eraser')
        announce('Eraser selected')
      } else if (mod && event.key === 'z' && event.shiftKey) {
        event.preventDefault()
        handleRedo()
      } else if (mod && event.key === 'z') {
        event.preventDefault()
        handleUndo()
      } else if (mod && event.key === 'y') {
        event.preventDefault()
        handleRedo()
      } else if (mod && event.key === 's') {
        event.preventDefault()
        void handleDownload()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    announce,
    blankDownloadConfirm,
    clearDialogOpen,
    handleDownload,
    handleRedo,
    handleUndo,
    newCanvasDialogOpen,
    shortcutsOpen,
    showLeaveDialog,
  ])

  const handleCanvasPointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
      pointerRef.current.handlePointerMove(event)
    },
    [],
  )

  if (canvasError) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <p className="text-lg text-text-main">
          We couldn&apos;t start the drawing canvas.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              setCanvasError(false)
              initCanvases()
            }}
            className="rounded-xl bg-accent-purple/20 px-5 py-3 text-sm font-semibold text-text-main"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-xl border border-border-card px-5 py-3 text-sm font-medium text-text-main"
          >
            Return Home
          </a>
        </div>
      </div>
    )
  }

  const showTemplateHint =
    mode === 'template' && !selectedTemplateId && !hasArtwork

  return (
    <div className={`drawing-page ${reducedMotion ? 'drawing-page--reduced' : ''}`}>
      <div className="drawing-page-glow" aria-hidden="true" />

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <header className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-purple">
          Creative Reset
        </p>
        <h1 className="drawing-intro-heading relative mt-4 font-heading text-3xl font-semibold text-text-main md:text-4xl lg:text-[42px]">
          Slow down and create.
        </h1>
        <p className="mt-4 text-base text-text-muted md:text-lg">
          Draw freely, color a calming template, or simply follow wherever your
          hand takes you.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Palette className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
            No artistic skill needed
          </span>
          <span aria-hidden="true">·</span>
          <span>No account required</span>
          <span aria-hidden="true">·</span>
          <span>Your artwork stays private</span>
        </div>
      </header>

      <section className="mb-6 rounded-[24px] border border-border-card bg-bg-card/45 p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-purple">
              Choose a mode
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Pick a blank canvas or a calming template, then settle into the workspace below.
            </p>
          </div>
          <ModeSelector mode={mode} onChange={requestModeChange} />
        </div>

        <div className="mt-5">
          <CreativePrompt
            prompt={prompt}
            onRefresh={() => setPrompt(randomPrompt())}
          />
        </div>
      </section>

      <section className="drawing-workspace rounded-[20px] border border-border-card bg-bg-card/80 p-4 shadow-[0_0_40px_rgba(154,104,245,0.08)] md:p-6">
        {(mobilePanel === 'colors' || mobilePanel === 'sizes') && (
          <div className="mb-4 rounded-2xl border border-border-card bg-bg-secondary/80 p-4 lg:hidden">
            {mobilePanel === 'colors' ? (
              <ColorPalette
                selectedColor={color}
                onSelect={setColor}
                customColor={customColor}
                onCustomChange={setCustomColor}
              />
            ) : (
              <BrushSizeControl
                brushSize={brushSize}
                onChange={setBrushSize}
              />
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
          <aside className="hidden w-20 shrink-0 lg:block">
            <DrawingToolbar
              tool={tool}
              onToolChange={setTool}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onClear={() => setClearDialogOpen(true)}
              onDownload={handleDownload}
              isExporting={isExporting}
            />
          </aside>

          <div className="min-w-0 flex-1">
            <DrawingCanvas
              artworkRef={artworkRef}
              templateRef={templateRef}
              tool={tool}
              brushSize={brushSize}
              showTemplateHint={showTemplateHint}
              onPointerDown={(event) => {
                setShowCursor(true)
                if (window.matchMedia('(max-width: 1023px)').matches) {
                  document.body.style.overflow = 'hidden'
                }
                pointer.handlePointerDown(event)
              }}
              onPointerMove={handleCanvasPointerMove}
              onPointerUp={(event) => {
                document.body.style.overflow = ''
                pointer.handlePointerUp(event)
              }}
              onPointerLeave={(event) => {
                setShowCursor(false)
                document.body.style.overflow = ''
                pointer.handlePointerLeave(event)
              }}
              onPointerCancel={(event) => {
                document.body.style.overflow = ''
                pointer.handlePointerCancel(event)
              }}
              cursorPosition={cursorPosition}
              showCursor={showCursor}
            />

            <MobileDrawingToolbar
              tool={tool}
              onToolChange={setTool}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onOpenColors={() =>
                setMobilePanel((panel) =>
                  panel === 'colors' ? null : 'colors',
                )
              }
              onOpenSizes={() =>
                setMobilePanel((panel) => (panel === 'sizes' ? null : 'sizes'))
              }
              moreOpen={moreOpen}
              onToggleMore={() => setMoreOpen((open) => !open)}
              onClear={() => setClearDialogOpen(true)}
              onDownload={handleDownload}
              onScrollToTemplates={() =>
                templateGalleryRef.current?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
              onShowShortcuts={() => setShortcutsOpen(true)}
              isExporting={isExporting}
            />
          </div>

          <aside className="hidden w-[260px] shrink-0 space-y-6 rounded-2xl border border-border-card bg-bg-secondary/60 p-4 lg:block">
            <ColorPalette
              selectedColor={color}
              onSelect={setColor}
              customColor={customColor}
              onCustomChange={setCustomColor}
            />
            <BrushSizeControl brushSize={brushSize} onChange={setBrushSize} />
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              className="w-full text-left text-xs text-text-muted underline-offset-2 hover:text-text-main hover:underline"
            >
              Keyboard shortcuts
            </button>
          </aside>
        </div>

        <div className="mt-4 hidden items-center justify-end gap-3 lg:flex">
          {isExporting && (
            <span className="text-sm text-text-muted">Preparing…</span>
          )}
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-5">
        <DrawingPrivacyNotice />
      </div>

      <div ref={templateGalleryRef}>
        <TemplateGallery
          visible={mode === 'template'}
          selectedTemplateId={selectedTemplateId}
          onSelect={handleSelectTemplate}
          onRemove={handleRemoveTemplate}
        />
      </div>

      <DrawingSupportPanel />
      <PremiumPreview />

      <ClearCanvasDialog
        open={clearDialogOpen}
        onCancel={() => setClearDialogOpen(false)}
        onConfirm={handleClear}
      />

      <NewCanvasDialog
        open={newCanvasDialogOpen}
        onCancel={() => {
          setNewCanvasDialogOpen(false)
          setPendingMode(null)
        }}
        onConfirm={() => {
          if (pendingMode) void applyModeChange(pendingMode)
        }}
      />

      <LeaveArtworkDialog
        open={showLeaveDialog}
        onCancel={cancelLeave}
        onConfirm={confirmLeave}
      />

      <KeyboardShortcutsDialog
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      <DrawingDialog
        open={blankDownloadConfirm}
        title="Download the blank canvas?"
        description="You haven't added any artwork yet. You can still download the empty canvas."
        confirmLabel="Download"
        onConfirm={() => void performDownload()}
        onCancel={() => setBlankDownloadConfirm(false)}
      />

      <DownloadToast message={toastMessage} />
    </div>
  )
}
