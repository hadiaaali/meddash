interface MedDashLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  inverted?: boolean
}

const sizes = {
  sm: { robot: 32, text: 'text-[14px]', gap: 'gap-3' },
  md: { robot: 40, text: 'text-[18px]', gap: 'gap-3' },
  lg: { robot: 48, text: 'text-[22px]', gap: 'gap-4' },
  xl: { robot: 56, text: 'text-[28px]', gap: 'gap-4' },
}

export function MedDashLogo({
  size = 'md',
  showText = true,
  className = '',
  inverted = false,
}: MedDashLogoProps) {
  const { robot, text, gap } = sizes[size]
  const fill = inverted ? '#ffffff' : '#000000'
  const stroke = inverted ? '#ffffff' : '#181818'
  const accent = inverted ? '#9a9a9a' : '#6d6d6d'

  return (
    <div className={`inline-flex items-center ${gap} ${className}`}>
      <div
        className="meddash-logo-robot relative shrink-0"
        style={{ width: robot, height: robot * 0.85 }}
        aria-hidden
      >
        <svg viewBox="0 0 52 44" fill="none" className="w-full h-full">
          <ellipse cx="26" cy="40" rx="22" ry="2" fill={accent} opacity="0.3" />
          <g className="meddash-logo-body">
            <rect x="10" y="14" width="32" height="20" rx="0" fill={fill} />
            <rect x="13" y="17" width="26" height="10" fill={accent} opacity="0.3" />
            <path d="M22 22h8M26 19v6" stroke={inverted ? '#000' : '#fff'} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="18" y="8" width="16" height="8" fill={fill} />
            <circle cx="22" cy="12" r="1.5" fill={inverted ? '#000' : '#fff'} />
            <circle cx="30" cy="12" r="1.5" fill={inverted ? '#000' : '#fff'} />
          </g>
          <g className="meddash-logo-wheel-left">
            <circle cx="17" cy="36" r="5" fill={stroke} />
            <circle cx="17" cy="36" r="2" fill={inverted ? '#000' : '#fff'} />
          </g>
          <g className="meddash-logo-wheel-right">
            <circle cx="35" cy="36" r="5" fill={stroke} />
            <circle cx="35" cy="36" r="2" fill={inverted ? '#000' : '#fff'} />
          </g>
        </svg>
      </div>
      {showText && (
        <span
          className={`${text} font-light leading-none tracking-tight ${
            inverted ? 'text-paper-white' : 'text-ink-black'
          }`}
        >
          MedDash
        </span>
      )}
    </div>
  )
}

export function formatMedicationName(medication?: string) {
  const trimmed = medication?.trim()
  return trimmed || 'Prescription pending'
}

export function formatDosage(dosage?: string) {
  const trimmed = dosage?.trim()
  return trimmed || 'Dosage to be confirmed by pharmacy'
}
