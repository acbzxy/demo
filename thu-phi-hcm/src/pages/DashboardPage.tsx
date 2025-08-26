import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  
  // Import background image
  const backgroundImage = '/tphcm-bkg.jpg'

  return (
    <>
      {/* Background overlay - full screen */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `url(${backgroundImage}) center center / cover no-repeat`,
        backgroundColor: '#00486c',
        zIndex: -1
      }}></div>
      
      <div style={{ 
        display: 'flex', 
        height: '100%', 
        minHeight: 'calc(100vh - 70px)',
        position: 'relative'
      }}>
        {/* Main Content Area */}
        <div style={{ 
          flex: '1',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          color: 'white',
          background: 'transparent'
        }}>
          {/* Header Text */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#f1c40f',
              margin: '0 0 20px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              letterSpacing: '2px',
              lineHeight: '1.2'
            }}>
              SỞ XÂY DỰNG<br />
              THÀNH PHỐ HỒ CHÍ MINH<br />
              <span style={{ textDecoration: 'underline' }}>CẢNG VỤ ĐƯỜNG THỦY NỘI ĐỊA</span>
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'white',
              margin: '0',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              lineHeight: '1.4'
            }}>
              KHAI BÁO NỘP PHÍ SỬ DỤNG KẾT CẤU HẠ TẦNG, CÔNG TRÌNH DỊCH VỤ, TIỆN ÍCH CÔNG CỘNG<br />
              TRONG KHU VỰC CỬA KHẨU CẢNG BIỂN TRÊN ĐỊA BÀN<br />
              THÀNH PHỐ HỒ CHÍ MINH
            </p>
          </div>
        </div>

        {/* Right Sidebar - User Guide */}
        <div style={{ 
          width: '350px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '20px',
          borderLeft: '1px solid rgba(222,226,230,0.5)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Guide Header */}
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              color: '#000000',
              marginBottom: '15px',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              borderBottom: '2px solid #3498db',
              paddingBottom: '10px'
            }}>
              <i className="fas fa-info-circle" style={{ marginRight: '10px', color: '#3498db' }}></i>
              HƯỚNG DẪN SỬ DỤNG
            </h3>
            
            <p style={{ fontSize: '14px', color: '#000000', marginBottom: '15px', fontWeight: 'bold' }}>
              I: Cài đặt môi trường sử dụng
            </p>
            <p style={{ fontSize: '13px', color: '#000000', marginBottom: '10px' }}>
              Để thực hiện đăng ký chữ ký số và khai báo nộp phí trên website bạn vui lòng tải và cài đặt các file sau:
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '13px', color: '#3498db', marginBottom: '5px' }}>
                1. File cài đặt ký số
              </p>
              <p style={{ fontSize: '13px', color: '#3498db', marginBottom: '5px' }}>
                2. Tiện ích hỗ trợ ký số trên Google Chrome &gt; Ecustd signature on website
              </p>
              <p style={{ fontSize: '13px', color: '#3498db' }}>
                3. Microsoft .NET Framework version &gt;= 4.6
              </p>
            </div>
            
            <p style={{ fontSize: '14px', color: '#000000', marginBottom: '10px', fontWeight: 'bold' }}>
              II: Hướng dẫn khai báo nộp phí
            </p>
            <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>
              Nếu chưa biết cách khai báo nộp phí trên website bạn vui lòng tải file hướng dẫn bên dưới:
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '13px', color: '#3498db', marginBottom: '5px' }}>
                1. Tài liệu hướng dẫn sử dụng.docx
              </p>
              <p style={{ fontSize: '13px', color: '#3498db' }}>
                2. Video hướng dẫn khai phí trên ECUS
              </p>
            </div>
            
            <p style={{ fontSize: '14px', color: '#000000', marginBottom: '15px', fontWeight: 'bold' }}>
              III: Các bước nộp phí
            </p>
            <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>
              Để hoàn thành việc nộp phí, doanh nghiệp phải thực hiện đủ các bước sau:
            </p>
            
            {/* Process Steps */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: '#3498db', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>1</div>
              <span style={{ fontSize: '12px', color: '#000000' }}>TẠO TỜ KHAI PHÍ</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: '#3498db', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>2</div>
              <span style={{ fontSize: '12px', color: '#000000' }}>KÝ SỐ KHAI BÁO NỘP PHÍ</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: '#3498db', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>3</div>
              <span style={{ fontSize: '12px', color: '#000000' }}>LẤY THÔNG BÁO PHÍ</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: '#3498db', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>4</div>
              <span style={{ fontSize: '12px', color: '#000000' }}>THỰC HIỆN NỘP PHÍ</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: '#3498db', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>5</div>
              <span style={{ fontSize: '12px', color: '#000000' }}>HOÀN THÀNH NỘP PHÍ</span>
            </div>
            
            <p style={{ fontSize: '12px', color: '#000000', fontStyle: 'italic' }}>
              Chi tiết các bước có trong file và tài liệu hướng dẫn sử dụng.docx bên trên.
            </p>
          </div>
          
          {/* Contact Support */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '10px', 
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%233498db'/%3E%3Ctext x='50' y='35' text-anchor='middle' fill='white' font-size='12' font-weight='bold'%3ECẢNG VỤ%3C/text%3E%3Ctext x='50' y='50' text-anchor='middle' fill='white' font-size='10'%3ETP.HCM%3C/text%3E%3Ctext x='50' y='65' text-anchor='middle' fill='white' font-size='8'%3EDTUYNĐ%3C/text%3E%3C/svg%3E"
                alt="Logo Cảng vụ"
                style={{ width: '60px', height: '60px' }}
              />
              <div>
                <p style={{ 
                  margin: '0', 
                  fontSize: '13px', 
                  color: '#000000',
                  fontWeight: 'bold'
                }}>
                  Tổng đài hỗ trợ Thu phí Thành phố Hồ Chí Minh <strong style={{ color: '#e74c3c' }}>1900 1286</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage