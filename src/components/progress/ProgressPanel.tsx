import { TOTAL_CHALLENGES } from '../../data/challenges'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { Ruler } from './Ruler'

interface Props {
  completedCount: number
  hasDraws: boolean
  hasProgress: boolean
  onResetDraws: () => void
  onResetAll: () => void
}

function Figure({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <dt className="text-sm text-slate">{label}</dt>
      <dd className="font-display text-4xl leading-tight font-medium text-navy-950 sm:text-5xl">{value}</dd>
    </div>
  )
}

export function ProgressPanel({ completedCount, hasDraws, hasProgress, onResetDraws, onResetAll }: Props) {
  const percent = Math.round((completedCount / TOTAL_CHALLENGES) * 100)

  return (
    <section aria-labelledby="progress-title" id="progress" className="mx-auto max-w-6xl px-4 pt-16 sm:px-8 sm:pt-24">
      <SectionHeading id="progress-title" title="تقدمك في نوفمبر" />
      <dl className="flex flex-wrap gap-x-14 gap-y-4 sm:gap-x-20">
        <Figure value={`${percent}%`} label="نسبة الإنجاز" />
        <Figure value={completedCount} label="تحديات منجزة" />
        <Figure value={TOTAL_CHALLENGES - completedCount} label="تحديات متبقية" />
      </dl>
      <Ruler value={completedCount} max={TOTAL_CHALLENGES} percent={percent} />
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="quiet" className="-ms-4" onClick={onResetDraws} disabled={!hasDraws}>
          أعد ضبط السحب
        </Button>
        <Button variant="quiet" onClick={onResetAll} disabled={!hasProgress}>
          امسح كل التقدم
        </Button>
      </div>
    </section>
  )
}
