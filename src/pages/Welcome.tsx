import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { Button } from '../components/ui/Button'
import { MedDashLogo } from '../components/MedDashLogo'

export function Welcome() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <div className="min-h-dvh flex flex-col">
        {/* Dark immersive frame */}
        <section className="atmospheric-bg flex-1 flex flex-col justify-between px-8 pt-[max(2.5rem,env(safe-area-inset-top))] pb-12 min-h-[55dvh]">
          <MedDashLogo size="lg" inverted className="animate-slide-up" />

          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-[54px] font-light text-paper-white leading-[0.95] mt-16">
              Prescriptions,
              <br />
              delivered.
            </h1>
            <p className="text-[18px] font-normal text-paper-white/60 mt-8 leading-[1.58] max-w-[300px]">
              Order prescription medication to your dorm via university delivery
              robots. Secure QR keeps your medications private.
            </p>
          </div>

          <p className="text-[9px] uppercase tracking-[0.2em] text-paper-white/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Scroll to explore
          </p>
        </section>

        {/* White editorial section */}
        <section className="frame-light px-8 py-14 space-y-10">
          {[
            {
              n: '01',
              title: 'Campus robot delivery',
              desc: "Uses your university's existing Starship fleet",
            },
            {
              n: '02',
              title: 'Personal QR unlock',
              desc: 'Only you can open the compartment',
            },
            {
              n: '03',
              title: 'Insurance covered',
              desc: 'Upload your card once — delivery fees included',
            },
          ].map(({ n, title, desc }, i) => (
            <div
              key={n}
              className="animate-slide-up border-b border-ash/20 pb-10 last:border-0 last:pb-0"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <span className="text-[11px] text-smoke uppercase tracking-[0.12em]">
                {n}
              </span>
              <p className="text-[29px] font-light text-carbon leading-[1.2] mt-3">
                {title}
              </p>
              <p className="text-[18px] text-ash mt-2 leading-[1.58]">{desc}</p>
            </div>
          ))}

          <div className="pt-4 space-y-6 animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/register')}>
              Get started
            </Button>
            <p className="text-center text-[11px] text-ash uppercase tracking-[0.12em]">
              Built for students, by students
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
