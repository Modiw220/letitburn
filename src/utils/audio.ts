export function clampVolume(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)))
}

export function volumeToGain(volume: number): number {
  return clampVolume(volume) / 100
}

export function gainToVolume(gain: number): number {
  return clampVolume(Math.round(gain * 100))
}
