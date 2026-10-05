import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../types/drawing'
import {
  readLogicalImageData,
  writeLogicalImageData,
} from './canvasPixels'
import {
  isInsideTemplateBounds,
  type TemplateContentBounds,
} from './templateProcessing'

function hexToRgba(color: string): [number, number, number, number] {
  const normalized = color.replace('#', '')
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized

  const value = Number.parseInt(full, 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255, 255]
}

function colorsMatch(
  data: Uint8ClampedArray,
  index: number,
  target: [number, number, number, number],
  tolerance: number,
): boolean {
  return (
    Math.abs(data[index] - target[0]) <= tolerance &&
    Math.abs(data[index + 1] - target[1]) <= tolerance &&
    Math.abs(data[index + 2] - target[2]) <= tolerance &&
    Math.abs(data[index + 3] - target[3]) <= tolerance
  )
}

function isTemplateLinePixel(
  templateData: ImageData | null,
  pixelIndex: number,
): boolean {
  if (!templateData) return false

  return templateData.data[pixelIndex * 4 + 3] >= 24
}

function isFillableTemplatePixel(
  templateData: ImageData | null,
  pixelIndex: number,
  bounds: TemplateContentBounds | null,
): boolean {
  const px = pixelIndex % CANVAS_WIDTH
  const py = Math.floor(pixelIndex / CANVAS_WIDTH)

  if (!isInsideTemplateBounds(px, py, bounds)) {
    return false
  }

  return !isTemplateLinePixel(templateData, pixelIndex)
}

export function floodFillArtwork(
  artworkCanvas: HTMLCanvasElement,
  templateCanvas: HTMLCanvasElement | null,
  startX: number,
  startY: number,
  fillColor: string,
  templateBounds: TemplateContentBounds | null = null,
): boolean {
  const x = Math.floor(startX)
  const y = Math.floor(startY)

  if (x < 0 || y < 0 || x >= CANVAS_WIDTH || y >= CANVAS_HEIGHT) {
    return false
  }

  const artworkData = readLogicalImageData(artworkCanvas)
  const templateData = templateCanvas
    ? readLogicalImageData(templateCanvas)
    : null

  const startPixelIndex = y * CANVAS_WIDTH + x
  const startIndex = startPixelIndex * 4

  if (
    !isFillableTemplatePixel(templateData, startPixelIndex, templateBounds)
  ) {
    return false
  }

  const fillRgba = hexToRgba(fillColor)
  const target: [number, number, number, number] = [
    artworkData.data[startIndex],
    artworkData.data[startIndex + 1],
    artworkData.data[startIndex + 2],
    artworkData.data[startIndex + 3],
  ]

  if (colorsMatch(artworkData.data, startIndex, fillRgba, 0)) {
    return false
  }

  const tolerance = target[3] < 16 ? 0 : 24
  const visited = new Uint8Array(CANVAS_WIDTH * CANVAS_HEIGHT)
  const stack: Array<[number, number]> = [[x, y]]
  let filled = false

  while (stack.length > 0) {
    const [px, py] = stack.pop()!
    const pixelIndex = py * CANVAS_WIDTH + px

    if (px < 0 || py < 0 || px >= CANVAS_WIDTH || py >= CANVAS_HEIGHT) continue
    if (visited[pixelIndex]) continue

    const dataIndex = pixelIndex * 4

    if (!isFillableTemplatePixel(templateData, pixelIndex, templateBounds)) {
      continue
    }
    if (!colorsMatch(artworkData.data, dataIndex, target, tolerance)) continue

    visited[pixelIndex] = 1
    artworkData.data[dataIndex] = fillRgba[0]
    artworkData.data[dataIndex + 1] = fillRgba[1]
    artworkData.data[dataIndex + 2] = fillRgba[2]
    artworkData.data[dataIndex + 3] = fillRgba[3]
    filled = true

    stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1])
  }

  if (filled) {
    writeLogicalImageData(artworkCanvas, artworkData)
  }

  return filled
}
