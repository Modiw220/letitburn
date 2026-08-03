import { useEffect, useState } from 'react'
import Logo from '../common/Logo'
import ThemeToggle from '../common/ThemeToggle'
import MobileMenu, { MobileMenuButton, navLinks } from './MobileMenu'
import { NavItem } from './NavItem'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    if (menuOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-bg-main/90 backdrop-blur-md">
        <div className="content-container flex h-[72px] items-center justify-between gap-3 sm:h-[78px] sm:gap-4">
          <Logo className="max-w-[180px] sm:max-w-none" />

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-text-muted transition-colors hover:text-text-main"
              />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <span
              className="hidden h-6 w-px bg-white/15 lg:block"
              aria-hidden="true"
            />

            <MobileMenuButton
              isOpen={menuOpen}
              onToggle={() => setMenuOpen((open) => !open)}
            />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
