interface QuizPdfDownloadProps {
  onDownload: () => void
  error: string | null
}

export default function QuizPdfDownload({ onDownload, error }: QuizPdfDownloadProps) {
  return (
    <div>
      <button
        type="button"
        className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/10 px-5 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/15"
        onClick={onDownload}
      >
        Download PDF
      </button>
      {error && (
        <p className="mt-3 text-sm text-text-muted" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
