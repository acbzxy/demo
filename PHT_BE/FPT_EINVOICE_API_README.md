# FPT eInvoice API - Tích Hợp Hoàn Chỉnh

## Tổng quan
API tích hợp với FPT eInvoice, gom tất cả các chức năng vào một controller duy nhất.

## Base URL
```
/api/fpt-einvoice
```

## Endpoints

### 1. Tạo ICR e-invoice
```
POST /api/fpt-einvoice/create-icr
```

**Request Body:**
```json
{
    "user": {
        "username": "admin",
        "password": "password123"
    },
    "inv": {
        "stax": "222222222211",
        "idt": "2024-01-01",
        "type": "01/MTT",
        "form": "1",
        "serial": "AA/24E",
        "seq": "0000001"
    }
}
```

### 2. Cập nhật ICR e-invoice
```
POST /api/fpt-einvoice/update-icr
```

**Request Body:**
```json
{
    "user": {
        "username": "admin",
        "password": "password123"
    },
    "inv": {
        "stax": "222222222211",
        "idt": "2024-01-01",
        "type": "01/MTT",
        "form": "1",
        "serial": "AA/24E",
        "seq": "0000001"
    }
}
```

### 3. Xóa hóa đơn chưa phát hành
```
POST /api/fpt-einvoice/delete-icr
```

**Request Body:**
```json
{
    "user": {
        "username": "admin",
        "password": "password123"
    },
    "ref_inv": {
        "inc": "INV001"
    },
    "sid": "session123",
    "stax": "stax999"
}
```

### 4. Hủy hóa đơn
```
POST /api/fpt-einvoice/cancel-icr
```

**Request Body:**
```json
{
    "user": {
        "username": "admin",
        "password": "password123"
    },
    "wrongnotice": {
        "stax": "stax999",
        "noti_taxtype": "1",
        "noti_taxnum": "Số 01",
        "noti_taxdt": "2024-01-01",
        "budget_relationid": "",
        "place": "Hà Nội",
        "items": [
            {
                "form": "01GTKT",
                "serial": "AA/24E",
                "seq": "0000001",
                "idt": "2024-01-01",
                "type_ref": 1,
                "noti_type": "1",
                "rea": ""
            }
        ]
    }
}
```

### 5. Thay thế hóa đơn
```
POST /api/fpt-einvoice/replace-icr
```

**Request Body:**
```json
{
    "lang": "vi",
    "user": {
        "username": "222222222211.admin",
        "password": "password123"
    },
    "inv": {
        "adj": {
            "rdt": "2024-01-01",
            "rea": "",
            "ref": "123",
            "seq": "1-AA/24E-0000001"
        },
        "sid": "session123",
        "idt": "2024-01-01",
        "type": "01/MTT",
        "form": "1",
        "serial": "AA/24E",
        "seq": "0000001",
        "aun": 2,
        "bname": "Công ty TNHH…",
        "baddr": "API_địa chỉ",
        "buyer": "API_ng mua",
        "btax": "2222222222",
        "sumv": 1100,
        "sum": 1100,
        "vatv": 90,
        "vat": 90,
        "totalv": 1190,
        "total": 1190,
        "type_ref": 1,
        "notsendmail": 1,
        "sendfile": 1,
        "items": [
            {
                "line": 1,
                "type": "",
                "vrt": "8",
                "code": "HH gốc",
                "name": "Tivi LG",
                "unit": "chiếc",
                "price": 1000,
                "quantity": 1,
                "amount": 1000
            }
        ],
        "stax": "222222222211"
    }
}
```

### 6. Tìm kiếm hóa đơn
```
POST /api/fpt-einvoice/search-icr
```

**Request Body:**
```json
{
    "stax": "0318680861",
    "type": "pdf",
    "sid": "SonTEST072025027",
    "user": {
        "username": "0318680861.MPOS",
        "password": "Admin@123"
    }
}
```

**Request Body Fields:**
- `stax` (String, required): STAX - Mã số thuế
- `type` (String, optional): Loại response (mặc định: "json")
- `sid` (String, required): Session ID
- `user.username` (String, required): Username cho Basic Auth
- `user.password` (String, required): Password cho Basic Auth

## Cấu hình

### Application Properties
```properties
# ===============================
# FPT E-INVOICE API CONFIGURATION
# ===============================
fpt.einvoice.api.url=https://api-uat.einvoice.fpt.com.vn
fpt.einvoice.api.create.url=/create-icr
fpt.einvoice.api.update.url=/update-icr
fpt.einvoice.api.delete.url=/delete-icr
fpt.einvoice.api.cancel.url=/cancel-icr
fpt.einvoice.api.replace.url=/replace-icr
fpt.einvoice.api.search.url=/search-icr
fpt.einvoice.api.timeout=30000
fpt.einvoice.api.username=0318680861
fpt.einvoice.api.password=SonTEST072025027
```

## Response Format
Tất cả API đều trả về response nguyên từ FPT eInvoice:

```json
{
    "errorCode": "0",
    "errorMessage": "Success",
    "data": null
}
```

## Lợi ích của việc gom controller

1. **✅ Tập trung**: Tất cả API FPT eInvoice trong một nơi
2. **✅ Dễ quản lý**: Cấu hình URL tập trung trong properties
3. **✅ Tái sử dụng**: Chia sẻ RestTemplate và ObjectMapper
4. **✅ Bảo trì**: Dễ dàng cập nhật và sửa lỗi
5. **✅ Performance**: Giảm số lượng bean được tạo
6. **✅ Consistency**: Cùng một pattern xử lý cho tất cả API

## Cấu trúc file

```
src/main/java/com/pht/
├── controller/
│   └── FptEInvoiceController.java          # Controller chính
├── model/
│   ├── request/
│   │   ├── DeleteInvoiceRequest.java       # Request models
│   │   ├── CancelInvoiceRequest.java
│   │   ├── ReplaceInvoiceRequest.java
│   │   └── SearchInvoiceRequest.java
│   └── response/
│       ├── DeleteInvoiceResponse.java      # Response models
│       ├── CancelInvoiceResponse.java
│       ├── ReplaceInvoiceResponse.java
│       └── SearchInvoiceResponse.java
└── config/
    └── RestTemplateConfig.java             # Cấu hình RestTemplate
```

## Swagger Documentation
Truy cập: `http://localhost:8081/PHT_BE-documentation`

Tất cả API được nhóm dưới tag "FPT eInvoice" trong Swagger UI.
