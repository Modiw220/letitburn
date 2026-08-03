import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { getPageShellClass, type PageArchetype } from '../../utils/pageArchetypes'

type PageShellProps<T extends ElementType = 'main'> = {
  archetype: PageArchetype
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export default function PageShell<T extends ElementType = 'main'>({
  archetype,
  as,
  className = '',
  children,
  ...rest
}: PageShellProps<T>) {
  const Tag = (as ?? 'main') as ElementType

  return (
    <Tag
      data-page-archetype={archetype}
      className={`${getPageShellClass(archetype)} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
