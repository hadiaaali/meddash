import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useApp } from '../context/AppContext'
import { formatMedicationName } from '../components/MedDashLogo'

export function QRUnlock() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { orders } = useApp()
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    navigate('/home')
    return null
  }

  return (
    <div className="fixed inset-0 atmospheric-bg flex flex-col items-center justify-center z-50 px-8">
      <button
        onClick={() => navigate(`/track/${order.id}`)}
        className="absolute top-[max(1.5rem,env(safe-area-inset-top))] right-8 text-[11px] uppercase tracking-[0.12em] text-paper-white/50 cursor-pointer"
      >
        Close
      </button>

      <div className="text-center mb-12">
        <p className="text-[11px] text-paper-white/40 uppercase tracking-[0.15em]">
          Secure unlock
        </p>
        <h1 className="text-[45px] font-light text-paper-white leading-[1.05] mt-4">
          Scan to open
        </h1>
        <p className="text-[18px] text-paper-white/50 mt-4">
          {order.robotId} · {formatMedicationName(order.medication)}
        </p>
      </div>

      <div className="p-8 bg-paper-white">
        <QRCodeSVG
          value={order.unlockCode}
          size={260}
          level="H"
          fgColor="#000000"
          bgColor="#ffffff"
        />
      </div>

      <p className="text-[11px] text-paper-white/40 uppercase tracking-[0.15em] mt-10">
        {order.unlockCode}
      </p>

      <p className="text-[16px] text-paper-white/30 mt-8 max-w-[280px] text-center leading-[1.58]">
        This code is unique to your order. The compartment will only open when scanned.
      </p>
    </div>
  )
}
