import { useNavigate } from 'react-router-dom'
import { AppShell, BottomNav } from '../components/AppShell'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { MedDashLogo, formatMedicationName } from '../components/MedDashLogo'
import { useApp } from '../context/AppContext'
import { STAGE_LABELS } from '../types'

export function Home() {
  const navigate = useNavigate()
  const { user, getActiveOrder, orders } = useApp()
  const activeOrder = getActiveOrder()

  return (
    <AppShell>
      <div className="min-h-dvh pb-28">
        {/* Light editorial header */}
        <section className="frame-light px-8 pt-[max(1.5rem,env(safe-area-inset-top))] pb-12">
          <MedDashLogo size="xl" className="mb-12" />
          <p className="text-[11px] text-ash uppercase tracking-[0.12em]">
            Good {getGreeting()}
          </p>
          <h1 className="text-[45px] font-light text-carbon leading-[1.05] mt-2">
            {user?.firstName ?? 'Student'}
          </h1>
          <div className="mt-10 pt-8 border-t border-ash/20">
            <p className="text-[11px] text-ash uppercase tracking-[0.12em]">
              Delivering to
            </p>
            <p className="text-[18px] text-carbon mt-2 leading-[1.36]">
              {user?.dormBuilding}, Room {user?.roomNumber}
            </p>
            <div className="mt-4">
              <Badge>Insurance active</Badge>
            </div>
          </div>
        </section>

        {/* Dark immersive active order frame */}
        {activeOrder ? (
          <section className="frame-dark atmospheric-bg px-8 py-14">
            <button
              onClick={() => navigate(`/track/${activeOrder.id}`)}
              className="w-full text-left cursor-pointer"
            >
              <Badge inverted>
                {activeOrder.stage === 'arrived' ? 'Ready' : 'In progress'}
              </Badge>
              <p className="text-[29px] font-light text-paper-white leading-[1.2] mt-6">
                {formatMedicationName(activeOrder.medication)}
              </p>
              <p className="text-[11px] text-paper-white/40 mt-3 uppercase tracking-[0.1em]">
                {activeOrder.id}
              </p>
              <p className="text-[18px] text-paper-white/60 mt-6 leading-[1.58]">
                {STAGE_LABELS[activeOrder.stage]}
              </p>
              {activeOrder.stage === 'en_route' && activeOrder.distanceMeters != null && (
                <p className="text-[18px] text-paper-white mt-3">
                  {activeOrder.distanceMeters}m · ~{activeOrder.etaMinutes} min
                </p>
              )}
              <p className="text-[11px] text-paper-white/40 uppercase tracking-[0.12em] mt-10">
                View tracking →
              </p>
            </button>
          </section>
        ) : (
          <section className="frame-dark px-8 py-16 text-center">
            <p className="text-[29px] font-light text-paper-white leading-[1.2]">
              No active deliveries
            </p>
            <p className="text-[18px] text-paper-white/50 mt-4 leading-[1.58] mb-10">
              Request a prescription and we'll send a campus robot to your dorm.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/new-order')}
            >
              Request prescription
            </Button>
          </section>
        )}

        {/* Light how-it-works */}
        <section className="frame-light px-8 py-14">
          <p className="text-[11px] text-ash uppercase tracking-[0.12em] mb-10">
            How it works
          </p>
          <div className="space-y-10">
            {[
              { n: '01', t: 'Request your Rx', d: 'Share provider info if pharmacy needs it' },
              { n: '02', t: 'Robot picks up', d: 'Campus Starship fleet handles delivery' },
              { n: '03', t: 'QR unlock', d: 'Scan to open — only you have access' },
            ].map(({ n, t, d }) => (
              <div key={n} className="border-b border-ash/20 pb-10 last:border-0 last:pb-0">
                <span className="text-[11px] text-smoke">{n}</span>
                <p className="text-[18px] font-normal text-carbon mt-2">{t}</p>
                <p className="text-[16px] text-ash mt-1 leading-[1.58]">{d}</p>
              </div>
            ))}
          </div>
          {orders.length > 0 && (
            <p className="text-[11px] text-smoke uppercase tracking-[0.12em] mt-12 text-center">
              {orders.length} order{orders.length !== 1 ? 's' : ''} total
            </p>
          )}
        </section>

        <BottomNav />
      </div>
    </AppShell>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
