import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { AppShell } from '../components/AppShell'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useApp } from '../context/AppContext'
import type { UserProfile } from '../types'

const STEPS = ['About you', 'Your dorm', 'Insurance'] as const

const DORMS = [
  'North Hall',
  'South Tower',
  'East Village',
  'West Commons',
  'Central Quad',
  'Riverside',
]

export function Register() {
  const navigate = useNavigate()
  const { register } = useApp()
  const fileRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(0)
  const [insurancePreview, setInsurancePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    phone: '',
    dormBuilding: '',
    roomNumber: '',
  })

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  const canProceed = () => {
    if (step === 0)
      return form.firstName && form.lastName && form.email && form.studentId
    if (step === 1) return form.dormBuilding && form.roomNumber && form.phone
    if (step === 2) return !!insurancePreview
    return false
  }

  const handleInsuranceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setInsurancePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const user: UserProfile = {
      ...form,
      insuranceCardUploaded: true,
      insuranceCardPreview: insurancePreview ?? undefined,
    }
    register(user)
    navigate('/home')
  }

  return (
    <AppShell>
      <div className="min-h-dvh frame-light">
        <div className="px-8 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8">
          <button
            onClick={() => (step > 0 ? setStep(step - 1) : navigate('/'))}
            className="text-[11px] uppercase tracking-[0.12em] text-ash mb-10 cursor-pointer"
          >
            ← {step > 0 ? 'Back' : 'Home'}
          </button>

          <p className="text-[11px] text-smoke uppercase tracking-[0.12em]">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className="text-[45px] font-light text-carbon leading-[1.05] mt-3">
            Create account
          </h1>
          <p className="text-[18px] text-ash mt-3">{STEPS[step]}</p>

          <div className="flex gap-1 mt-10">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-px flex-1 ${i <= step ? 'bg-carbon' : 'bg-ash/30'}`}
              />
            ))}
          </div>
        </div>

        <div className="px-8 space-y-8 pb-12 animate-slide-up">
          {step === 0 && (
            <>
              <Input
                label="First name"
                placeholder="Alex"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
              />
              <Input
                label="Last name"
                placeholder="Chen"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
              />
              <Input
                label="University email"
                type="email"
                placeholder="alex.chen@university.edu"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
              <Input
                label="Student ID"
                placeholder="STU-2026-00482"
                value={form.studentId}
                onChange={(e) => update('studentId', e.target.value)}
                hint="Found on your student ID card"
              />
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-normal text-ash uppercase tracking-[0.08em]">
                  Dorm building
                </label>
                <select
                  value={form.dormBuilding}
                  onChange={(e) => update('dormBuilding', e.target.value)}
                  className="w-full bg-transparent border-b border-ash/40 py-4 text-[18px] text-carbon rounded-none"
                >
                  <option value="">Select your building</option>
                  {DORMS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Room number"
                placeholder="412B"
                value={form.roomNumber}
                onChange={(e) => update('roomNumber', e.target.value)}
              />
              <Input
                label="Phone number"
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                hint="For delivery notifications"
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-[18px] text-ash leading-[1.58]">
                Upload your university health insurance card so delivery fees are
                covered automatically.
              </p>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInsuranceUpload}
              />

              {insurancePreview ? (
                <div>
                  <img
                    src={insurancePreview}
                    alt="Insurance card"
                    className="w-full max-h-48 object-cover"
                  />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="mt-4 text-[11px] uppercase tracking-[0.12em] text-ash cursor-pointer"
                  >
                    Replace photo
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full border border-ash/40 py-16 flex flex-col items-center gap-4 cursor-pointer hover:border-carbon transition-colors"
                >
                  <Upload size={24} className="text-ash" strokeWidth={1.2} />
                  <div className="text-center">
                    <p className="text-[18px] text-carbon">Upload insurance card</p>
                    <p className="text-[16px] text-ash mt-2">
                      Photo or screenshot · Front side
                    </p>
                  </div>
                </button>
              )}
            </>
          )}

          <div className="pt-6">
            {step < STEPS.length - 1 ? (
              <Button
                variant="primary"
                fullWidth
                size="lg"
                disabled={!canProceed()}
                onClick={() => setStep(step + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                fullWidth
                size="lg"
                disabled={!canProceed()}
                onClick={handleSubmit}
              >
                Create account
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
