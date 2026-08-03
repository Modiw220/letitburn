import { sounds } from '../../data/sounds'
import SoundCard from './SoundCard'

export default function SoundLibrary() {
  return (
    <section id="sound-library" className="mt-14 md:mt-16" aria-labelledby="sound-library-heading">
      <div className="max-w-2xl">
        <h2
          id="sound-library-heading"
          className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
        >
          Choose your atmosphere.
        </h2>
        <p className="mt-2 text-sm text-text-muted md:text-base">
          Free sounds play one at a time.
        </p>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        Free listening supports one sound at a time.{' '}
        <a href="#premium-preview" className="text-calm-cyan underline-offset-2 hover:underline">
          See future mixer features
        </a>
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {sounds.map((sound) => (
          <SoundCard key={sound.id} sound={sound} />
        ))}
      </div>
    </section>
  )
}
