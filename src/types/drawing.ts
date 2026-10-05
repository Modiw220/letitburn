export type DrawingMode = 'blank' | 'template'

export type DrawingTool = 'pen' | 'brush' | 'eraser' | 'fill' | 'eyedropper'

export type WorkspaceStatus = 'ready' | 'drawing' | 'exporting' | 'error'

export type TemplateDifficulty = 'simple' | 'medium' | 'detailed'

export interface DrawingColor {
  name: string
  value: string
}

export interface ColoringTemplate {
  id: string
  title: string
  description: string
  difficulty: TemplateDifficulty
  thumbnail: string
  source: string
  premium: boolean
  packId?: string
}

export interface DrawingSettings {
  tool: DrawingTool
  color: string
  brushSize: number
}

export const CANVAS_WIDTH = 1200
export const CANVAS_HEIGHT = 900
export const MAX_HISTORY = 30

export const BRUSH_PRESETS = [2, 4, 8, 14, 22, 36] as const
export const DEFAULT_BRUSH_SIZE = 8
export const DEFAULT_COLOR = '#8C6BE8'
