import type { CSSProperties } from 'react'

const PIECES = 14
const COLORS = ['var(--color-amber)', 'var(--color-sky-300)', 'var(--color-navy-800)']

/** قطع مربعة بحجم مقابض التحديد تتطاير لحظة تسجيل الإنجاز. */
export function CompletionBurst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {Array.from({ length: PIECES }, (_, index) => (
        <span
          key={index}
          className="burst-piece"
          style={
            {
              '--angle': `${(360 / PIECES) * index}deg`,
              '--reach': `${-34 - (index % 3) * 12}px`,
              '--piece-color': COLORS[index % COLORS.length],
            } as CSSProperties
          }
        />
      ))}
    </span>
  )
}
