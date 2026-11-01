import type { Difficulty } from '../../types'

const LEVELS: Record<Difficulty, number> = { Easy: 1, Medium: 2, Advanced: 3 }

export function DifficultyMeter({ difficulty }: { difficulty: Difficulty }) {
  const level = LEVELS[difficulty]
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-navy-800" dir="ltr">
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={`w-1 rounded-[1px] ${bar <= level ? 'bg-navy-800' : 'bg-line'}`}
            style={{ height: 4 + bar * 3 }}
          />
        ))}
      </span>
      {difficulty}
    </span>
  )
}
