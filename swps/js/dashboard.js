// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        // Try to redirect to original login page
        window.location.href = '../thuphihatang.tphcm.gov.vn/dang-nhap.html';
        return;
    }
    
    // Initialize dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load user info
    loadUserInfo();
    
    // Auto logout after inactivity
    setupAutoLogout();
});

function initializeDashboard() {
    // Show welcome message
    showWelcomeMessage();
    
    // Update last login time
    updateLastLoginTime();
    
    // Initialize sidebar state
    initializeSidebar();
    
    // Setup responsive behavior
    setupResponsive();
}

function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    const footer = document.querySelector('.footer');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
        footer.classList.toggle('expanded');
        
        // Save sidebar state
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
    
    // Logout buttons
    const logoutBtn = document.getElementById('logout-btn');
    const sidebarLogout = document.getElementById('sidebar-logout');
    
    logoutBtn.addEventListener('click', handleLogout);
    sidebarLogout.addEventListener('click', handleLogout);
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Load page content
            const page = this.getAttribute('data-page');
            loadPageContent(page);
        });
    });
    
    // Sub navigation links
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('Chức năng đang được phát triển!', 'info');
        });
    });
    
    // Download links
    const downloadLinks = document.querySelectorAll('.download-link');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('File tải xuống sẽ có sẵn trong phiên bản chính thức!', 'info');
        });
    });
}

function loadUserInfo() {
    const username = sessionStorage.getItem('username') || 'admin';
    const currentUserElement = document.getElementById('current-user');
    
    if (currentUserElement) {
        // For demo, show a business code instead of username
        currentUserElement.textContent = username === 'admin' ? '0109844160' : username;
    }
}

function loadPageContent(page) {
    const mainContent = document.querySelector('.main-content');
    
    // Show loading state
    showLoadingState(mainContent);
    
    // Simulate loading delay
    setTimeout(() => {
        switch(page) {
            case 'dashboard':
                loadDashboardContent();
                break;
            case 'payment':
                loadPaymentContent();
                break;
            case 'account':
                loadAccountContent();
                break;
            case 'password':
                loadPasswordContent();
                break;
            case 'guide':
                loadGuideContent();
                break;
            default:
                loadDashboardContent();
        }
    }, 500);
}

function loadDashboardContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">
                    <span class="title-line">SỞ XÂY DỰNG</span>
                    <span class="title-line">THÀNH PHỐ HỒ CHÍ MINH</span>
                    <span class="title-line highlight">CẢNG VỤ ĐƯỜNG THỦY NỘI ĐỊA</span>
                </h1>
                
                <h2 class="hero-subtitle">
                    KHAI BÁO NỘP PHÍ SỬ DỤNG KẾT CẤU HẠ TẦNG, CÔNG TRÌNH DỊCH VỤ, TIỆN ÍCH CÔNG CỘNG<br>
                    TRONG KHU VỰC CỬA KHẨU CẢNG BIỂN TRÊN ĐỊA BÀN<br>
                    THÀNH PHỐ HỒ CHÍ MINH
                </h2>
            </div>
            
            <div class="hero-image">
                <img src="images/tphcm-bkg.jpg" alt="Cảng Sài Gòn" class="port-image">
            </div>
        </div>
    `;
}

function loadPaymentContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1><i class="fas fa-file-invoice-dollar"></i> Nộp Phí Cơ Sở Hạ Tầng</h1>
                <p>Quản lý và khai báo nộp phí sử dụng kết cấu hạ tầng cảng biển</p>
            </div>
            
            <div class="content-cards">
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-plus-circle"></i>
                        <h3>Tạo Tờ Khai Mới</h3>
                    </div>
                    <div class="card-body">
                        <p>Tạo tờ khai nộp phí cho dịch vụ cảng biển</p>
                        <button class="btn btn-primary" onclick="showMessage('Chức năng đang phát triển!', 'info')">
                            <i class="fas fa-edit"></i> Tạo Tờ Khai
                        </button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-list"></i>
                        <h3>Danh Sách Tờ Khai</h3>
                    </div>
                    <div class="card-body">
                        <p>Xem và quản lý các tờ khai đã tạo</p>
                        <button class="btn btn-info" onclick="showMessage('Chức năng đang phát triển!', 'info')">
                            <i class="fas fa-eye"></i> Xem Danh Sách
                        </button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-signature"></i>
                        <h3>Ký Số Điện Tử</h3>
                    </div>
                    <div class="card-body">
                        <p>Thực hiện ký số cho tờ khai nộp phí</p>
                        <button class="btn btn-warning" onclick="showMessage('Chức năng đang phát triển!', 'info')">
                            <i class="fas fa-pen-alt"></i> Ký Số
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addPageStyles();
}

function loadAccountContent() {
    const mainContent = document.querySelector('.main-content');
    const username = sessionStorage.getItem('username') || 'admin';
    
    mainContent.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1><i class="fas fa-user-circle"></i> Thông Tin Tài Khoản</h1>
                <p>Quản lý thông tin tài khoản của bạn</p>
            </div>
            
            <div class="account-info">
                <div class="info-card">
                    <h3>Thông Tin Cơ Bản</h3>
                    <div class="info-row">
                        <label>Tài khoản:</label>
                        <span>${username === 'admin' ? '0109844160' : username}</span>
                    </div>
                    <div class="info-row">
                        <label>Loại tài khoản:</label>
                        <span>Doanh nghiệp nộp phí</span>
                    </div>
                    <div class="info-row">
                        <label>Trạng thái:</label>
                        <span class="status-online">Đang hoạt động</span>
                    </div>
                    <div class="info-row">
                        <label>Đăng nhập lần cuối:</label>
                        <span id="last-login-time">-</span>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3>Thông Tin Doanh Nghiệp</h3>
                    <div class="info-row">
                        <label>Tên doanh nghiệp:</label>
                        <span>Công ty Demo TPHCM</span>
                    </div>
                    <div class="info-row">
                        <label>Mã số thuế:</label>
                        <span>0109844160</span>
                    </div>
                    <div class="info-row">
                        <label>Địa chỉ:</label>
                        <span>Thành phố Hồ Chí Minh</span>
                    </div>
                    <div class="info-row">
                        <label>Email:</label>
                        <span>demo@example.com</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update last login time
    const lastLoginElement = document.getElementById('last-login-time');
    const loginTime = sessionStorage.getItem('loginTime');
    if (loginTime && lastLoginElement) {
        const date = new Date(loginTime);
        lastLoginElement.textContent = date.toLocaleString('vi-VN');
    }
    
    addPageStyles();
}

function loadPasswordContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1><i class="fas fa-key"></i> Đổi Mật Khẩu</h1>
                <p>Thay đổi mật khẩu đăng nhập của bạn</p>
            </div>
            
            <div class="password-form">
                <form id="changePasswordForm">
                    <div class="form-group">
                        <label>Mật khẩu hiện tại:</label>
                        <input type="password" id="currentPassword" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Mật khẩu mới:</label>
                        <input type="password" id="newPassword" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Xác nhận mật khẩu mới:</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Đổi Mật Khẩu
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Setup form handler
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showMessage('Chức năng đổi mật khẩu sẽ có sẵn trong phiên bản chính thức!', 'info');
    });
    
    addPageStyles();
}

function loadGuideContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1><i class="fas fa-question-circle"></i> Hướng Dẫn Sử Dụng</h1>
                <p>Tài liệu và video hướng dẫn sử dụng hệ thống</p>
            </div>
            
            <div class="guide-content">
                <div class="guide-card">
                    <h3>Video Hướng Dẫn</h3>
                    <ul>
                        <li><a href="#" onclick="showMessage('Video sẽ có sẵn trong phiên bản chính thức!', 'info')">Hướng dẫn đăng ký tài khoản</a></li>
                        <li><a href="#" onclick="showMessage('Video sẽ có sẵn trong phiên bản chính thức!', 'info')">Hướng dẫn khai báo nộp phí</a></li>
                        <li><a href="#" onclick="showMessage('Video sẽ có sẵn trong phiên bản chính thức!', 'info')">Hướng dẫn ký số điện tử</a></li>
                        <li><a href="#" onclick="showMessage('Video sẽ có sẵn trong phiên bản chính thức!', 'info')">Hướng dẫn thanh toán phí</a></li>
                    </ul>
                </div>
                
                <div class="guide-card">
                    <h3>Tài Liệu Hướng Dẫn</h3>
                    <ul>
                        <li><a href="#" onclick="showMessage('Tài liệu sẽ có sẵn trong phiên bản chính thức!', 'info')">Quy trình thu phí (PDF)</a></li>
                        <li><a href="#" onclick="showMessage('Tài liệu sẽ có sẵn trong phiên bản chính thức!', 'info')">Hướng dẫn chi tiết (DOC)</a></li>
                        <li><a href="#" onclick="showMessage('Tài liệu sẽ có sẵn trong phiên bản chính thức!', 'info')">Câu hỏi thường gặp (PDF)</a></li>
                    </ul>
                </div>
                
                <div class="guide-card">
                    <h3>Liên Hệ Hỗ Trợ</h3>
                    <div class="contact-info">
                        <p><i class="fas fa-phone"></i> Hotline: <strong>1900 1234</strong></p>
                        <p><i class="fas fa-envelope"></i> Email: <strong>thuphihatang@tphcm.gov.vn</strong></p>
                        <p><i class="fas fa-clock"></i> Thời gian hỗ trợ: 7:30 - 17:30 (Thứ 2 - Thứ 6)</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addPageStyles();
}

function addPageStyles() {
    if (!document.getElementById('pageStyles')) {
        const styles = document.createElement('style');
        styles.id = 'pageStyles';
        styles.textContent = `
            .page-content {
                padding: 30px;
                background: white;
                margin: 0;
                min-height: calc(100vh - 140px);
            }
            
            .page-header {
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #3498db;
            }
            
            .page-header h1 {
                color: #2c3e50;
                font-size: 2rem;
                margin-bottom: 10px;
            }
            
            .page-header p {
                color: #666;
                font-size: 1.1rem;
            }
            
            .content-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .card {
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                overflow: hidden;
                transition: transform 0.3s ease;
            }
            
            .card:hover {
                transform: translateY(-5px);
            }
            
            .card-header {
                background: #3498db;
                color: white;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .card-header h3 {
                margin: 0;
                font-size: 1.2rem;
            }
            
            .card-body {
                padding: 20px;
            }
            
            .btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                margin-top: 15px;
            }
            
            .btn:hover {
                background: #2980b9;
                transform: translateY(-2px);
            }
            
            .btn-primary { background: #3498db; }
            .btn-info { background: #17a2b8; }
            .btn-warning { background: #ffc107; color: #333; }
            
            .account-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 30px;
            }
            
            .info-card {
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .info-card h3 {
                color: #2c3e50;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #3498db;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                padding: 10px 0;
                border-bottom: 1px solid #f8f9fa;
            }
            
            .info-row label {
                font-weight: bold;
                color: #555;
            }
            
            .status-online {
                color: #28a745;
                font-weight: bold;
            }
            
            .password-form {
                max-width: 500px;
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #555;
            }
            
            .form-group input {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 5px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: #3498db;
            }
            
            .guide-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
            }
            
            .guide-card {
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .guide-card h3 {
                color: #2c3e50;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #3498db;
            }
            
            .guide-card ul {
                list-style: none;
                padding: 0;
            }
            
            .guide-card li {
                margin-bottom: 10px;
            }
            
            .guide-card a {
                color: #3498db;
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .guide-card a:hover {
                color: #2980b9;
                text-decoration: underline;
            }
            
            .contact-info p {
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(styles);
    }
}

function showLoadingState(element) {
    element.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 300px;">
            <div style="text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: #3498db; margin-bottom: 20px;"></i>
                <p style="color: #666; font-size: 1.2rem;">Đang tải...</p>
            </div>
        </div>
    `;
}

function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    const footer = document.querySelector('.footer');
    
    // Restore sidebar state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        contentArea.classList.add('expanded');
        footer.classList.add('expanded');
    }
}

function setupResponsive() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    
    // Handle mobile sidebar
    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            
            menuToggle.onclick = function() {
                sidebar.classList.toggle('show');
            };
        } else {
            sidebar.classList.remove('show');
            menuToggle.onclick = function() {
                const contentArea = document.querySelector('.content-area');
                const footer = document.querySelector('.footer');
                
                sidebar.classList.toggle('collapsed');
                contentArea.classList.toggle('expanded');
                footer.classList.toggle('expanded');
                
                localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
            };
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

function handleLogout() {
    showConfirmDialog(
        'Xác nhận đăng xuất',
        'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
        function() {
            // Clear session
            sessionStorage.clear();
            
            // Show logout message
            showMessage('Đăng xuất thành công!', 'success');
            
            // Redirect to login - check if came from original login page
            setTimeout(() => {
                // Try to go back to original login page if available
                if (document.referrer && document.referrer.includes('dang-nhap')) {
                    window.location.href = '../thuphihatang.tphcm.gov.vn/dang-nhap.html';
                } else {
                    // Default to swps login
                    window.location.href = 'login.html';
                }
            }, 1000);
        }
    );
}

function setupAutoLogout() {
    let timeoutId;
    const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
    
    function resetTimeout() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            showMessage('Phiên làm việc đã hết hạn. Bạn sẽ được đăng xuất!', 'warning');
            setTimeout(() => {
                sessionStorage.clear();
                window.location.href = '../thuphihatang.tphcm.gov.vn/dang-nhap.html';
            }, 3000);
        }, TIMEOUT_DURATION);
    }
    
    // Reset timeout on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetTimeout, true);
    });
    
    resetTimeout(); // Initial call
}

function showWelcomeMessage() {
    const username = sessionStorage.getItem('username') || 'admin';
    showMessage(`Chào mừng ${username === 'admin' ? 'Admin' : username} quay trở lại!`, 'success');
}

function updateLastLoginTime() {
    const loginTime = new Date().toISOString();
    sessionStorage.setItem('lastLoginTime', loginTime);
}

// Utility functions
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fa ${getMessageIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add message styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${getMessageColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#messageStyles')) {
        const styles = document.createElement('style');
        styles.id = 'messageStyles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .message-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to document
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }
    }, 5000);
}

function showConfirmDialog(title, message, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
        <div class="dialog-overlay"></div>
        <div class="dialog-content">
            <div class="dialog-header">
                <h3>${title}</h3>
            </div>
            <div class="dialog-body">
                <p>${message}</p>
            </div>
            <div class="dialog-footer">
                <button class="btn btn-secondary" onclick="this.closest('.confirm-dialog').remove()">Hủy</button>
                <button class="btn btn-danger" id="confirmBtn">Xác nhận</button>
            </div>
        </div>
    `;
    
    // Add dialog styles
    dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add dialog CSS if not exists
    if (!document.querySelector('#dialogStyles')) {
        const styles = document.createElement('style');
        styles.id = 'dialogStyles';
        styles.textContent = `
            .dialog-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
            }
            .dialog-content {
                background: white;
                border-radius: 10px;
                min-width: 400px;
                max-width: 500px;
                position: relative;
                z-index: 1;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .dialog-header {
                padding: 20px;
                border-bottom: 1px solid #e9ecef;
            }
            .dialog-header h3 {
                margin: 0;
                color: #2c3e50;
            }
            .dialog-body {
                padding: 20px;
            }
            .dialog-footer {
                padding: 20px;
                border-top: 1px solid #e9ecef;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            .btn-secondary {
                background: #6c757d;
            }
            .btn-danger {
                background: #dc3545;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(dialog);
    
    // Setup confirm button
    dialog.querySelector('#confirmBtn').addEventListener('click', function() {
        dialog.remove();
        onConfirm();
    });
    
    // Close on overlay click
    dialog.querySelector('.dialog-overlay').addEventListener('click', function() {
        dialog.remove();
    });
}

function getMessageIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getMessageColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}
