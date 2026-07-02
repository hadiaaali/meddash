export const ORDER_STAGES = [
  'submitted',
  'pharmacy_notified',
  'robot_pickup',
  'filling',
  'loaded',
  'en_route',
  'arrived',
] as const

export type OrderStage = (typeof ORDER_STAGES)[number]

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  studentId: string
  dormBuilding: string
  roomNumber: string
  phone: string
  insuranceCardUploaded: boolean
  insuranceCardPreview?: string
}

export interface ProviderInfo {
  name: string
  clinic: string
  phone: string
  npi?: string
}

export interface PrescriptionOrder {
  id: string
  medication?: string
  dosage?: string
  provider: ProviderInfo
  patientDateOfBirth: string
  notes?: string
  stage: OrderStage
  createdAt: string
  unlockCode: string
  robotId: string
  distanceMeters?: number
  etaMinutes?: number
}

export const STAGE_LABELS: Record<OrderStage, string> = {
  submitted: 'Order submitted',
  pharmacy_notified: 'Pharmacy notified',
  robot_pickup: 'Robot en route to pharmacy',
  filling: 'Prescription being filled',
  loaded: 'Loaded into delivery robot',
  en_route: 'Robot heading to your dorm',
  arrived: 'Arrived at your door',
}

export const STAGE_DESCRIPTIONS: Record<OrderStage, string> = {
  submitted: 'We received your request and are verifying details.',
  pharmacy_notified:
    'Campus pharmacy has been notified. A Starship robot is being dispatched for pickup.',
  robot_pickup: 'University delivery robot is traveling to the pharmacy.',
  filling:
    'Pharmacist is preparing your medication. Provider info is on file if needed.',
  loaded: 'Your prescription is secured in the robot compartment.',
  en_route: 'Track live distance as the robot navigates campus.',
  arrived: 'Show your QR code to unlock the compartment.',
}
