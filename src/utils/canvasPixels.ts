import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../types/drawing'

export const CANVAS_SURFACE_COLOR = '#FAF8F3'

export function getCanvasDeviceRatio(
  canvas: HTMLCanvasElement,
  logicalWidth = CANVAS_WIDTH,
): number {
  return canvas.width / logicalWidth
}

export function readLogicalImageData(
  canvas: HTMLCanvasElement,
  logicalWidth = CANVAS_WIDTH,
  logicalHeight = CANVAS_HEIGHT,
): ImageData {
  const offscreen = document.createElement('canvas')
  offscreen.width = logicalWidth
  offscreen.height = logicalHeight
  const ctx = offscreen.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    throw new Error('Unable to read canvas pixels')
  }

  ctx.drawImage(canvas, 0, 0, logicalWidth, logicalHeight)
  return ctx.getImageData(0, 0, logicalWidth, logicalHeight)
}

export function writeLogicalImageData(
  canvas: HTMLCanvasElement,
  imageData: ImageData,
  logicalWidth = CANVAS_WIDTH,
  logicalHeight = CANVAS_HEIGHT,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const offscreen = document.createElement('canvas')
  offscreen.width = logicalWidth
  offscreen.height = logicalHeight
  const offCtx = offscreen.getContext('2d')
  if (!offCtx) return

  offCtx.putImageData(imageData, 0, 0)

  const dpr = getCanvasDeviceRatio(canvas, logicalWidth)
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height)
  ctx.restore()
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

export function readLogicalPixel(
  imageData: ImageData,
  x: number,
  y: number,
): [number, number, number, number] {
  const px = Math.floor(x)
  const py = Math.floor(y)

  if (px < 0 || py < 0 || px >= imageData.width || py >= imageData.height) {
    return [0, 0, 0, 0]
  }

  const index = (py * imageData.width + px) * 4
  return [
    imageData.data[index],
    imageData.data[index + 1],
    imageData.data[index + 2],
    imageData.data[index + 3],
  ]
}
