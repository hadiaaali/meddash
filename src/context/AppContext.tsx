import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type { UserProfile, PrescriptionOrder, OrderStage } from '../types'
import { ORDER_STAGES } from '../types'

interface AppState {
  isRegistered: boolean
  user: UserProfile | null
  orders: PrescriptionOrder[]
  activeOrderId: string | null
}

interface AppContextValue extends AppState {
  register: (user: UserProfile) => void
  createOrder: (
    order: Omit<
      PrescriptionOrder,
      'id' | 'stage' | 'createdAt' | 'unlockCode' | 'robotId'
    >,
  ) => string
  advanceOrderStage: (orderId: string) => void
  setOrderStage: (orderId: string, stage: OrderStage) => void
  updateOrderDistance: (orderId: string, distanceMeters: number, etaMinutes: number) => void
  logout: () => void
  getActiveOrder: () => PrescriptionOrder | null
}

const STORAGE_KEY = 'meddash-prototype'

const AppContext = createContext<AppContextValue | null>(null)

function generateId() {
  return `MD-${Date.now().toString(36).toUpperCase()}`
}

function generateUnlockCode() {
  return `MD-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { isRegistered: false, user: null, orders: [], activeOrderId: null }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const register = useCallback((user: UserProfile) => {
    setState((s) => ({ ...s, isRegistered: true, user }))
  }, [])

  const createOrder = useCallback(
    (
      order: Omit<
        PrescriptionOrder,
        'id' | 'stage' | 'createdAt' | 'unlockCode' | 'robotId'
      >,
    ) => {
      const id = generateId()
      const newOrder: PrescriptionOrder = {
        ...order,
        id,
        stage: 'submitted',
        createdAt: new Date().toISOString(),
        unlockCode: generateUnlockCode(),
        robotId: `STAR-${Math.floor(1000 + Math.random() * 9000)}`,
        distanceMeters: undefined,
        etaMinutes: undefined,
      }
      setState((s) => ({
        ...s,
        orders: [newOrder, ...s.orders],
        activeOrderId: id,
      }))
      return id
    },
    [],
  )

  const setOrderStage = useCallback((orderId: string, stage: OrderStage) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => {
        if (o.id !== orderId) return o
        const updated = { ...o, stage }
        if (stage === 'en_route') {
          updated.distanceMeters = 420
          updated.etaMinutes = 8
        }
        if (stage === 'arrived') {
          updated.distanceMeters = 0
          updated.etaMinutes = 0
        }
        return updated
      }),
    }))
  }, [])

  const advanceOrderStage = useCallback((orderId: string) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => {
        if (o.id !== orderId) return o
        const idx = ORDER_STAGES.indexOf(o.stage)
        if (idx >= ORDER_STAGES.length - 1) return o
        const nextStage = ORDER_STAGES[idx + 1]
        const updated = { ...o, stage: nextStage }
        if (nextStage === 'en_route') {
          updated.distanceMeters = 420
          updated.etaMinutes = 8
        }
        if (nextStage === 'arrived') {
          updated.distanceMeters = 0
          updated.etaMinutes = 0
        }
        return updated
      }),
    }))
  }, [])

  const updateOrderDistance = useCallback(
    (orderId: string, distanceMeters: number, etaMinutes: number) => {
      setState((s) => ({
        ...s,
        orders: s.orders.map((o) =>
          o.id === orderId ? { ...o, distanceMeters, etaMinutes } : o,
        ),
      }))
    },
    [],
  )

  const logout = useCallback(() => {
    setState({ isRegistered: false, user: null, orders: [], activeOrderId: null })
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const getActiveOrder = useCallback(() => {
    if (!state.activeOrderId) return state.orders[0] ?? null
    return state.orders.find((o) => o.id === state.activeOrderId) ?? null
  }, [state.activeOrderId, state.orders])

  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        createOrder,
        advanceOrderStage,
        setOrderStage,
        updateOrderDistance,
        logout,
        getActiveOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function useOrderSimulation(orderId: string | undefined) {
  const { advanceOrderStage, updateOrderDistance, orders } = useApp()

  useEffect(() => {
    if (!orderId) return
    const order = orders.find((o) => o.id === orderId)
    if (!order || order.stage === 'arrived') return

    const delays: Partial<Record<OrderStage, number>> = {
      submitted: 3000,
      pharmacy_notified: 4000,
      robot_pickup: 5000,
      filling: 6000,
      loaded: 4000,
      en_route: 8000,
    }

    const delay = delays[order.stage] ?? 4000
    const timer = setTimeout(() => advanceOrderStage(orderId), delay)
    return () => clearTimeout(timer)
  }, [orderId, orders, advanceOrderStage])

  useEffect(() => {
    if (!orderId) return
    const order = orders.find((o) => o.id === orderId)
    if (!order || order.stage !== 'en_route') return

    const interval = setInterval(() => {
      const dist = order.distanceMeters ?? 420
      if (dist <= 30) {
        advanceOrderStage(orderId)
        return
      }
      const newDist = Math.max(0, dist - Math.floor(Math.random() * 40 + 20))
      const newEta = Math.max(1, Math.ceil(newDist / 55))
      updateOrderDistance(orderId, newDist, newEta)
    }, 2500)

    return () => clearInterval(interval)
  }, [orderId, orders, advanceOrderStage, updateOrderDistance])
}
