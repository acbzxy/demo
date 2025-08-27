import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import { NotificationProvider } from './context/NotificationContext'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy load components for better performance
const LoginPage = lazy(() => import('./pages/LoginPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const PasswordPage = lazy(() => import('./pages/PasswordPage'))
const GuidePage = lazy(() => import('./pages/GuidePage'))
const ReceiptLookupPage = lazy(() => import('./pages/ReceiptLookupPage'))
const WelcomePage = lazy(() => import('./pages/WelcomePage'))
const SystemPage = lazy(() => import('./pages/SystemPage'))

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <Layout>{children}</Layout>
}

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <NotificationProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/receipt-lookup" element={<ReceiptLookupPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="/password" element={<ProtectedRoute><PasswordPage /></ProtectedRoute>} />
          <Route path="/guide" element={<ProtectedRoute><GuidePage /></ProtectedRoute>} />
                                <Route path="/system" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/users" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/business" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/password" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/customs" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/banks" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/warehouses" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/toll-stations" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/storage-locations" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/enterprises" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/transport-methods" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/receipt-templates" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/tariff-types" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/tariffs" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/form-types" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/payment-types" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/container-types" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
                      <Route path="/system/units" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
          
          {/* Default redirects */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/welcome" replace />
              )
            } 
          />
          
          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </NotificationProvider>
  )
}

export default App
