import React, { useState, useEffect } from 'react'

const DashboardPage: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Import background image
  const backgroundImage = '/tphcm-bkg.jpg'

  return (
    <>
      {/* Chart Animations CSS */}
      <style>{`
        @keyframes barGrowUp {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes donutSpin {
          from {
            background: conic-gradient(
              #e9ecef 0deg 360deg
            );
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            background: conic-gradient(
              #3498db 0deg 108deg,
              #27ae60 108deg 216deg, 
              #e74c3c 216deg 360deg
            );
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(52, 152, 219, 0.6), 0 0 40px rgba(52, 152, 219, 0.2);
          }
        }

        .bar-animated {
          animation: barGrowUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          transform-origin: bottom;
        }

        .donut-animated {
          animation: donutSpin 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     pulseGlow 2s ease-in-out infinite 1.5s;
        }

        .legend-animated {
          animation: fadeSlideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .chart-title-animated {
          animation: fadeSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .month-label-animated {
          animation: fadeSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Background overlay - full screen */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `url(${backgroundImage}) center center / cover no-repeat`,
        backgroundColor: '#00486c',
        zIndex: -1,
        opacity: 0.1
      }}></div>
      
      <div style={{ 
        position: 'relative',
        minHeight: 'calc(100vh - 56px)',
        padding: '20px',
        backgroundColor: 'rgba(248, 249, 250, 0.95)'
      }}>
        
        {/* Dashboard Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          
          {/* Weekly Sales Card */}
          <div style={{
            background: 'linear-gradient(135deg, #f36f21 0%, #ff8c42 50%, #ffb366 100%)',
            borderRadius: '15px',
            padding: '30px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(243, 111, 33, 0.3)'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-30px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
            }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500', opacity: 0.9 }}>Doanh thu tuần</h3>
              <i className="fas fa-chart-line" style={{ fontSize: '20px', opacity: 0.7 }}></i>
            </div>
            
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
              ₫ 15.000.000
            </div>
            
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              <i className="fas fa-arrow-up" style={{ marginRight: '5px' }}></i>
              Tăng 60%
            </div>
          </div>

          {/* Weekly Orders Card */}
        <div style={{ 
            background: 'linear-gradient(135deg, #0066b3 0%, #4a90e2 50%, #7bb3f0 100%)',
            borderRadius: '15px',
            padding: '30px',
            color: 'white',
          position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 102, 179, 0.3)'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
            }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500', opacity: 0.9 }}>Đơn hàng tuần</h3>
              <i className="fas fa-clipboard-list" style={{ fontSize: '20px', opacity: 0.7 }}></i>
            </div>
            
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
              45.634
            </div>
            
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              <i className="fas fa-arrow-down" style={{ marginRight: '5px' }}></i>
              Giảm 10%
            </div>
          </div>

          {/* Visitors Online Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0db14b 0%, #2ecc71 50%, #58d68d 100%)',
            borderRadius: '15px',
            padding: '30px',
          color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(13, 177, 75, 0.3)'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              left: '-50px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
            }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500', opacity: 0.9 }}>Người dùng online</h3>
              <i className="fas fa-users" style={{ fontSize: '20px', opacity: 0.7 }}></i>
            </div>
            
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
              95.741
            </div>
            
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              <i className="fas fa-arrow-up" style={{ marginRight: '5px' }}></i>
              Tăng 5%
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '20px',
          marginBottom: '30px'
        }}>
          
          {/* Visit And Sales Statistics Chart */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 
                className={isAnimated ? 'chart-title-animated' : ''}
                style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#2c3e50',
                  animationDelay: '0.2s',
                  opacity: isAnimated ? 1 : 0
                }}
              >
                Thống kê truy cập và doanh số
              </h3>
              <div style={{ display: 'flex', gap: '15px', fontSize: '12px' }}>
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    animationDelay: '0.4s',
                    opacity: isAnimated ? 1 : 0
                  }}
                >
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#8e44ad', borderRadius: '2px' }}></div>
                  <span style={{ color: '#7f8c8d' }}>VIỆT NAM</span>
                </div>
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    animationDelay: '0.5s',
                    opacity: isAnimated ? 1 : 0
                  }}
                >
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#e74c3c', borderRadius: '2px' }}></div>
                  <span style={{ color: '#7f8c8d' }}>USA</span>
                </div>
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    animationDelay: '0.6s',
                    opacity: isAnimated ? 1 : 0
                  }}
                >
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#3498db', borderRadius: '2px' }}></div>
                  <span style={{ color: '#7f8c8d' }}>UK</span>
                </div>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div style={{ height: '250px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '15px' }}>
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'].map((month, monthIndex) => {
                const barHeights = {
                  uk: Math.random() * 150 + 50,
                  vn: Math.random() * 120 + 40,
                  usa: Math.random() * 180 + 60
                }
                
                return (
                  <div key={month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'end', marginBottom: '10px' }}>
                      <div 
                        className={isAnimated ? 'bar-animated' : ''}
                        style={{ 
                          width: '12px', 
                          height: `${barHeights.uk}px`,
                          backgroundColor: '#3498db', 
                          borderRadius: '2px 2px 0 0',
                          transformOrigin: 'bottom',
                          transform: isAnimated ? 'scaleY(1)' : 'scaleY(0)',
                          opacity: isAnimated ? 1 : 0,
                          animationDelay: `${0.8 + monthIndex * 0.1}s`
                        }}
                      ></div>
                      <div 
                        className={isAnimated ? 'bar-animated' : ''}
                        style={{ 
                          width: '12px', 
                          height: `${barHeights.vn}px`,
                          backgroundColor: '#8e44ad', 
                          borderRadius: '2px 2px 0 0',
                          transformOrigin: 'bottom',
                          transform: isAnimated ? 'scaleY(1)' : 'scaleY(0)',
                          opacity: isAnimated ? 1 : 0,
                          animationDelay: `${0.9 + monthIndex * 0.1}s`
                        }}
                      ></div>
                      <div 
                        className={isAnimated ? 'bar-animated' : ''}
                        style={{ 
                          width: '12px', 
                          height: `${barHeights.usa}px`,
                          backgroundColor: '#e74c3c', 
                          borderRadius: '2px 2px 0 0',
                          transformOrigin: 'bottom',
                          transform: isAnimated ? 'scaleY(1)' : 'scaleY(0)',
                          opacity: isAnimated ? 1 : 0,
                          animationDelay: `${1.0 + monthIndex * 0.1}s`
                        }}
                      ></div>
                    </div>
                    <span 
                      className={isAnimated ? 'month-label-animated' : ''}
                      style={{ 
                        fontSize: '11px', 
                        color: '#7f8c8d', 
                        fontWeight: '500',
                        animationDelay: `${1.2 + monthIndex * 0.05}s`,
                        opacity: isAnimated ? 1 : 0
                      }}
                    >
                      {month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Traffic Sources Chart */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 
              className={isAnimated ? 'chart-title-animated' : ''}
              style={{ 
                margin: '0 0 25px 0', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#2c3e50',
                animationDelay: '0.3s',
                opacity: isAnimated ? 1 : 0
              }}
            >
              Nguồn truy cập
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Simple Donut Chart */}
              <div 
                className={isAnimated ? 'donut-animated' : ''}
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%',
                  background: isAnimated 
                    ? `conic-gradient(
                        #3498db 0deg 108deg,
                        #27ae60 108deg 216deg, 
                        #e74c3c 216deg 360deg
                      )`
                    : '#e9ecef',
                  position: 'relative',
                  marginBottom: '25px',
                  transition: 'all 0.3s ease',
                  animationDelay: '0.5s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                }}></div>
                

              </div>
              
              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    animationDelay: '1.5s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#3498db', 
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(52, 152, 219, 0.4)'
                    }}></div>
                    <span style={{ fontSize: '14px', color: '#2c3e50' }}>Search Engines</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>30%</span>
                </div>
                
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    animationDelay: '1.7s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#27ae60', 
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(39, 174, 96, 0.4)'
                    }}></div>
                    <span style={{ fontSize: '14px', color: '#2c3e50' }}>Direct Click</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>30%</span>
                </div>
                
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    animationDelay: '1.9s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#e74c3c', 
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(231, 76, 60, 0.4)'
                    }}></div>
                    <span style={{ fontSize: '14px', color: '#2c3e50' }}>Bookmarks Click</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>40%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Header Text Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '40px',
            textAlign: 'center',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <h1 style={{
            fontSize: '2.2rem',
              fontWeight: 'bold',
            color: '#0066b3',
              margin: '0 0 20px 0',
            letterSpacing: '1px',
            lineHeight: '1.3'
            }}>
            SỞ XÂY DỰNG THÀNH PHỐ HỒ CHÍ MINH<br />
            <span style={{ color: '#f36f21' }}>CẢNG VỤ ĐƯỜNG THỦY NỘI ĐỊA</span>
            </h1>
            
            <p style={{
            fontSize: '1rem',
            color: '#2c3e50',
              margin: '0',
            lineHeight: '1.6',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
            }}>
              KHAI BÁO NỘP PHÍ SỬ DỤNG KẾT CẤU HẠ TẦNG, CÔNG TRÌNH DỊCH VỤ, TIỆN ÍCH CÔNG CỘNG<br />
            TRONG KHU VỰC CỬA KHẨU CẢNG BIỂN TRÊN ĐỊA BÀN THÀNH PHỐ HỒ CHÍ MINH
            </p>
        </div>

        {/* User Guide Section */}
        <div style={{ 
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '30px'
        }}>
          {/* Guide Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '24px',
              color: '#0066b3',
              margin: '0 0 15px 0',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              <i className="fas fa-info-circle" style={{ marginRight: '10px', color: '#f36f21' }}></i>
              HƯỚNG DẪN SỬ DỤNG HỆ THỐNG
            </h3>
            <div style={{ 
              width: '80px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #0066b3, #f36f21, #0db14b)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </div>

          {/* Guide Content in 2 columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '30px'
          }}>
            
            {/* Left Column */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #0066b3, #4a90e2)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-cog" style={{ marginRight: '10px' }}></i>
                  I. Cài đặt môi trường sử dụng
                </h4>
                <p style={{ fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.5' }}>
              Để thực hiện đăng ký chữ ký số và khai báo nộp phí trên website bạn vui lòng tải và cài đặt các file sau:
            </p>
            
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#f36f21',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px' }}>File cài đặt ký số</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#f36f21',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px' }}>Tiện ích hỗ trợ ký số trên Chrome</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#f36f21',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px' }}>Microsoft .NET Framework ≥ 4.6</span>
                  </div>
                </div>
            </div>
            
              <div style={{
                background: 'linear-gradient(135deg, #f36f21, #ff8c42)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i>
                  II. Hướng dẫn khai báo nộp phí
                </h4>
                <p style={{ fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  Nếu chưa biết cách khai báo nộp phí trên website bạn vui lòng tải file hướng dẫn:
                </p>
                
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#0db14b',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px' }}>Tài liệu hướng dẫn sử dụng.docx</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#0db14b',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px' }}>Video hướng dẫn khai phí trên ECUS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #0db14b, #2ecc71)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
              }}>
                <h4 style={{ 
                  margin: '0 0 20px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-tasks" style={{ marginRight: '10px' }}></i>
                  III. Các bước nộp phí
                </h4>
                
                <p style={{ fontSize: '14px', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Để hoàn thành việc nộp phí, doanh nghiệp phải thực hiện đủ các bước sau:
            </p>
            
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>1</div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>TẠO TỜ KHAI PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>2</div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>KÝ SỐ KHAI BÁO NỘP PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>3</div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>LẤY THÔNG BÁO PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>4</div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>THỰC HIỆN NỘP PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>5</div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>HOÀN THÀNH NỘP PHÍ</span>
                  </div>
                </div>

                <p style={{ 
                  fontSize: '13px', 
                  fontStyle: 'italic', 
                  margin: '20px 0 0 0',
                  opacity: 0.9
                }}>
                  * Chi tiết các bước có trong file tài liệu hướng dẫn sử dụng.docx
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Support */}
          <div style={{ 
            background: 'linear-gradient(135deg, #2c3e50, #34495e)',
            borderRadius: '15px',
            padding: '25px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0066b3, #f36f21)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <i className="fas fa-phone" style={{ fontSize: '30px', color: 'white' }}></i>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Tổng đài hỗ trợ Thu phí TP.HCM
                </h4>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  color: '#f36f21'
                }}>
                  1900 1286
                </div>
                <p style={{ 
                  fontSize: '14px',
                  margin: '5px 0 0 0',
                  opacity: 0.9
                }}>
                  Hỗ trợ 24/7 cho mọi thắc mắc
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