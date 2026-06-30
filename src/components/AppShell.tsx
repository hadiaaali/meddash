import { type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex justify-center bg-ink-black">
      <div className="w-full max-w-[430px] min-h-dvh relative overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}

export function BottomNav({ dark }: { dark?: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { path: '/home', label: 'Home' },
    { path: '/orders', label: 'Orders' },
    { path: '/new-order', label: 'New' },
    { path: '/profile', label: 'Profile' },
  ]

  return (
    <nav
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-8 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] ${
        dark ? 'bg-ink-black text-paper-white' : 'bg-paper-white text-carbon'
      }`}
    >
      <div className="flex justify-between items-center">
        {tabs.map(({ path, label }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`text-[11px] uppercase tracking-[0.12em] cursor-pointer transition-opacity ${
                active
                  ? dark
                    ? 'text-paper-white opacity-100'
                    : 'text-ink-black opacity-100'
                  : 'opacity-40'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  dark,
}: {
  title: string
  subtitle?: string
  backTo?: string
  dark?: boolean
}) {
  const navigate = useNavigate()

  return (
    <header className="px-8 pt-[max(1.5rem,env(safe-area-inset-top))] pb-10">
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          className={`text-[11px] uppercase tracking-[0.12em] mb-8 cursor-pointer opacity-60 hover:opacity-100 ${
            dark ? 'text-paper-white' : 'text-carbon'
          }`}
        >
          ← Back
        </button>
      )}
      <h1
        className={`text-[45px] font-light leading-[1.1] ${
          dark ? 'text-paper-white' : 'text-carbon'
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={`text-[18px] font-normal mt-4 leading-[1.58] ${
            dark ? 'text-paper-white/60' : 'text-ash'
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
