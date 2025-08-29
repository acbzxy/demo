import React, { useState } from 'react';

const ReceiptManagePage: React.FC = () => {
  const [filterData, setFilterData] = useState({
    fromDate: '',
    toDate: '',
    payment: '',
    status: '',
    template: '01BLP0-001',
    signNumber: '',
    businessCode: '',
    declarationNumber: '',
    notificationNumber: '',
    receiptNumber: '',
    searchCode: ''
  });

  const [receiptData] = useState([
    {
      id: 1,
      declarationHQ: '1357806765T9',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916596548',
      declarationType: 'Hàng cont',
      codeSymbol: '',
      receiptNumber: '0000000',
      receiptDate: '23/08/2021',
      business: 'K50422406/9 - Công Ty Cổ Phần DAP Số 2 - Việt Nam',
      status: 'Mới',
      totalAmount: 500000,
      issued: true
    },
    {
      id: 2,
      declarationHQ: '1356679909',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916442593',
      declarationType: 'Hàng cont',
      codeSymbol: '',
      receiptNumber: '0000000',
      receiptDate: '23/08/2021',
      business: 'G200736420 - Công ty CP Cảng Dịch vụ dầu khí Định Vũ (PTSC)',
      status: 'Mới',
      totalAmount: 1500000,
      issued: true
    },
    {
      id: 3,
      declarationHQ: '1356768759T0',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916442594',
      declarationType: 'Hàng cont',
      codeSymbol: '',
      receiptNumber: '0000000',
      receiptDate: '23/08/2021',
      business: 'G200736420 - Công ty CP Cảng Dịch vụ dầu khí Định Vũ (PTSC)',
      status: 'Mới',
      totalAmount: 2000000,
      issued: false
    },
    {
      id: 4,
      declarationHQ: '1357986759B0',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916442596',
      declarationType: 'Hàng cont',
      codeSymbol: '',
      receiptNumber: '0000000',
      receiptDate: '23/08/2021',
      business: 'G200736420 - Công ty CP Cảng Dịch vụ dầu khí Định Vũ (PTSC)',
      status: 'Mới',
      totalAmount: 250000,
      issued: false
    },
    {
      id: 5,
      declarationHQ: '1357856759B9',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916815549',
      declarationType: 'Hàng cont',
      codeSymbol: 'C1BLP0-001/AA-2 1E',
      receiptNumber: '0000276',
      receiptDate: '21/08/2021',
      business: 'K514633163 - CÔNG TY TNHH DELIFNETS VIỆT NAM',
      status: 'Phát hành',
      totalAmount: 750000,
      issued: true
    },
    {
      id: 6,
      declarationHQ: '1344235356S',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916815970',
      declarationType: 'Hàng cont',
      codeSymbol: 'C1BLP0-001/AA-2 1E',
      receiptNumber: '0000274',
      receiptDate: '21/08/2021',
      business: 'K514633163 - CÔNG TY TNHH DELIFNETS VIỆT NAM',
      status: 'Phát hành',
      totalAmount: 500000,
      issued: true
    },
    {
      id: 7,
      declarationHQ: '1356758290G',
      dateTKNO: '16/08/2021',
      tkFeePayment: '210916442596',
      declarationType: 'Hàng cont',
      codeSymbol: 'C1BLP0-001/AA-2 1E',
      receiptNumber: '0000273',
      receiptDate: '21/08/2021',
      business: 'G200736420 - Công ty CP Cảng Dịch vụ dầu khí Định Vũ (PTSC)',
      status: 'Phát hành',
      totalAmount: 1000000,
      issued: true
    },
    {
      id: 8,
      declarationHQ: '10797148070G3',
      dateTKNO: '17/08/2021',
      tkFeePayment: '21081760823',
      declarationType: 'Hàng cont',
      codeSymbol: 'C1BLP0-001/AA-2 1E',
      receiptNumber: '0000272',
      receiptDate: '21/08/2021',
      business: 'K50422406/9 - Công Ty Cổ Phần DAP Số 2 - Việt Nam',
      status: 'Phát hành',
      totalAmount: 750000,
      issued: true
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const itemsPerPage = 10;

  const handleFilterChange = (field: string, value: string) => {
    setFilterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Tìm kiếm với filter:', filterData);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(receiptData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const totalPages = Math.ceil(receiptData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = receiptData.slice(startIndex, startIndex + itemsPerPage);

  // Tính tổng tiền
  const totalIssuedAmount = receiptData
    .filter(item => item.issued)
    .reduce((sum, item) => sum + item.totalAmount, 0);
    
  const totalNotIssuedAmount = receiptData
    .filter(item => !item.issued)
    .reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      minHeight: 'calc(100vh - 60px)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fc',
          borderBottom: '2px solid #e9ecef',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <i className="fas fa-receipt" style={{ marginRight: '8px' }}></i>
            Phát hành biên lai
          </div>
          
          <div style={{ 
            marginLeft: '20px',
            fontSize: '14px',
            color: '#666',
            fontStyle: 'italic'
          }}>
            Tích chọn các biên lai bạn cần để phát hành nhóm biên lai
          </div>
        </div>

        {/* Filter Section */}
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fc',
          borderBottom: '2px solid #e9ecef'
        }}>
          {/* First Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '15px',
            alignItems: 'end',
            marginBottom: '15px',
            flexWrap: 'wrap'
          }}>
            <div style={{ minWidth: '140px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Ngày biên lai, từ:
              </label>
              <input
                type="date"
                value={filterData.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '140px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Đến:
              </label>
              <input
                type="date"
                value={filterData.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '120px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Thanh toán:
              </label>
              <select
                value={filterData.payment}
                onChange={(e) => handleFilterChange('payment', e.target.value)}
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              >
                <option value="">-- Thanh toán --</option>
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="partial">Thanh toán một phần</option>
              </select>
            </div>

            <div style={{ minWidth: '120px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Trạng thái:
              </label>
              <select
                value={filterData.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              >
                <option value="">-- Trạng thái bt --</option>
                <option value="new">Mới</option>
                <option value="issued">Phát hành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>

            <div style={{ minWidth: '120px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Mẫu:
              </label>
              <input
                type="text"
                value={filterData.template}
                onChange={(e) => handleFilterChange('template', e.target.value)}
                placeholder="01BLP0-001"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '120px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Kí hiệu biên lai:
              </label>
              <input
                type="text"
                value={filterData.signNumber}
                onChange={(e) => handleFilterChange('signNumber', e.target.value)}
                placeholder="Kí hiệu biên lai"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>
          </div>

          {/* Second Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '15px',
            alignItems: 'end',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              minWidth: '200px',
              display: 'flex',
              alignItems: 'end',
              paddingBottom: '8px'
            }}>
              <span style={{ 
                fontSize: '12px',
                color: '#495057',
                fontWeight: '500',
                fontStyle: 'italic'
              }}>
                ( Có 22/22 lâm phí - Trang 2: 1 ):
              </span>
            </div>

            <div style={{ minWidth: '120px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Mã doanh nghiệp:
              </label>
              <input
                type="text"
                value={filterData.businessCode}
                onChange={(e) => handleFilterChange('businessCode', e.target.value)}
                placeholder="Mã doanh nghiệp"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '100px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Số tờ khai:
              </label>
              <input
                type="text"
                value={filterData.declarationNumber}
                onChange={(e) => handleFilterChange('declarationNumber', e.target.value)}
                placeholder="Số tờ khai"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '100px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Số thông báo:
              </label>
              <input
                type="text"
                value={filterData.notificationNumber}
                onChange={(e) => handleFilterChange('notificationNumber', e.target.value)}
                placeholder="Số thông báo"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '100px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Số biên lai:
              </label>
              <input
                type="text"
                value={filterData.receiptNumber}
                onChange={(e) => handleFilterChange('receiptNumber', e.target.value)}
                placeholder="Số biên lai"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ minWidth: '100px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500', 
                color: '#495057',
                fontSize: '12px'
              }}>
                Mã tra cứu:
              </label>
              <input
                type="text"
                value={filterData.searchCode}
                onChange={(e) => handleFilterChange('searchCode', e.target.value)}
                placeholder="Mã tra cứu"
                style={{
                  width: '100%',
                  padding: '5px 8px',
                  border: '1px solid #ced4da',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              />
            </div>

            <div>
              <button
                onClick={handleSearch}
                style={{
                  padding: '6px 20px',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '32px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#222';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                }}
              >
                <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ padding: '20px', overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            fontSize: '12px'
          }}>
            <thead>
              <tr style={{ 
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
              }}>
                <th style={{ 
                  padding: '10px 8px', 
                  textAlign: 'center', 
                  fontWeight: '600', 
                  color: '#495057', 
                  fontSize: '12px',
                  width: '40px'
                }}>
                  <input
                    type="checkbox"
                    checked={selectedItems.length === receiptData.length}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: '600', color: '#495057', fontSize: '12px', width: '40px' }}>
                  <i className="fas fa-cog"></i>
                </th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: '600', color: '#495057', fontSize: '12px', width: '50px' }}>STT</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Tờ khai HQ</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Ngày TKNO</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', color: '#495057', fontSize: '12px' }}>TK Nộp Phí</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Loại tờ khai</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Mã, ký hiệu</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Số biên lai</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Ngày biên lai</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Doanh nghiệp</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Trạng thái</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '600', color: '#495057', fontSize: '12px' }}>Tổng tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id} style={{ 
                  borderBottom: '1px solid #dee2e6',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      <i className="fas fa-edit" style={{ 
                        color: '#0066b3', 
                        cursor: 'pointer',
                        fontSize: '11px'
                      }} title="Sửa"></i>
                    </div>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {startIndex + index + 1}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px', fontWeight: '500' }}>
                    {item.declarationHQ}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {item.dateTKNO}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    {item.tkFeePayment}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    {item.declarationType}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    {item.codeSymbol}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px', fontWeight: '500' }}>
                    {item.receiptNumber}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {item.receiptDate}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    {item.business}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', fontSize: '11px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '500',
                      backgroundColor: 
                        item.status === 'Phát hành' ? '#d4edda' :
                        item.status === 'Mới' ? '#fff3cd' : '#f8d7da',
                      color: 
                        item.status === 'Phát hành' ? '#155724' :
                        item.status === 'Mới' ? '#856404' : '#721c24'
                    }}>
                      <i className={`fas fa-${item.status === 'Phát hành' ? 'check-circle' : 'exclamation-circle'}`} 
                         style={{ marginRight: '4px' }}></i>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: '600' }}>
                    {item.totalAmount.toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Row */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '30px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              <span style={{ color: '#155724' }}>
                Tổng tiền: Phát hành: {totalIssuedAmount.toLocaleString('vi-VN')} đ
              </span>
              <span style={{ color: '#856404' }}>
                Chưa phát hành: {totalNotIssuedAmount.toLocaleString('vi-VN')} đ
              </span>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #dee2e6'
        }}>
          <div style={{ fontSize: '13px', color: '#6c757d' }}>
            Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, receiptData.length)} của {receiptData.length} bản ghi
          </div>
          
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: '6px 12px',
                border: '1px solid #dee2e6',
                backgroundColor: currentPage === 1 ? '#e9ecef' : 'white',
                color: currentPage === 1 ? '#6c757d' : '#495057',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                borderRadius: '3px',
                fontSize: '13px'
              }}
            >
              Trước
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #dee2e6',
                  backgroundColor: currentPage === i + 1 ? '#0066b3' : 'white',
                  color: currentPage === i + 1 ? 'white' : '#495057',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  fontSize: '13px',
                  minWidth: '32px'
                }}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: '6px 12px',
                border: '1px solid #dee2e6',
                backgroundColor: currentPage === totalPages ? '#e9ecef' : 'white',
                color: currentPage === totalPages ? '#6c757d' : '#495057',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                borderRadius: '3px',
                fontSize: '13px'
              }}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptManagePage;
