import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  dark?: boolean
  padding?: boolean
}

export function Card({
  children,
  className = '',
  dark,
  padding = true,
}: CardProps) {
  return (
    <div
      className={`${dark ? 'bg-ink-black text-paper-white' : 'bg-paper-white text-carbon'} ${padding ? 'p-8' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
