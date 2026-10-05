import { ArrowRight, Flame, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import heroImage from '../../assets/hero-lake-sunset.png'
import HeroBurningNoteVisual from './HeroBurningNoteVisual'

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const showFallback = imageError

  return (
    <section
      className="relative min-h-[420px] overflow-x-hidden md:min-h-[560px] lg:min-h-[600px]"
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
            className={`absolute inset-0 h-full w-full object-cover object-[50%_42%] sm:object-[50%_40%] lg:object-center transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-bg-main/90 from-0% via-bg-main/50 via-32% to-transparent to-52% max-md:from-bg-main/95 max-md:via-bg-main/70 max-md:to-bg-main/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-bg-main/20 via-40% to-transparent md:from-bg-main/60" />
      </div>

      <div className="content-container relative z-10 flex min-h-[420px] items-center py-8 md:min-h-[560px] md:py-16 lg:min-h-[600px]">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-8 xl:gap-12">
          <div className="max-w-xl lg:max-w-none">
            <h1
              id="hero-heading"
              className="font-heading text-[36px] font-semibold leading-[1.05] tracking-tight sm:text-[48px] md:text-[58px] lg:text-[72px]"
            >
              <span className="block text-text-main">Write it.</span>
              <span className="block text-fire-orange">Burn it.</span>
              <span className="block text-calm-cyan">Breathe.</span>
            </h1>

            <span className="hero-brush-underline" aria-hidden="true" />

            <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted md:mt-6 md:text-[19px] lg:text-[21px]">
              A private space to release thoughts, relax, and reflect.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
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

          <div className="relative hidden w-full min-w-0 justify-center lg:flex lg:justify-end">
            <HeroBurningNoteVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
