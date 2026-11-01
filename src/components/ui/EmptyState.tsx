import type { ReactNode } from 'react'
import { ElementGlyph } from './ElementGlyph'

interface Props {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-md border border-dashed border-line px-5 py-7">
      <ElementGlyph id={12} className="size-10 text-navy-700" />
      <div>
        <p className="font-medium text-navy-900">{title}</p>
        <p className="mt-0.5 text-sm text-slate">{description}</p>
      </div>
      {action}
    </div>
  )
}
