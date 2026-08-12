import { Menu, X } from 'lucide-react'
import { NavItem } from './NavItem'

export interface NavLink {
  label: string
  href: string
  icon?: 'heart'
}

export const navLinks: NavLink[] = [
  { label: 'Burn Thoughts', href: '/burn-thoughts' },
  { label: 'Relax', href: '/relaxing-drawing' },
  { label: 'Sounds', href: '/sounds' },
  { label: 'Quizzes', href: '/quizzes' },
  { label: 'About', href: '/about' },
  { label: 'Account', href: '/account' },
  { label: 'Support Us', href: '/support', icon: 'heart' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <nav
        id="mobile-nav"
        className={`fixed inset-x-0 top-[78px] z-50 max-h-[calc(100vh-78px)] overflow-y-auto border-b border-border-card bg-bg-secondary/98 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="content-container border-b border-border-card py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
            Move gently
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
            Free tools work without an account. Sign in to restore purchases.
          </p>
        </div>

        <ul className="content-container flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavItem
                link={link}
                onNavigate={onClose}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-text-main transition-colors hover:bg-white/5"
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text-main lg:hidden"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span className="hidden sm:inline">Menu</span>
      {isOpen ? (
        <X className="h-5 w-5" strokeWidth={1.75} />
      ) : (
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      )}
    </button>
  )
}
