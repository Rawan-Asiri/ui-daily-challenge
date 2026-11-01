import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  description?: string
  children?: ReactNode
}

export function SectionHeading({ id, title, description, children }: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div>
        <h2 id={id} className="font-display text-3xl leading-tight font-medium text-navy-950 sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-2 max-w-prose text-slate">{description}</p>}
      </div>
      {children}
    </div>
  )
}
