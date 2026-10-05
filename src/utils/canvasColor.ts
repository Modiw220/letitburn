import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../types/drawing'
import {
  CANVAS_SURFACE_COLOR,
  readLogicalImageData,
} from './canvasPixels'

function rgbaToHex(red: number, green: number, blue: number): string {
  const toHex = (value: number) => value.toString(16).padStart(2, '0')
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`
}

function isTemplateBoundary(
  red: number,
  green: number,
  blue: number,
  alpha: number,
): boolean {
  if (alpha < 24) return false

  const luminance = 0.299 * red + 0.587 * green + 0.114 * blue
  return luminance < 140
}

export function sampleCompositeColor(
  artworkCanvas: HTMLCanvasElement,
  templateCanvas: HTMLCanvasElement | null,
  x: number,
  y: number,
): string | null {
  const px = Math.floor(x)
  const py = Math.floor(y)

  if (px < 0 || py < 0 || px >= CANVAS_WIDTH || py >= CANVAS_HEIGHT) {
    return null
  }

  const artworkData = readLogicalImageData(artworkCanvas)
  const artworkIndex = (py * CANVAS_WIDTH + px) * 4
  const artworkAlpha = artworkData.data[artworkIndex + 3]

  if (artworkAlpha > 16) {
    return rgbaToHex(
      artworkData.data[artworkIndex],
      artworkData.data[artworkIndex + 1],
      artworkData.data[artworkIndex + 2],
    )
  }

  if (templateCanvas) {
    const templateData = readLogicalImageData(templateCanvas)
    const templateIndex = (py * CANVAS_WIDTH + px) * 4
    const templateAlpha = templateData.data[templateIndex + 3]

    if (templateAlpha > 16) {
      const red = templateData.data[templateIndex]
      const green = templateData.data[templateIndex + 1]
      const blue = templateData.data[templateIndex + 2]

      if (!isTemplateBoundary(red, green, blue, templateAlpha)) {
        return rgbaToHex(red, green, blue)
      }

      return null
    }
  }

  return CANVAS_SURFACE_COLOR
}
