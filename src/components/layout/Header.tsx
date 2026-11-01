const LINKS = [
  { href: '#progress', label: 'تقدمي' },
  { href: '#history', label: 'السجل' },
]

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-8 sm:py-5">
      <a href="#draw" className="flex min-h-11 items-center gap-2.5 text-white" dir="ltr">
        <span className="relative border border-sky-300 px-1.5 text-sm leading-6 font-medium">
          UI
          <span className="absolute -top-[3px] -left-[3px] size-[5px] border border-sky-300 bg-white" />
          <span className="absolute -top-[3px] -right-[3px] size-[5px] border border-sky-300 bg-white" />
          <span className="absolute -bottom-[3px] -left-[3px] size-[5px] border border-sky-300 bg-white" />
          <span className="absolute -right-[3px] -bottom-[3px] size-[5px] border border-sky-300 bg-white" />
        </span>
        <span className="text-sm font-medium whitespace-nowrap">Daily Challenge</span>
      </a>
      <nav aria-label="التنقل الرئيسي">
        <ul className="flex items-center gap-0.5 sm:gap-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md px-1.5 text-sm whitespace-nowrap text-sky-200 transition-colors hover:text-white sm:px-3"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
