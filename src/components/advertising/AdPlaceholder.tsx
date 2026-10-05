import { ADS_ENABLED } from '../../types/sounds'
import { useEntitlements } from '../../context/EntitlementsContext'

interface AdPlaceholderProps {
  placement: 'horizontal' | 'sidebar' | 'compact'
}

const dimensions: Record<AdPlaceholderProps['placement'], string> = {
  horizontal: 'min-h-[120px] w-full',
  sidebar: 'min-h-[280px] w-full',
  compact: 'min-h-[90px] w-full',
}

function AdSlot({ placement }: AdPlaceholderProps) {
  const { isAdFree } = useEntitlements()

  if (isAdFree) return null

  return (
    <aside
      className={`mt-8 flex items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-calm-cyan/[0.04] to-transparent ${dimensions[placement]} ${
        placement === 'sidebar' ? 'hidden 2xl:block' : ''
      }`}
      aria-label="Advertisement placeholder"
    >
      <div className="px-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted/55">
          Sponsored space
        </p>
        <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-text-muted/70">
          A calm placeholder. No tracking scripts load here.
        </p>
      </div>
    </aside>
  )
}

export default function AdPlaceholder({ placement }: AdPlaceholderProps) {
  if (!ADS_ENABLED) return null
  return <AdSlot placement={placement} />
}
