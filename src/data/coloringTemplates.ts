import botanicalLeaves from '../assets/coloring-templates/botanical-leaves.svg'
import gentleWaves from '../assets/coloring-templates/gentle-waves.svg'
import mandalaBloom from '../assets/coloring-templates/mandala-bloom.svg'
import moonAndStars from '../assets/coloring-templates/moon-and-stars.svg'
import abstractGarden from '../assets/coloring-templates/abstract-garden.svg'
import cozyWindow from '../assets/coloring-templates/cozy-window.svg'
import type { ColoringTemplate } from '../types/drawing'

export const coloringTemplates: ColoringTemplate[] = [
  {
    id: 'botanical-leaves',
    title: 'Botanical Leaves',
    description: 'Soft leaf shapes for gentle coloring.',
    difficulty: 'simple',
    thumbnail: botanicalLeaves,
    source: botanicalLeaves,
    premium: false,
  },
  {
    id: 'gentle-waves',
    title: 'Gentle Waves',
    description: 'Flowing lines inspired by calm water.',
    difficulty: 'simple',
    thumbnail: gentleWaves,
    source: gentleWaves,
    premium: false,
  },
  {
    id: 'mandala-bloom',
    title: 'Mandala Bloom',
    description: 'A centered bloom for mindful detail.',
    difficulty: 'medium',
    thumbnail: mandalaBloom,
    source: mandalaBloom,
    premium: false,
  },
  {
    id: 'moon-and-stars',
    title: 'Moon and Stars',
    description: 'A quiet night sky to fill with color.',
    difficulty: 'medium',
    thumbnail: moonAndStars,
    source: moonAndStars,
    premium: false,
  },
  {
    id: 'abstract-garden',
    title: 'Abstract Garden',
    description: 'Organic shapes gathered like a soft garden.',
    difficulty: 'detailed',
    thumbnail: abstractGarden,
    source: abstractGarden,
    premium: false,
  },
  {
    id: 'cozy-window',
    title: 'Cozy Window',
    description: 'A warm window scene with gentle plants.',
    difficulty: 'detailed',
    thumbnail: cozyWindow,
    source: cozyWindow,
    premium: false,
  },
]
