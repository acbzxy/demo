import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FeeDeclaration {
  id: string;
  kyso: string;
  hash1: string;
  tkNopPhi: string;
  ngayTKNP: string;
  loaiToKhai: string;
  tkHaiQuan: string;
  doanhNghiep: string;
  trangThai: string;
  thongBao: string;
  hash2: string;
  tongTien: number;
}

const FeeDeclarationManagePage: React.FC = () => {
  const navigate = useNavigate();
  
  // States for filters
  const [fromDate, setFromDate] = useState('2021-04-06');
  const [toDate, setToDate] = useState('2021-08-21');
  const [loaiToKhai, setLoaiToKhai] = useState('');
  const [thanhToan, setThanhToan] = useState('');
  const [nguoiTao, setNguoiTao] = useState('');
  const [trangThaiTo, setTrangThaiTo] = useState('');
  const [nhomBieuPhi, setNhomBieuPhi] = useState('');

  // State for detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeeDeclaration | null>(null);

  // State for notification modal
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedNotificationItem, setSelectedNotificationItem] = useState<FeeDeclaration | null>(null);

  // State for download success modal
  const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);

  // Effect to check for status updates from localStorage
  useEffect(() => {
    const updateStatusData = localStorage.getItem('updateFeeDeclarationStatus');
    if (updateStatusData) {
      try {
        const updateInfo = JSON.parse(updateStatusData);
        
        // Cập nhật trạng thái của item tương ứng
        setFeeDeclarations(prev => 
          prev.map(item => 
            item.id === updateInfo.id 
              ? { ...item, trangThai: updateInfo.newStatus }
              : item
          )
        );
        
        // Xóa thông tin update khỏi localStorage
        localStorage.removeItem('updateFeeDeclarationStatus');
        
        // Hiển thị thông báo thành công
        alert('Cập nhật trạng thái thành công: ' + updateInfo.newStatus);
      } catch (error) {
        console.error('Error updating fee declaration status:', error);
      }
    }
  }, []);

  // Sample data
  const [feeDeclarations, setFeeDeclarations] = useState<FeeDeclaration[]>([
    {
      id: '1',
      kyso: 'K001',
      hash1: 'A',
      tkNopPhi: 'Web-210817242026',
      ngayTKNP: '17/08/2021',
      loaiToKhai: '101 - hàng đông lại',
      tkHaiQuan: '1384376990463',
      doanhNghiep: '0100439415-Công Ty TNHH Vinachimex Việt Nam',
      trangThai: 'Lý thông báo',
      thongBao: 'Có thông báo',
      hash2: 'H1',
      tongTien: 750000
    },
    {
      id: '2',
      kyso: 'K002',
      hash1: 'B',
      tkNopPhi: 'Web-210817428904',
      ngayTKNP: '17/08/2021',
      loaiToKhai: '100 - hàng container',
      tkHaiQuan: '1208739190588',
      doanhNghiep: '0301245905-Công Ty TNHH Ánh Long và Dch vụ',
      trangThai: 'Lý thông báo',
      thongBao: 'Có thông báo',
      hash2: 'H2',
      tongTien: 750000
    },
    {
      id: '3',
      kyso: 'K003',
      hash1: 'C',
      tkNopPhi: 'Web-210817420403',
      ngayTKNP: '17/08/2021',
      loaiToKhai: '100 - hàng container',
      tkHaiQuan: '1208739190449',
      doanhNghiep: '0301245905-Công Ty TNHH Ánh Long và Dch vụ',
      trangThai: 'Lý thông báo',
      thongBao: 'Có thông báo',
      hash2: 'H3',
      tongTien: 1000000
    },
    {
      id: '4',
      kyso: 'K004',
      hash1: 'D',
      tkNopPhi: 'Web-210817396402',
      ngayTKNP: '17/08/2021',
      loaiToKhai: '100 - hàng container',
      tkHaiQuan: '1405231482593',
      doanhNghiep: '5905002089-Công Ty Cổ Phần DAP SG 7 - Vinachem',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H4',
      tongTien: 750000
    },
    {
      id: '5',
      kyso: 'K005',
      hash1: 'E',
      tkNopPhi: 'Web-210816445403',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '101 - hàng đông lại',
      tkHaiQuan: '1357487968553',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H5',
      tongTien: 5000000
    },
    {
      id: '6',
      kyso: 'K006',
      hash1: 'F',
      tkNopPhi: 'Web-210816341600',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '101 - hàng đông lại',
      tkHaiQuan: '1357487952699',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H6',
      tongTien: 5500000
    },
    {
      id: '7',
      kyso: 'K007',
      hash1: 'G',
      tkNopPhi: 'Web-210816341589',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '101 - hàng đông lại',
      tkHaiQuan: '1566343738555',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H7',
      tongTien: 15000000
    },
    {
      id: '8',
      kyso: 'K008',
      hash1: 'H',
      tkNopPhi: 'Web-210816341598',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '101 - hàng đông lại',
      tkHaiQuan: '1557579800896',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H8',
      tongTien: 6000000
    },
    {
      id: '9',
      kyso: 'K009',
      hash1: 'I',
      tkNopPhi: 'Web-210816342597',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '101 - hàng đông lại',
      tkHaiQuan: '1557579765553',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H9',
      tongTien: 9000000
    },
    {
      id: '10',
      kyso: 'K010',
      hash1: 'J',
      tkNopPhi: 'Web-210816442596',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '100 - hàng container',
      tkHaiQuan: '1368679836550',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H10',
      tongTien: 1000000
    },
    {
      id: '11',
      kyso: 'K011',
      hash1: 'K',
      tkNopPhi: 'Web-210816442575',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '100 - hàng container',
      tkHaiQuan: '1537558799556',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H11',
      tongTien: 250000
    },
    {
      id: '12',
      kyso: 'K012',
      hash1: 'L',
      tkNopPhi: 'Web-210816442358',
      ngayTKNP: '16/08/2021',
      loaiToKhai: '100 - hàng container',
      tkHaiQuan: '1556765798780',
      doanhNghiep: '0300754209-Công Ty Cổ Phần Dích vụ chủ khối Đình vũ PTSC',
      trangThai: 'Mới',
      thongBao: 'Có thông báo',
      hash2: 'H12',
      tongTien: 2000000
    }
  ]);

  // Calculate total amount
  const totalAmount = feeDeclarations.reduce((sum, item) => sum + item.tongTien, 0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const handleSearch = () => {
    console.log('Searching with filters:', {
      fromDate,
      toDate,
      loaiToKhai,
      thanhToan,
      nguoiTao,
      trangThaiTo,
      nhomBieuPhi
    });
    // Implement filter logic here if needed
    alert('Tìm kiếm với các điều kiện đã chọn');
  };

  const handleViewDetail = (item: FeeDeclaration) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  const handleGetNotification = (item: FeeDeclaration) => {
    setSelectedNotificationItem(item);
    setShowNotificationModal(true);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
    setSelectedNotificationItem(null);
  };

  const handleDownloadNotification = () => {
    // Close the notification modal first
    setShowNotificationModal(false);
    setSelectedNotificationItem(null);
    
    // Show download success modal
    setShowDownloadSuccessModal(true);
  };

  const handleCloseDownloadSuccessModal = () => {
    setShowDownloadSuccessModal(false);
  };

  const handleCreateReceipt = (item: FeeDeclaration) => {
    console.log('Tạo biên lai cho:', item.id);
    // Navigate to create receipt page with selectedItem
    navigate('/receipt-management/create', { state: { selectedItem: item } });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Page Title */}
      <div style={{ 
        marginBottom: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        [ {feeDeclarations.length} tờ khai phí ] - Trang: 1/1
      </div>

      {/* Filter Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Filter Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          alignItems: 'end',
          gap: '10px', 
          marginBottom: '15px'
        }}>
          <div style={{ width: '130px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
              Ngày bắt đầu, Tới:
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
          </div>
          
          <div style={{ width: '130px' }}>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
          </div>

          <div style={{ width: '120px' }}>
            <select
              value={loaiToKhai}
              onChange={(e) => setLoaiToKhai(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="">-- Loại tờ khai --</option>
              <option value="100">100 - hàng container</option>
              <option value="101">101 - hàng đông lại</option>
            </select>
          </div>

          <div style={{ width: '110px' }}>
            <select
              value={thanhToan}
              onChange={(e) => setThanhToan(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="">-- Thanh toán --</option>
              <option value="da-thanh-toan">Đã thanh toán</option>
              <option value="chua-thanh-toan">Chưa thanh toán</option>
            </select>
          </div>

          <div style={{ width: '110px' }}>
            <select
              value={nguoiTao}
              onChange={(e) => setNguoiTao(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="">-- Người tạo --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div style={{ width: '110px' }}>
            <select
              value={trangThaiTo}
              onChange={(e) => setTrangThaiTo(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="">-- Trạng thái tờ --</option>
              <option value="moi">Mới</option>
              <option value="ly-thong-bao">Lý thông báo</option>
              <option value="da-tao-bien-lai">Đã tạo biên lai thành công</option>
            </select>
          </div>

          <div style={{ width: '120px' }}>
            <select
              value={nhomBieuPhi}
              onChange={(e) => setNhomBieuPhi(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="">-- Nhóm biểu phí --</option>
              <option value="TP003">TP003</option>
              <option value="TP001">TP001</option>
              <option value="TP002">TP002</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '80px' }}>
                Ký số
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '40px' }}>
                #
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '140px' }}>
                TK nộp phí
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '90px' }}>
                Ngày TK NP
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '150px' }}>
                Loại tờ khai
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '120px' }}>
                TK hải quan
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                Doanh nghiệp
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '100px' }}>
                Trạng thái
              </th>
                             <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '120px' }}>
                 Thông báo
               </th>
               <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '100px' }}>
                 Hành động
               </th>
               <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', width: '120px' }}>
                 Tổng tiền(VNĐ)
               </th>
            </tr>
          </thead>
          <tbody>
            {feeDeclarations.map((item, index) => (
              <tr key={item.id} style={{ 
                borderBottom: '1px solid #eee',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
              }}>
                <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                  {item.kyso}
                </td>
                <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                  <i 
                    className="fas fa-eye" 
                    style={{ 
                      color: '#007bff', 
                      cursor: 'pointer', 
                      fontSize: '14px',
                      padding: '4px'
                    }}
                    onClick={() => handleViewDetail(item)}
                    title="Xem chi tiết"
                  ></i>
                </td>
                <td style={{ padding: '8px', fontSize: '12px', color: '#0066cc' }}>
                  {item.tkNopPhi}
                </td>
                <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                  {item.ngayTKNP}
                </td>
                <td style={{ padding: '8px', fontSize: '12px' }}>
                  {item.loaiToKhai}
                </td>
                <td style={{ padding: '8px', fontSize: '12px' }}>
                  {item.tkHaiQuan}
                </td>
                <td style={{ padding: '8px', fontSize: '12px' }}>
                  {item.doanhNghiep}
                </td>
                <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                  {item.trangThai === 'Lý thông báo' ? (
                    <span style={{
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      ✓ Lý thông báo
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {item.trangThai}
                    </span>
                  )}
                </td>
                <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      margin: '0 auto',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056b3';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff';
                    }}
                    onClick={() => handleGetNotification(item)}
                    title="Lấy thông báo"
                  >
                    <span style={{ fontSize: '10px', color: '#ffffff' }}>✓</span>
                    Lấy thông báo
                  </button>
                </td>
                                 <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                   <button
                     style={{
                       backgroundColor: '#17a2b8',
                       color: 'white',
                       border: 'none',
                       padding: '6px 12px',
                       borderRadius: '4px',
                       cursor: 'pointer',
                       fontSize: '11px',
                       fontWeight: '500'
                     }}
                     onClick={() => handleCreateReceipt(item)}
                     title="Tạo biên lai"
                   >
                     Tạo biên lai
                   </button>
                 </td>
                <td style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>
                  {formatCurrency(item.tongTien)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
        padding: '0 5px'
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Trang cuối
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#d32f2f' }}>
          Tổng tiền: {formatCurrency(totalAmount)}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '2px solid #007bff',
              paddingBottom: '10px'
            }}>
              <h3 style={{ margin: 0, color: '#007bff', fontSize: '18px' }}>
                Chi tiết tờ khai nộp phí
              </h3>
              <button
                onClick={handleCloseDetailModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              fontSize: '14px'
            }}>
              <div>
                <strong>Ký số:</strong> {selectedItem.kyso}
              </div>
              <div>
                <strong>TK nộp phí:</strong> 
                <span style={{ color: '#0066cc', marginLeft: '5px' }}>{selectedItem.tkNopPhi}</span>
              </div>
              <div>
                <strong>Ngày TK NP:</strong> {selectedItem.ngayTKNP}
              </div>
              <div>
                <strong>Loại tờ khai:</strong> {selectedItem.loaiToKhai}
              </div>
              <div>
                <strong>TK hải quan:</strong> {selectedItem.tkHaiQuan}
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong>Doanh nghiệp:</strong> {selectedItem.doanhNghiep}
              </div>
              <div>
                <strong>Trạng thái:</strong> 
                <span style={{
                  marginLeft: '5px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  backgroundColor: selectedItem.trangThai === 'Lý thông báo' ? '#d4edda' : '#f8d7da',
                  color: selectedItem.trangThai === 'Lý thông báo' ? '#155724' : '#721c24'
                }}>
                  {selectedItem.trangThai === 'Lý thông báo' ? '✓ Lý thông báo' : selectedItem.trangThai}
                </span>
              </div>
              <div>
                <strong>Thông báo:</strong>
                <button
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: '500',
                    marginLeft: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#0056b3';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#007bff';
                  }}
                  onClick={() => handleGetNotification(selectedItem)}
                >
                  <span style={{ color: '#ffffff' }}>✓</span> Lấy thông báo
                </button>
              </div>
                             <div>
                 <strong>Hành động:</strong>
                 <button
                   style={{
                     backgroundColor: '#17a2b8',
                     color: 'white',
                     border: 'none',
                     padding: '4px 8px',
                     borderRadius: '4px',
                     cursor: 'pointer',
                     fontSize: '11px',
                     fontWeight: '500',
                     marginLeft: '8px'
                   }}
                   onClick={() => handleCreateReceipt(selectedItem)}
                 >
                   Tạo biên lai
                 </button>
               </div>
               <div>
                 <strong>Tổng tiền:</strong> 
                 <span style={{ color: '#d32f2f', fontWeight: 'bold', marginLeft: '5px' }}>
                   {formatCurrency(selectedItem.tongTien)} VNĐ
                 </span>
               </div>
            </div>

            <div style={{
              marginTop: '20px',
              textAlign: 'right',
              borderTop: '1px solid #eee',
              paddingTop: '15px'
            }}>
              <button
                onClick={handleCloseDetailModal}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && selectedNotificationItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '900px',
            width: '95%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '2px solid #007bff',
              paddingBottom: '10px'
            }}>
              <h3 style={{ margin: 0, color: '#007bff', fontSize: '18px' }}>
                Thông báo tờ khai nộp phí
              </h3>
              <button
                onClick={handleCloseNotificationModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* Info Row */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px',
              fontSize: '13px',
              color: '#333'
            }}>
              <span>STK HQ: 1357487692765,</span>
              <span>STB nộp phí: 2149093142570,</span>
              <span>Nhóm loại hình: TP003 - Loại hình: A31</span>
            </div>

            {/* Company Info Section */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '30px', 
              marginBottom: '20px',
              fontSize: '13px'
            }}>
              {/* Left: Đơn vị nhập tờ khai nộp phí */}
              <div>
                <h4 style={{ 
                  margin: '0 0 15px 0', 
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Đơn vị nhập tờ khai nộp phí:
                </h4>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Mã đơn vị:</strong> 0314308155
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Tên đơn vị:</strong> CÔNG TY TNHH DELVNETS VIETNAM
                </div>
                <div>
                  <strong>Địa chỉ:</strong> Tầng 5, Cao ốc Vạn Phúc Số 25 Nguyễn Thị Điều - Phường 06 - Quận 3 - TP Hồ Chí Minh
                </div>
              </div>

              {/* Right: Đơn vị xuất nhập khẩu (DNK) */}
              <div>
                <h4 style={{ 
                  margin: '0 0 15px 0', 
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Đơn vị xuất nhập khẩu (DNK):
                </h4>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Mã đơn vị:</strong> 0314308155
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Tên đơn vị:</strong> CÔNG TY TNHH DELVNETS VIETNAM
                </div>
                <div>
                  <strong>Địa chỉ:</strong> Tầng 5, Cao ốc Vạn Phúc Số 25 Nguyễn Thị Điều - Phường 06 - Quận 3 - TP Hồ Chí Minh
                </div>
              </div>
            </div>

            {/* Fee Details Table */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '14px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Chi tiết nộp phí (Chuyển khoản):
              </h4>
              
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                fontSize: '12px',
                border: '1px solid #ddd'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ 
                      border: '1px solid #ddd', 
                      padding: '10px', 
                      textAlign: 'center',
                      width: '60px'
                    }}>STT</th>
                    <th style={{ 
                      border: '1px solid #ddd', 
                      padding: '10px',
                      textAlign: 'left'
                    }}>Nội dung thu phí</th>
                    <th style={{ 
                      border: '1px solid #ddd', 
                      padding: '10px',
                      textAlign: 'center',
                      width: '80px'
                    }}>Mã DVT</th>
                    <th style={{ 
                      border: '1px solid #ddd', 
                      padding: '10px',
                      textAlign: 'center',
                      width: '120px'
                    }}>Số lượng/trong lượng</th>
                    <th style={{ 
                      border: '1px solid #ddd', 
                      padding: '10px',
                      textAlign: 'right',
                      width: '100px'
                    }}>Đơn giá</th>
                    <th style={{ 
                      border: '1px solid #ddd', 
                      padding: '10px',
                      textAlign: 'right',
                      width: '120px'
                    }}>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>1</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      Phí hỗ trợ nhập cảnh phi thuyền viên tờ khai (1355430545&4)
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>null</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>1</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>250,000</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>250,000</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>2</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      Container 40 feet
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>null</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>1</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>500,000</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>500,000</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
                    <td colSpan={4} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      TỔNG SỐ:
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>2</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>750,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            <div style={{ 
              fontSize: '11px', 
              color: '#666', 
              fontStyle: 'italic',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Số tiền bằng chữ: Bảy trăm năm mươi nghìn đồng
            </div>

            {/* Footer Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid #eee',
              paddingTop: '15px'
            }}>
              <button
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0056b3';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#007bff';
                }}
                onClick={handleDownloadNotification}
              >
                <span style={{ color: '#ffffff' }}>📥</span> Tải thông báo nộp phí
              </button>
              
              <button
                onClick={handleCloseNotificationModal}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Đóng
              </button>
            </div>
                     </div>
         </div>
       )}

      {/* Download Success Modal */}
      {showDownloadSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1002,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '450px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            {/* Warning Icon and Title */}
            <div style={{
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '24px',
                marginBottom: '10px',
                color: '#007bff'
              }}>
                ⚠
              </div>
              <h3 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                THÔNG BÁO
              </h3>
            </div>

            {/* Success Message */}
            <div style={{
              marginBottom: '25px',
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.6'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                color: '#007bff',
                fontWeight: '500'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>✓</span>
                Lấy thông báo nộp phí thành công.
              </div>
              <div>
                Vui lòng kiểm tra Thông báo nộp phí trong thư mục download của bạn. Xin cảm ơn!
              </div>
            </div>

            {/* Close Button */}
            <div style={{
              textAlign: 'right'
            }}>
              <button
                onClick={handleCloseDownloadSuccessModal}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeDeclarationManagePage;
