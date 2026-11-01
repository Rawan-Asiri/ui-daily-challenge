import { Dices, RotateCcw } from 'lucide-react'
import { TOTAL_CHALLENGES } from '../../data/challenges'
import { countChallenges } from '../../lib/format'
import { Button } from '../ui/Button'

const LEGEND = [
  { label: 'في القرعة', swatch: 'border-navy-700 bg-navy-900' },
  { label: 'مسحوب', swatch: 'border-sky-300/70 bg-navy-800' },
  { label: 'منجز', swatch: 'border-sky-300 bg-sky-300' },
]

interface Props {
  poolCount: number
  completedCount: number
  isDrawing: boolean
  onDraw: () => void
  onReviewDrawn: () => void
  onResetDraws: () => void
  onResetAll: () => void
}

export function DrawBar({ poolCount, completedCount, isDrawing, onDraw, onReviewDrawn, onResetDraws, onResetAll }: Props) {
  if (completedCount === TOTAL_CHALLENGES) {
    return (
      <div className="pt-8">
        <p className="font-display text-2xl font-medium text-white">مبروك! أتممت تحدي نوفمبر كاملًا</p>
        <p className="mt-1 text-sky-200">ثلاثون واجهة في شهر واحد. يمكنك بدء دورة جديدة متى شئت.</p>
        <Button variant="bright" className="mt-4" onClick={onResetAll} id="draw-button">
          <RotateCcw className="size-4" aria-hidden="true" />
          ابدأ دورة جديدة
        </Button>
      </div>
    )
  }

  if (poolCount === 0) {
    const remaining = TOTAL_CHALLENGES - completedCount
    return (
      <div className="pt-6">
        <p className="font-medium text-white">سحبت كل التحديات</p>
        <p className="mt-0.5 text-sm text-sky-200">
          بقي {countChallenges(remaining)} دون إنجاز. افتحها من السجل، أو أعد ضبط السحب لتعود إلى القرعة.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="bright" onClick={onReviewDrawn} id="draw-button">
            راجع التحديات المسحوبة
          </Button>
          <Button variant="quiet" className="text-sky-200! hover:bg-navy-800!" onClick={onResetDraws}>
            أعد ضبط السحب
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-5">
      <Button
        id="draw-button"
        variant="bright"
        size="lg"
        className="w-full sm:w-auto"
        onClick={onDraw}
        disabled={isDrawing}
      >
        <Dices className="size-5" aria-hidden="true" />
        {isDrawing ? 'جارٍ السحب…' : 'اسحب تحدي اليوم'}
      </Button>
      <ul className="flex items-center gap-4 text-xs text-sky-200" aria-label="دليل ألوان الخانات">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span className={`size-3 rounded-[2px] border ${item.swatch}`} aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
