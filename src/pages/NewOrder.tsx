import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell, BottomNav, PageHeader } from '../components/AppShell'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useApp } from '../context/AppContext'

export function NewOrder() {
  const navigate = useNavigate()
  const { createOrder } = useApp()
  const [form, setForm] = useState({
    providerName: '',
    providerClinic: '',
    providerPhone: '',
    patientDateOfBirth: '',
    notes: '',
  })

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const isValid =
    form.providerName.trim() &&
    form.providerClinic.trim() &&
    form.providerPhone.trim() &&
    form.patientDateOfBirth

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    const orderId = createOrder({
      provider: {
        name: form.providerName.trim(),
        clinic: form.providerClinic.trim(),
        phone: form.providerPhone.trim(),
      },
      patientDateOfBirth: form.patientDateOfBirth,
      notes: form.notes.trim() || undefined,
    })

    navigate(`/track/${orderId}`)
  }

  return (
    <AppShell>
      <div className="min-h-dvh frame-light pb-28">
        <PageHeader
          title="New prescription"
          subtitle="We'll notify the pharmacy and dispatch a campus robot for pickup."
          backTo="/home"
        />

        <form onSubmit={handleSubmit} className="px-8 space-y-10 animate-slide-up">
          <p className="text-[18px] text-ash leading-[1.58] -mt-4">
            Share your provider details so the pharmacy can locate your
            prescription. If they haven't received it yet, they'll contact your
            provider directly.
          </p>

          <div>
            <p className="text-[11px] text-ash uppercase tracking-[0.12em] mb-8">
              Provider info
            </p>
            <div className="space-y-8">
              <Input
                label="Provider name"
                placeholder="Dr. Sarah Mitchell"
                value={form.providerName}
                onChange={(e) => update('providerName', e.target.value)}
              />
              <Input
                label="Clinic or hospital"
                placeholder="University Health Center"
                value={form.providerClinic}
                onChange={(e) => update('providerClinic', e.target.value)}
              />
              <Input
                label="Provider phone"
                type="tel"
                placeholder="(555) 987-6543"
                value={form.providerPhone}
                onChange={(e) => update('providerPhone', e.target.value)}
              />
              <Input
                label="Patient date of birth"
                type="date"
                value={form.patientDateOfBirth}
                onChange={(e) => update('patientDateOfBirth', e.target.value)}
                hint="Soharmaxys uses this to look up patients in their system"
              />
            </div>
          </div>

          <Input
            label="Additional notes (optional)"
            placeholder="Allergies, preferred pickup time..."
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
          />

          <div className="pt-4 pb-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={!isValid}
            >
              Submit & notify pharmacy
            </Button>
            <p className="text-center text-[11px] text-smoke uppercase tracking-[0.12em] mt-6">
              Starship robot dispatched on submit
            </p>
          </div>
        </form>

        <BottomNav />
      </div>
    </AppShell>
  )
}
