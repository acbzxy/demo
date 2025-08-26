import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'

// Import background image
const backgroundImage = '/tphcm-bkg.jpg'

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth()
  const { showSuccess, showError } = useNotification()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  // Auto-fill dev credentials on double-click
  const handleUsernameDblClick = () => {
    setFormData(prev => ({
      ...prev,
      username: 'devadmin',
      password: 'dev123456',
      captcha: 'AB7X'
    }))
    showSuccess('Dev credentials auto-filled!')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập tài khoản'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    }
    
    if (!formData.captcha.trim()) {
      newErrors.captcha = 'Vui lòng nhập mã xác thực'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    
    if (!validateForm()) {
      return
    }

    try {
      await login({
        username: formData.username,
        password: formData.password,
        captcha: formData.captcha,
        rememberMe: formData.rememberMe
      })
      
      showSuccess('Đăng nhập thành công!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng nhập thất bại'
      showError(errorMessage)
    }
  }

  const refreshCaptcha = () => {
    showSuccess('Mã xác thực đã được làm mới!')
  }

  return (
    <div style={{
      backgroundColor: '#00486c',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '8%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.03)',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.04)',
        zIndex: 0
      }}></div>

      <div className="content-login" style={{ height: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', margin: 0, height: '100vh' }}>
          {/* Left Content - 75% width */}
          <div style={{ 
            flex: '0 0 75%',
            background: `url(${backgroundImage}) 0% 0% / 100% 65% no-repeat`,
            backgroundColor: '#00486c',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px'
          }}>
            {/* Header Text */}
            <div style={{
              textAlign: 'center',
              marginTop: '40px',
              marginBottom: 'auto',
              flexShrink: 0
            }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#f1c40f',
                margin: '0 0 15px 0',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                letterSpacing: '1px',
                lineHeight: '1.1'
              }}>
                SỞ XÂY DỰNG<br />
                THÀNH PHỐ HỒ CHÍ MINH<br />
                CẢNG VỤ ĐƯỜNG THỦY NỘI ĐỊA
              </h1>
              
              <p style={{
                fontSize: '0.9rem',
                color: 'white',
                margin: '0',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                lineHeight: '1.2'
              }}>
                KHAI BÁO NỘP PHÍ SỬ DỤNG KẾT CẤU HẠ TẦNG, CÔNG TRÌNH DỊCH VỤ, TIỆN ÍCH CÔNG CỘNG<br />
                TRONG KHU VỰC CỬA KHẨU CẢNG BIỂN TRÊN ĐỊA BÀN<br />
                THÀNH PHỐ HỒ CHÍ MINH
              </p>
            </div>

            {/* Two Cards Row - Bottom 50% */}
            <div style={{
              display: 'flex',
              gap: '15px',
              width: '100%',
              padding: '0 5px',
              height: '50vh',
              marginBottom: '100px'
            }}>
              {/* Notifications Card */}
              <div style={{
                flex: '1',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '10px',
                padding: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  borderBottom: '1px solid #ced4da',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontFamily: 'system-ui'
                }}>
                  <i className="fas fa-bell" style={{ marginRight: '10px', color: '#e74c3c' }}></i>
                  THÔNG BÁO HỆ THỐNG
                </h3>
                
                <div style={{ 
                  flex: '1', 
                  overflowY: 'auto',
                  fontSize: '15px',
                  color: '#000'
                }}>
                  <p style={{ marginBottom: '20px' }}>
                    Hệ thống thu phí vận hành chính thức từ 00 giờ 00 phút ngày 01/04/2022
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ 
                      marginBottom: '5px', 
                      textTransform: 'uppercase', 
                      fontWeight: 'bold',
                      fontSize: '15px'
                    }}>
                      I. THÔNG BÁO
                    </p>
                    
                    <p style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <i className="fas fa-hand-o-right" style={{ marginRight: '5px' }}></i>
                      Thông báo khóa tài khoản thu phí - 
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none', fontStyle: 'italic' }}>
                        Xem chi tiết thông báo
                      </a>
                    </p>
                    
                    <p style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <i className="fas fa-hand-o-right" style={{ marginRight: '5px' }}></i>
                      Thay đổi địa chỉ email tiếp nhận phản hồi từ cộng đồng doanh nghiệp sang 
                      <a href="mailto:thuphihatang@tphcm.gov.vn" style={{ color: '#3498db', textDecoration: 'none' }}>
                        thuphihatang@tphcm.gov.vn
                      </a> - 
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none', fontStyle: 'italic' }}>
                        Xem chi tiết thông báo
                      </a>
                    </p>
                    
                    <p style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <i className="fas fa-hand-o-right" style={{ marginRight: '5px' }}></i>
                      Về việc bảo trì, nâng cấp hệ thống <strong>từ 17h ngày 20/12/2024 đến 0h sáng ngày 22/12/2024</strong> - 
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none', fontStyle: 'italic' }}>
                        Xem chi tiết thông báo
                      </a>
                    </p>
                    
                    <p style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <i className="fas fa-hand-o-right" style={{ marginRight: '5px' }}></i>
                      Về việc bảo trì, nâng cấp hệ thống định kỳ hàng quý trong năm - 
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none', fontStyle: 'italic' }}>
                        Xem chi tiết thông báo
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* User Guide Card */}
              <div style={{
                flex: '1',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '10px',
                padding: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  borderBottom: '1px solid #ced4da',
                  paddingBottom: '10px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  fontFamily: 'system-ui'
                }}>
                  <i className="fas fa-info-circle" style={{ marginRight: '10px', color: '#3498db' }}></i>
                  HƯỚNG DẪN SỬ DỤNG
                </h3>
                
                <div style={{ 
                  flex: '1', 
                  overflowY: 'auto',
                  fontSize: '14px',
                  color: '#000'
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>I: Cài đặt môi trường sử dụng</h4>
                    <p style={{ marginBottom: '10px' }}>
                      Để thực hiện đăng ký chữ ký số và khai báo nộp phí trên website bạn vui lòng tải và cài đặt các file sau:
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none' }}>
                        1. File cài đặt ký số
                      </a><br />
                      <i style={{ fontSize: '12px' }}>
                        (Nếu máy tính của bạn có phiên bản hệ điều hành nhỏ hơn windows 8 
                        <a href="#" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
                          Tải file cài đặt tại đây
                        </a>)
                      </i>
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none' }}>
                        2. Tiện ích hỗ trợ ký số trên Google Chrome → <strong>Ecustsd signature on website</strong>
                      </a>
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none' }}>
                        3. Microsoft .NET Framework version &gt;= 4.6 <i>(Nếu chưa được cài đặt trên máy tính của bạn)</i>
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>II: Hướng dẫn khai báo nộp phí</h4>
                    <p style={{ marginBottom: '10px' }}>
                      Nếu chưa biết cách khai báo nộp phí trên website bạn vui lòng tải file hướng dẫn bên dưới:
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none' }}>
                        1. Tài liệu hướng dẫn sử dụng.docx
                      </a>
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                      <a href="#" style={{ color: '#3498db', textDecoration: 'none' }}>
                        2. Video hướng dẫn khai phí trên ECUS
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Login Form - 25% width */}
          <div style={{ 
            flex: '0 0 25%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '40px 20px',
            position: 'relative'
          }}>
            {/* Login Form */}
            <div style={{
              marginTop: '0px',
              marginBottom: '30px',
              borderRadius: '0px',
              minWidth: '320px',
              width: '90%',
              maxWidth: '500px',
              background: '#fff',
              paddingBottom: '30px'
            }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%233498db'/%3E%3Cpath d='M30 65 Q50 45 70 65 L70 85 Q50 75 30 85 Z' fill='white'/%3E%3Ccircle cx='50' cy='35' r='12' fill='white'/%3E%3C/svg%3E"
                  alt="User"
                  className="mb10 logo"
                  style={{ 
                    height: '110px', 
                    marginBottom: '10px',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
              
              <h3 style={{ 
                marginBottom: '20px', 
                textAlign: 'center', 
                textTransform: 'uppercase', 
                fontWeight: 'bold',
                fontSize: '20px',
                color: '#2c3e50'
              }}>
                Đăng nhập hệ thống
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div style={{ marginBottom: '3px', fontSize: '14px', color: '#2c3e50' }}>
                  Tài khoản<i>(Mã doanh nghiệp)</i>
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onDoubleClick={handleUsernameDblClick}
                    placeholder="Tài khoản..."
                    style={{
                      width: '100%',
                      height: '35px',
                      borderRadius: '0px',
                      border: '1px solid #ced4da',
                      padding: '8px 35px 8px 15px',
                      fontSize: '15px',
                      boxSizing: 'border-box'
                    }}
                    title="Double-click để auto-fill dev credentials"
                    maxLength={14}
                  />
                  <i className="fas fa-user-circle" style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#7f8c8d'
                  }}></i>
                </div>
                {errors.username && (
                  <div style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '10px' }}>
                    {errors.username}
                  </div>
                )}

                {/* Password */}
                <div style={{ marginBottom: '3px', fontSize: '14px', color: '#2c3e50' }}>
                  Mật khẩu
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mật khẩu..."
                    style={{
                      width: '100%',
                      height: '35px',
                      borderRadius: '0px',
                      border: '1px solid #ced4da',
                      padding: '8px 80px 8px 35px',
                      fontSize: '15px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <i className="fas fa-key" style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#7f8c8d'
                  }}></i>
                  <span 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1px',
                      top: '1px',
                      backgroundColor: '#e8f0fe',
                      padding: '8px 5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#3498db'
                    }}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>&nbsp;Show
                  </span>
                </div>
                {errors.password && (
                  <div style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '10px' }}>
                    {errors.password}
                  </div>
                )}

                {/* Captcha */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ marginBottom: '3px', fontSize: '14px', color: '#2c3e50' }}>Mã xác nhận</div>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 125 38'%3E%3Crect fill='%23e8f0fe' width='125' height='38'/%3E%3Ctext x='62.5' y='24' text-anchor='middle' fill='%232c3e50' font-size='16' font-weight='bold'%3EAB7X%3C/text%3E%3C/svg%3E"
                      alt="Captcha"
                      style={{
                        height: '38px',
                        border: '1px solid #eee',
                        width: '125px',
                        verticalAlign: 'middle',
                        marginRight: '10px'
                      }}
                    />
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleInputChange}
                      style={{
                        height: '38px',
                        border: '1px solid #ced4da',
                        padding: '.275rem .5rem',
                        width: '28%',
                        minWidth: '30px',
                        verticalAlign: 'middle',
                        textTransform: 'uppercase',
                        outline: 'none',
                        fontSize: '14px'
                      }}
                    />
                    <a 
                      href="#"
                      onClick={(e) => { e.preventDefault(); refreshCaptcha(); }}
                      style={{
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        fontStyle: 'italic',
                        backgroundColor: '#e8f0fe',
                        padding: '8px 3px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: '#3498db',
                        fontSize: '12px'
                      }}
                    >
                      Refresh
                    </a>
                  </div>
                  {errors.captcha && (
                    <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                      {errors.captcha}
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '10px',
                  marginBottom: '15px'
                }}>
                  <label style={{ fontSize: '14px', color: '#2c3e50' }}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ verticalAlign: 'bottom' }}>Duy trì đăng nhập</span>
                  </label>
                  
                  <a 
                    href="#" 
                    style={{ 
                      color: '#3498db', 
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fas fa-question-circle"></i>&nbsp;Quên mật khẩu
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div style={{ 
                    background: '#fee', 
                    color: '#e74c3c', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    marginBottom: '15px',
                    fontSize: '13px',
                    textAlign: 'center'
                  }}>
                    <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    marginTop: '5px',
                    color: '#fff',
                    padding: '10px',
                    background: '#0078d4',
                    borderRadius: '0px',
                    fontSize: '15px',
                    border: 'none',
                    width: '100%',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in" style={{ marginRight: '8px' }}></i>
                      Đăng nhập
                    </>
                  )}
                </button>

                {/* Register Link */}
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                  Bạn chưa có tài khoản?&nbsp;Đăng ký&nbsp;
                  <a href="#" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>
                    Tại đây
                  </a>
                </div>
              </form>
              
              {/* Dev Tip */}
              <div style={{ 
                marginTop: '15px', 
                padding: '8px', 
                background: '#f8f9fa', 
                borderRadius: '5px',
                fontSize: '11px',
                color: '#7f8c8d',
                textAlign: 'center'
              }}>
                <strong>Dev Tip:</strong> Double-click vào ô "Tài khoản" để auto-fill!
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          zIndex: 2,
          background: 'rgba(11, 90, 165, 0.1)',
          padding: '15px',
          position: 'absolute',
          bottom: '0px',
          left: '0',
          right: '0',
          textAlign: 'center',
          color: '#fff',
          fontSize: '17px'
        }}>
          <strong style={{ fontSize: '15px' }}>Copyright © 2025</strong> - Công Ty TNHH Phát Triển Công Nghệ Thái Sơn
        </div>
      </div>
    </div>
  )
}

export default LoginPage