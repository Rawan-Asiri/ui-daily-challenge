import { Check, Info, X } from 'lucide-react'
import type { Toast } from '../../hooks/useToasts'

interface Props {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

export function Toaster({ toasts, onDismiss }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="on-navy pointer-events-none fixed inset-x-4 bottom-4 z-40 flex flex-col items-center gap-2"
    >
      {toasts.map((toast) => {
        const Icon = toast.tone === 'success' ? Check : Info
        return (
          <div
            key={toast.id}
            className="toast-enter pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-md bg-navy-950 py-2 ps-4 pe-2 text-sm text-white shadow-[0_12px_30px_-12px_rgb(10_31_64/0.6)]"
          >
            <Icon className={`size-4 shrink-0 ${toast.tone === 'success' ? 'text-amber' : 'text-sky-300'}`} aria-hidden="true" />
            <p className="min-w-0 flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="إغلاق التنبيه"
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded text-sky-200 transition-colors hover:bg-navy-800 hover:text-white"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
