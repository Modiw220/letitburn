import DrawingDialog from './DrawingDialog'

interface ClearCanvasDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ClearCanvasDialog(props: ClearCanvasDialogProps) {
  return (
    <DrawingDialog
      {...props}
      title="Clear your canvas?"
      description="This will remove everything you have drawn."
      confirmLabel="Clear Canvas"
      destructive
    />
  )
}
