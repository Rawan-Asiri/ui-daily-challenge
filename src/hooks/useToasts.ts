import { useCallback, useRef, useState } from 'react'

export interface Toast {
  id: number
  message: string
  tone: 'success' | 'info'
}

const TOAST_DURATION = 4000

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (message: string, tone: Toast['tone'] = 'info') => {
      const id = nextId.current++
      setToasts((current) => [...current.slice(-2), { id, message, tone }])
      window.setTimeout(() => dismiss(id), TOAST_DURATION)
    },
    [dismiss],
  )

  return { toasts, notify, dismiss }
}
