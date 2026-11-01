import { describe, expect, it } from 'vitest'
import { CHALLENGES, TOTAL_CHALLENGES } from '../data/challenges'
import { EMPTY_PROGRESS, getDrawPool, getStatus, pickRandom, progressReducer } from './progress'
import { parseProgress } from './storage'

const at = '2026-11-01T10:00:00.000Z'

describe('challenge data', () => {
  it('keeps all 30 challenges with unique sequential days', () => {
    expect(TOTAL_CHALLENGES).toBe(30)
    expect(CHALLENGES.map((c) => c.id)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1))
  })
})

describe('draw pool', () => {
  it('excludes drawn and completed challenges', () => {
    let state = progressReducer(EMPTY_PROGRESS, { type: 'draw', id: 3, at })
    state = progressReducer(state, { type: 'complete', id: 3, at })
    state = progressReducer(state, { type: 'draw', id: 7, at })
    const pool = getDrawPool(state).map((c) => c.id)
    expect(pool).toHaveLength(28)
    expect(pool).not.toContain(3)
    expect(pool).not.toContain(7)
  })

  it('never repeats across a full cycle', () => {
    let state = EMPTY_PROGRESS
    const seen = new Set<number>()
    for (let i = 0; i < 30; i++) {
      const next = pickRandom(getDrawPool(state))
      if (!next) throw new Error('pool ran out early')
      expect(seen.has(next.id)).toBe(false)
      seen.add(next.id)
      state = progressReducer(state, { type: 'draw', id: next.id, at })
    }
    expect(getDrawPool(state)).toHaveLength(0)
  })

  it('ignores drawing an unavailable challenge', () => {
    const state = progressReducer(EMPTY_PROGRESS, { type: 'draw', id: 5, at })
    expect(progressReducer(state, { type: 'draw', id: 5, at })).toBe(state)
  })
})

describe('completion', () => {
  it('counts a challenge only once', () => {
    let state = progressReducer(EMPTY_PROGRESS, { type: 'draw', id: 1, at })
    state = progressReducer(state, { type: 'complete', id: 1, at })
    state = progressReducer(state, { type: 'complete', id: 1, at })
    expect(state.completed).toHaveLength(1)
    expect(getStatus(state, 1)).toBe('done')
  })
})

describe('reset', () => {
  it('resetDraws returns undone challenges to the pool and keeps completed ones', () => {
    let state = progressReducer(EMPTY_PROGRESS, { type: 'draw', id: 1, at })
    state = progressReducer(state, { type: 'complete', id: 1, at })
    state = progressReducer(state, { type: 'draw', id: 2, at })
    state = progressReducer(state, { type: 'resetDraws' })
    expect(getStatus(state, 1)).toBe('done')
    expect(getStatus(state, 2)).toBe('waiting')
    expect(state.currentId).toBeNull()
  })

  it('resetAll clears everything', () => {
    const state = progressReducer(EMPTY_PROGRESS, { type: 'draw', id: 1, at })
    expect(progressReducer(state, { type: 'resetAll' })).toEqual(EMPTY_PROGRESS)
  })
})

describe('parseProgress', () => {
  it('falls back to empty progress on corrupted data', () => {
    expect(parseProgress('not json')).toEqual(EMPTY_PROGRESS)
    expect(parseProgress(null)).toEqual(EMPTY_PROGRESS)
    expect(parseProgress('{"drawn":5}')).toEqual(EMPTY_PROGRESS)
  })

  it('drops unknown ids and duplicates', () => {
    const raw = JSON.stringify({
      drawn: [{ id: 2, at }, { id: 2, at }, { id: 99, at }],
      completed: [{ id: 2, at }],
      currentId: 99,
    })
    expect(parseProgress(raw)).toEqual({
      drawn: [{ id: 2, at }],
      completed: [{ id: 2, at }],
      currentId: null,
    })
  })
})
