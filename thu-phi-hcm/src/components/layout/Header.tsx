import React from 'react'
import { useAuth } from '../../context/AuthContext'

interface HeaderProps {
  onToggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="original-header">
      <div className="original-header-content">
        {/* Left side */}
        <div className="original-header-left">
          <button
            onClick={onToggleSidebar}
            className="original-menu-toggle"
            title="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <h1>HỆ THỐNG THU PHÍ THÀNH PHỐ HỒ CHÍ MINH</h1>
        </div>
        
        {/* Right side */}
        <div className="original-header-right">
          <span className="original-user-info">
            <i className="fas fa-phone" style={{ marginRight: '5px' }}></i>
            Xin chào <span style={{ fontWeight: 'bold' }}>{user?.username || '0108844160'}</span>
          </span>
          
          <button
            onClick={handleLogout}
            className="original-btn-logout"
          >
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header