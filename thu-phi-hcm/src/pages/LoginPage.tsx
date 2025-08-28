import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [forgotPasswordData, setForgotPasswordData] = useState({
    companyCode: '',
    email: ''
  })
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState<Record<string, string>>({})
  
  // Register modal states
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    address: '',
    email: '',
    phone: '',
    mobile: '',
    notes: '',
    digitalSignature: false
  })
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({})
  
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
      captcha: captchaCode
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

  const [captchaCode, setCaptchaCode] = useState('UJDZF')
  
  const refreshCaptcha = () => {
    // Generate random captcha (for demo purposes)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let newCode = ''
    for (let i = 0; i < 5; i++) {
      newCode += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(newCode)
    setFormData(prev => ({ ...prev, captcha: '' }))
    showSuccess('Mã xác thực đã được làm mới!')
  }

  // Forgot password functions
  const handleForgotPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForgotPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (forgotPasswordErrors[name]) {
      setForgotPasswordErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForgotPasswordForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!forgotPasswordData.companyCode.trim()) {
      newErrors.companyCode = 'Vui lòng nhập mã doanh nghiệp'
    }
    
    if (!forgotPasswordData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
      newErrors.email = 'Email không đúng định dạng'
    }
    
    setForgotPasswordErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForgotPasswordForm()) {
      return
    }

    // Mock API call
    showSuccess('Yêu cầu khôi phục mật khẩu đã được gửi đến email của bạn!')
    setShowForgotPasswordModal(false)
    setForgotPasswordData({ companyCode: '', email: '' })
    setForgotPasswordErrors({})
  }

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false)
    setForgotPasswordData({ companyCode: '', email: '' })
    setForgotPasswordErrors({})
  }

  // Register functions
  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!registerData.username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập'
    }
    
    if (!registerData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    if (!registerData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu'
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp'
    }
    
    if (!registerData.companyName.trim()) {
      newErrors.companyName = 'Vui lòng nhập tên doanh nghiệp'
    }
    
    if (!registerData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ'
    }
    
    if (!registerData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Email không đúng định dạng'
    }
    
    if (!registerData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    }
    
    setRegisterErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateRegisterForm()) {
      return
    }

    // Mock API call
    showSuccess('Đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác thực tài khoản.')
    closeRegisterModal()
  }

  const closeRegisterModal = () => {
    setShowRegisterModal(false)
    setRegisterData({
      username: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      address: '',
      email: '',
      phone: '',
      mobile: '',
      notes: '',
      digitalSignature: false
    })
    setRegisterErrors({})
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
            position: 'relative',
            zIndex: 1
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
                marginBottom: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '15px',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <i className="fas fa-shield-alt" style={{ 
                      color: 'white', 
                      fontSize: '36px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)' 
                    }}></i>
                  </div>
                  {/* Decorative elements */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '12px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                  }}></div>
                </div>
              </div>
              
              <h3 style={{ 
                marginBottom: '25px', 
                textAlign: 'center', 
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#2c3e50',
                letterSpacing: '0.5px'
              }}>
                ĐĂNG NHẬP HỆ THỐNG
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div style={{ marginBottom: '5px', fontSize: '14px', color: '#2c3e50' }}>
                  Tài khoản<span style={{ fontStyle: 'italic' }}>(Mã doanh nghiệp)</span>
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <i className="fas fa-user" style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#7f8c8d'
                  }}></i>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onDoubleClick={handleUsernameDblClick}
                    placeholder="Tài khoản..."
                    style={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '4px',
                      border: '1px solid #ced4da',
                      padding: '8px 15px 8px 40px',
                      fontSize: '15px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                    title="Double-click để auto-fill dev credentials"
                    maxLength={14}
                  />
                </div>
                {errors.username && (
                  <div style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '10px' }}>
                    {errors.username}
                  </div>
                )}

                {/* Password */}
                <div style={{ marginBottom: '5px', fontSize: '14px', color: '#2c3e50' }}>
                  Mật khẩu
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <i className="fas fa-key" style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#7f8c8d'
                  }}></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mật khẩu..."
                    style={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '4px',
                      border: '1px solid #ced4da',
                      padding: '8px 75px 8px 40px',
                      fontSize: '15px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '2px',
                      top: '2px',
                      bottom: '2px',
                      backgroundColor: '#e8f0fe',
                      border: 'none',
                      padding: '0 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#1565c0',
                      borderRadius: '0 2px 2px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    Show
                  </button>
                </div>
                {errors.password && (
                  <div style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '10px' }}>
                    {errors.password}
                  </div>
                )}

                {/* Captcha */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ marginBottom: '5px', fontSize: '14px', color: '#2c3e50' }}>Mã xác nhận</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ 
                        width: '120px',
                        height: '40px',
                        backgroundColor: '#e8f0fe',
                        border: '1px solid #d0d7de',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        letterSpacing: '4px',
                        fontFamily: 'monospace'
                      }}>
                        {captchaCode}
                      </div>
                      <input
                        type="text"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleInputChange}
                        style={{
                          height: '40px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          width: '80px',
                          textTransform: 'uppercase',
                          outline: 'none',
                          fontSize: '14px',
                          textAlign: 'center'
                        }}
                        maxLength={5}
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); refreshCaptcha(); }}
                      style={{
                        height: '40px',
                        backgroundColor: '#e8f0fe',
                        border: '1px solid #d0d7de',
                        borderRadius: '4px',
                        padding: '0 12px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: '#1565c0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                        marginLeft: '8px'
                      }}
                    >
                      <i className="fas fa-sync-alt"></i>
                      Refresh
                    </button>
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
                  marginBottom: '20px'
                }}>
                  <label style={{ fontSize: '14px', color: '#2c3e50', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px', cursor: 'pointer' }}
                    />
                    Duy trì đăng nhập
                  </label>
                  
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setShowForgotPasswordModal(true); }}
                    style={{ 
                      color: '#3498db', 
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fas fa-question-circle" style={{ marginRight: '5px' }}></i>
                    Quên mật khẩu
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
                    color: '#fff',
                    padding: '12px',
                    background: '#1976d2',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '500',
                    border: 'none',
                    width: '100%',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1565c0'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1976d2'
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>
                      Đăng nhập
                    </>
                  )}
                </button>

                {/* Register Link */}
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#2c3e50' }}>
                  Bạn chưa có tài khoản? Đăng ký{' '}
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setShowRegisterModal(true); }}
                    style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}
                  >
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
          zIndex: 0,
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
          <strong style={{ fontSize: '15px' }}>Copyright © 2025</strong> - DEMO HỆ THỐNG THU PHÍ
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            width: '500px',
            maxWidth: '90vw',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f8fafc'
            }}>
              <i className="fas fa-key" style={{ 
                color: '#3b82f6', 
                fontSize: '20px', 
                marginRight: '12px' 
              }}></i>
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Khôi Phục Tài Khoản
              </h3>
              <button
                onClick={closeForgotPasswordModal}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: '#9ca3af',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px' }}>
              {/* Dropdown */}
              <div style={{ marginBottom: '16px' }}>
                <select style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#374151'
                }}>
                  <option>KHÔI PHỤC TÀI KHOẢN THÔNG QUA EMAIL ĐÃ ĐĂNG KÝ</option>
                </select>
              </div>

              {/* Description */}
              <div style={{
                marginBottom: '20px',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Vui lòng điền Mã doanh nghiệp và Email đã đăng ký. Hệ thống sẽ gửi xác nhận qua email của bạn.
              </div>

              <form onSubmit={handleForgotPasswordSubmit}>
                {/* Company Code Field */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#374151',
                    fontWeight: '500'
                  }}>
                    Mã doanh nghiệp<span style={{ fontStyle: 'italic' }}>(Tài khoản đăng nhập)</span>
                    <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="companyCode"
                    value={forgotPasswordData.companyCode}
                    onChange={handleForgotPasswordInputChange}
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '8px 12px',
                      border: `1px solid ${forgotPasswordErrors.companyCode ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                    placeholder="Nhập mã doanh nghiệp"
                  />
                  {forgotPasswordErrors.companyCode && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                      {forgotPasswordErrors.companyCode}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5px'
                  }}>
                    <label style={{
                      fontSize: '14px',
                      color: '#374151',
                      fontWeight: '500'
                    }}>
                      Email đã đăng ký
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); }}
                      style={{
                        fontSize: '12px',
                        color: '#3b82f6',
                        textDecoration: 'none'
                      }}
                    >
                      <i className="fas fa-info-circle" style={{ marginRight: '4px' }}></i>
                      Quên email đăng ký
                    </a>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordInputChange}
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '8px 12px',
                      border: `1px solid ${forgotPasswordErrors.email ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                    placeholder="Nhập email đăng ký"
                  />
                  {forgotPasswordErrors.email && (
                    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                      {forgotPasswordErrors.email}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: '44px',
                    backgroundColor: '#1976d2',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1565c0'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#1976d2'
                  }}
                >
                  <i className="fas fa-paper-plane"></i>
                  Gửi yêu cầu
                </button>
              </form>

              {/* Close Button */}
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={closeForgotPasswordModal}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#6b7280',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '4px 8px'
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            width: '800px',
            maxWidth: '95vw',
            maxHeight: '95vh',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f8fafc'
            }}>
              <i className="fas fa-user-plus" style={{ 
                color: '#3b82f6', 
                fontSize: '20px', 
                marginRight: '12px' 
              }}></i>
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Đăng Ký Tài Khoản
              </h3>
              <select style={{
                marginLeft: 'auto',
                marginRight: '40px',
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: '#f9fafb'
              }}>
                <option>Doanh nghiệp</option>
              </select>
              <button
                onClick={closeRegisterModal}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: '#9ca3af',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px' }}>
              <form onSubmit={handleRegisterSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Left Column */}
                  <div>
                    {/* Username */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Tên đăng nhập <span style={{ fontStyle: 'italic' }}>(Mã doanh nghiệp/ Mã số thuế):</span>
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={registerData.username}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập mã..."
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.username ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.username && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.username}
                        </div>
                      )}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Mật khẩu đăng nhập:
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterInputChange}
                        placeholder="***"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.password ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.password && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.password}
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Nhập lại mật khẩu:
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterInputChange}
                        placeholder="***"
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.confirmPassword ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.confirmPassword && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.confirmPassword}
                        </div>
                      )}
                    </div>

                    {/* Company Name */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Tên doanh nghiệp:
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={registerData.companyName}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập tên..."
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.companyName ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.companyName && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.companyName}
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Địa chỉ:
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={registerData.address}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập địa chỉ..."
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.address ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.address && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.address}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Email - Để nhận thông tin từ Cảng vụ <span style={{ fontStyle: 'italic' }}>(Biên lai, thông báo...):</span>
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập Email..."
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.email ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.email && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.email}
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Số điện thoại liên hệ:
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập Số điện thoại..."
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: `1px solid ${registerErrors.phone ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                      {registerErrors.phone && (
                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                          {registerErrors.phone}
                        </div>
                      )}
                    </div>

                    {/* Mobile */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Di động:
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={registerData.mobile}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập số di động..."
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* Notes */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        Ghi chú:
                      </label>
                      <textarea
                        name="notes"
                        value={registerData.notes}
                        onChange={handleRegisterInputChange}
                        placeholder="Nhập ghi chú..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Digital Signature Checkbox */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    fontSize: '14px',
                    color: '#374151',
                    gap: '8px'
                  }}>
                    <input
                      type="checkbox"
                      name="digitalSignature"
                      checked={registerData.digitalSignature}
                      onChange={handleRegisterInputChange}
                      style={{ marginTop: '2px', cursor: 'pointer' }}
                    />
                    <span>
                      Đăng ký chữ ký số <span style={{ fontStyle: 'italic' }}>
                        (Để thực hiện việc ký số điện tử cho tờ khai nộp phí của doanh nghiệp. Ký số điện tử cho tờ khai phí là bắt buộc.)
                      </span>
                    </span>
                  </label>
                </div>

                {/* Notice */}
                <div style={{ 
                  marginBottom: '20px', 
                  backgroundColor: '#f0f9ff', 
                  padding: '12px', 
                  borderRadius: '4px',
                  border: '1px solid #e0f2fe'
                }}>
                  <div style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                    Lưu ý:
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.4' }}>
                    - Tổ chức, cá nhân cần cung cấp đầy đủ, chính xác các thông tin theo yêu cầu của Hệ thống khai báo nộp phí. Sau 7 ngày kể từ khi đăng ký tài khoản, các tài khoản không cập nhật đầy đủ thông tin sẽ bị tạm khóa.
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.4', marginTop: '4px' }}>
                    - Mọi thông tin chi tiết xin liên hệ số Tổng đài Hỗ trợ: <strong>1900 1286</strong>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      height: '44px',
                      backgroundColor: '#1976d2',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#1565c0'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#1976d2'
                    }}
                  >
                    <i className="fas fa-user-plus"></i>
                    Đăng ký
                  </button>
                  <button
                    type="button"
                    onClick={closeRegisterModal}
                    style={{
                      backgroundColor: '#6b7280',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: '12px 24px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#4b5563'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#6b7280'
                    }}
                  >
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage