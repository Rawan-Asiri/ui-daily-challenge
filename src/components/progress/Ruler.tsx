import type { CSSProperties } from 'react'

interface Props {
  value: number
  max: number
  percent: number
}

/** شريط التقدم على هيئة مسطرة برنامج تصميم: تدريجة لكل تحدٍ. */
export function Ruler({ value, max, percent }: Props) {
  return (
    <div
      role="progressbar"
      aria-label="نسبة إنجاز التحديات"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} من ${max}، ${percent}%`}
      className="mt-8"
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}>
        {Array.from({ length: max }, (_, index) => {
          const position = index + 1
          const isMajor = position % 5 === 0
          const isFilled = position <= value
          return (
            <div key={position} className="flex flex-col items-center">
              <span
                className={`ruler-tick block w-0.5 rounded-full ${isMajor ? 'h-8' : 'h-5'} ${isFilled ? 'bg-navy-800' : 'bg-line'}`}
                style={{ '--tick': index } as CSSProperties}
              />
              <span aria-hidden="true" className={`mt-1 h-5 text-xs text-slate ${isMajor ? '' : 'invisible'}`}>
                {isMajor ? position : ''}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
