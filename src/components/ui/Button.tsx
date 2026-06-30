import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'utility' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-normal transition-opacity duration-200 active:opacity-70 disabled:opacity-30 disabled:pointer-events-none cursor-pointer rounded-[75px]'

  const sizes = {
    sm: 'text-[11px] px-5 py-2',
    md: 'text-[12px] px-8 py-3',
    lg: 'text-[14px] px-10 py-4',
  }

  const variants = {
    primary: 'bg-paper-white text-ink-black border border-ink-black',
    utility: 'bg-graphite text-paper-white border border-transparent',
    ghost: 'bg-transparent text-carbon border border-carbon',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2 uppercase tracking-wide">
        {children}
      </span>
    </button>
  )
}
