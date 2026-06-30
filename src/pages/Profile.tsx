import { useNavigate } from 'react-router-dom'
import { AppShell, BottomNav, PageHeader } from '../components/AppShell'
import { Badge } from '../components/ui/Badge'
import { useApp } from '../context/AppContext'
import { STAGE_LABELS } from '../types'
import { formatMedicationName } from '../components/MedDashLogo'

export function Orders() {
  const navigate = useNavigate()
  const { orders } = useApp()

  return (
    <AppShell>
      <div className="min-h-dvh frame-light pb-28">
        <PageHeader title="Orders" subtitle="All prescription deliveries" />

        <div className="px-8 space-y-0 animate-slide-up">
          {orders.length === 0 ? (
            <p className="text-[18px] text-ash leading-[1.58]">No orders yet</p>
          ) : (
            orders.map((order) => (
              <button
                key={order.id}
                onClick={() => navigate(`/track/${order.id}`)}
                className="w-full text-left cursor-pointer py-8 border-b border-ash/20 last:border-0"
              >
                <p className="text-[18px] text-carbon">
                  {formatMedicationName(order.medication)}
                </p>
                <p className="text-[11px] text-smoke uppercase tracking-[0.1em] mt-2">
                  {order.id}
                </p>
                <p className="text-[16px] text-ash mt-2">
                  {STAGE_LABELS[order.stage]}
                </p>
                <p className="text-[11px] text-smoke uppercase tracking-[0.12em] mt-4">
                  View →
                </p>
              </button>
            ))
          )}
        </div>

        <BottomNav />
      </div>
    </AppShell>
  )
}

export function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useApp()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AppShell>
      <div className="min-h-dvh pb-28">
        <section className="frame-light">
          <PageHeader title="Profile" subtitle="Your account & delivery info" />

          <div className="px-8 pb-12 animate-slide-up">
            <p className="text-[45px] font-light text-carbon leading-[1.05] -mt-4">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[18px] text-ash mt-3">{user?.email}</p>

            <div className="mt-12 space-y-8 pt-8 border-t border-ash/20">
              <InfoRow
                label="Dorm"
                value={`${user?.dormBuilding}, Room ${user?.roomNumber}`}
              />
              <InfoRow label="Student ID" value={user?.studentId ?? ''} />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-ash uppercase tracking-[0.12em]">
                  Insurance
                </span>
                <Badge>Active</Badge>
              </div>
            </div>
          </div>
        </section>

        {user?.insuranceCardPreview && (
          <section className="frame-dark px-8 py-14">
            <p className="text-[11px] text-paper-white/40 uppercase tracking-[0.12em] mb-6">
              Insurance card on file
            </p>
            <img
              src={user.insuranceCardPreview}
              alt="Insurance card"
              className="w-full max-h-40 object-cover opacity-90"
            />
          </section>
        )}

        <section className="frame-light px-8 py-10">
          <button
            onClick={handleLogout}
            className="text-[11px] uppercase tracking-[0.12em] text-ash cursor-pointer"
          >
            Sign out
          </button>
        </section>

        <BottomNav />
      </div>
    </AppShell>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-ash uppercase tracking-[0.12em]">{label}</p>
      <p className="text-[18px] text-carbon mt-2">{value}</p>
    </div>
  )
}
