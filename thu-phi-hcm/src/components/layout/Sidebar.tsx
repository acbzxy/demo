import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  isCollapsed: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onClose }) => {
  const { user, logout } = useAuth()

  const navItems = [
    {
      path: '/dashboard',
      label: 'TRANG CHỦ',
      icon: 'fas fa-home',
    },
    {
      path: '/payment',
      label: 'NỘP PHÍ CƠ SỞ HẠ TẦNG',
      icon: 'fas fa-credit-card',
      hasSubmenu: true,
      submenu: [
        { path: '/payment/setup', label: 'Thiết lập' }
      ]
    },
    {
      path: '/account',
      label: 'THÔNG TIN TÀI KHOẢN',
      icon: 'fas fa-user-circle',
    },
    {
      path: '/password',
      label: 'ĐỔI MẬT KHẨU',
      icon: 'fas fa-key',
    },
    {
      path: '/guide',
      label: 'HƯỚNG DẪN',
      icon: 'fas fa-question-circle',
      hasSubmenu: true,
      submenu: [
        { path: '/guide/other', label: 'Khác' }
      ]
    },
  ]

  const handleLogout = () => {
    logout()
    if (onClose) onClose()
  }

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      <aside className={`original-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* User Profile */}
        <div className="original-sidebar-header">
          <div className="original-user-profile">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%233498db'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='32' font-weight='bold'%3E{(user?.username?.charAt(0) || 'U').toUpperCase()}%3C/text%3E%3C/svg%3E"
              alt="User Avatar" 
              className="original-profile-img"
            />
            <div className="original-user-details">
              <div className="original-user-status">{user?.username || '0108844160'} - Online</div>
              <div className="original-user-role">Doanh nghiệp nộp phí</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="original-sidebar-nav">
          <ul className="original-nav-menu">
            {navItems.map((item) => (
              <li key={item.path} className="original-nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `original-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                  {item.hasSubmenu && <i className="fas fa-angle-down" style={{ marginLeft: 'auto' }}></i>}
                </NavLink>
                
                {/* Submenu */}
                {item.hasSubmenu && item.submenu && (
                  <ul className="original-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path} className="original-submenu-item">
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) => 
                            `original-submenu-link ${isActive ? 'active' : ''}`
                          }
                          onClick={onClose}
                        >
                          <span>{subItem.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            
            {/* Logout */}
            <li className="original-nav-item">
              <button
                onClick={handleLogout}
                className="original-nav-link"
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>ĐĂNG XUẤT</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar