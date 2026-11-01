import { getChallenge } from '../data/challenges'
import type { LogEntry, ProgressState } from '../types'
import { EMPTY_PROGRESS } from './progress'

export const STORAGE_KEY = 'ui-daily-challenge:v1'

function parseEntries(value: unknown): LogEntry[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<number>()
  const entries: LogEntry[] = []
  for (const item of value as Partial<LogEntry>[]) {
    const { id, at } = item ?? {}
    if (typeof id !== 'number' || typeof at !== 'string') continue
    if (!getChallenge(id) || seen.has(id)) continue
    seen.add(id)
    entries.push({ id, at })
  }
  return entries
}

/** يحوّل النص المخزَّن إلى حالة سليمة، ويتجاهل أي بيانات تالفة. */
export function parseProgress(raw: string | null): ProgressState {
  if (!raw) return EMPTY_PROGRESS
  try {
    const data = JSON.parse(raw) as Partial<Record<keyof ProgressState, unknown>>
    const drawn = parseEntries(data.drawn)
    const completed = parseEntries(data.completed)
    const currentId =
      typeof data.currentId === 'number' && drawn.some((entry) => entry.id === data.currentId)
        ? data.currentId
        : null
    return { drawn, completed, currentId }
  } catch {
    return EMPTY_PROGRESS
  }
}

export function loadProgress(): ProgressState {
  try {
    return parseProgress(localStorage.getItem(STORAGE_KEY))
  } catch {
    return EMPTY_PROGRESS
  }
}

/** يعيد false إذا تعذّر الحفظ، كما في التصفح الخاص أو امتلاء التخزين. */
export function saveProgress(state: ProgressState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}
