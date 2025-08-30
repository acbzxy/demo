import Button from "@/components/ui/Button";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import FeeInformationFormModal from "./components/FeeInformationFormModal";

const Declare: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showFeeInfoModal, setShowFeeInfoModal] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showSignConfirmModal, setShowSignConfirmModal] = useState(false);
  const totalRecords = filteredData.length;

  const handleViewNote = (rowData: any) => {
    setSelectedRowData(rowData);
    setShowDetailModal(true);
  };

  const handleCheckboxChange = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDigitalSign = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một tờ khai để ký số!');
      return;
    }
    setShowSignConfirmModal(true);
  };

  const handleConfirmDigitalSign = () => {
    // Handle digital signature logic
    console.log('Ký số các tờ khai:', selectedItems);
    alert(`Đã ký số thành công ${selectedItems.length} tờ khai!`);
    setShowSignConfirmModal(false);
    setSelectedItems([]);
  };

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
              onClick={handleDigitalSign}
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
                    <input 
                      type="checkbox" 
                      name="CHECKBOX_ALL" 
                      checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
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
                      <input 
                        type="checkbox" 
                        name={`CHECKBOX_${row.id}`}
                        checked={selectedItems.includes(row.id)}
                        onChange={(e) => handleCheckboxChange(row.id, e.target.checked)}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleViewNote(row)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer p-1 rounded hover:bg-blue-50"
                        title="Xem chi tiết"
                      >
                        <i className="fas fa-sticky-note"></i>
                      </button>
                    </td>
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
        <div className="absolute inset-0 z-10 bg-white shadow-lg h-[86vh]">
          <FeeInformationFormModal onClose={() => setShowFeeInfoModal(false)} />
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRowData && (
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
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '2px solid #e5e7eb',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                marginRight: '16px'
              }}>
                <i className="fas fa-info-circle" style={{ color: 'white', fontSize: '18px' }}></i>
              </div>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                letterSpacing: '0.5px'
              }}>
                Chi Tiết Thông Tin Tờ Khai
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  fontSize: '16px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = '#ef4444';
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ 
              padding: '24px',
              maxHeight: 'calc(95vh - 120px)',
              overflowY: 'auto'
            }}>
              {/* Info Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                {/* Left Column */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #b3e5fc'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#0369a1',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <i className="fas fa-building mr-2"></i>
                    Thông Tin Doanh Nghiệp
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Doanh nghiệp khai báo:</span>
                      <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '2px' }}>
                        {selectedRowData.doanhNghiepKB}
                      </div>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Doanh nghiệp XNK:</span>
                      <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '2px' }}>
                        {selectedRowData.doanhNghiepXNK}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #bbf7d0'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#059669',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <i className="fas fa-file-alt mr-2"></i>
                    Thông Tin Tờ Khai
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Mã hải quan:</span>
                      <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '2px' }}>
                        {selectedRowData.maHQ}
                      </div>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Loại tờ khai:</span>
                      <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '2px' }}>
                        {selectedRowData.loai}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Table */}
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, #1f2937 0%, #374151 100%)',
                  padding: '16px 20px',
                  color: 'white'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <i className="fas fa-list-alt mr-2"></i>
                    Chi Tiết Thông Tin
                  </h4>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px'
                  }}>
                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>ID:</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedRowData.id}</span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Ngày HQ:</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedRowData.ngayHQ}</span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Ngày phí:</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedRowData.ngayPhi}</span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Thông báo:</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedRowData.thongBao}</span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Số TB:</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedRowData.soTB}</span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Trạng thái:</span>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: selectedRowData.trangThai === 'Hoàn thành' ? '#059669' : '#d97706',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: selectedRowData.trangThai === 'Hoàn thành' ? '#ecfccb' : '#fef3c7'
                      }}>
                        {selectedRowData.trangThai}
                      </span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Trạng thái NH:</span>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: selectedRowData.trangThaiNH === 'Đã duyệt' ? '#059669' : '#d97706',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: selectedRowData.trangThaiNH === 'Đã duyệt' ? '#ecfccb' : '#fef3c7'
                      }}>
                        {selectedRowData.trangThaiNH}
                      </span>
                    </div>

                    <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Thành tiền:</span>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#dc2626' }}>
                        {selectedRowData.thanhTien?.toLocaleString()} đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              borderTop: '1px solid #e5e7eb',
              padding: '16px 24px',
              backgroundColor: '#f8fafc',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowDetailModal(false)}
                style={{
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280';
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Sign Confirmation Modal */}
      {showSignConfirmModal && (
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
            position: 'relative',
            border: '2px solid #2563eb'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              padding: '12px 20px',
              color: 'white',
              borderRadius: '6px 6px 0 0'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                THÔNG BÁO
              </h3>
            </div>

            {/* Modal Content */}
            <div style={{ 
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#374151',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                Bạn có chắc chắn muốn ký số các tờ khai đang chọn lên hệ thống không?
                <br />
                <span style={{ fontWeight: '600', color: '#dc2626' }}>
                  Chú ý: Sau khi tờ khai đã được ký số sẽ bạn sẽ không thể thay đổi thông tin được nữa.
                </span>
              </div>

              <div style={{
                fontSize: '13px',
                color: '#6b7280',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                Số lượng tờ khai được chọn: <strong>{selectedItems.length}</strong>
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: '12px'
              }}>
                <button
                  onClick={handleConfirmDigitalSign}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }}
                >
                  <i className="fas fa-signature"></i>
                  Thực hiện ký số
                </button>

                <button
                  onClick={() => setShowSignConfirmModal(false)}
                  style={{
                    backgroundColor: '#6b7280',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4b5563';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#6b7280';
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Declare;
