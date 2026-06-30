import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { Welcome } from './pages/Welcome'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { NewOrder } from './pages/NewOrder'
import { Tracking } from './pages/Tracking'
import { QRUnlock } from './pages/QRUnlock'
import { Profile, Orders } from './pages/Profile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isRegistered } = useApp()
  if (!isRegistered) return <Navigate to="/" replace />
  return <>{children}</>
}

function AppRoutes() {
  const { isRegistered } = useApp()

  return (
    <Routes>
      <Route
        path="/"
        element={isRegistered ? <Navigate to="/home" replace /> : <Welcome />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-order"
        element={
          <ProtectedRoute>
            <NewOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/track/:orderId"
        element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/unlock/:orderId"
        element={
          <ProtectedRoute>
            <QRUnlock />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
