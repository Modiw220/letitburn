import { ArrowRight, Flame, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import heroImage from '../../assets/hero-burning-note.png'

const EMBER_POSITIONS = [
  { left: '72%', bottom: '22%', delay: '0s' },
  { left: '78%', bottom: '30%', delay: '1.2s' },
  { left: '84%', bottom: '18%', delay: '0.6s' },
  { left: '88%', bottom: '26%', delay: '2s' },
  { left: '76%', bottom: '34%', delay: '1.8s' },
  { left: '82%', bottom: '14%', delay: '2.4s' },
]

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const showFallback = imageError

  return (
    <section
      className="relative min-h-[520px] overflow-hidden md:min-h-[560px] lg:min-h-[600px]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {showFallback && (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-[#0d1a2e] to-bg-main">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(255,106,0,0.28),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(70,202,212,0.08),transparent_50%)]" />
          </div>
        )}

        {!imageError && (
          <img
            src={heroImage}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-[55%_50%] sm:object-[62%_52%] lg:object-[68%_55%] transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-bg-main/90 from-0% via-bg-main/55 via-28% to-transparent to-58% max-md:from-bg-main/95 max-md:via-bg-main/70 max-md:to-bg-main/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-bg-main/20 via-40% to-transparent md:from-bg-main/60" />
      </div>

      {EMBER_POSITIONS.map((ember, index) => (
        <span
          key={index}
          className="ember-particle pointer-events-none absolute z-[1]"
          style={{
            left: ember.left,
            bottom: ember.bottom,
            animationDelay: ember.delay,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="content-container relative z-10 flex min-h-[520px] items-center py-12 md:min-h-[560px] md:py-16 lg:min-h-[600px]">
        <div className="max-w-xl lg:max-w-[540px]">
          <h1
            id="hero-heading"
            className="font-heading text-[48px] font-semibold leading-[1.05] tracking-tight md:text-[58px] lg:text-[72px]"
          >
            <span className="block text-text-main">Write it.</span>
            <span className="block text-fire-orange">Burn it.</span>
            <span className="block text-calm-cyan">Breathe.</span>
          </h1>

          <span className="hero-brush-underline" aria-hidden="true" />

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted md:text-[19px] lg:text-[21px]">
            A private space to release thoughts, relax, and reflect.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/burn-thoughts"
              className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fire-orange to-bright-orange px-6 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <Flame className="h-[18px] w-[18px]" aria-hidden="true" />
              Start Releasing
            </Link>

            <a
              href="#tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-bg-secondary/60 px-6 py-3.5 text-base font-semibold text-text-main backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-bg-secondary/80"
            >
              Explore Relaxing Tools
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
              100% Anonymous
            </span>
            <span className="hidden text-white/30 sm:inline" aria-hidden="true">
              ·
            </span>
            <span>No Sign Up</span>
            <span className="hidden text-white/30 sm:inline" aria-hidden="true">
              ·
            </span>
            <span>Your Data Stays Private</span>
          </div>
        </div>
      </div>
    </section>
  )
}
