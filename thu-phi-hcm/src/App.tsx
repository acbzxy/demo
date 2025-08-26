import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PaymentPage from './pages/PaymentPage'
import AccountPage from './pages/AccountPage'
import PasswordPage from './pages/PasswordPage'
import GuidePage from './pages/GuidePage'
import ReceiptLookupPage from './pages/ReceiptLookupPage'
import WelcomePage from './pages/WelcomePage'
import { NotificationProvider } from './context/NotificationContext'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <NotificationProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/receipt-lookup" element={<ReceiptLookupPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Layout>
                <DashboardPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/payment" 
          element={
            isAuthenticated ? (
              <Layout>
                <PaymentPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/account" 
          element={
            isAuthenticated ? (
              <Layout>
                <AccountPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/password" 
          element={
            isAuthenticated ? (
              <Layout>
                <PasswordPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/guide" 
          element={
            isAuthenticated ? (
              <Layout>
                <GuidePage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
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
    </NotificationProvider>
  )
}

export default App
