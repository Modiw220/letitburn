import { Heart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { NavLink } from './MobileMenu'

interface NavItemProps {
  link: NavLink
  className: string
  onNavigate?: () => void
}

export function NavItem({ link, className, onNavigate }: NavItemProps) {
  const location = useLocation()
  const isActive =
    !link.href.startsWith('#') &&
    (location.pathname === link.href ||
      (link.href === '/quizzes' && location.pathname.startsWith('/quizzes/')) ||
      (link.href === '/support' &&
        (location.pathname === '/support' || location.pathname === '/donate')))

  const content = (
    <>
      {link.label}
      {link.icon === 'heart' && (
        <Heart
          className="h-3 w-3 fill-fire-orange text-fire-orange"
          aria-hidden="true"
        />
      )}
    </>
  )

  const mergedClassName = `${className}${isActive ? ' text-text-main' : ''}`

  if (link.href.startsWith('#')) {
    return (
      <a href={link.href} className={mergedClassName} onClick={onNavigate}>
        {content}
      </a>
    )
  }

  return (
    <Link to={link.href} className={mergedClassName} onClick={onNavigate} aria-current={isActive ? 'page' : undefined}>
      {content}
    </Link>
  )
}