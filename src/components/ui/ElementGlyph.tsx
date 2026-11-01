import type { ReactNode, SVGProps } from 'react'

/** مساحة ممتلئة خفيفة داخل الرسم. */
const Fill = (props: SVGProps<SVGRectElement>) => (
  <rect fill="currentColor" fillOpacity={0.28} stroke="none" {...props} />
)

/** مساحة ممتلئة بالكامل، للعنصر الأهم في الرسم. */
const Solid = (props: SVGProps<SVGRectElement>) => <rect fill="currentColor" stroke="none" {...props} />

const Dot = (props: SVGProps<SVGCircleElement>) => <circle fill="currentColor" stroke="none" {...props} />

/** رسم Wireframe مصغّر لكل عنصر من عناصر التحدي، مفتاحه رقم اليوم. */
const GLYPHS: Record<number, ReactNode> = {
  1: (
    <>
      <rect x="10" y="6" width="28" height="36" rx="3" />
      <circle cx="24" cy="18" r="5" />
      <path d="M17 29h14M20 34h8" />
    </>
  ),
  2: (
    <>
      <Solid x="7" y="11" width="34" height="11" rx="5.5" />
      <rect x="7" y="27" width="34" height="11" rx="5.5" />
      <path d="M19 32.5h10" />
    </>
  ),
  3: (
    <>
      <rect x="6" y="8" width="36" height="32" rx="3" />
      <path d="M31 8v32" />
      <path d="M34.5 15h4M34.5 21h4M34.5 27h4" />
      <Fill x="10" y="13" width="9" height="10" rx="1.5" />
      <Fill x="21" y="13" width="6" height="10" rx="1.5" />
      <Solid x="10" y="27" width="17" height="8" rx="1.5" />
    </>
  ),
  4: (
    <>
      <rect x="5" y="17" width="38" height="14" rx="7" />
      <circle cx="33.5" cy="23.5" r="3" />
      <path d="M31.3 25.8l-2 2" />
      <path d="M12 24h13" />
    </>
  ),
  5: (
    <>
      <rect x="5" y="16" width="38" height="16" rx="3" />
      <Solid x="31" y="21.5" width="8" height="5" rx="1" />
      <path d="M10 24h4M18 24h4M26 24h1" />
    </>
  ),
  6: (
    <>
      <rect x="10" y="6" width="28" height="36" rx="3" />
      <rect x="15" y="13" width="18" height="6" rx="1.5" />
      <rect x="15" y="22" width="18" height="6" rx="1.5" />
      <Solid x="15" y="31" width="18" height="6" rx="3" />
    </>
  ),
  7: (
    <>
      <rect x="11" y="5" width="26" height="38" rx="3" />
      <Fill x="15" y="9" width="18" height="17" rx="1.5" />
      <path d="M22 16v-2h4v2M20 25v-7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v7" />
      <path d="M15 31h18M26 37h7" />
    </>
  ),
  8: (
    <>
      <rect x="11" y="5" width="26" height="38" rx="3" />
      <Solid x="19" y="10" width="10" height="7" rx="1.5" />
      <path d="M16 23h16M16 28h16M16 33h10" />
    </>
  ),
  9: (
    <>
      <rect x="5" y="14" width="38" height="20" rx="4" />
      <Dot cx="34" cy="24" r="3.5" />
      <path d="M11 21h16M16 27h11" />
    </>
  ),
  10: (
    <>
      <rect x="6" y="8" width="36" height="32" rx="3" />
      <Fill x="27" y="8" width="15" height="32" rx="3" />
      <path d="M27 8v32M31 15h7M31 21h7M31 27h7" />
    </>
  ),
  11: (
    <>
      <rect x="6" y="10" width="36" height="28" rx="3" />
      <Solid x="26" y="15" width="11" height="5" rx="1" />
      <path d="M11 32l6-5 6 3 7-7 7 3" />
    </>
  ),
  12: (
    <>
      <rect x="9" y="9" width="30" height="30" rx="3" strokeDasharray="3 3" />
      <path d="M24 19v10M19 24h10" />
    </>
  ),
  13: (
    <>
      <path d="M26 14h17" />
      <rect x="5" y="20" width="38" height="8" rx="4" />
      <Solid x="17" y="20" width="26" height="8" rx="4" />
      <path d="M5 34h9" />
    </>
  ),
  14: (
    <>
      <rect x="6" y="10" width="36" height="28" rx="3" />
      <Dot cx="36" cy="17" r="1.7" />
      <Dot cx="31" cy="17" r="1.7" />
      <Dot cx="26" cy="17" r="1.7" />
      <Dot cx="21" cy="17" r="1.7" />
      <path d="M12 24h24M18 30h18" />
    </>
  ),
  15: (
    <>
      <rect x="7" y="9" width="34" height="31" rx="3" />
      <path d="M7 17h34M15 6v6M33 6v6" />
      <Dot cx="15" cy="24" r="1.4" />
      <Dot cx="24" cy="24" r="1.4" />
      <Dot cx="33" cy="24" r="1.4" />
      <Dot cx="15" cy="32" r="1.4" />
      <Solid x="20.5" y="28.5" width="7" height="7" rx="1.5" />
      <Dot cx="33" cy="32" r="1.4" />
    </>
  ),
  16: (
    <>
      <rect x="7" y="5" width="34" height="38" rx="3" />
      <Fill x="7" y="5" width="34" height="11" rx="3" />
      <circle cx="31" cy="17" r="5" fill="var(--glyph-bg, none)" />
      <path d="M12 27h24M12 32h24M22 37h14" />
    </>
  ),
  17: (
    <>
      <path d="M8 14h32M8 24h32M8 34h32" />
      <circle cx="30" cy="14" r="3" fill="var(--glyph-bg, none)" />
      <circle cx="16" cy="24" r="3" fill="var(--glyph-bg, none)" />
      <circle cx="26" cy="34" r="3" fill="var(--glyph-bg, none)" />
    </>
  ),
  18: (
    <>
      <rect x="6" y="8" width="36" height="32" rx="3" />
      <path d="M21 8v32" />
      <path d="M26 15h11M26 21h11" />
      <Solid x="26" y="28" width="11" height="6" rx="1.5" />
      <path d="M11 15h5M11 21h5M11 27h5" />
    </>
  ),
  19: (
    <>
      <circle cx="30" cy="17" r="6" />
      <path d="M30 6v2M41 17h-2M37.8 9.2l-1.4 1.4" />
      <path
        d="M13 38a7 7 0 0 1-.6-14 9 9 0 0 1 17.2 1.5A6.3 6.3 0 0 1 29.5 38z"
        fill="var(--glyph-bg, none)"
      />
    </>
  ),
  20: (
    <>
      <rect x="6" y="9" width="36" height="30" rx="3" />
      <Fill x="6" y="9" width="36" height="8" rx="3" />
      <path d="M6 17h36M6 24.5h36M6 32h36M18 17v22M30 17v22" />
    </>
  ),
  21: (
    <>
      <rect x="6" y="6" width="36" height="22" rx="3" />
      <path d="M21 12.5v9l7-4.5z" fill="currentColor" />
      <path d="M6 34h36M18 40h24" />
    </>
  ),
  22: (
    <>
      <rect x="5" y="6" width="38" height="36" rx="3" strokeDasharray="3 3" />
      <rect x="12" y="14" width="24" height="20" rx="2.5" />
      <path d="M17 20h14" />
      <Solid x="24" y="26" width="8" height="4" rx="1" />
      <path d="M16 28h4" />
    </>
  ),
  23: (
    <>
      <path d="M42 9H18a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h20l4 3z" />
      <path d="M6 27h20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-3 3z" fill="currentColor" fillOpacity={0.28} />
    </>
  ),
  24: (
    <>
      <path d="M41 7v34H7" />
      <Fill x="31" y="25" width="5" height="11" rx="1" />
      <Fill x="23" y="20" width="5" height="16" rx="1" />
      <Fill x="15" y="28" width="5" height="8" rx="1" />
      <path d="M13 21l9-6 7 3 7-8" />
    </>
  ),
  25: (
    <>
      <rect x="14" y="4" width="20" height="40" rx="3.5" />
      <circle cx="24" cy="17" r="5.5" />
      <path d="M19 28h10" />
      <Dot cx="20" cy="36" r="1.3" />
      <Dot cx="24" cy="36" r="1.3" />
      <Dot cx="28" cy="36" r="1.3" />
    </>
  ),
  26: (
    <>
      <rect x="6" y="11" width="36" height="26" rx="3" />
      <Fill x="25" y="11" width="17" height="26" rx="3" />
      <path d="M11 18h9M11 24h9" />
      <Solid x="11" y="29" width="9" height="4" rx="1" />
    </>
  ),
  27: (
    <>
      <rect x="27" y="10" width="14" height="8" rx="4" />
      <Dot cx="37" cy="14" r="2.3" />
      <rect x="27" y="30" width="14" height="8" rx="4" />
      <Dot cx="37" cy="34" r="2.3" />
      <rect x="27" y="20" width="14" height="8" rx="4" />
      <Dot cx="31" cy="24" r="2.3" />
      <path d="M7 14h13M7 24h13M7 34h13" />
    </>
  ),
  28: (
    <>
      <rect x="5" y="14" width="11" height="24" rx="2" />
      <Solid x="18.5" y="9" width="11" height="29" rx="2" />
      <rect x="32" y="14" width="11" height="24" rx="2" />
      <path d="M8 21h5M8 27h5M35 21h5M35 27h5" />
    </>
  ),
  29: (
    <>
      <rect x="14" y="4" width="20" height="40" rx="3.5" />
      <circle cx="24" cy="16" r="5.5" strokeDasharray="20 15" />
      <Fill x="18" y="26" width="12" height="4" rx="1" />
      <Fill x="18" y="32" width="12" height="4" rx="1" />
    </>
  ),
  30: (
    <>
      <rect x="5" y="8" width="38" height="32" rx="3" />
      <path d="M5 15h38" />
      <Dot cx="38.5" cy="11.5" r="1" />
      <Dot cx="35" cy="11.5" r="1" />
      <path d="M15 22h18M19 27h10" />
      <Solid x="19" y="31" width="10" height="4.5" rx="2" />
    </>
  ),
}

interface Props {
  id: number
  className?: string
}

export function ElementGlyph({ id, className }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {GLYPHS[id]}
    </svg>
  )
}
