import { Check } from 'lucide-react'
import { CHALLENGES, TOTAL_CHALLENGES } from '../../data/challenges'
import type { ChallengeStatus } from '../../types'
import { ElementGlyph } from '../ui/ElementGlyph'
import { SelectionBox } from './SelectionBox'

const TILE_STYLES: Record<ChallengeStatus, string> = {
  waiting: 'border-navy-800 bg-navy-900/60 text-sky-300/75',
  drawn: 'border-sky-300/70 bg-navy-800 text-sky-200',
  done: 'border-sky-300 bg-sky-300 text-navy-950',
}

interface Props {
  statusOf: (id: number) => ChallengeStatus
  highlightId: number | null
  currentId: number | null
  allDone: boolean
  summary: string
}

export function ChallengeBoard({ statusOf, highlightId, currentId, allDone, summary }: Props) {
  return (
    <div className="relative">
      <ol
        role="img"
        aria-label={summary}
        className="grid grid-cols-5 gap-1.5 sm:grid-cols-6 sm:gap-2"
      >
        {CHALLENGES.map(({ id }) => {
          const status = statusOf(id)
          const isCurrent = currentId === id && status !== 'done'
          return (
            <li
              key={id}
              data-tile={id}
              data-lit={highlightId === id}
              className={`tile relative grid aspect-square place-items-center rounded-[5px] border sm:aspect-[10/8.6] ${TILE_STYLES[status]} ${isCurrent ? 'border-amber!' : ''}`}
            >
              <span className="absolute start-1.5 top-0.5 text-[11px] leading-5 opacity-80">{id}</span>
              {status === 'done' && <Check className="absolute end-1 top-1 size-3" strokeWidth={3} aria-hidden="true" />}
              <ElementGlyph id={id} className="size-[58%] max-h-11 max-w-11" />
            </li>
          )
        })}
      </ol>
      {allDone && (
        <SelectionBox className="selection-all absolute -inset-1.5 border-[1.5px] border-amber [--selection-color:var(--color-amber)]">
          <span className="selection-tag" data-align="center" data-flip="true">
            {TOTAL_CHALLENGES} من {TOTAL_CHALLENGES}
          </span>
        </SelectionBox>
      )}
    </div>
  )
}
