export function Badge({
  children,
  inverted,
}: {
  children: React.ReactNode
  inverted?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1 rounded-[75px] text-[11px] font-normal uppercase tracking-wide ${
        inverted
          ? 'bg-paper-white text-ink-black'
          : 'border border-ash text-ash'
      }`}
    >
      {children}
    </span>
  )
}
