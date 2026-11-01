import type { ButtonHTMLAttributes } from 'react'

type Variant = 'bright' | 'solid' | 'outline' | 'quiet' | 'danger'
type Size = 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const VARIANTS: Record<Variant, string> = {
  bright: 'bg-sky-300 text-navy-950 hover:bg-sky-200',
  solid: 'bg-navy-900 text-white hover:bg-navy-800',
  outline: 'border border-line bg-white text-navy-900 hover:border-navy-700 hover:bg-mist',
  quiet: 'text-slate hover:bg-ice hover:text-navy-900',
  danger: 'bg-navy-950 text-white ring-2 ring-amber ring-offset-2 hover:bg-navy-800',
}

const SIZES: Record<Size, string> = {
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-14 px-7 text-base',
}

export function Button({ variant = 'solid', size = 'md', className = '', type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] disabled:cursor-default disabled:opacity-60 disabled:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  )
}
