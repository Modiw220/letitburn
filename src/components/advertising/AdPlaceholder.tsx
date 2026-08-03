import { ADS_ENABLED } from '../../types/sounds'

interface AdPlaceholderProps {
  placement: 'horizontal' | 'sidebar' | 'compact'
}

const dimensions: Record<AdPlaceholderProps['placement'], string> = {
  horizontal: 'min-h-[120px] w-full',
  sidebar: 'min-h-[280px] w-full',
  compact: 'min-h-[90px] w-full',
}

export default function AdPlaceholder({ placement }: AdPlaceholderProps) {
  if (!ADS_ENABLED) return null

  return (
    <aside
      className={`mt-8 flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] ${dimensions[placement]} ${
        placement === 'sidebar' ? 'hidden 2xl:block' : ''
      }`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-xs uppercase tracking-wider text-text-muted/60">
        Advertisement
      </span>
    </aside>
  )
}
