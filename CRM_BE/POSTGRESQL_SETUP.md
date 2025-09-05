# 🐘 PostgreSQL Setup Guide

## 📋 **Tổng quan**

Hướng dẫn chuyển đổi từ Oracle sang PostgreSQL cho CRM_BE project.

## 🛠️ **Bước 1: Cài đặt PostgreSQL**

### **Windows:**
1. Tải PostgreSQL từ: https://www.postgresql.org/download/windows/
2. Chạy installer
3. Đặt password cho user `postgres`: `postgres`
4. Giữ port mặc định: `5432`

### **macOS:**
```bash
# Sử dụng Homebrew
brew install postgresql
brew services start postgresql
```

### **Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 🛠️ **Bước 2: Tạo Database**

### **Cách 1: Sử dụng pgAdmin (GUI)**
1. Mở pgAdmin
2. Kết nối vào PostgreSQL server
3. Right-click "Databases" → "Create" → "Database"
4. Đặt tên: `crm_db`
5. Click "Save"

### **Cách 2: Sử dụng psql (Command Line)**
```bash
# Kết nối vào PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE crm_db;

# Kết nối vào database
\c crm_db

# Thoát
\q
```

### **Cách 3: Chạy SQL Script**
```bash
# Chạy script tự động
psql -U postgres -f postgresql_setup.sql
```

## 🛠️ **Bước 3: Cập nhật Application**

### **3.1. Dependencies đã được cập nhật:**
- ✅ Thay `ojdbc8` bằng `postgresql` trong `pom.xml`
- ✅ Cập nhật `application.properties`

### **3.2. Entity classes đã được cập nhật:**
- ✅ Thay `SEQUENCE` bằng `IDENTITY` cho ID generation
- ✅ Loại bỏ `@SequenceGenerator` annotations

## 🛠️ **Bước 4: Build và Test**

### **Build project:**
```bash
mvn clean package
```

### **Chạy application:**
```bash
java -jar target/CRM_BE-1.0.war
```

### **Test API:**
```bash
# Test connection
curl http://localhost:8081/CRM_BE/api/tokhai-thongtin

# Test insert
curl -X POST http://localhost:8081/CRM_BE/api/tokhai-thongtin \
  -H "Content-Type: application/json" \
  -d '{
    "nguonTK": 1,
    "maDoanhNghiepKhaiPhi": "DNKHAIPHI001",
    "tenDoanhNghiepKhaiPhi": "Công ty TNHH Xuất Nhập Khẩu ABC",
    "diaChiKhaiPhi": "Số 123, Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội",
    "maDoanhNghiepXNK": "DNXNK001",
    "tenDoanhNghiepXNK": "Công ty CP Thương mại Quốc tế XYZ",
    "diaChiXNK": "456 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
    "soToKhai": "1020304050",
    "ngayToKhai": "2025-08-30",
    "maHaiQuan": "HQHCM01",
    "maLoaiHinh": "A11",
    "maLuuKho": "LKHCM01",
    "nuocXuatKhau": "CN",
    "maPhuongThucVC": "SEA",
    "phuongTienVC": "Tàu biển MSC Harmony",
    "maDiaDiemXepHang": "SGNP",
    "maDiaDiemDoHang": "VNHPH",
    "maPhanLoaiHangHoa": "H01",
    "mucDichVC": "Kinh doanh",
    "soTiepNhanKhaiPhi": "TPN20250830001",
    "ngayKhaiPhi": "2025-08-30",
    "nhomLoaiPhi": "XNK",
    "loaiThanhToan": "Chuyển khoản",
    "ghiChuKhaiPhi": "Thanh toán trước khi dỡ hàng",
    "soThongBaoNopPhi": "TBP20250830001",
    "tongTienPhi": 2500000,
    "trangThaiNganHang": "Đã thanh toán",
    "soBienLai": "BL20250830001",
    "ngayBienLai": "2025-08-30",
    "kyHieuBienLai": "AA/25P",
    "mauBienLai": "01BLP",
    "maTraCuuBienLai": "MTRBL20250830ABC",
    "xemBienLai": "https://hqhcm.gov.vn/bienlai/BL20250830001",
    "loaiHangMienPhi": "Không",
    "loaiHang": "Điện tử",
    "trangThai": "00"
  }'
```

## 🔧 **Troubleshooting**

### **Lỗi "Connection refused"**
- Kiểm tra PostgreSQL service đang chạy
- Kiểm tra port 5432
- Kiểm tra firewall

### **Lỗi "Authentication failed"**
- Kiểm tra username/password trong `application.properties`
- Reset password cho user postgres

### **Lỗi "Database does not exist"**
- Tạo database `crm_db`
- Chạy script `postgresql_setup.sql`

### **Lỗi "Table does not exist"**
- Chạy script `postgresql_setup.sql` để tạo tables
- Hoặc để Hibernate tự tạo: `spring.jpa.hibernate.ddl-auto=create`

## 📊 **So sánh Oracle vs PostgreSQL**

| Tính năng | Oracle | PostgreSQL |
|-----------|--------|------------|
| **License** | Commercial | Open Source |
| **Cost** | Expensive | Free |
| **Performance** | Excellent | Very Good |
| **Features** | Rich | Rich |
| **Community** | Large | Large |
| **Documentation** | Excellent | Excellent |

## 🎉 **Kết luận**

PostgreSQL là lựa chọn tuyệt vời cho CRM_BE project:
- ✅ **Miễn phí** và mã nguồn mở
- ✅ **Hiệu suất cao** và ổn định
- ✅ **Tương thích tốt** với Spring Boot
- ✅ **Cộng đồng lớn** và hỗ trợ tốt
