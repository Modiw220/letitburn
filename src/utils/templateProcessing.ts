export interface TemplateContentBounds {
  x: number
  y: number
  width: number
  height: number
}

export function knockOutLightTemplatePixels(
  imageData: ImageData,
  luminanceThreshold = 210,
): void {
  const { data } = imageData

  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3]
    if (alpha < 24) continue

    const luminance =
      0.299 * data[index] +
      0.587 * data[index + 1] +
      0.114 * data[index + 2]

    if (luminance >= luminanceThreshold) {
      data[index + 3] = 0
    }
  }
}

export function isInsideTemplateBounds(
  x: number,
  y: number,
  bounds: TemplateContentBounds | null,
): boolean {
  if (!bounds) return true

  return (
    x >= bounds.x &&
    y >= bounds.y &&
    x < bounds.x + bounds.width &&
    y < bounds.y + bounds.height
  )
}
