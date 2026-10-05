import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { sounds } from '../../data/sounds'
import { useAuth } from '../../context/AuthContext'
import { useEntitlements } from '../../context/EntitlementsContext'
import { supabase } from '../../lib/supabaseClient'
import type { Database } from '../../types/database'

type SoundMixInsert = Database['public']['Tables']['sound_mixes']['Insert']
type LayerVolumes = Record<string, number>

function buildDefaultVolumes(): LayerVolumes {
  return Object.fromEntries(sounds.map((sound) => [sound.id, 0]))
}

export default function SoundMixer() {
  const { hasSoundMixer } = useEntitlements()
  const { user } = useAuth()
  const [volumes, setVolumes] = useState<LayerVolumes>(buildDefaultVolumes)
  const [playing, setPlaying] = useState(false)
  const [mixName, setMixName] = useState('My calm mix')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})

  const activeLayers = useMemo(
    () =>
      sounds
        .map((sound) => ({
          id: sound.id,
          title: sound.title,
          volume: volumes[sound.id] ?? 0,
        }))
        .filter((layer) => layer.volume > 0),
    [volumes],
  )

  useEffect(() => {
    for (const sound of sounds) {
      const audio = audioRefs.current[sound.id]
      if (!audio) continue
      audio.volume = Math.min(1, Math.max(0, (volumes[sound.id] ?? 0) / 100))
      if (playing && (volumes[sound.id] ?? 0) > 0) {
        void audio.play().catch(() => undefined)
      } else {
        audio.pause()
      }
    }
  }, [playing, volumes])

  useEffect(() => {
    return () => {
      for (const audio of Object.values(audioRefs.current)) {
        audio?.pause()
      }
    }
  }, [])

  if (!hasSoundMixer) {
    return (
      <section
        id="sound-mixer"
        className="mt-14 rounded-3xl border border-border-card bg-bg-card/40 p-6 md:mt-16 md:p-8"
        aria-labelledby="sound-mixer-heading"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          Optional upgrade
        </p>
        <h2
          id="sound-mixer-heading"
          className="mt-2 font-heading text-2xl font-semibold text-text-main md:text-3xl"
        >
          Layer your free sounds.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-text-muted md:text-base">
          The mixer lets you blend free library tracks with independent volume controls.
        </p>
        <Link
          to="/pricing"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-5 py-3 text-sm font-semibold text-calm-cyan"
        >
          View Sound Mixer on pricing
        </Link>
      </section>
    )
  }

  function setLayerVolume(id: string, next: number) {
    setVolumes((prev) => ({ ...prev, [id]: next }))
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaveError(null)
    setSaveMessage(null)

    if (!user) {
      setSaveError('Sign in to save mixes to your account.')
      return
    }

    setSaving(true)
    try {
      const layers = activeLayers.map((layer) => ({
        soundId: layer.id,
        volume: layer.volume,
      }))

      const payload: SoundMixInsert = {
        user_id: user.id,
        name: mixName.trim() || 'Untitled mix',
        layers,
      }

      const { error } = await supabase
        .from('sound_mixes')
        .insert(payload as never)

      if (error) throw error
      setSaveMessage('Mix saved to your account.')
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Unable to save this mix.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section
      id="sound-mixer"
      className="mt-14 rounded-3xl border border-border-card bg-bg-card/40 p-6 md:mt-16 md:p-8"
      aria-labelledby="sound-mixer-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Sound mixer
          </p>
          <h2
            id="sound-mixer-heading"
            className="mt-2 font-heading text-2xl font-semibold text-text-main md:text-3xl"
          >
            Blend free sounds gently.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted md:text-base">
            Raise a few layers, keep the rest quiet, and find a mix that feels steady.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main"
        >
          {playing ? 'Pause mix' : 'Play mix'}
        </button>
      </div>

      <ul className="mt-8 space-y-4">
        {sounds.map((sound) => (
          <li key={sound.id} className="rounded-2xl border border-white/8 bg-bg-main/25 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-text-main">{sound.title}</p>
                <p className="text-xs text-text-muted">{sound.description}</p>
              </div>
              <span className="text-xs tabular-nums text-text-muted">
                {volumes[sound.id] ?? 0}%
              </span>
            </div>
            <label className="mt-3 block">
              <span className="sr-only">Volume for {sound.title}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volumes[sound.id] ?? 0}
                onChange={(e) => setLayerVolume(sound.id, Number(e.target.value))}
                className="w-full accent-calm-cyan"
              />
            </label>
            <audio
              ref={(el) => {
                audioRefs.current[sound.id] = el
              }}
              src={sound.audioSrc}
              loop
              preload="none"
            />
          </li>
        ))}
      </ul>

      <form onSubmit={handleSave} className="mt-8 space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-text-main">Save this mix</span>
          <input
            type="text"
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
            placeholder="Mix name"
          />
        </label>
        {!user && (
          <p className="text-sm text-text-muted">
            <Link to="/auth" className="text-calm-cyan hover:underline">
              Sign in
            </Link>{' '}
            to store mixes on your account. You can still play without saving.
          </p>
        )}
        {saveError && (
          <p className="text-sm text-bright-orange" role="alert">
            {saveError}
          </p>
        )}
        {saveMessage && (
          <p className="text-sm text-calm-cyan" role="status">
            {saveMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={saving || activeLayers.length === 0}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-4 py-2.5 text-sm font-semibold text-calm-cyan disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save mix'}
        </button>
        {activeLayers.length === 0 && (
          <p className="text-xs text-text-muted">Raise at least one layer above 0% to save.</p>
        )}
      </form>

    </section>
  )
}
