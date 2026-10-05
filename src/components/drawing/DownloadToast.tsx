interface DownloadToastProps {
  message: string | null
}

export default function DownloadToast({ message }: DownloadToastProps) {
  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="mobile-safe-bottom fixed left-1/2 z-[90] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl border border-border-card bg-bg-secondary px-5 py-3 text-sm text-text-main shadow-xl"
    >
      {message}
    </div>
  )
}
