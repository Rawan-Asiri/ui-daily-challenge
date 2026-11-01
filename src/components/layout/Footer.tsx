export function Footer() {
  return (
    <footer className="on-navy bg-navy-950 text-sm text-sky-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <p>تصميم وتطوير : روان عسيري 2026</p>
        <a
          href="https://x.com/r_01awan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="حساب روان عسيري على X"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-navy-700 text-sky-200 transition-colors hover:border-sky-300 hover:text-white"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
            <path d="M18.9 2h3.4l-7.4 8.5L22.7 22h-6.7l-5.2-7.3L5.1 22H1.7l7.9-9.1L1.3 2h6.9l4.7 6.6L18.9 2Zm-1.2 18h1.8L7.2 3.9H5.3L17.7 20Z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
