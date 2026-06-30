import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { AppShell, PageHeader } from '../components/AppShell'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressStepper } from '../components/ProgressStepper'
import { useApp, useOrderSimulation } from '../context/AppContext'
import { STAGE_DESCRIPTIONS } from '../types'
import { formatMedicationName, formatDosage } from '../components/MedDashLogo'

export function Tracking() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { orders, user } = useApp()
  const order = orders.find((o) => o.id === orderId)

  useOrderSimulation(orderId)

  if (!order) {
    return (
      <AppShell>
        <div className="frame-light p-8 min-h-dvh">
          <p className="text-[18px] text-ash">Order not found.</p>
          <Button onClick={() => navigate('/home')} className="mt-8">
            Go home
          </Button>
        </div>
      </AppShell>
    )
  }

  const showQR = order.stage === 'arrived' || order.stage === 'en_route'
  const canUnlock = order.stage === 'arrived'

  return (
    <AppShell>
      <div className="min-h-dvh pb-12">
        <section className="frame-light">
          <PageHeader
            title="Tracking"
            subtitle={formatMedicationName(order.medication)}
            backTo="/home"
          />
          <div className="px-8 pb-12 space-y-6">
            <p className="text-[11px] text-smoke uppercase tracking-[0.1em] -mt-6">
              {order.id}
            </p>
            <p className="text-[18px] text-ash leading-[1.58]">
              {formatDosage(order.dosage)}
            </p>
            <Badge>{canUnlock ? 'Arrived' : 'Active'}</Badge>
          </div>
        </section>

        {/* Dark status frame */}
        <section className="frame-dark atmospheric-bg px-8 py-14">
          <p className="text-[18px] text-paper-white/70 leading-[1.58]">
            {STAGE_DESCRIPTIONS[order.stage]}
          </p>

          {order.stage === 'en_route' && order.distanceMeters != null && (
            <div className="mt-10 pt-10 border-t border-paper-white/15">
              <p className="text-[11px] text-paper-white/40 uppercase tracking-[0.12em]">
                Live distance
              </p>
              <p className="text-[54px] font-light text-paper-white leading-[0.9] mt-3">
                {order.distanceMeters}m
              </p>
              <div className="mt-6 h-px bg-paper-white/20">
                <div
                  className="h-px bg-paper-white transition-all duration-1000"
                  style={{
                    width: `${Math.max(5, 100 - (order.distanceMeters / 420) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-[18px] text-paper-white/50 mt-4">
                ~{order.etaMinutes} min to {user?.dormBuilding}, Room {user?.roomNumber}
              </p>
            </div>
          )}

          {order.stage !== 'arrived' && order.stage !== 'submitted' && (
            <div className="mt-10 pt-10 border-t border-paper-white/15">
              <p className="text-[11px] text-paper-white/40 uppercase tracking-[0.12em]">
                Robot
              </p>
              <p className="text-[29px] font-light text-paper-white mt-2">
                {order.robotId}
              </p>
              <p className="text-[16px] text-paper-white/40 mt-1">
                Starship campus fleet
              </p>
            </div>
          )}
        </section>

        {showQR && (
          <section className="frame-light px-8 py-14 text-center">
            <p className="text-[11px] text-ash uppercase tracking-[0.12em] mb-6">
              Your unlock code
            </p>
            <p className="text-[18px] text-ash leading-[1.58] mb-10 max-w-[280px] mx-auto">
              {canUnlock
                ? 'Hold this QR code to the robot scanner to open your secure compartment.'
                : 'Your QR code is ready. It will unlock the robot when it arrives.'}
            </p>
            <div className="inline-block p-6 border border-ash/30">
              <QRCodeSVG
                value={order.unlockCode}
                size={180}
                level="H"
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
            <p className="text-[11px] text-smoke uppercase tracking-[0.15em] mt-8">
              {order.unlockCode}
            </p>
            {canUnlock && (
              <Button
                variant="primary"
                fullWidth
                className="mt-10"
                onClick={() => navigate(`/unlock/${order.id}`)}
              >
                Full-screen QR
              </Button>
            )}
          </section>
        )}

        <section className={`px-8 py-14 ${showQR ? 'frame-dark' : 'frame-light'}`}>
          <p
            className={`text-[11px] uppercase tracking-[0.12em] mb-10 ${
              showQR ? 'text-paper-white/40' : 'text-ash'
            }`}
          >
            Progress
          </p>
          <ProgressStepper currentStage={order.stage} dark={showQR} />
        </section>

        <section className="frame-light px-8 py-14 border-t border-ash/20">
          <p className="text-[11px] text-ash uppercase tracking-[0.12em] mb-6">
            Provider on file
          </p>
          <p className="text-[18px] text-carbon">{order.provider.name}</p>
          <p className="text-[18px] text-ash mt-2">{order.provider.clinic}</p>
          <p className="text-[18px] text-ash mt-1">{order.provider.phone}</p>
          <p className="text-[16px] text-smoke mt-4">
            Seen{' '}
            {new Date(order.dateSeen).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </section>
      </div>
    </AppShell>
  )
}
