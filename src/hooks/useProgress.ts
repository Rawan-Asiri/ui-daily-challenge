import { useEffect, useMemo, useReducer, useRef } from 'react'
import { getDrawPool, getStatus, progressReducer } from '../lib/progress'
import { loadProgress, saveProgress, STORAGE_KEY } from '../lib/storage'

export function useProgress(onSaveFailed: () => void) {
  const [state, dispatch] = useReducer(progressReducer, undefined, loadProgress)
  const warned = useRef(false)

  useEffect(() => {
    if (saveProgress(state) || warned.current) return
    warned.current = true
    onSaveFailed()
  }, [state, onSaveFailed])

  // إبقاء التبويبات المفتوحة متزامنة حتى لا يُحتسب إنجاز مرتين.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) dispatch({ type: 'replace', state: loadProgress() })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const pool = useMemo(() => getDrawPool(state), [state])
  const statusOf = useMemo(() => (id: number) => getStatus(state, id), [state])

  return { state, dispatch, pool, statusOf }
}
