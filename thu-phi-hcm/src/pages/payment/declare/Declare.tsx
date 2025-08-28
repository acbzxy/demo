import Button from "@/components/ui/Button";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import FeeInformationFormModal from "./components/FeeInformationFormModal";

const Declare: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showFeeInfoModal, setShowFeeInfoModal] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const totalRecords = filteredData.length;

  useEffect(() => {
    setTimeout(() => {
      setFilteredData([
        {
          id: 1,
          doanhNghiepKB: "CTY TNHH Xuất nhập khẩu A",
          doanhNghiepXNK: "CTY CP Thương mại B",
          maHQ: "HQ202501",
          ngayHQ: "12/08/2025",
          ngayPhi: "13/08/2025",
          loai: "A",
          thongBao: "Đã lấy",
          soTB: "TB5001",
          trangThai: "Hoàn thành",
          trangThaiNH: "Đã duyệt",
          thanhTien: 1000000,
        },
        {
          id: 2,
          doanhNghiepKB: "CTY TNHH C",
          doanhNghiepXNK: "CTY TNHH D",
          maHQ: "HQ202502",
          ngayHQ: "14/08/2025",
          ngayPhi: "15/08/2025",
          loai: "B",
          thongBao: "Chưa lấy",
          soTB: "TB5002",
          trangThai: "Đang xử lý",
          trangThaiNH: "Chờ duyệt",
          thanhTien: 2000000,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full text-[14px] relative">
      <div className="card-body">
        <div className="bg-white -m-[10px] mb-[10px] p-[10px] pb-[5px] border-b border-[#e6e6e6]">
          <div className="inline-block">
            <button
              type="button"
              value="kyso"
              className="btn btn-success btn-padding me-1 rounded-none"
            >
              <PencilSquareIcon className="w-4 h-4" />
              &nbsp;Ký số tờ khai
            </button>
            <button
              className="btn btn-info btn-padding rounded-none"
              type="button"
              onClick={() => {
                setShowFeeInfoModal(true);
              }}
            >
              <PlusCircleIcon className="w-4 h-4 " />
              &nbsp;Thêm mới
            </button>
            <br />
            <i className="pt-[10px] inline-block">
              (Tích chọn tờ khai bên dưới để ký số)
            </i>
          </div>
          <div className="text-right float-right">
            Ngày khai phí, Từ:&nbsp;
            <div className="inline-block input-group">
              <input
                type="date"
                name="fromDate"
                defaultValue="2025-08-12"
                placeholder="mm/dd/yyyy"
                //   onChange={handleChange}
                className="border px-2 pt-1  focus:bg-white item-search"
              />
            </div>
            <div className="inline-block input-group">
              <input
                type="date"
                name="fromDate"
                defaultValue="2025-08-27"
                placeholder="mm/dd/yyyy"
                //   onChange={handleChange}
                className="border  px-2 pt-1  focus:bg-white item-search"
              />
            </div>
            <select name="LOAI_TOKHAI" className="item-search">
              <option value="0">--Loại tờ khai--</option>
              <option value="100">1. Hàng container</option>
              <option value="101">2. Hàng rời, lỏng, kiện</option>
              <option value="102">3. Hàng container CFS</option>
            </select>
            <select name="LOAI_THANH_TOAN" className="item-search">
              <option value="">--Thanh toán--</option>
              <option value="CK">Chuyển khoản ngân hàng</option>
              <option value="EC">Thanh toán bằng tài khoản ngân hàng</option>
              <option value="QR">Thanh toán bằng mã QR</option>
              <option value="TM">Tiền mặt</option>
            </select>
            <select name="LOAI_DULIEU" className="item-search">
              <option value="">--Nguồn khai--</option>
              <option value="WEBSITE">Từ website</option>
              <option value="WEBSERVICE">Từ phần mềm eCus</option>
            </select>
            <select name="TRANG_THAI_TOKHAI" className="item-search width127px">
              <option value="-3">--Trạng thái tờ khai--</option>
              <option value="0">1. Thêm mới</option>
              <option value="1">2. Đã ký số</option>
              <option value="2">3. Đã có thông báo phí</option>
              <option value="3">4. Đã có biên lai</option>
              <option value="-1">5. Tờ khai hủy(chưa có biên lai)</option>
              <option value="-2">6. Biên lai hủy</option>
            </select>
            <br />
            <select name="NHOM_LOAIHINH" className="item-search w-[242px]">
              <option value="">-- Nhóm loại phí --</option>
              <option value="TP001">
                TP001 - Hàng tạm nhập tái xuất; Hàng tái xuất tạm nhập; Hàng quá
                cảnh
              </option>
              <option value="TP002">
                TP002 - Hàng hóa nhập khẩu, xuất khẩu mở tờ khai ngoài TP.HCM
              </option>
              <option value="TP003">
                TP003 - Hàng hóa nhập khẩu, xuất khẩu mở tờ khai tại TP.HCM
              </option>
              <option value="TP004">
                TP004 - Hàng gửi kho ngoại quan; Hàng chuyển khẩu được đưa vào
                khu vực kho bãi thuộc các cảng biển thành phố (không đưa vào kho
                ngoại quan và khu vực trung chuyển)
              </option>
            </select>
            <input
              name="MA_DV"
              placeholder="Mã doanh nghiệp"
              className="item-search width127px form-control"
            />
            <input
              name="SO_TK"
              placeholder="Số TK"
              className="item-search width127px form-control"
            />
            <input
              name="SO_THONG_BAO"
              placeholder="Số thông báo"
              className="item-search width127px form-control"
            />
            <button className="btn btn-primary width127px item-search rounded-none pt-[4px]">
              &nbsp;Tìm kiếm
            </button>
          </div>
          <div className="clear-both"></div>
        </div>
        <div className="frame-body">
          <table className="w-full min-w-[1900px]" id="TBLDANHSACH">
            <thead>
              <tr>
                <th className="sticky-header w-[50px] table-header">STT</th>
                <th className="sticky-header w-[50px] table-header">
                  <label>
                    <input type="checkbox" name="CHECKBOX_ALL" />
                    <span className="lbl color-key"></span>
                  </label>
                </th>
                <th className="sticky-header w-[50px] table-header">#</th>
                <th className="sticky-header table-header">Doanh nghiệp KB</th>
                <th className="sticky-header table-header">Doanh nghiệp XNK</th>
                <th className="sticky-header w-[100px] table-header">
                  TK hải quan
                </th>
                <th className="sticky-header w-[100px] table-header">
                  Ngày TK HQ
                </th>
                <th className="sticky-header w-[120px] table-header">
                  Ngày khai phí
                </th>
                <th className="sticky-header w-[100px] table-header">
                  Loại tờ khai
                </th>
                <th className="sticky-header w-[120px] table-header">
                  Lấy thông báo
                </th>
                <th className="sticky-header table-header">Số thông báo</th>
                <th className="sticky-header table-header">Trạng thái</th>
                <th
                  className="sticky-header table-header"
                  title="Trạng thái ngân hàng"
                >
                  Trạng thái NH
                </th>
                <th className="sticky-header w-[100px]">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={13} className="text-center text-blue-600">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`h-[60px] ${
                      idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                    } hover:bg-blue-100`}
                  >
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">
                      <input type="checkbox" name={`CHECKBOX_${row.id}`} />
                    </td>
                    <td className="text-center">#</td>
                    <td>{row.doanhNghiepKB}</td>
                    <td>{row.doanhNghiepXNK}</td>
                    <td>{row.maHQ}</td>
                    <td>{row.ngayHQ}</td>
                    <td>{row.ngayPhi}</td>
                    <td>{row.loai}</td>
                    <td>{row.thongBao}</td>
                    <td>{row.soTB}</td>
                    <td className="text-center">{row.trangThai}</td>
                    <td className="text-center">{row.trangThaiNH}</td>
                    <td className="text-right">
                      {row.thanhTien.toLocaleString()} đ
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Fixed Pagination */}
        <div className="sticky bottom-0 z-10 bg-gray-100 border-t border-gray-300 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="text-sm text-gray-600">
            Hiển thị 1-{totalRecords} trong tổng số {totalRecords} bản ghi
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              ‹ Trước
            </Button>
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
              1
            </span>
            <Button variant="outline" size="sm" disabled>
              Sau ›
            </Button>
          </div>
        </div>
      </div>
      {showFeeInfoModal && (
        <div className="absolute inset-0 z-10 bg-white shadow-lg">
          <FeeInformationFormModal onClose={() => setShowFeeInfoModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Declare;
