import type { ReactNode } from 'react'

const HANDLES = ['-top-[5px] -left-[5px]', '-top-[5px] -right-[5px]', '-bottom-[5px] -left-[5px]', '-right-[5px] -bottom-[5px]']

interface Props {
  className?: string
  children?: ReactNode
}

/** مربع التحديد بمقابضه الأربعة، كما يظهر حول أي عنصر في برامج التصميم. */
export function SelectionBox({ className = 'selection', children }: Props) {
  return (
    <div className={className} aria-hidden="true">
      {HANDLES.map((position) => (
        <span key={position} className={`selection-handle ${position}`} />
      ))}
      {children}
    </div>
  )
}
