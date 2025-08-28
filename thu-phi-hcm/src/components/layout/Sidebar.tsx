import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  isCollapsed: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onClose }) => {
  const { user, logout } = useAuth()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path)
  }

  const navItems = [
    {
      path: '/dashboard',
      label: 'TRANG CHỦ',
      icon: 'fas fa-home',
    },
    {
      path: '/payment',
      label: 'NỘP PHÍ CƠ SỞ HẠ TẦNG',
      icon: 'fas fa-building',
      hasSubmenu: true,
      submenu: [
        { path: '/payment/declare', label: '1. Khai báo nộp phí' },
        { path: '/payment/order', label: '2. Đơn hàng thanh toán QR, Ecor' },
        { path: '/data-table', label: '3. Danh sách biên lai' },
        { path: '/payment/process', label: '4. Trình ký xử lý biên lai' },
        { path: '/reports/receipt-lookup', label: '5. Tra cứu biên lai' },
        { path: '/debt-management/debt-status', label: '6. Tra cứu nợ phí' }
      ]
    },
    {
      path: '/reports',
      label: 'BÁO CÁO THỐNG KÊ',
      icon: 'fas fa-chart-bar',
      hasSubmenu: true,
      submenu: [
        { path: '/reports/receipt-list', label: 'Bảng kê BL thu' },
        { path: '/reports/summary-by-warehouse', label: 'Tổng hợp theo kho' },
        { path: '/reports/summary-by-service', label: 'Tổng hợp thu dịch vụ' },
        { path: '/reports/summary-by-enterprise', label: 'Tổng hợp theo DN' },
        { path: '/reports/detailed-report', label: 'Báo cáo ấn chỉ' },
        { path: '/reports/receipt-usage-history', label: 'Tình hình sử dụng BL' },
        { path: '/reports/collection-summary', label: 'Tổng hợp thu theo CB lập' }
      ]
    },
    {
      path: '/debt-management',
      label: 'Q.LÝ XỬ LÝ NỢ PHÍ',
      icon: 'fas fa-exclamation-triangle',
      hasSubmenu: true,
      submenu: [
        { path: '/debt-management/debt-status', label: 'Tra cứu tình trạng nợ phí' },
        { path: '/debt-management/business-services', label: 'Thực hiện nghiệp vụ' },
        { path: '/debt-management/create-qr-code', label: 'Tạo lập QĐ cưỡng chế' }
      ]
    },
    {
      path: '/data-reconciliation',
      label: 'ĐỐI SOÁT DỮ LIỆU',
      icon: 'fas fa-sync-alt',
      hasSubmenu: true,
      submenu: [
        { path: '/data-reconciliation/initialize', label: 'Khởi tạo' },
        { path: '/data-reconciliation/manage-list', label: 'Quản lý danh sách đối soát' },
        { path: '/data-reconciliation/customs-report', label: 'Báo cáo đối soát Hải Quan' }
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
                {item.hasSubmenu ? (
                  <>
                    <div
                      className={`original-nav-link ${openSubmenu === item.path ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(item.path)}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className={item.icon}></i>
                      <span>{item.label}</span>
                      <i 
                        className={`fas fa-angle-${openSubmenu === item.path ? 'up' : 'down'}`}
                        style={{ marginLeft: 'auto', transition: 'transform 0.3s ease' }}
                      ></i>
                    </div>
                    
                    {/* Submenu */}
                    {item.submenu && (
                      <ul 
                        className={`original-submenu ${openSubmenu === item.path ? 'show' : ''}`}
                        style={{
                          maxHeight: openSubmenu === item.path ? `${item.submenu.length * 45}px` : '0',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease'
                        }}
                      >
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path} className="original-submenu-item">
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) => 
                                `original-submenu-link ${isActive ? 'active' : ''}`
                              }
                              onClick={onClose}
                            >
                              <i className="fas fa-circle" style={{ fontSize: '6px', marginRight: '10px' }}></i>
                              <span>{subItem.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
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