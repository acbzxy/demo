import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const DebtStatusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const mockDebtData = [
    { 
      id: 'DN001', 
      enterprise: 'Công ty TNHH ABC', 
      taxCode: '0123456789', 
      debtAmount: '500,000', 
      dueDate: '2025-01-20',
      status: 'Quá hạn',
      days: 15
    },
    { 
      id: 'DN002', 
      enterprise: 'Công ty CP XYZ', 
      taxCode: '0987654321', 
      debtAmount: '300,000', 
      dueDate: '2025-02-15',
      status: 'Sắp đến hạn',
      days: 5
    },
    { 
      id: 'DN003', 
      enterprise: 'Công ty TNHH DEF', 
      taxCode: '0111222333', 
      debtAmount: '750,000', 
      dueDate: '2024-12-30',
      status: 'Quá hạn',
      days: 45
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl">
                🔍
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Tra Cứu Tình Trạng Nợ Phí</h1>
                <p className="text-gray-600">Kiểm tra và tra cứu tình trạng nợ phí của doanh nghiệp</p>
              </div>
            </div>
            <Button variant="primary" icon={<span>📊</span>}>
              Xuất Báo Cáo
            </Button>
          </div>
        </div>

        {/* Search Filter */}
        <Card className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card.Header>
            <h2 className="text-xl font-semibold text-gray-800">Tìm Kiếm Doanh Nghiệp</h2>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Tên doanh nghiệp / Mã số thuế"
                placeholder="Nhập tên DN hoặc mã số thuế..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input
                label="Từ ngày"
                type="date"
              />
              <div className="flex items-end">
                <Button variant="primary" fullWidth>
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Debt Status Table */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Danh Sách Doanh Nghiệp Nợ Phí</h2>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {mockDebtData.length} doanh nghiệp
              </span>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mã DN</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên doanh nghiệp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mã số thuế</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số tiền nợ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hạn nộp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockDebtData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{item.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.enterprise}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.taxCode}</td>
                      <td className="px-6 py-4 text-sm font-medium text-red-600">{item.debtAmount} VNĐ</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'Quá hạn' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status} ({item.days} ngày)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Chi tiết
                          </Button>
                          <Button variant="danger" size="sm">
                            Cưỡng chế
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Card variant="gradient" className="text-center p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">3</div>
            <div className="text-gray-600">DN nợ phí</div>
          </Card>
          <Card variant="gradient" className="text-center p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">1,550,000</div>
            <div className="text-gray-600">Tổng nợ (VNĐ)</div>
          </Card>
          <Card variant="gradient" className="text-center p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">20</div>
            <div className="text-gray-600">Ngày quá hạn TB</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DebtStatusPage
