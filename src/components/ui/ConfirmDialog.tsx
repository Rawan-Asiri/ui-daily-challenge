import { useEffect, useRef } from 'react'
import { Button } from './Button'

interface Props {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** يعتمد على <dialog> الأصلي، فيحصل مجانًا على حبس التركيز وإغلاق Esc وإعادة التركيز. */
export function ConfirmDialog({ open, title, description, confirmLabel, onConfirm, onCancel }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
      onClick={(event) => {
        if (event.target === ref.current) onCancel()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg bg-white p-0 text-navy-900 shadow-[0_24px_60px_-20px_rgb(10_31_64/0.5)]"
    >
      <div className="p-6 sm:p-7">
        <h2 id="confirm-title" className="font-display text-2xl font-medium text-navy-950">
          {title}
        </h2>
        <p id="confirm-description" className="mt-2 text-slate">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={onCancel} autoFocus>
            إلغاء
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
