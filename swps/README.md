# Hệ Thống Thu Phí TPHCM - Dev Environment

## Giới thiệu
Đây là phiên bản dev environment của Hệ thống thu phí sử dụng kết cấu hạ tầng, công trình dịch vụ, tiện ích công cộng trong khu vực cửa khẩu cảng biển trên địa bàn Thành Phố Hồ Chí Minh.

## Cấu trúc thư mục
```
swps/
├── index.html          # Trang chủ/welcome page
├── dashboard.html      # Trang dashboard chính  
├── css/
│   └── dashboard.css   # Styles cho trang dashboard
├── js/
│   └── dashboard.js    # Logic dashboard
├── images/
│   ├── cangvu-hcm-logo.png
│   ├── login-user.png
│   ├── logoTSD.png
│   └── tphcm-bkg.jpg
├── demo-script.js      # Script demo tự động
└── README.md           # File hướng dẫn này
```

**Note**: Login được integrate vào trang gốc `../thuphihatang.tphcm.gov.vn/dang-nhap.html`

## Tính năng

### 🔐 Hệ thống đăng nhập
- Giao diện đăng nhập hiện đại, responsive
- Validation đầu vào
- Session management
- Auto-fill credentials cho dev
- Remember me functionality

### 📊 Dashboard
- Giao diện dashboard theo thiết kế gốc
- Sidebar navigation với menu đầy đủ
- Responsive design
- Multiple page content
- Auto logout sau thời gian không hoạt động

### 🎨 UI/UX Features
- Modern, responsive design
- Smooth animations và transitions
- Loading states
- Message notifications
- Confirm dialogs
- Mobile-friendly

## Hướng dẫn sử dụng

### 1. Khởi chạy
- Mở file `../thuphihatang.tphcm.gov.vn/dang-nhap.html` trong trình duyệb
- Hoặc mở `../test-dev.html` để testing
- Hoặc mở `index.html` cho welcome page

### 2. Đăng nhập
**Tài khoản dev:**
- Username: `devadmin`  
- Password: `dev123456`
- **Tip**: Double-click vào ô Username để auto-fill

### 3. Sử dụng Dashboard
- Sau khi đăng nhập thành công, hệ thống sẽ chuyển hướng đến dashboard
- Sử dụng sidebar để điều hướng giữa các trang
- Tất cả menu đều functional với nội dung demo

### 4. Tính năng chính
- **Trang chủ**: Hiển thị thông tin tổng quan
- **Nộp phí cơ sở hạ tầng**: Quản lý việc nộp phí
- **Thông tin tài khoản**: Xem thông tin tài khoản
- **Đổi mật khẩu**: Thay đổi mật khẩu
- **Hướng dẫn**: Tài liệu hướng dẫn sử dụng

## Công nghệ sử dụng

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling với Flexbox, Grid
- **JavaScript (ES6+)**: Pure JavaScript, không dependencies
- **Font Awesome**: Icons
- **Google Fonts**: Typography

### Features
- **Responsive Design**: Mobile-first approach
- **Session Storage**: Quản lý phiên đăng nhập
- **Local Storage**: Lưu preferences
- **CSS Animations**: Smooth transitions
- **Modern UI Components**: Cards, modals, notifications

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Development Notes

### Architecture
- **Separation of Concerns**: HTML, CSS, JS tách biệt hoàn toàn
- **Modular CSS**: Component-based styling
- **Event-driven JS**: Event listeners và callbacks
- **Session Management**: Secure session handling

### Security Features
- Input validation
- XSS protection
- Session timeout
- CSRF considerations

### Performance
- Optimized images
- Minified external dependencies
- Efficient DOM manipulation
- Smooth animations với CSS transforms

## Demo Features

### Login Page
- ✅ Responsive design
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Remember me
- ✅ Auto-fill dev credentials

### Dashboard
- ✅ Sidebar navigation
- ✅ Multiple page content
- ✅ User session management
- ✅ Responsive layout
- ✅ Modern UI components
- ✅ Notifications system
- ✅ Confirm dialogs
- ✅ Auto logout

## File Dependencies

### CSS Dependencies
- Font Awesome 6.0.0 (CDN)
- Custom CSS files

### JavaScript Dependencies
- Pure JavaScript (no external libraries)
- Modern browser APIs

## Customization

### Colors
Primary colors được định nghĩa trong CSS variables:
- Primary: `#3498db`
- Secondary: `#2c3e50`
- Success: `#28a745`
- Warning: `#ffc107`
- Danger: `#dc3545`

### Layout
- Sidebar width: `280px`
- Header height: `70px`
- Responsive breakpoints: `768px`, `992px`, `1200px`

## Deployment
Để deploy production:
1. Optimize images
2. Minify CSS/JS
3. Setup proper web server
4. Configure HTTPS
5. Setup proper database backend

## Contact
- **Hotline**: 1900 1286
- **Email**: thuphihatang@tphcm.gov.vn

---
**Copyright © 2025** - Công Ty TNHH Phát Triển Công Nghệ Thái Sơn
