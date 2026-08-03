import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-text-muted transition-colors hover:border-border-card hover:text-text-main"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
    >
      {isDark ? (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      ) : (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
      )}
    </button>
  )
}
