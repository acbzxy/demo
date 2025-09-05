package com.crm.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.crm.model.request.LayThongTinHaiQuanRequest;
import com.crm.model.request.ParseHaiQuanDataRequest;
import com.crm.model.response.ChiTietHaiQuanResponse;
import com.crm.model.response.HaiQuanXmlResponse;
import com.crm.model.response.ThongTinHaiQuanResponse;
import com.crm.service.HaiQuanService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class HaiQuanServiceImpl implements HaiQuanService {

    @Override
    public ThongTinHaiQuanResponse layThongTinHaiQuan(LayThongTinHaiQuanRequest request) {
        log.info("Lấy thông tin hải quan cho số tờ khai: {}, mã doanh nghiệp: {}", 
                request.getSoToKhaiHaiQuan(), request.getMaDoanhNghiep());
        
        // Tạo dữ liệu giả lập dựa trên XML bạn cung cấp và map vào cấu trúc ToKhaiThongTin
        ThongTinHaiQuanResponse response = new ThongTinHaiQuanResponse();
        
        // Thông tin chính
        response.setId(1L);
        response.setNguonTK(1); // Lấy từ hải quan
        
        // DOANH NGHIỆP KHAI PHÍ (từ XML: Ma_DV, Ten_DV, DiaChi)
        response.setMaDoanhNghiepKhaiPhi("3700689599");
        response.setTenDoanhNghiepKhaiPhi("Công ty TNHH Điện Tử FOSTER (Việt Nam)");
        response.setDiaChiKhaiPhi("KCN Việt Nam - Singapore");
        
        // DOANH NGHIỆP XNK (giống doanh nghiệp khai phí)
        response.setMaDoanhNghiepXNK("3700689599");
        response.setTenDoanhNghiepXNK("Công ty TNHH Điện Tử FOSTER (Việt Nam)");
        response.setDiaChiXNK("KCN Việt Nam - Singapore");
        
        // TỜ KHAI HẢI QUAN (từ XML: So_TK_HQ, Ngay_TK_HQ, Ma_HQ, Ma_LH)
        response.setSoToKhai("10273552333");
        response.setNgayToKhai(LocalDate.of(2019, 12, 26));
        response.setMaHaiQuan("03CC");
        response.setMaLoaiHinh("A11");
        response.setMaLuuKho(""); // Chưa có trong XML
        response.setNuocXuatKhau(""); // Chưa có trong XML
        
        // THÔNG TIN HÀNG HÓA (chưa có trong XML, để trống)
        response.setMaPhuongThucVC("");
        response.setPhuongTienVC("");
        response.setMaDiaDiemXepHang("");
        response.setMaDiaDiemDoHang("");
        response.setMaPhanLoaiHangHoa("");
        response.setMucDichVC("");
        
        // TỜ KHAI PHÍ (từ XML: So_TK_NP, Ngay_TK_NP)
        response.setSoTiepNhanKhaiPhi("201900282");
        response.setNgayKhaiPhi(LocalDate.of(2019, 12, 26));
        response.setNhomLoaiPhi("PHT01"); // Từ Ma_LoaiPhi
        response.setLoaiThanhToan("Chuyển khoản ngân hàng");
        response.setGhiChuKhaiPhi("Phí sử dụng kết cấu hạ tầng cảng biển");
        
        // THÔNG TIN THU PHÍ (từ XML: SoTien_TO, các thông tin khác)
        response.setSoThongBaoNopPhi(""); // Chưa có trong XML
        response.setTongTienPhi(new BigDecimal("750000"));
        response.setTrangThaiNganHang("NGÂN HÀNG CHƯA GẠCH NỢ");
        response.setSoBienLai(""); // Chưa có trong XML
        response.setNgayBienLai(null); // Chưa có trong XML
        response.setKyHieuBienLai(""); // Chưa có trong XML
        response.setMauBienLai(""); // Chưa có trong XML
        response.setMaTraCuuBienLai(""); // Chưa có trong XML
        response.setXemBienLai(""); // Chưa có trong XML
        
        // DANH MỤC LOẠI HÀNG MIỄN PHÍ
        response.setLoaiHangMienPhi(""); // Chưa có trong XML
        response.setLoaiHang("A11"); // Từ Ma_LH
        response.setTrangThai("Chờ xử lý");
        
        // Tạo danh sách chi tiết từ ThongTinNopTien trong XML
        List<ChiTietHaiQuanResponse> chiTietList = new ArrayList<>();
        
        // Chi tiết 1 (từ ThongTinNopTien đầu tiên)
        ChiTietHaiQuanResponse chiTiet1 = new ChiTietHaiQuanResponse();
        chiTiet1.setId(1L);
        chiTiet1.setToKhaiThongTinID(1L);
        chiTiet1.setSoVanDon("223D"); // Từ So_VD
        chiTiet1.setSoHieu("REWREW43242"); // Từ So_Hieu_Container
        chiTiet1.setSoSeal(""); // Chưa có trong XML
        chiTiet1.setLoaiCont("20ft"); // Từ Ten_BieuCuoc
        chiTiet1.setTinhChatCont("Hàng khô"); // Từ Ten_BieuCuoc
        chiTiet1.setTongTrongLuong(new BigDecimal("1")); // Từ So_Luong
        chiTiet1.setDonViTinh("Container"); // Từ Don_Vi_Tinh
        chiTiet1.setGhiChu("Container 20feet hàngkhô");
        chiTietList.add(chiTiet1);
        
        // Chi tiết 2 (từ ThongTinNopTien thứ hai)
        ChiTietHaiQuanResponse chiTiet2 = new ChiTietHaiQuanResponse();
        chiTiet2.setId(2L);
        chiTiet2.setToKhaiThongTinID(1L);
        chiTiet2.setSoVanDon("223D"); // Từ So_VD
        chiTiet2.setSoHieu("REWREW43242"); // Từ So_Hieu_Container
        chiTiet2.setSoSeal(""); // Chưa có trong XML
        chiTiet2.setLoaiCont("20ft"); // Từ Ten_BieuCuoc
        chiTiet2.setTinhChatCont("Hàng khô"); // Từ Ten_BieuCuoc
        chiTiet2.setTongTrongLuong(new BigDecimal("2")); // Từ So_Luong
        chiTiet2.setDonViTinh("Container"); // Từ Don_Vi_Tinh
        chiTiet2.setGhiChu("Container 20feet hàngkhô");
        chiTietList.add(chiTiet2);
        
        response.setChiTietList(chiTietList);
        
        log.info("Trả về thông tin hải quan thành công với {} chi tiết", chiTietList.size());
        return response;
    }

    @Override
    public ThongTinHaiQuanResponse parseHaiQuanResponse(ParseHaiQuanDataRequest request) {
        log.info("Parse response String từ Hải quan: {}", request.getHaiQuanResponse());
        
        try {
            String xmlResponse = request.getHaiQuanResponse();
            ThongTinHaiQuanResponse response = new ThongTinHaiQuanResponse();
            
            // Parse thông tin chính từ XML
            response.setId(1L);
            response.setNguonTK(1);
            
            // Parse doanh nghiệp
            response.setMaDoanhNghiepKhaiPhi(extractXmlValue(xmlResponse, "Ma_DV"));
            response.setTenDoanhNghiepKhaiPhi(extractXmlValue(xmlResponse, "Ten_DV"));
            response.setDiaChiKhaiPhi(extractXmlValue(xmlResponse, "DiaChi"));
            
            // Doanh nghiệp XNK giống doanh nghiệp khai phí
            response.setMaDoanhNghiepXNK(extractXmlValue(xmlResponse, "Ma_DV"));
            response.setTenDoanhNghiepXNK(extractXmlValue(xmlResponse, "Ten_DV"));
            response.setDiaChiXNK(extractXmlValue(xmlResponse, "DiaChi"));
            
            // Parse tờ khai hải quan
            response.setSoToKhai(extractXmlValue(xmlResponse, "So_TK_HQ"));
            response.setNgayToKhai(parseDate(extractXmlValue(xmlResponse, "Ngay_TK_HQ")));
            response.setMaHaiQuan(extractXmlValue(xmlResponse, "Ma_HQ"));
            response.setMaLoaiHinh(extractXmlValue(xmlResponse, "Ma_LH"));
            
            // Parse tờ khai phí
            response.setSoTiepNhanKhaiPhi(extractXmlValue(xmlResponse, "So_TK_NP"));
            response.setNgayKhaiPhi(parseDate(extractXmlValue(xmlResponse, "Ngay_TK_NP")));
            response.setNhomLoaiPhi(extractXmlValue(xmlResponse, "Ma_LoaiPhi"));
            response.setGhiChuKhaiPhi(extractXmlValue(xmlResponse, "Ten_LoaiPhi"));
            
            // Parse thông tin thu phí
            String soTienStr = extractXmlValue(xmlResponse, "SoTien_TO");
            if (soTienStr != null && !soTienStr.isEmpty()) {
                response.setTongTienPhi(new BigDecimal(soTienStr));
            }
            
            // Parse thông tin khác
            response.setLoaiHang(extractXmlValue(xmlResponse, "Ma_LH"));
            response.setTrangThai("Chờ xử lý");
            
            // Parse danh sách chi tiết từ ThongTinNopTien
            List<ChiTietHaiQuanResponse> chiTietList = parseChiTietList(xmlResponse);
            response.setChiTietList(chiTietList);
            
            log.info("Parse thành công với {} chi tiết", chiTietList.size());
            return response;
            
        } catch (Exception e) {
            log.error("Lỗi khi parse response từ Hải quan: ", e);
            throw new RuntimeException("Lỗi khi parse dữ liệu từ Hải quan: " + e.getMessage());
        }
    }

    @Override
    public HaiQuanXmlResponse getHaiQuanXmlResponse(LayThongTinHaiQuanRequest request) {
        log.info("Giả lập response XML từ Hải quan cho số tờ khai: {}, mã doanh nghiệp: {}", 
                request.getSoToKhaiHaiQuan(), request.getMaDoanhNghiep());
        
        HaiQuanXmlResponse response = new HaiQuanXmlResponse();
        
        // Tạo XML String giả lập từ Hải quan
        String xmlResponse = "<ThongTinChungTu>" +
                "<ID_CT>UBNDHP_STC_1000</ID_CT>" +
                "<So_CT>12345</So_CT>" +
                "<KyHieu_CT>01/TBNP</KyHieu_CT>" +
                "<Ngay_CT>2019-12-26</Ngay_CT>" +
                "<Ma_DV>3700689599</Ma_DV>" +
                "<Ten_DV>Công ty TNHH Điện Tử FOSTER (Việt Nam)</Ten_DV>" +
                "<Chuong_NS>000</Chuong_NS>" +
                "<TieuMuc>2267</TieuMuc>" +
                "<DiaChi>KCN Việt Nam - Singapore</DiaChi>" +
                "<Ma_LoaiPhi>PHT01</Ma_LoaiPhi>" +
                "<Ten_LoaiPhi>Phí sử dụng kết cấu hạ tầng cảng biển</Ten_LoaiPhi>" +
                "<Ma_DV_ThuPhi>31</Ma_DV_ThuPhi>" +
                "<Ma_CQT_DV_ThuPhi>STCHP</Ma_CQT_DV_ThuPhi>" +
                "<Ten_DV_ThuPhi>TP Hải Phòng</Ten_DV_ThuPhi>" +
                "<So_TK_HQ>10273552333</So_TK_HQ>" +
                "<Ma_LH>A11</Ma_LH>" +
                "<Ngay_TK_HQ>2019-12-26</Ngay_TK_HQ>" +
                "<Ma_HQ>03CC</Ma_HQ>" +
                "<So_TK_NP>201900282</So_TK_NP>" +
                "<Ngay_TK_NP>2019-12-26</Ngay_TK_NP>" +
                "<TKKB>351101071070</TKKB>" +
                "<Ten_TKKB>Phòng Tàichính – Kế hoạch quận Hải An</Ten_TKKB>" +
                "<Ma_KB>0063</Ma_KB>" +
                "<Ten_KB>Kho bạc Nhà nước Hải An</Ten_KB>" +
                "<SoTien_TO>750000</SoTien_TO>" +
                "<DienGiai>ID_CT:xxxx;LP:xxx;DVNP:xxxx;DVTP:xxxx;MA_CQT:xxxx;TM:xxxxx;ST:xxxxx;</DienGiai>" +
                "<ThongTinNopTien>" +
                "<SoTT>1</SoTT>" +
                "<Ma_BieuCuoc>TF003_20HK</Ma_BieuCuoc>" +
                "<Ten_BieuCuoc>Container 20feet hàngkhô </Ten_BieuCuoc>" +
                "<So_VD>223D</So_VD>" +
                "<So_Hieu_Container>REWREW43242</So_Hieu_Container>" +
                "<Don_Gia>250000</Don_Gia>" +
                "<So_Luong>1</So_Luong>" +
                "<Don_Vi_Tinh>Đồng/Container</Don_Vi_Tinh>" +
                "<Thanh_Tien>250000</Thanh_Tien>" +
                "</ThongTinNopTien>" +
                "<ThongTinNopTien>" +
                "<SoTT>2</SoTT>" +
                "<Ma_BieuCuoc>TF003_20HK</Ma_BieuCuoc>" +
                "<Ten_BieuCuoc>Container 20feet hàngkhô </Ten_BieuCuoc>" +
                "<So_VD>223D</So_VD>" +
                "<So_Hieu_Container>REWREW43242</So_Hieu_Container>" +
                "<Don_Gia>250000</Don_Gia>" +
                "<So_Luong>2</So_Luong>" +
                "<Don_Vi_Tinh>Đồng/Container</Don_Vi_Tinh>" +
                "<Thanh_Tien>500000</Thanh_Tien>" +
                "</ThongTinNopTien>" +
                "</ThongTinChungTu>";
        
        response.setXmlResponse(xmlResponse);
        response.setMessage("Lấy thông tin thành công từ Hải quan");
        response.setSuccess(true);
        
        log.info("Trả về XML response giả lập từ Hải quan thành công");
        return response;
    }
    
    /**
     * Extract giá trị từ XML tag
     */
    private String extractXmlValue(String xml, String tagName) {
        Pattern pattern = Pattern.compile("<" + tagName + ">(.*?)</" + tagName + ">");
        Matcher matcher = pattern.matcher(xml);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return "";
    }
    
    /**
     * Parse date từ string
     */
    private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return null;
        }
        try {
            return LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        } catch (Exception e) {
            log.warn("Không thể parse date: {}", dateStr);
            return null;
        }
    }
    
    /**
     * Parse danh sách chi tiết từ ThongTinNopTien
     */
    private List<ChiTietHaiQuanResponse> parseChiTietList(String xml) {
        List<ChiTietHaiQuanResponse> chiTietList = new ArrayList<>();
        
        // Tìm tất cả các ThongTinNopTien
        Pattern pattern = Pattern.compile("<ThongTinNopTien>(.*?)</ThongTinNopTien>", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(xml);
        
        int index = 1;
        while (matcher.find()) {
            String chiTietXml = matcher.group(1);
            
            ChiTietHaiQuanResponse chiTiet = new ChiTietHaiQuanResponse();
            chiTiet.setId((long) index);
            chiTiet.setToKhaiThongTinID(1L);
            chiTiet.setSoVanDon(extractXmlValue(chiTietXml, "So_VD"));
            chiTiet.setSoHieu(extractXmlValue(chiTietXml, "So_Hieu_Container"));
            chiTiet.setLoaiCont(extractLoaiCont(extractXmlValue(chiTietXml, "Ten_BieuCuoc")));
            chiTiet.setTinhChatCont(extractTinhChatCont(extractXmlValue(chiTietXml, "Ten_BieuCuoc")));
            
            String soLuongStr = extractXmlValue(chiTietXml, "So_Luong");
            if (soLuongStr != null && !soLuongStr.isEmpty()) {
                chiTiet.setTongTrongLuong(new BigDecimal(soLuongStr));
            }
            
            chiTiet.setDonViTinh(extractXmlValue(chiTietXml, "Don_Vi_Tinh"));
            chiTiet.setGhiChu(extractXmlValue(chiTietXml, "Ten_BieuCuoc"));
            
            chiTietList.add(chiTiet);
            index++;
        }
        
        return chiTietList;
    }
    
    /**
     * Extract loại container từ tên biểu cước
     */
    private String extractLoaiCont(String tenBieuCuoc) {
        if (tenBieuCuoc == null) return "";
        if (tenBieuCuoc.contains("20feet")) return "20ft";
        if (tenBieuCuoc.contains("40feet")) return "40ft";
        return "";
    }
    
    /**
     * Extract tính chất container từ tên biểu cước
     */
    private String extractTinhChatCont(String tenBieuCuoc) {
        if (tenBieuCuoc == null) return "";
        if (tenBieuCuoc.contains("hàngkhô")) return "Hàng khô";
        if (tenBieuCuoc.contains("hànglạnh")) return "Hàng lạnh";
        return "";
    }
}
