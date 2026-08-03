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
      <div className="content-container py-10 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <Logo showTagline />
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Quiet tools for release, rest, and reflection. Use what helps. Leave what does not.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
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

        <div className="mt-8 border-t border-white/[0.06] pt-6">
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
