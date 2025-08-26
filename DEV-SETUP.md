# Dev Login Setup - Hướng dẫn sử dụng

## 🎯 Tổng quan
Đã thêm tài khoản dev vào trang login gốc `thuphihatang.tphcm.gov.vn/dang-nhap.html` để có thể bypass authentication và truy cập dashboard.

## 🔑 Tài khoản Dev
- **Username**: `devadmin`
- **Password**: `dev123456`
- **Captcha**: Tự động bypass (không cần nhập)

## 🚀 Cách sử dụng

### Phương pháp 1: Truy cập trực tiếp
1. Mở `thuphihatang.tphcm.gov.vn/dang-nhap.html`
2. Nhập username: `devadmin`
3. Nhập password: `dev123456`
4. Bấm "Đăng nhập" (không cần captcha)
5. Tự động chuyển về dashboard

### Phương pháp 2: Auto-fill (Khuyên dùng)
1. Mở `thuphihatang.tphcm.gov.vn/dang-nhap.html`
2. **Double-click vào ô Username** 
3. Thông tin dev sẽ tự động điền
4. Bấm "Đăng nhập"
5. Chuyển về dashboard

### Phương pháp 3: Testing page
1. Mở `test-dev.html`
2. Xem status hiện tại
3. Click "Go to Login"
4. Thực hiện login như bình thường

## 📂 Cấu trúc Files

### Files đã thay đổi:
- `thuphihatang.tphcm.gov.vn/dang-nhap.html` - Thêm logic dev login
- `swps/js/dashboard.js` - Cập nhật redirect paths
- `index.html` - Thêm check dev session

### Files mới:
- `test-dev.html` - Trang testing dev functionality
- `DEV-SETUP.md` - File hướng dẫn này

### Files giữ nguyên:
- `swps/` folder - Dashboard system hoàn chỉnh
- Tất cả files gốc khác

## ✨ Tính năng

### Dev Login Features:
- ✅ **Auto-fill credentials**: Double-click username field
- ✅ **Bypass captcha**: Không cần nhập mã xác nhận
- ✅ **Visual feedback**: Dev info panel hiển thị ngay dưới form
- ✅ **Loading animation**: "Đang đăng nhập dev..."
- ✅ **Success message**: Thông báo thành công với countdown
- ✅ **Auto redirect**: Tự động chuyển về dashboard sau 2 giây

### Dashboard Features:
- ✅ **Session management**: Lưu thông tin đăng nhập
- ✅ **Auto logout**: Sau 30 phút không hoạt động
- ✅ **Proper redirects**: Logout về đúng trang login gốc
- ✅ **Navigation**: Đầy đủ các menu chức năng
- ✅ **Responsive**: Hoạt động tốt trên mobile

### Security Features:
- ✅ **Non-dev accounts**: Vẫn hoạt động bình thường với server
- ✅ **Input validation**: Kiểm tra đầy đủ required fields
- ✅ **Session timeout**: Auto logout để bảo mật
- ✅ **Confirm dialogs**: Xác nhận khi logout

## 🔧 Technical Details

### Logic Flow:
1. **Form Submit Intercept**: JavaScript chặn form submit
2. **Credential Check**: So sánh với dev credentials
3. **Dev Path**: Nếu đúng → fake login → redirect dashboard
4. **Normal Path**: Nếu không → submit form bình thường về server

### Session Storage:
```javascript
sessionStorage.setItem('isLoggedIn', 'true');
sessionStorage.setItem('username', username);
sessionStorage.setItem('loginTime', new Date().toISOString());
sessionStorage.setItem('userType', 'dev');
```

### Redirect Logic:
- **From original login** → Dashboard → Logout → Back to original login
- **From swps login** → Dashboard → Logout → Back to swps login
- **Direct dashboard access** → Check login → Redirect to original login if not logged in

## 🐛 Troubleshooting

### Issue: "Không thể truy cập dashboard"
- **Solution**: Kiểm tra sessionStorage có `isLoggedIn = 'true'` không

### Issue: "Auto-fill không hoạt động"
- **Solution**: Đảm bảo đã double-click đúng vào ô Username

### Issue: "Logout không về đúng trang"
- **Solution**: Xóa browser cache và thử lại

### Issue: "Dev info không hiển thị"
- **Solution**: Kiểm tra JavaScript console có lỗi không

## 📱 Browser Support
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🔍 Testing Checklist

### Login Testing:
- [ ] Manual input dev credentials
- [ ] Auto-fill via double-click
- [ ] Captcha bypass works
- [ ] Loading animation shows
- [ ] Success message appears
- [ ] Redirect to dashboard works

### Dashboard Testing:
- [ ] All navigation links work
- [ ] Responsive design on mobile
- [ ] Session management works
- [ ] Auto logout functions
- [ ] Logout confirmation appears
- [ ] Redirect back to login works

### Integration Testing:
- [ ] Regular accounts still work
- [ ] Server submission not affected
- [ ] Browser back/forward works
- [ ] Page refresh handles sessions correctly

## 📞 Support
Nếu có vấn đề gì, kiểm tra:
1. Browser console có lỗi JavaScript không
2. SessionStorage có đúng keys không
3. File paths có chính xác không
4. Browser cache đã clear chưa

---
**Created**: 2025-08-26  
**Last Updated**: 2025-08-26  
**Version**: 1.0  
**Environment**: Development
