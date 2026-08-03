import DrawingDialog from './DrawingDialog'

interface NewCanvasDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function NewCanvasDialog(props: NewCanvasDialogProps) {
  return (
    <DrawingDialog
      {...props}
      title="Start a new canvas?"
      description="Changing the canvas will remove your current artwork unless you download it first."
      confirmLabel="Start New Canvas"
    />
  )
}
