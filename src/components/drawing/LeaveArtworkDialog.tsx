import DrawingDialog from './DrawingDialog'

interface LeaveArtworkDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function LeaveArtworkDialog(props: LeaveArtworkDialogProps) {
  return (
    <DrawingDialog
      {...props}
      title="Leave your artwork?"
      description="Your drawing will be cleared unless you download it first."
      confirmLabel="Leave Page"
      destructive
    />
  )
}
