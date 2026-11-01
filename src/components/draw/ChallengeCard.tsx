import { Check, Dices, LayoutGrid, X } from 'lucide-react'
import { useState } from 'react'
import { formatDate } from '../../lib/format'
import type { Challenge } from '../../types'
import { Button } from '../ui/Button'
import { DifficultyMeter } from '../ui/DifficultyMeter'
import { ElementGlyph } from '../ui/ElementGlyph'
import { CompletionBurst } from './CompletionBurst'

interface Props {
  challenge: Challenge
  completedAt: string | undefined
  canDrawAgain: boolean
  isEntering: boolean
  isBusy: boolean
  onComplete: () => void
  onDrawAnother: () => void
  onClose: () => void
}

export function ChallengeCard({
  challenge,
  completedAt,
  canDrawAgain,
  isEntering,
  isBusy,
  onComplete,
  onDrawAnother,
  onClose,
}: Props) {
  const [justCompleted, setJustCompleted] = useState(false)
  const isDone = completedAt !== undefined

  return (
    <article
      aria-labelledby="challenge-title"
      data-entering={isEntering}
      className="card-reveal grid grid-rows-[auto_1fr] overflow-hidden rounded-[3px] bg-white text-navy-900 sm:grid-cols-[1fr_30%] sm:grid-rows-1"
    >
      <div
        aria-hidden="true"
        className="paper-dots flex items-center justify-center bg-ice py-4 text-navy-800 [--glyph-bg:var(--color-ice)] sm:order-last sm:py-0"
      >
        <ElementGlyph id={challenge.id} className="card-rise size-20 sm:size-32" />
      </div>

      <div className="flex min-w-0 flex-col p-5 sm:p-8">
        <div className="card-rise flex items-center gap-4">
          <p className="font-display text-xl font-medium text-navy-950">اليوم {challenge.id}</p>
          <DifficultyMeter difficulty={challenge.difficulty} />
        </div>

        <h2
          id="challenge-title"
          tabIndex={-1}
          className="card-rise mt-3 text-[2rem] leading-tight font-medium tracking-tight text-navy-950 sm:mt-5 sm:text-[2.6rem]"
        >
          <bdi>{challenge.element}</bdi>
        </h2>

        <dl className="card-rise mt-3 grid gap-2 sm:mt-5 sm:gap-3">
          <div>
            <dt className="text-sm text-slate">الموضوع</dt>
            <dd className="text-lg leading-snug font-normal text-navy-900">{challenge.subject}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate">نوع التصميم</dt>
            <dd className="leading-snug font-normal text-navy-900">{challenge.designType}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          {isDone && (
            <div className="mb-4 flex items-center gap-3">
              <span className="relative grid size-8 shrink-0 place-items-center">
                {justCompleted && <CompletionBurst />}
                <span className={`grid size-8 place-items-center rounded-full bg-navy-900 text-white ${justCompleted ? 'pop-in' : ''}`}>
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                </span>
              </span>
              <p className="text-sm font-medium text-navy-900">
                {justCompleted ? 'أحسنت! أضفته إلى إنجازاتك.' : `أنجزته في ${formatDate(completedAt)}`}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {!isDone && (
              <Button
                variant="solid"
                className="grow sm:grow-0"
                disabled={isBusy}
                onClick={() => {
                  setJustCompleted(true)
                  onComplete()
                }}
              >
                <Check className="size-4" aria-hidden="true" />
                أنجزت التحدي
              </Button>
            )}
            {canDrawAgain && (
              <Button
                variant={isDone ? 'solid' : 'outline'}
                className="grow sm:grow-0"
                disabled={isBusy}
                onClick={onDrawAnother}
              >
                <Dices className="size-4" aria-hidden="true" />
                {isDone ? 'اسحب تحدي اليوم' : 'اسحب تحديًا آخر'}
              </Button>
            )}
            {isDone && (
              <Button variant="outline" className="grow sm:grow-0" disabled={isBusy} onClick={onClose}>
                <LayoutGrid className="size-4" aria-hidden="true" />
                العودة إلى اللوحة
              </Button>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        disabled={isBusy}
        aria-label="إغلاق البطاقة والعودة إلى اللوحة"
        className="absolute end-2 top-2 grid size-11 cursor-pointer place-items-center rounded-md text-navy-800 transition-colors hover:bg-white"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
    </article>
  )
}
