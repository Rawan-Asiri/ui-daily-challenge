import { getChallenge } from '../../data/challenges'
import type { ChallengeStatus } from '../../types'
import { Button } from '../ui/Button'
import { DifficultyMeter } from '../ui/DifficultyMeter'
import { ElementGlyph } from '../ui/ElementGlyph'

const GLYPH_STYLES: Record<ChallengeStatus, string> = {
  waiting: 'bg-mist text-slate',
  drawn: 'bg-ice text-navy-800',
  done: 'bg-navy-900 text-sky-200',
}

interface Props {
  id: number
  status: ChallengeStatus
  /** نص جانبي مثل تاريخ السحب أو الإنجاز. */
  meta: string
  onOpen: (id: number) => void
}

export function ChallengeRow({ id, status, meta, onOpen }: Props) {
  const challenge = getChallenge(id)
  if (!challenge) return null

  return (
    <li className="flex items-center gap-3 border-b border-line py-3 sm:gap-4">
      <span className={`grid size-12 shrink-0 place-items-center rounded-[5px] transition-colors ${GLYPH_STYLES[status]}`}>
        <ElementGlyph id={id} className="size-8" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-navy-950">
          <span className="text-slate">{id}.</span> <bdi>{challenge.element}</bdi>
        </p>
        <p className="text-sm text-slate">{challenge.subject}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm">
          <DifficultyMeter difficulty={challenge.difficulty} />
          <span className="text-slate">{meta}</span>
        </p>
      </div>
      {status !== 'waiting' && (
        <Button variant="outline" className="shrink-0" onClick={() => onOpen(id)} aria-label={`افتح بطاقة ${challenge.element}`}>
          افتح
        </Button>
      )}
    </li>
  )
}
