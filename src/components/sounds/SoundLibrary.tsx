import PageSectionIntro from '../common/PageSectionIntro'
import { sounds } from '../../data/sounds'
import SoundCard from './SoundCard'

export default function SoundLibrary() {
  return (
    <section id="sound-library" className="mt-14 md:mt-16" aria-labelledby="sound-library-heading">
      <PageSectionIntro
        title="Choose your atmosphere."
        description="Free sounds play one at a time so the page stays calm and the decision stays light."
        className="max-w-2xl"
      />

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
