import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFeeDeclaration = location.state?.selectedItem;

  // Form states
  const [receiptCode, setReceiptCode] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('0000000');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản');
  const [receiptDate, setReceiptDate] = useState('2021-08-21');
  const [notes, setNotes] = useState('');
  const [storageLocationCode, setStorageLocationCode] = useState('Q214A81');
  const [stbNumber, setStbNumber] = useState('2149180185649');
  const [declarationDate, setDeclarationDate] = useState('2021-08-16');
  const [customsDeclarationNumber, setCustomsDeclarationNumber] = useState('1357487692765');
  const [customsDeclarationDate, setCustomsDeclarationDate] = useState('2021-08-16');

  // Company information states
  const [companyCode, setCompanyCode] = useState('0314308155');
  const [companyName, setCompanyName] = useState('CÔNG TY TNHH DELVNETS VIETNAM');
  const [companyAddress, setCompanyAddress] = useState('Tầng 5, Cao ốc Vạn Phúc Số 25 Nguyễn Thị Điều - Phường 06 - Quận 3 - TP Hồ Chí Minh');
  const [receivingCompanyCode, setReceivingCompanyCode] = useState('0314308155');
  const [receivingCompanyName, setReceivingCompanyName] = useState('CÔNG TY TNHH DELVNETS VIETNAM');
  const [payerName, setPayerName] = useState('0314308153');
  const [payerEmail, setPayerEmail] = useState('logistics.hq@delvnetsvietnam.com');
  const [payerIdNumber, setPayerIdNumber] = useState('036734867');

  // Checkbox states
  const [samePayment, setSamePayment] = useState(false);
  const [containerList, setContainerList] = useState(false);
  const [commonContainerDeclaration, setCommonContainerDeclaration] = useState(false);
  const [attached, setAttached] = useState(false);

  // Save state
  const [isSaved, setIsSaved] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Sample fee details
  const [feeDetails] = useState([
    {
      id: 1,
      content: 'Cảng-Đã thành, phí hỗ trợ phí biên tờ khai (1355430545&4)',
      unit: '',
      quantity: 1,
      price: 250000,
      total: 250000
    },
    {
      id: 2,
      content: 'TH001_C404-Container 40 feet',
      unit: '',
      quantity: 1,
      price: 500000,
      total: 500000
    }
  ]);

  const totalAmount = feeDetails.reduce((sum, item) => sum + item.total, 0);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const handleSave = () => {
    const receiptData = {
      // Company information
      companyCode,
      companyName,
      companyAddress,
      receivingCompanyCode,
      receivingCompanyName,
      payerName,
      payerEmail,
      payerIdNumber,
      
      // Receipt information
      receiptCode,
      receiptNumber,
      paymentMethod,
      receiptDate,
      notes,
      
      // Declaration information
      stbNumber,
      declarationDate,
      storageLocationCode,
      customsDeclarationNumber,
      customsDeclarationDate,
      
      // Checkboxes
      samePayment,
      containerList,
      commonContainerDeclaration,
      attached,
      
      // Fee details
      feeDetails,
      totalAmount
    };
    
    console.log('Saving receipt data:', receiptData);
    setIsSaved(true);
    alert('Biên lai đã được lưu thành công!');
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleIssueReceipt = () => {
    console.log('Phát hành biên lai...');
    setShowReceiptModal(true);
  };

  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
  };

  const handleShowConfirmation = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmIssue = () => {
    setShowConfirmModal(false);
    
    // Lưu thông tin phát hành biên lai vào localStorage
    if (selectedFeeDeclaration) {
      const receiptData = {
        feeDeclarationId: selectedFeeDeclaration.id,
        receiptCode,
        receiptNumber,
        companyName,
        companyCode,
        companyAddress,
        receiptDate,
        customsDeclarationNumber,
        customsDeclarationDate,
        paymentMethod,
        timestamp: new Date().toISOString()
      };
      
      // Lưu thông tin biên lai đã phát hành
      const existingReceipts = JSON.parse(localStorage.getItem('issuedReceipts') || '[]');
      existingReceipts.push(receiptData);
      localStorage.setItem('issuedReceipts', JSON.stringify(existingReceipts));
      
      // Đánh dấu để cập nhật trạng thái trong FeeDeclarationManagePage
      localStorage.setItem('updateFeeDeclarationStatus', JSON.stringify({
        id: selectedFeeDeclaration.id,
        newStatus: 'Đã tạo biên lai thành công',
        timestamp: new Date().toISOString()
      }));
    }
    
    setShowReceiptModal(false);
    alert('Biên lai đã được phát hành thành công!');
    
    // Navigate về trang quản lý tờ khai
    navigate('/fee-declaration/manage');
  };

  const handleCancelIssue = () => {
    setShowConfirmModal(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        
        {/* Company Information Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#333',
            borderLeft: '3px solid #007bff',
            paddingLeft: '10px'
          }}>
            ▶ Đơn vị, doanh nghiệp nộp phí
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px' }}>
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Đơn vị được ủy quyền:
                </label>
                <input
                  type="text"
                  value={companyCode}
                  onChange={(e) => setCompanyCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#007bff',
                    fontWeight: 'bold'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Địa chỉ đơn vị được ủy quyền:
                </label>
                <textarea
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                    Đơn vị trên tờ khai:
                  </label>
                  <input
                    type="text"
                    value={receivingCompanyCode}
                    onChange={(e) => setReceivingCompanyCode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={receivingCompanyName}
                    onChange={(e) => setReceivingCompanyName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#007bff',
                      fontWeight: 'bold',
                      marginTop: '22px' // Align with the input on the left
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Tên người nộp phí:
                </label>
                <input
                  type="text"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Email nộp phí:
                </label>
                <input
                  type="email"
                  value={payerEmail}
                  onChange={(e) => setPayerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Số cmt/điện thoại:
                </label>
                <input
                  type="text"
                  value={payerIdNumber}
                  onChange={(e) => setPayerIdNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Information Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#333',
            borderLeft: '3px solid #007bff',
            paddingLeft: '10px'
          }}>
            ▶ Thông tin biên lai thu phí
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Mã số biên lai:
                </label>
                <input
                  type="text"
                  value={receiptCode}
                  onChange={(e) => setReceiptCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Hình thức thanh toán:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Thẻ">Thẻ</option>
                </select>
              </div>
            </div>
            
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Số biên lai:
                </label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                  Ngày biên lai:
                </label>
                <input
                  type="date"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
              Ghi chú:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                resize: 'vertical'
              }}
              placeholder="Nhập ghi chú..."
            />
          </div>
        </div>

        {/* Declaration Information Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#333',
            borderLeft: '3px solid #007bff',
            paddingLeft: '10px'
          }}>
            ▶ Thông tin tờ khai
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                STB nhập nộp phí:
              </label>
              <input
                type="text"
                value={stbNumber}
                onChange={(e) => setStbNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                Ngày tờ khai nộp phí:
              </label>
              <input
                type="date"
                value={declarationDate}
                onChange={(e) => setDeclarationDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                Mã địa điểm lưu kho:
              </label>
              <input
                type="text"
                value={storageLocationCode}
                onChange={(e) => setStorageLocationCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                Số tờ khai HQ:
              </label>
              <input
                type="text"
                value={customsDeclarationNumber}
                onChange={(e) => setCustomsDeclarationNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                Ngày tờ khai HQ:
              </label>
              <input
                type="date"
                value={customsDeclarationDate}
                onChange={(e) => setCustomsDeclarationDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'end' }}>
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Xem thêm...
              </button>
            </div>
          </div>
        </div>

        {/* Fee Details Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#333',
            borderLeft: '3px solid #007bff',
            paddingLeft: '10px'
          }}>
            ▶ Chi tiết biên lai thu phí
          </h3>
          
          {/* Checkboxes */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={samePayment}
                onChange={(e) => setSamePayment(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Nộp cùng thu phí
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={containerList}
                onChange={(e) => setContainerList(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Danh sách Container
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={commonContainerDeclaration}
                onChange={(e) => setCommonContainerDeclaration(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Danh sách tờ khai chung Container
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={attached}
                onChange={(e) => setAttached(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Đính kèm
            </label>
          </div>
          
          {/* Fee Details Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontSize: '12px', width: '60px' }}>
                  STT
                </th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left', fontSize: '12px' }}>
                  Nội dung thu phí
                </th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontSize: '12px', width: '80px' }}>
                  ĐVT
                </th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontSize: '12px', width: '100px' }}>
                  Số lượng
                </th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontSize: '12px', width: '120px' }}>
                  Đơn giá
                </th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontSize: '12px', width: '120px' }}>
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {feeDetails.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {index + 1}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '12px' }}>
                    {item.content}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {item.unit}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {item.quantity}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', fontSize: '12px' }}>
                    {formatCurrency(item.price)}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', fontSize: '12px' }}>
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '20px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          TỔNG TIỀN: {formatCurrency(totalAmount)}
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          {/* Left side - Issue Receipt button (only show after save) */}
          <div>
            {isSaved && (
              <button
                onClick={handleIssueReceipt}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                📄 Phát hành biên lai
              </button>
            )}
          </div>

          {/* Right side - Save and Close buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#343a40',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              Lưu lại
            </button>
            
            <button
              onClick={handleClose}
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

      {/* Receipt Modal */}
      {showReceiptModal && (
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
            padding: '0',
            maxWidth: '900px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            fontFamily: 'Times New Roman, serif'
          }}>
            {/* Modal Header */}
            <div style={{ backgroundColor: 'white' }}>
              {/* Title Section */}
              <div style={{
                padding: '15px 20px 10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h4 style={{ 
                    margin: '0 0 5px 0', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#ff6600' }}>⚠</span>
                    Phát hành biên lai điện tử
                  </h4>
                  <p style={{ 
                    margin: '0', 
                    fontSize: '13px', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    Biên lai sẽ được phát hành sau khi điền đủ thông tin và bấm "Phát hành biên lai"
                  </p>
                </div>
                <button
                  onClick={handleCloseReceiptModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#999',
                    padding: '0',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
              
              {/* Header Bar */}
              <div style={{
                backgroundColor: '#1e3a5f',
                color: 'white',
                padding: '8px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                <select 
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #aaa',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="goc" style={{ color: 'black' }}>Biên lai gốc</option>
                  <option value="ban-chinh" style={{ color: 'black' }}>Biên lai bản chính</option>
                  <option value="ban-sao" style={{ color: 'black' }}>Biên lai bản sao</option>
                </select>
                
                <button
                  onClick={handleShowConfirmation}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #aaa',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '3px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <i className="fas fa-print"></i>
                  Phát hành biên lai
                </button>
              </div>
            </div>

            {/* Receipt Content */}
            <div style={{ 
              padding: '20px',
              border: '2px solid #000',
              margin: '20px',
              backgroundColor: 'white'
            }}>
              {/* Receipt Header */}
              <div style={{ marginBottom: '15px' }}>
                <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ textAlign: 'left', paddingBottom: '3px' }}>
                      <strong>Đơn vị thu:</strong> Cảng vụ Đường
                    </td>
                    <td style={{ textAlign: 'center', paddingBottom: '3px' }}>
                      <strong>Cộng hòa xã hội chủ nghĩa Việt Nam</strong>
                    </td>
                    <td style={{ textAlign: 'right', paddingBottom: '3px' }}>
                      <strong>Mẫu số:</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', paddingBottom: '3px' }}>
                      <strong>Thay cho Gia</strong>
                    </td>
                    <td style={{ textAlign: 'center', paddingBottom: '3px' }}>
                      <strong>Độc lập - Tự do - Hạnh phúc</strong>
                    </td>
                    <td style={{ textAlign: 'right', paddingBottom: '3px' }}>
                      <strong>Ký hiệu:</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', paddingBottom: '10px' }}>
                      <strong>TPHCM</strong>
                    </td>
                    <td style={{ textAlign: 'center', paddingBottom: '10px' }}></td>
                    <td style={{ textAlign: 'right', paddingBottom: '10px' }}>
                      <strong>Số:</strong> 0000000006
                    </td>
                  </tr>
                </table>
              </div>

              {/* Title */}
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <h2 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  letterSpacing: '1px'
                }}>
                  BIÊN LAI THU TIỀN PHÍ
                </h2>
                <div style={{ fontSize: '11px', lineHeight: '1.3' }}>
                  Ngày 25 tháng 08 năm 2021
                </div>
                <div style={{ fontSize: '10px', fontStyle: 'italic', marginTop: '5px', lineHeight: '1.2' }}>
                  (Ban hành theo thông tư liên tịch số 100/2017/TTLT-BTC-BGTVT ngày 06 tháng 12 năm 2017<br/>
                  của BTC và BGTVT)
                </div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '8px' }}>
                  TP Hồ Chí Minh, ngày 21 tháng 08 năm 2021
                </div>
              </div>

              {/* Company Info */}
              <div style={{ 
                border: '1px solid #000', 
                padding: '12px', 
                marginBottom: '15px', 
                fontSize: '11px' 
              }}>
                <div style={{ marginBottom: '6px' }}>
                  <strong>Tên đơn vị:</strong> CÔNG TY TNHH DELNNEYS VIETNAM
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <strong>Mã số thuế:</strong> 0314418553
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <strong>Địa chỉ:</strong> Tầng 5, Cao Ốc Vạn Phong Số 26 Nguyễn Thị Diện - Phường 06 - Quận 3 - TP Hồ Chí Minh
                </div>

                <table style={{ width: '100%', marginTop: '10px', fontSize: '11px' }}>
                  <tr>
                    <td style={{ width: '50%', paddingBottom: '4px' }}>
                      <strong>Số điện thoại:</strong> 312925420570
                    </td>
                    <td style={{ width: '50%', paddingBottom: '4px' }}>
                      <strong>Ngày phát hành biên lai:</strong> 21.08.2021
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '4px' }}>
                      <strong>Số tờ khai hải quan:</strong> 21499254570
                    </td>
                    <td style={{ paddingBottom: '4px' }}>
                      <strong>Ngày tờ khai:</strong> 16.08.2021
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nhóm loại hình:</strong> TP003
                    </td>
                    <td>
                      <strong>Loại hình tờ khai:</strong> A31
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ paddingTop: '4px' }}>
                      <strong>Hình thức thanh toán:</strong> Chuyển khoản
                    </td>
                  </tr>
                </table>
              </div>

              {/* Fee Details Table */}
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                fontSize: '10px',
                border: '1px solid #000',
                marginBottom: '20px'
              }}>
                <thead>
                  <tr>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '6px 4px', 
                      textAlign: 'center',
                      backgroundColor: '#f0f0f0',
                      fontWeight: 'bold'
                    }}>STT</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '6px 4px',
                      textAlign: 'center',
                      backgroundColor: '#f0f0f0',
                      fontWeight: 'bold'
                    }}>Nội dung thu phí</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '6px 4px',
                      textAlign: 'center',
                      backgroundColor: '#f0f0f0',
                      fontWeight: 'bold'
                    }}>Đơn vị<br/>tính</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '6px 4px',
                      textAlign: 'center',
                      backgroundColor: '#f0f0f0',
                      fontWeight: 'bold'
                    }}>Mức thu<br/>phí (đồng)</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '6px 4px',
                      textAlign: 'center',
                      backgroundColor: '#f0f0f0',
                      fontWeight: 'bold'
                    }}>Số lượng</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '6px 4px',
                      textAlign: 'center',
                      backgroundColor: '#f0f0f0',
                      fontWeight: 'bold'
                    }}>Thành tiền (đồng)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>01</td>
                    <td style={{ border: '1px solid #000', padding: '4px' }}>
                      Phí
                    </td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>Lần</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>(1)</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>(2)</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>(1) x (2) = (3)</td>
                  </tr>
                  
                  {/* Empty rows for spacing */}
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                  </tr>
                  
                  {/* Total row */}
                  <tr>
                    <td colSpan={5} style={{ 
                      border: '1px solid #000', 
                      padding: '4px', 
                      textAlign: 'right',
                      fontWeight: 'bold'
                    }}>
                      Tổng cộng:
                    </td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '4px', 
                      textAlign: 'right',
                      fontWeight: 'bold'
                    }}>
                      X Đồng
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer signature area - as per image */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '20px',
                fontSize: '10px'
              }}>
                <div style={{ textAlign: 'center', width: '30%' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '40px' }}>Người nộp</div>
                  <div>(Ký, ghi rõ họ tên)</div>
                </div>
                <div style={{ textAlign: 'center', width: '30%' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '40px' }}>Thủ quỹ</div>
                  <div>(Ký, ghi rõ họ tên)</div>
                </div>
                <div style={{ textAlign: 'center', width: '30%' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '40px' }}>Kế toán trưởng<br/>(Hoặc bộ phận có thẩm quyền)</div>
                  <div>(Ký, ghi rõ họ tên, đóng dấu)</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ 
              padding: '15px 20px', 
              borderTop: '1px solid #ddd',
              textAlign: 'right',
              backgroundColor: '#f8f9fa'
            }}>
              <button
                onClick={handleCloseReceiptModal}
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '0',
            width: '450px',
            maxWidth: '90%',
            fontFamily: 'Arial, sans-serif',
            border: '2px solid #000'
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '12px 20px',
              borderBottom: '1px solid #ccc',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              THÔNG BÁO
            </div>

            {/* Content */}
            <div style={{
              padding: '30px 20px',
              textAlign: 'center'
            }}>
              <div style={{
                marginBottom: '25px',
                fontSize: '15px',
                color: '#333'
              }}>
                Bạn có chắc chắn muốn phát hành biên lai điện tử này không?
              </div>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '15px'
              }}>
                <button
                  onClick={handleConfirmIssue}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    minWidth: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fas fa-print"></i>
                  Phát hành
                </button>
                <button
                  onClick={handleCancelIssue}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    minWidth: '100px'
                  }}
                >
                  ✕ Không
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReceiptPage;
