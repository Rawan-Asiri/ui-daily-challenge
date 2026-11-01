import { CHALLENGES } from '../data/challenges'
import type { Challenge, ChallengeStatus, ProgressState } from '../types'

export const EMPTY_PROGRESS: ProgressState = { drawn: [], completed: [], currentId: null }

export type ProgressAction =
  | { type: 'draw'; id: number; at: string }
  | { type: 'complete'; id: number; at: string }
  | { type: 'open'; id: number }
  | { type: 'close' }
  | { type: 'resetDraws' }
  | { type: 'resetAll' }
  | { type: 'replace'; state: ProgressState }

const includes = (entries: ProgressState['drawn'], id: number) =>
  entries.some((entry) => entry.id === id)

export function getStatus(state: ProgressState, id: number): ChallengeStatus {
  if (includes(state.completed, id)) return 'done'
  if (includes(state.drawn, id)) return 'drawn'
  return 'waiting'
}

/** التحديات المتاحة للقرعة: لم تُسحب في الدورة الحالية ولم تُنجز. */
export function getDrawPool(state: ProgressState): Challenge[] {
  return CHALLENGES.filter((challenge) => getStatus(state, challenge.id) === 'waiting')
}

export function pickRandom<T>(items: readonly T[], random: () => number = Math.random): T | undefined {
  return items[Math.floor(random() * items.length)]
}

export function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'draw':
      if (getStatus(state, action.id) !== 'waiting') return state
      return {
        ...state,
        drawn: [...state.drawn, { id: action.id, at: action.at }],
        currentId: action.id,
      }
    case 'complete':
      if (includes(state.completed, action.id)) return state
      return { ...state, completed: [...state.completed, { id: action.id, at: action.at }] }
    case 'open':
      return getStatus(state, action.id) === 'waiting' ? state : { ...state, currentId: action.id }
    case 'close':
      return { ...state, currentId: null }
    case 'resetDraws':
      // يبقى المنجز كما هو، وتعود التحديات المسحوبة غير المنجزة إلى القرعة.
      return {
        ...state,
        drawn: state.drawn.filter((entry) => includes(state.completed, entry.id)),
        currentId: null,
      }
    case 'resetAll':
      return EMPTY_PROGRESS
    case 'replace':
      return action.state
  }
}
