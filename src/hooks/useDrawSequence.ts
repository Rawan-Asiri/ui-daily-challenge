import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { pickRandom } from '../lib/progress'
import type { Challenge } from '../types'

/** موضع مربع التحديد كنسب مئوية من الإطار، ليبقى صحيحًا عند تغيير حجم الشاشة. */
export interface SelectionRect {
  x: number
  y: number
  w: number
  h: number
}

export type DrawPhase = 'rest' | 'collapsing' | 'hopping' | 'landed' | 'expanding'

const FULL: SelectionRect = { x: 0, y: 0, w: 100, h: 100 }

const HOPS = 16
const HOP_MIN_MS = 55
const HOP_EXTRA_MS = 290
const LAND_MS = 420
export const GROW_MS = 560
export const COLLAPSE_MS = 320

interface Options {
  frameRef: RefObject<HTMLDivElement | null>
  pool: Challenge[]
  currentId: number | null
  onSelect: (id: number) => void
  onOpen: (id: number) => void
  onClose: () => void
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// لا يعمل requestAnimationFrame في التبويب المخفي، فالمهلة تمنع توقف القرعة إذا غادره المستخدم أثناءها.
const nextPaint = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })

const focusById = (id: string) => document.getElementById(id)?.focus({ preventScroll: true })

function buildHopPath(pool: Challenge[], target: Challenge): number[] {
  if (pool.length === 1) return [target.id]
  const path: number[] = []
  for (let i = 0; i < HOPS - 1; i++) {
    const isBeforeLanding = i === HOPS - 2
    const options = pool.filter(
      ({ id }) => id !== path.at(-1) && !(isBeforeLanding && id === target.id),
    )
    path.push((pickRandom(options) ?? target).id)
  }
  return [...path, target.id]
}

export function useDrawSequence({ frameRef, pool, currentId, onSelect, onOpen, onClose }: Options) {
  const [phase, setPhase] = useState<DrawPhase>('rest')
  const [rect, setRect] = useState<SelectionRect>(FULL)
  const [highlightId, setHighlightId] = useState<number | null>(null)
  const [cardOpen, setCardOpen] = useState(currentId !== null)
  const timers = useRef(new Set<number>())

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
      pending.clear()
    }
  }, [])

  // أثناء السكون تتبع البطاقة الحالة المحفوظة: استعادة بعد التحميل، أو مسح، أو تغيير من تبويب آخر.
  useEffect(() => {
    if (phase !== 'rest') return
    setCardOpen(currentId !== null)
    setRect(FULL)
    setHighlightId(null)
  }, [phase, currentId])

  const wait = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => {
          timers.current.delete(timer)
          resolve()
        }, ms)
        timers.current.add(timer)
      }),
    [],
  )

  const tileRect = useCallback(
    (id: number): SelectionRect => {
      const frame = frameRef.current?.getBoundingClientRect()
      const tile = frameRef.current?.querySelector(`[data-tile="${id}"]`)?.getBoundingClientRect()
      if (!frame || !tile) return FULL
      return {
        x: ((tile.left - frame.left) / frame.width) * 100,
        y: ((tile.top - frame.top) / frame.height) * 100,
        w: (tile.width / frame.width) * 100,
        h: (tile.height / frame.height) * 100,
      }
    },
    [frameRef],
  )

  const collapse = useCallback(
    async (id: number) => {
      setPhase('collapsing')
      setHighlightId(id)
      setRect(tileRect(id))
      await wait(COLLAPSE_MS)
      setCardOpen(false)
    },
    [tileRect, wait],
  )

  const expand = useCallback(async () => {
    setPhase('expanding')
    setCardOpen(true)
    await nextPaint()
    setRect(FULL)
    await wait(GROW_MS)
    setPhase('rest')
    focusById('challenge-title')
  }, [wait])

  const draw = useCallback(async () => {
    if (phase !== 'rest') return
    const target = pickRandom(pool)
    if (!target) return

    if (prefersReducedMotion()) {
      onSelect(target.id)
      await nextPaint()
      focusById('challenge-title')
      return
    }

    if (cardOpen && currentId !== null) await collapse(currentId)
    setPhase('hopping')

    const path = buildHopPath(pool, target)
    for (const [index, id] of path.entries()) {
      setHighlightId(id)
      setRect(tileRect(id))
      const progress = index / path.length
      await wait(HOP_MIN_MS + HOP_EXTRA_MS * progress ** 3)
    }

    setPhase('landed')
    onSelect(target.id)
    await wait(LAND_MS)
    await expand()
  }, [phase, pool, cardOpen, currentId, collapse, tileRect, wait, onSelect, expand])

  const open = useCallback(
    async (id: number) => {
      if (phase !== 'rest') return
      if (cardOpen || prefersReducedMotion()) {
        onOpen(id)
        await nextPaint()
        focusById('challenge-title')
        return
      }
      setHighlightId(id)
      setRect(tileRect(id))
      onOpen(id)
      await expand()
    },
    [phase, cardOpen, tileRect, onOpen, expand],
  )

  const close = useCallback(async () => {
    if (phase !== 'rest' || currentId === null) return
    if (!prefersReducedMotion()) await collapse(currentId)
    onClose()
    setPhase('rest')
    await nextPaint()
    focusById('draw-button')
  }, [phase, currentId, collapse, onClose])

  return { phase, rect, highlightId, cardOpen, draw, open, close }
}
