import { Link } from 'react-router-dom'
import Logo from '../common/Logo'

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Safety Resources', href: '/safety-resources' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.08] bg-bg-main">
      <div className="content-container py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Logo showTagline />

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-text-main"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-8">
          <p className="text-sm text-text-muted">
            &copy; {year} Let It Burn. All rights reserved.
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-text-muted/80">
            Let It Burn is a self-reflection tool and not a substitute for
            professional mental health care.
          </p>
        </div>
      </div>
    </footer>
  )
}
