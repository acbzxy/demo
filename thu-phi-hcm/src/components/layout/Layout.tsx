import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = false }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const closeSidebar = () => {
    setSidebarCollapsed(true)
  }

  return (
    <div className="original-main-container">
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={sidebarCollapsed} onClose={closeSidebar} />
      
      <main className={`original-main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout