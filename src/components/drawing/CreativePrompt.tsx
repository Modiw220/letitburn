import { RefreshCw } from 'lucide-react'

interface CreativePromptProps {
  prompt: string
  onRefresh: () => void
}

export default function CreativePrompt({
  prompt,
  onRefresh,
}: CreativePromptProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3 px-2 text-center">
      <p className="text-sm italic text-text-muted md:text-base">{prompt}</p>
      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-text-muted transition-colors hover:text-text-main"
        aria-label="New prompt"
        title="New prompt"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">New prompt</span>
      </button>
    </div>
  )
}
