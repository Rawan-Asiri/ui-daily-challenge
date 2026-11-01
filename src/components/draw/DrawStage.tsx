import { useMemo, type CSSProperties, type RefObject } from 'react'
import { getChallenge, TOTAL_CHALLENGES } from '../../data/challenges'
import { useDrawSequence } from '../../hooks/useDrawSequence'
import { countChallenges } from '../../lib/format'
import type { Challenge, ChallengeStatus, ProgressState } from '../../types'
import { ChallengeBoard } from './ChallengeBoard'
import { ChallengeCard } from './ChallengeCard'
import { DrawBar } from './DrawBar'
import { SelectionBox } from './SelectionBox'

export type DrawControls = ReturnType<typeof useDrawSequence>

interface Props {
  state: ProgressState
  pool: Challenge[]
  statusOf: (id: number) => ChallengeStatus
  frameRef: RefObject<HTMLDivElement | null>
  draw: DrawControls
  onComplete: (id: number) => void
  onReviewDrawn: () => void
  onResetDraws: () => void
  onResetAll: () => void
}

function tagPlacement(x: number, y: number, w: number) {
  const align = x < 18 ? 'left' : x + w > 82 ? 'right' : 'center'
  return { align, flip: y > 40 }
}

export function DrawStage({ state, pool, statusOf, frameRef, draw, onComplete, onReviewDrawn, onResetDraws, onResetAll }: Props) {
  const { phase, rect, highlightId, cardOpen } = draw
  const completedCount = state.completed.length
  const current = state.currentId === null ? undefined : getChallenge(state.currentId)
  const highlighted = highlightId === null ? undefined : getChallenge(highlightId)
  const isBusy = phase !== 'rest'
  const showCard = cardOpen && current !== undefined
  const showSelection = showCard || phase === 'hopping' || phase === 'landed'
  const showTag = highlighted !== undefined && (phase === 'hopping' || phase === 'landed')
  const placement = tagPlacement(rect.x, rect.y, rect.w)

  const frameVars = useMemo(
    () => ({ '--x': rect.x, '--y': rect.y, '--w': rect.w, '--h': rect.h }) as CSSProperties,
    [rect],
  )

  const summary = `لوحة التحديات: ${countChallenges(completedCount)} منجز من ${TOTAL_CHALLENGES}، و${countChallenges(pool.length)} في القرعة.`

  return (
    <div ref={frameRef} className="draw-frame" data-phase={phase} style={frameVars}>
      <div inert={showCard}>
        <ChallengeBoard
          statusOf={statusOf}
          highlightId={phase === 'hopping' || phase === 'landed' ? highlightId : null}
          currentId={phase === 'hopping' ? null : state.currentId}
          allDone={completedCount === TOTAL_CHALLENGES && !showCard}
          summary={summary}
        />
        <DrawBar
          poolCount={pool.length}
          completedCount={completedCount}
          isDrawing={isBusy}
          onDraw={draw.draw}
          onReviewDrawn={onReviewDrawn}
          onResetDraws={onResetDraws}
          onResetAll={onResetAll}
        />
      </div>

      {showCard && (
        <ChallengeCard
          key={current.id}
          challenge={current}
          completedAt={state.completed.find((entry) => entry.id === current.id)?.at}
          canDrawAgain={pool.length > 0}
          isEntering={phase === 'expanding'}
          isBusy={isBusy}
          onComplete={() => onComplete(current.id)}
          onDrawAnother={draw.draw}
          onClose={draw.close}
        />
      )}

      {showSelection && (
        <SelectionBox>
          {showTag && (
            <span className="selection-tag" data-align={placement.align} data-flip={placement.flip}>
              {highlighted.id}. <bdi>{highlighted.element}</bdi>
            </span>
          )}
        </SelectionBox>
      )}

      <p className="sr-only" aria-live="polite">
        {phase === 'rest' && current
          ? `التحدي الحالي: اليوم ${current.id}، ${current.element}، ${current.subject}، المستوى ${current.difficulty}.`
          : ''}
      </p>
    </div>
  )
}
