import React, { useState, useEffect } from 'react'
import DonutChart from '../components/DonutChart'
import BarChart from '../components/BarChart'

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

        @keyframes pieSpinSequence {
          0% {
            background: conic-gradient(
              #f8f9fa 0deg 360deg
            );
            opacity: 0;
            transform: scale(0.8);
            filter: blur(2px);
          }
          5% {
            background: conic-gradient(
              #f8f9fa 0deg 360deg
            );
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          10% {
            background: conic-gradient(
              #9b59b6 0deg 10deg,
              #f8f9fa 10deg 360deg
            );
          }
          15% {
            background: conic-gradient(
              #9b59b6 0deg 30deg,
              #f8f9fa 30deg 360deg
            );
          }
          20% {
            background: conic-gradient(
              #9b59b6 0deg 50deg,
              #f8f9fa 50deg 360deg
            );
          }
          25% {
            background: conic-gradient(
              #9b59b6 0deg 70deg,
              #f8f9fa 70deg 360deg
            );
          }
          30% {
            background: conic-gradient(
              #9b59b6 0deg 90deg,
              #f8f9fa 90deg 360deg
            );
          }
          35% {
            background: conic-gradient(
              #9b59b6 0deg 110deg,
              #f8f9fa 110deg 360deg
            );
          }
          40% {
            background: conic-gradient(
              #9b59b6 0deg 130deg,
              #f8f9fa 130deg 360deg
            );
          }
          45% {
            background: conic-gradient(
              #9b59b6 0deg 150deg,
              #f8f9fa 150deg 360deg
            );
          }
          50% {
            background: conic-gradient(
              #9b59b6 0deg 170deg,
              #f8f9fa 170deg 360deg
            );
          }
          55% {
            background: conic-gradient(
              #9b59b6 0deg 190deg,
              #f8f9fa 190deg 360deg
            );
          }
          60% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f8f9fa 200deg 360deg
            );
          }
          65% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 220deg,
              #f8f9fa 220deg 360deg
            );
          }
          70% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 240deg,
              #f8f9fa 240deg 360deg
            );
          }
          75% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 260deg,
              #f8f9fa 260deg 360deg
            );
          }
          80% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 280deg,
              #f8f9fa 280deg 360deg
            );
          }
          83% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 290deg,
              #f8f9fa 290deg 360deg
            );
          }
          86% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 290deg,
              #2ecc71 290deg 310deg,
              #f8f9fa 310deg 360deg
            );
          }
          89% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 290deg,
              #2ecc71 290deg 330deg,
              #f8f9fa 330deg 360deg
            );
          }
          92% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 290deg,
              #2ecc71 290deg 350deg,
              #f8f9fa 350deg 360deg
            );
          }
          95% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 290deg,
              #2ecc71 290deg 358deg,
              #f8f9fa 358deg 360deg
            );
          }
          100% {
            background: conic-gradient(
              #9b59b6 0deg 200deg,
              #f39c12 200deg 290deg, 
              #2ecc71 290deg 360deg
            );
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
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
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 8px 32px rgba(155, 89, 182, 0.3),
                        0 0 30px rgba(243, 156, 18, 0.2),
                        0 0 40px rgba(46, 204, 113, 0.1);
          }
        }

        @keyframes colorGlow {
          0% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2) saturate(1.3);
          }
          100% {
            filter: brightness(1);
          }
        }

        @keyframes smoothRotate {
          0% {
            transform: scale(0.8) rotate(0deg);
          }
          8% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(1deg);
          }
        }

        @keyframes counterUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes professionalGlow {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          }
          50% {
            box-shadow: 0 8px 40px rgba(155, 89, 182, 0.15),
                        0 0 20px rgba(243, 156, 18, 0.1),
                        0 0 30px rgba(46, 204, 113, 0.08);
          }
          100% {
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
          }
        }

        .bar-animated {
          animation: barGrowUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          transform-origin: bottom;
        }

        .pie-animated {
          animation: pieSpinSequence 4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards,
                     smoothRotate 4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards,
                     colorGlow 2s ease-in-out 0.8s,
                     professionalGlow 3s ease-in-out infinite 4.2s;
        }

        .legend-counter {
          animation: counterUp 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
          opacity: 0;
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
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500', opacity: 0.9 }}>Biên lai hàng tuần</h3>
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
          </div>
        </div>

            {/* Chart.js Bar Chart */}
            <BarChart isAnimated={isAnimated} />
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
              {/* Chart.js Pie Chart */}
              <DonutChart isAnimated={isAnimated} />
              
              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    animationDelay: '2.3s'
                  }}
                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#9b59b6', 
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(155, 89, 182, 0.4)'
                    }}></div>
                    <span style={{ fontSize: '14px', color: '#2c3e50' }}>Nguồn chính</span>
                  </div>
                  <span 
                    className={isAnimated ? 'legend-counter' : ''}
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#2c3e50',
                      animationDelay: '2.2s'
                    }}
                  >
                    56%
                  </span>
                </div>
                
                                                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    animationDelay: '2.4s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#f39c12', 
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(243, 156, 18, 0.4)'
                    }}></div>
                    <span style={{ fontSize: '14px', color: '#2c3e50' }}>Nguồn phụ</span>
                  </div>
                  <span 
                    className={isAnimated ? 'legend-counter' : ''}
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#2c3e50',
                      animationDelay: '2.5s'
                    }}
                  >
                    25%
                  </span>
                </div>
                
                <div 
                  className={isAnimated ? 'legend-animated' : ''}
                  style={{ 
          display: 'flex',
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    animationDelay: '2.6s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#2ecc71', 
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(46, 204, 113, 0.4)'
                    }}></div>
                    <span style={{ fontSize: '14px', color: '#2c3e50' }}>Nguồn khác</span>
                  </div>
                  <span 
                    className={isAnimated ? 'legend-counter' : ''}
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#2c3e50',
                      animationDelay: '2.7s'
                    }}
                  >
                    19%
                  </span>
                </div>
              </div>
            </div>
          </div>

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
            marginBottom: '30px',
            alignItems: 'start'
          }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
                background: 'white',
                color: '#333',
                padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px',
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #0066b3, #0db14b)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 20px rgba(0, 102, 179, 0.1), 0 2px 8px rgba(13, 177, 75, 0.1)',
                flex: '1',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0',
                  fontSize: '16px',
              fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-cog" style={{ marginRight: '10px', color: '#0066b3' }}></i>
                  I. Cài đặt môi trường sử dụng
                </h4>
                <p style={{ fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.5', color: '#666' }}>
              Để thực hiện đăng ký chữ ký số và khai báo nộp phí trên website bạn vui lòng tải và cài đặt các file sau:
            </p>
            
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#0066b3',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px', color: '#555' }}>File cài đặt ký số</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#0066b3',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px', color: '#555' }}>Tiện ích hỗ trợ ký số trên Chrome</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#0066b3',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px', color: '#555' }}>Microsoft .NET Framework ≥ 4.6</span>
                  </div>
                </div>
            </div>
            
              <div style={{
                background: 'white',
                color: '#333',
                padding: '20px',
                borderRadius: '10px',
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #0066b3, #0db14b)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 20px rgba(0, 102, 179, 0.1), 0 2px 8px rgba(13, 177, 75, 0.1)',
                flex: '1',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-file-alt" style={{ marginRight: '10px', color: '#0db14b' }}></i>
                  II. Hướng dẫn khai báo nộp phí
                </h4>
                <p style={{ fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.5', color: '#666' }}>
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
                    <span style={{ fontSize: '13px', color: '#555' }}>Tài liệu hướng dẫn sử dụng.docx</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#0db14b',
                      marginRight: '10px'
                    }}></div>
                    <span style={{ fontSize: '13px', color: '#555' }}>Video hướng dẫn khai phí trên ECUS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                background: 'white',
                color: '#333',
                padding: '20px',
                borderRadius: '10px',
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #0066b3, #0db14b)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 20px rgba(0, 102, 179, 0.1), 0 2px 8px rgba(13, 177, 75, 0.1)',
                flex: '1',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h4 style={{ 
                  margin: '0 0 20px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-tasks" style={{ marginRight: '10px', color: '#0db14b' }}></i>
                  III. Các bước nộp phí
                </h4>
                
                <p style={{ fontSize: '14px', margin: '0 0 20px 0', lineHeight: '1.5', color: '#666' }}>
              Để hoàn thành việc nộp phí, doanh nghiệp phải thực hiện đủ các bước sau:
            </p>
            
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0066b3, #0db14b)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0, 102, 179, 0.2), 0 1px 4px rgba(13, 177, 75, 0.2)'
              }}>1</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>TẠO TỜ KHAI PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0066b3, #0db14b)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0, 102, 179, 0.2), 0 1px 4px rgba(13, 177, 75, 0.2)'
              }}>2</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>KÝ SỐ KHAI BÁO NỘP PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0066b3, #0db14b)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0, 102, 179, 0.2), 0 1px 4px rgba(13, 177, 75, 0.2)'
              }}>3</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>LẤY THÔNG BÁO PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0066b3, #0db14b)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0, 102, 179, 0.2), 0 1px 4px rgba(13, 177, 75, 0.2)'
              }}>4</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>THỰC HIỆN NỘP PHÍ</span>
            </div>
            
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                      width: '35px', 
                      height: '35px', 
                borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #0066b3, #0db14b)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0, 102, 179, 0.2), 0 1px 4px rgba(13, 177, 75, 0.2)'
              }}>5</div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>HOÀN THÀNH NỘP PHÍ</span>
            </div>
            </div>
            
                <p style={{ 
                  fontSize: '13px', 
                  fontStyle: 'italic', 
                  margin: '20px 0 0 0',
                  color: '#888',
                  marginTop: 'auto'
                }}>
                  * Chi tiết các bước có trong file tài liệu hướng dẫn sử dụng.docx
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Support Info */}
          <div style={{ 
            textAlign: 'center',
            padding: '20px 0',
            color: '#555'
          }}>
                <p style={{ 
                  margin: '0', 
              fontSize: '16px',
              lineHeight: '1.6'
                }}>
              <strong>Tổng đài hỗ trợ Thu phí TP.HCM:</strong> <span style={{ color: '#f36f21', fontWeight: 'bold' }}>1900 1234</span><br />
              Hỗ trợ 24/7 cho mọi thắc mắc
                </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage

