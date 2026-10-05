import { coloringTemplates } from '../../data/coloringTemplates'
import { useEntitlements } from '../../context/EntitlementsContext'
import type { ColoringTemplate } from '../../types/drawing'
import TemplateCard from './TemplateCard'

interface TemplateGalleryProps {
  selectedTemplateId: string | null
  onSelect: (template: ColoringTemplate) => void
  onRemove: () => void
  visible: boolean
}

export default function TemplateGallery({
  selectedTemplateId,
  onSelect,
  onRemove,
  visible,
}: TemplateGalleryProps) {
  const { hasPack } = useEntitlements()

  if (!visible) return null

  return (
    <section className="mt-12" aria-labelledby="template-gallery-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="template-gallery-heading"
            className="font-heading text-2xl font-semibold text-text-main"
          >
            Coloring templates
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Choose a calming page to fill, pen, or brush with color.
          </p>
        </div>
        {selectedTemplateId && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-text-muted transition-colors hover:text-text-main"
          >
            Remove Template
          </button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coloringTemplates.map((template) => {
          const locked = Boolean(
            template.premium && template.packId && !hasPack(template.packId),
          )
          return (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              locked={locked}
              onSelect={onSelect}
            />
          )
        })}
      </div>
    </section>
  )
}
