import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  isCollapsed: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onClose }) => {
  const { user, logout } = useAuth()
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([])

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
                  path: '/system',
                  label: 'HỆ THỐNG',
                  icon: 'fas fa-cogs',
                  hasSubmenu: true,
                  submenu: [
                    { path: '/system/users', label: 'Quản lý người dùng' },
                    { path: '/system/business', label: 'Quản lý thông tin doanh nghiệp' },
                    { path: '/system/password', label: 'Đổi mật khẩu' },
                    { path: '/system/customs', label: 'Danh mục hải quan' },
                    { path: '/system/banks', label: 'Danh mục ngân hàng TM' },
                    { path: '/system/warehouses', label: 'Danh mục Kho/Bãi/Cảng' },
                    { path: '/system/toll-stations', label: 'Danh mục trạm thu phí' },
                    { path: '/system/storage-locations', label: 'Danh mục địa điểm lưu kho' },
                    { path: '/system/enterprises', label: 'Danh mục doanh nghiệp' },
                    { path: '/system/transport-methods', label: 'Danh mục phương thức vận chuyển' },
                    { path: '/system/receipt-templates', label: 'Danh mục mẫu ký hiệu biên lai' },
                    { path: '/system/tariff-types', label: 'Danh mục loại biểu cước' },
                    { path: '/system/tariffs', label: 'Danh mục biểu cước' },
                    { path: '/system/form-types', label: 'Danh mục loại hình' },
                    { path: '/system/payment-types', label: 'Danh mục loại thanh toán' },
                    { path: '/system/container-types', label: 'Danh mục loại container' },
                    { path: '/system/units', label: 'Danh mục đơn vị tính' }
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

  const toggleSubmenu = (menuPath: string) => {
    setOpenSubmenus(prev => 
      prev.includes(menuPath) 
        ? prev.filter(path => path !== menuPath)
        : [...prev, menuPath]
    )
  }

  const isSubmenuOpen = (menuPath: string) => {
    return openSubmenus.includes(menuPath)
  }

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
                {item.hasSubmenu ? (
                  <div
                    className="original-nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleSubmenu(item.path)}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    <i className={`fas fa-angle-down ${isSubmenuOpen(item.path) ? 'rotate-180' : ''}`} 
                       style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `original-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={onClose}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </NavLink>
                )}
                
                {/* Submenu */}
                {item.hasSubmenu && item.submenu && isSubmenuOpen(item.path) && (
                  <ul className="original-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path} className="original-submenu-item">
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) => 
                            `original-submenu-link ${isActive ? 'active' : ''}`
                          }
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