import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const WelcomePage: React.FC = () => {
  const { isAuthenticated } = useAuth()

  // Auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard'
    }
  }, [isAuthenticated])

  const features = [
    {
      icon: 'fas fa-credit-card',
      title: 'Nộp Phí Online',
      description: 'Khai báo và nộp phí sử dụng kết cấu hạ tầng cảng biển một cách nhanh chóng, tiện lợi.'
    },
    {
      icon: 'fas fa-file-signature',
      title: 'Ký Số Điện Tử',
      description: 'Ký số điện tử các tờ khai, đảm bảo tính pháp lý và bảo mật thông tin.'
    },
    {
      icon: 'fas fa-search',
      title: 'Tra Cứu Biên Lai',
      description: 'Tra cứu thông tin biên lai điện tử đã thanh toán một cách dễ dàng.'
    },
    {
      icon: 'fas fa-headset',
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ hỗ trợ kỹ thuật sẵn sàng giải đáp mọi thắc mắc của quý khách.'
    }
  ]

  return (
    <div className="original-welcome-container">
      <div className="original-welcome-card">
        {/* Dev Environment Indicator */}
        <div style={{ 
          background: '#e67e22', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '25px', 
          fontSize: '14px', 
          fontWeight: 'bold', 
          marginBottom: '30px',
          display: 'inline-block'
        }}>
          🔧 DEV ENVIRONMENT
        </div>

        <h1 className="original-welcome-title">
          HỆ THỐNG THU PHÍ<br />
          THÀNH PHỐ HỒ CHÍ MINH
        </h1>
        
        <p className="original-welcome-subtitle">
          Thu phí sử dụng kết cấu hạ tầng, công trình dịch vụ, tiện ích công cộng<br />
          trong khu vực cửa khẩu cảng biển trên địa bàn TP.HCM
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
          <Link 
            to="/login" 
            className="original-btn-primary"
            style={{ textDecoration: 'none', display: 'inline-block', minWidth: '150px' }}
          >
            <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>
            Đăng Nhập
          </Link>
          
          <Link 
            to="/receipt-lookup" 
            className="original-btn-primary"
            style={{ 
              textDecoration: 'none', 
              display: 'inline-block', 
              minWidth: '150px',
              background: 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)'
            }}
          >
            <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
            Tra Cứu Biên Lai
          </Link>
        </div>

        {/* Features */}
        <div className="original-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="original-feature-item">
              <div className="original-feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3 className="original-feature-title">{feature.title}</h3>
              <p className="original-feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '10px',
          textAlign: 'center' as const
        }}>
          <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '0' }}>
            <strong>Hotline:</strong> 1900 1286 | 
            <strong> Email:</strong> thuphihatang@tphcm.gov.vn<br />
            <strong>Thời gian hỗ trợ:</strong> 7:30 - 17:30 (Thứ 2 - Thứ 6)
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage