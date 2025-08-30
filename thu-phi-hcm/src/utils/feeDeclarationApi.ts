import type { FeeDeclaration, ApiResponse } from '../types'
import { sleep } from './helpers'

// API Base URL - change this to your backend URL
const API_BASE_URL = 'http://localhost:8080/api'

// Fee Declaration API endpoints
const ENDPOINTS = {
  FEE_DECLARATIONS: `${API_BASE_URL}/fee-declarations`,
  SEARCH: `${API_BASE_URL}/fee-declarations/search`,
  STATISTICS: `${API_BASE_URL}/fee-declarations/statistics`,
  NEEDING_NOTIFICATION: `${API_BASE_URL}/fee-declarations/needing-notification`,
}

// Fee Declaration Status mapping from backend to frontend
export const FEE_DECLARATION_STATUS_MAP = {
  'DRAFT': 'Mới',
  'SUBMITTED': 'Đã nộp',
  'SIGNED': 'Đã ký số',
  'NOTIFICATION_RECEIVED': 'Lý thông báo',
  'RECEIPT_CREATED': 'Đã tạo biên lai thành công',
  'PAID': 'Đã thanh toán',
  'CANCELLED': 'Đã hủy',
  'REJECTED': 'Bị từ chối'
}

// Payment Method mapping
export const PAYMENT_METHOD_MAP = {
  'BANK_TRANSFER': 'Chuyển khoản ngân hàng',
  'QR_CODE': 'Thanh toán bằng mã QR',
  'ECOM': 'Thanh toán bằng tài khoản ngân hàng',
  'CASH': 'Tiền mặt'
}

// Fee Declaration Search Parameters
export interface FeeDeclarationSearchParams {
  // Backend API parameters
  companyId?: number
  declarationNumber?: string
  vesselName?: string
  paymentStatus?: string
  declarationStatus?: string
  fromDate?: string // YYYY-MM-DD format
  toDate?: string   // YYYY-MM-DD format
  
  // Pagination and sorting
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  
  // Legacy parameters for backward compatibility
  companyTaxCode?: string
  companyName?: string
  customsDeclarationNumber?: string
  feeType?: string
  status?: string
  paymentMethod?: string
  feeGroupCode?: string
  createdBy?: string
  signatureCode?: string
  notificationStatus?: string
  digitalSignatureSigned?: boolean
}

// Fee Declaration Create Data
export interface FeeDeclarationCreateData {
  declarationNumber: string
  customsDeclarationNumber?: string
  companyTaxCode: string
  companyName: string
  vesselName?: string
  voyageNumber?: string
  portCode?: string
  feeType: string
  feeAmount: number
  currency?: string
  paymentMethod?: string
  notificationStatus?: string
  signatureCode?: string
  hashCode1?: string
  hashCode2?: string
  feeGroupCode?: string
  createdBy?: string
  digitalSignatureSigned?: boolean
  digitalSignatureCertificateSerial?: string
}

// Fee Declaration Update Data
export interface FeeDeclarationUpdateData {
  customsDeclarationNumber?: string
  companyName?: string
  vesselName?: string
  voyageNumber?: string
  portCode?: string
  feeType?: string
  feeAmount?: number
  currency?: string
  status?: string
  paymentMethod?: string
  notificationStatus?: string
  signatureCode?: string
  hashCode1?: string
  hashCode2?: string
  feeGroupCode?: string
  digitalSignatureSigned?: boolean
  digitalSignatureCertificateSerial?: string
}

// API Response wrapper
export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
  }
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  numberOfElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  empty: boolean
}

/**
 * Fee Declaration API Service
 */
export class FeeDeclarationApiService {
  
  // Helper method for API requests
  private static async makeRequest<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const defaultOptions: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }

      const response = await fetch(url, { ...defaultOptions, ...options })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  /**
   * Get all fee declarations with pagination
   */
  static async getAllFeeDeclarations(
    page = 0, 
    size = 10, 
    sortBy = 'createdAt', 
    sortDir = 'desc'
  ): Promise<PageResponse<FeeDeclaration>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    return this.makeRequest(url)
  }

  /**
   * Search fee declarations with filters
   */
  static async searchFeeDeclarations(
    searchParams: FeeDeclarationSearchParams
  ): Promise<PageResponse<FeeDeclaration>> {
    // Build query parameters
    const queryParams = new URLSearchParams()
    
    if (searchParams.fromDate) queryParams.append('fromDate', searchParams.fromDate)
    if (searchParams.toDate) queryParams.append('toDate', searchParams.toDate)
    if (searchParams.companyId) queryParams.append('companyId', searchParams.companyId.toString())
    if (searchParams.declarationNumber) queryParams.append('declarationNumber', searchParams.declarationNumber)
    if (searchParams.vesselName) queryParams.append('vesselName', searchParams.vesselName)
    if (searchParams.paymentStatus) queryParams.append('paymentStatus', searchParams.paymentStatus)
    if (searchParams.declarationStatus) queryParams.append('declarationStatus', searchParams.declarationStatus)
    if (searchParams.page !== undefined) queryParams.append('page', searchParams.page.toString())
    if (searchParams.size !== undefined) queryParams.append('size', searchParams.size.toString())
    if (searchParams.sortBy) queryParams.append('sortBy', searchParams.sortBy)
    if (searchParams.sortDir) queryParams.append('sortDir', searchParams.sortDir)
    
    const url = `${ENDPOINTS.FEE_DECLARATIONS}?${queryParams.toString()}`
    return this.makeRequest(url)
  }

  /**
   * Get fee declaration by ID
   */
  static async getFeeDeclarationById(id: number): Promise<ApiResponse<FeeDeclaration>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/${id}`
    return this.makeRequest(url)
  }

  /**
   * Get fee declaration by declaration number
   */
  static async getFeeDeclarationByDeclarationNumber(
    declarationNumber: string
  ): Promise<ApiResponse<FeeDeclaration>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/declaration-number/${encodeURIComponent(declarationNumber)}`
    return this.makeRequest(url)
  }

  /**
   * Get fee declarations by company tax code
   */
  static async getFeeDeclarationsByCompanyTaxCode(
    companyTaxCode: string,
    page = 0,
    size = 10,
    sortBy = 'createdAt',
    sortDir = 'desc'
  ): Promise<ApiResponse<PageResponse<FeeDeclaration>>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/company/${encodeURIComponent(companyTaxCode)}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    return this.makeRequest(url)
  }

  /**
   * Get fee declarations by status
   */
  static async getFeeDeclarationsByStatus(
    status: string,
    page = 0,
    size = 10,
    sortBy = 'createdAt',
    sortDir = 'desc'
  ): Promise<ApiResponse<PageResponse<FeeDeclaration>>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/status/${status}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    return this.makeRequest(url)
  }

  /**
   * Create a new fee declaration
   */
  static async createFeeDeclaration(
    createData: FeeDeclarationCreateData
  ): Promise<ApiResponse<FeeDeclaration>> {
    return this.makeRequest(ENDPOINTS.FEE_DECLARATIONS, {
      method: 'POST',
      body: JSON.stringify(createData)
    })
  }

  /**
   * Update an existing fee declaration
   */
  static async updateFeeDeclaration(
    id: number,
    updateData: any
  ): Promise<ApiResponse<FeeDeclaration>> {
    try {
      const url = `${ENDPOINTS.FEE_DECLARATIONS}/${id}`
      console.log('Updating fee declaration:', id, updateData);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Backend returns FeeDeclarationDto directly, not wrapped in ApiResponse
      const feeDeclarationData = await response.json();
      console.log('Fee declaration updated:', feeDeclarationData);

      // Wrap in ApiResponse format for frontend consistency
      const result: ApiResponse<FeeDeclaration> = {
        success: true,
        message: 'Fee declaration updated successfully',
        data: feeDeclarationData,
        timestamp: new Date().toISOString()
      };

      return result;
    } catch (error) {
      console.error('Update fee declaration failed:', error);
      throw error;
    }
  }

  /**
   * Update fee declaration status
   */
  static async updateFeeDeclarationStatus(
    id: number,
    status: string
  ): Promise<ApiResponse<FeeDeclaration>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/${id}/status?status=${status}`
    return this.makeRequest(url, {
      method: 'PATCH'
    })
  }

  /**
   * Sign fee declaration digitally
   */
  static async signFeeDeclaration(
    id: number,
    certificateSerial: string
  ): Promise<ApiResponse<FeeDeclaration>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/${id}/sign?certificateSerial=${encodeURIComponent(certificateSerial)}`
    return this.makeRequest(url, {
      method: 'PATCH'
    })
  }

  /**
   * Delete a fee declaration
   */
  static async deleteFeeDeclaration(id: number): Promise<ApiResponse<void>> {
    const url = `${ENDPOINTS.FEE_DECLARATIONS}/${id}`
    return this.makeRequest(url, {
      method: 'DELETE'
    })
  }

  /**
   * Get fee declaration statistics
   */
  static async getFeeDeclarationStatistics(): Promise<ApiResponse<Record<string, any>>> {
    return this.makeRequest(ENDPOINTS.STATISTICS)
  }

  /**
   * Get fee declarations needing notification
   */
  static async getFeeDeclarationsNeedingNotification(): Promise<ApiResponse<FeeDeclaration[]>> {
    return this.makeRequest(ENDPOINTS.NEEDING_NOTIFICATION)
  }
}

// Legacy interface for mock data
interface LegacyFeeDeclaration {
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

// Mock API fallback (for development when backend is not available)
export class MockFeeDeclarationApiService {
  
  private static async delay(ms = 1000): Promise<void> {
    await sleep(ms)
  }
  
  // Convert legacy mock data to FeeDeclaration format
  private static convertLegacyToFeeDeclaration(legacy: LegacyFeeDeclaration): FeeDeclaration {
    return {
      id: parseInt(legacy.id),
      declarationNumber: legacy.tkNopPhi,
      companyId: 1,
      company: {
        id: 1,
        companyName: legacy.doanhNghiep.split('-')[1] || legacy.doanhNghiep,
        taxCode: legacy.doanhNghiep.split('-')[0] || '0123456789'
      },
      vesselName: 'MV Demo Vessel',
      voyageNumber: legacy.tkHaiQuan,
      arrivalDate: legacy.ngayTKNP.split('/').reverse().join('-'),
      grossTonnage: 15000,
      netTonnage: 12000,
      totalFeeAmount: legacy.tongTien,
      paidAmount: legacy.trangThai === 'Đã thanh toán' ? legacy.tongTien : 0,
      remainingAmount: legacy.trangThai === 'Đã thanh toán' ? 0 : legacy.tongTien,
      paymentStatus: legacy.trangThai === 'Đã thanh toán' ? 'PAID' : 'PENDING',
      declarationStatus: legacy.trangThai === 'Mới' ? 'DRAFT' : 'SUBMITTED',
      notes: legacy.thongBao,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  private static generateMockData(): LegacyFeeDeclaration[] {
    return [
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
      }
    ]
  }

  static async getAllFeeDeclarations(): Promise<ApiResponse<PageResponse<FeeDeclaration>>> {
    await this.delay()
    
    const legacyData = this.generateMockData()
    const mockData = legacyData.map(item => this.convertLegacyToFeeDeclaration(item))
    const pageResponse: PageResponse<FeeDeclaration> = {
      content: mockData,
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: { sorted: true, unsorted: false, empty: false }
      },
      totalElements: mockData.length,
      totalPages: 1,
      last: true,
      first: true,
      numberOfElements: mockData.length,
      size: 10,
      number: 0,
      sort: { sorted: true, unsorted: false, empty: false },
      empty: false
    }

    return {
      success: true,
      message: 'Fee declarations retrieved successfully',
      data: pageResponse,
      timestamp: new Date().toISOString()
    }
  }

  static async searchFeeDeclarations(
    searchParams: FeeDeclarationSearchParams
  ): Promise<ApiResponse<PageResponse<FeeDeclaration>>> {
    await this.delay()
    
    let legacyData = this.generateMockData()
    
    // Apply simple filters
    if (searchParams.companyTaxCode) {
      legacyData = legacyData.filter(item => 
        item.doanhNghiep.includes(searchParams.companyTaxCode!)
      )
    }
    
    if (searchParams.feeType) {
      legacyData = legacyData.filter(item => 
        item.loaiToKhai.includes(searchParams.feeType!)
      )
    }

    const mockData = legacyData.map(item => this.convertLegacyToFeeDeclaration(item))
    const pageResponse: PageResponse<FeeDeclaration> = {
      content: mockData,
      pageable: {
        pageNumber: searchParams.page || 0,
        pageSize: searchParams.size || 10,
        sort: { sorted: true, unsorted: false, empty: false }
      },
      totalElements: mockData.length,
      totalPages: Math.ceil(mockData.length / (searchParams.size || 10)),
      last: true,
      first: true,
      numberOfElements: mockData.length,
      size: searchParams.size || 10,
      number: searchParams.page || 0,
      sort: { sorted: true, unsorted: false, empty: false },
      empty: mockData.length === 0
    }

    return {
      success: true,
      message: 'Search completed successfully',
      data: pageResponse,
      timestamp: new Date().toISOString()
    }
  }
}

// Debug service that logs everything
export class DebugFeeDeclarationService {
  static async getAllFeeDeclarations(): Promise<any> {
    console.log('DebugFeeDeclarationService.getAllFeeDeclarations called');
    try {
      const result = await MockFeeDeclarationApiService.getAllFeeDeclarations();
      console.log('Mock service result:', result);
      return result;
    } catch (error) {
      console.error('Mock service error:', error);
      throw error;
    }
  }

  static async searchFeeDeclarations(searchParams: FeeDeclarationSearchParams): Promise<any> {
    console.log('DebugFeeDeclarationService.searchFeeDeclarations called with:', searchParams);
    try {
      // First try the real API
      try {
        console.log('Trying real API...');
        const realResult = await FeeDeclarationApiService.searchFeeDeclarations(searchParams);
        console.log('Real API result:', realResult);
        return realResult;
      } catch (apiError) {
        console.log('Real API failed, trying mock:', apiError);
        const mockResult = await MockFeeDeclarationApiService.searchFeeDeclarations(searchParams);
        console.log('Mock service result:', mockResult);
        return mockResult;
      }
    } catch (error) {
      console.error('All services failed:', error);
      throw error;
    }
  }
}

// Export the service to use based on environment
// Temporarily use mock service for testing
export const FeeDeclarationService = FeeDeclarationApiService;
