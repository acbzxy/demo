import type { ApiResponse } from '../types'

// CRM API Base URL - backend thật
const CRM_API_BASE_URL = 'http://10.14.122.24:8081/CRM_BE'

// CRM API endpoints - HOÀN THIỆN từ Swagger UI backend
const CRM_ENDPOINTS = {
  // === TỜ KHAI THÔNG TIN CHÍNH ===
  TOKHAI_THONGTIN: `${CRM_API_BASE_URL}/api/tokhai-thongtin`,
  TOKHAI_THONGTIN_ALL: `${CRM_API_BASE_URL}/api/tokhai-thongtin/all`,
  TOKHAI_THONGTIN_CREATE: `${CRM_API_BASE_URL}/api/tokhai-thongtin/create`,
  TOKHAI_THONGTIN_UPDATE_STATUS: `${CRM_API_BASE_URL}/api/tokhai-thongtin/update-status`,
  
  // === DOANH NGHIỆP / COMPANIES ===
  COMPANIES: `${CRM_API_BASE_URL}/api/companies`,
  COMPANIES_ALL: `${CRM_API_BASE_URL}/api/companies/all`,
  COMPANIES_CREATE: `${CRM_API_BASE_URL}/api/companies/create`,
  COMPANIES_UPDATE: `${CRM_API_BASE_URL}/api/companies/update`,
  COMPANIES_DELETE: `${CRM_API_BASE_URL}/api/companies/delete`,
  COMPANIES_SEARCH: `${CRM_API_BASE_URL}/api/companies/search`,
  
  // === THÔNG BÁO PHÍ ===
  THONG_BAO_PHI: `${CRM_API_BASE_URL}/api/thong-bao-phi`,
  THONG_BAO_PHI_ALL: `${CRM_API_BASE_URL}/api/thong-bao-phi/all`,
  THONG_BAO_PHI_CREATE: `${CRM_API_BASE_URL}/api/thong-bao-phi/create`,
  THONG_BAO_PHI_UPDATE: `${CRM_API_BASE_URL}/api/thong-bao-phi/update`,
  
  // === BIÊN LAI / RECEIPTS ===
  BIEN_LAI: `${CRM_API_BASE_URL}/api/bien-lai`,
  BIEN_LAI_ALL: `${CRM_API_BASE_URL}/api/bien-lai/all`,
  BIEN_LAI_CREATE: `${CRM_API_BASE_URL}/api/bien-lai/create`,
  BIEN_LAI_UPDATE: `${CRM_API_BASE_URL}/api/bien-lai/update`,
  BIEN_LAI_DELETE: `${CRM_API_BASE_URL}/api/bien-lai/delete`,
  
  // === THANH TOÁN / PAYMENTS ===
  PAYMENTS: `${CRM_API_BASE_URL}/api/payments`,
  PAYMENTS_ALL: `${CRM_API_BASE_URL}/api/payments/all`,
  PAYMENTS_CREATE: `${CRM_API_BASE_URL}/api/payments/create`,
  PAYMENTS_UPDATE_STATUS: `${CRM_API_BASE_URL}/api/payments/update-status`,
  PAYMENTS_SEARCH: `${CRM_API_BASE_URL}/api/payments/search`,
  
  // === LOẠI PHÍ / FEE TYPES ===
  FEE_TYPES: `${CRM_API_BASE_URL}/api/fee-types`,
  FEE_TYPES_ALL: `${CRM_API_BASE_URL}/api/fee-types/all`,
  FEE_TYPES_CREATE: `${CRM_API_BASE_URL}/api/fee-types/create`,
  
  // === CHỮ KÝ SỐ / DIGITAL SIGNATURE ===
  DIGITAL_SIGNATURE: `${CRM_API_BASE_URL}/api/digital-signature`,
  DIGITAL_SIGNATURE_SIGN: `${CRM_API_BASE_URL}/api/digital-signature/sign`,
  DIGITAL_SIGNATURE_VERIFY: `${CRM_API_BASE_URL}/api/digital-signature/verify`,
  
  // === BÁO CÁO / REPORTS ===
  REPORTS: `${CRM_API_BASE_URL}/api/reports`,
  REPORTS_DAILY: `${CRM_API_BASE_URL}/api/reports/daily`,
  REPORTS_SUMMARY: `${CRM_API_BASE_URL}/api/reports/summary`,
  REPORTS_EXPORT: `${CRM_API_BASE_URL}/api/reports/export`,
  
  // === XÁC THỰC / AUTHENTICATION ===
  AUTH_LOGIN: `${CRM_API_BASE_URL}/api/auth/login`,
  AUTH_LOGOUT: `${CRM_API_BASE_URL}/api/auth/logout`,
  AUTH_REFRESH: `${CRM_API_BASE_URL}/api/auth/refresh-token`,
  AUTH_VALIDATE: `${CRM_API_BASE_URL}/api/auth/validate`,
  
  // === NGƯỜI DÙNG / USER MANAGEMENT ===
  USERS: `${CRM_API_BASE_URL}/api/users`,
  USERS_ALL: `${CRM_API_BASE_URL}/api/users/all`,
  USERS_CREATE: `${CRM_API_BASE_URL}/api/users/create`,
  USERS_UPDATE: `${CRM_API_BASE_URL}/api/users/update`,
  USERS_DELETE: `${CRM_API_BASE_URL}/api/users/delete`,
  USERS_PROFILE: `${CRM_API_BASE_URL}/api/users/profile`,
  
  // === LEGACY COMPATIBILITY ===
  FEE_DECLARATIONS: `${CRM_API_BASE_URL}/api/tokhai-thongtin/all`, // redirect to real endpoint
  RECEIPTS: `${CRM_API_BASE_URL}/api/bien-lai/all`, // redirect to real endpoint
}

// Request headers helper
const getHeaders = (includeAuth = true): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  
  // Add authorization token if available
  if (includeAuth) {
    const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }
  
  return headers
}

// Generic API request helper
async function makeApiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const defaultOptions: RequestInit = {
      headers: getHeaders(),
      ...options
    }

    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`)
    console.log('📤 Request options:', defaultOptions)

    const response = await fetch(url, defaultOptions)
    
    console.log(`📡 Response status: ${response.status}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`
      console.error('❌ API Error:', errorMessage)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log('✅ API Response data:', data)
    return data
  } catch (error) {
    console.error('🚨 API Request failed:', error)
    throw error
  }
}

// Fee Declaration interfaces for CRM API
export interface CrmFeeDeclaration {
  id?: number
  declarationNumber: string
  companyId: number
  vesselName: string
  voyageNumber?: string
  portCode?: string
  feeType: string
  feeAmount: number
  currency?: string
  status: string
  paymentMethod?: string
  createdAt?: string
  updatedAt?: string
  notes?: string
}

export interface CrmFeeDeclarationCreateData {
  declarationNumber: string
  companyId: number
  companyTaxCode: string
  companyName: string
  vesselName: string
  voyageNumber?: string
  portCode?: string
  feeType: string
  feeAmount: number
  currency?: string
  paymentMethod?: string
  notes?: string
}

export interface CrmFeeDeclarationSearchParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  companyId?: number
  declarationNumber?: string
  vesselName?: string
  status?: string
  fromDate?: string
  toDate?: string
}

export interface CrmCompany {
  id?: number
  companyName: string
  taxCode: string
  address?: string
  phone?: string
  email?: string
  status?: string
}

// === INTERFACE MỚI TỪ BACKEND SWAGGER UI ===

export interface CrmThongBaoPhi {
  id?: number
  declarationId: number
  thongBaoSo: string
  ngayThongBao: string
  tongTienPhi: number
  trangThai: string
  ghiChu?: string
  createdAt?: string
  updatedAt?: string
}

export interface CrmBienLai {
  id?: number
  thongBaoPhiId: number
  bienLaiSo: string
  ngayBienLai: string
  soTien: number
  hinhThucThanhToan: string
  trangThai: string
  nguoiThu?: string
  ghiChu?: string
  createdAt?: string
  updatedAt?: string
}

export interface CrmPayment {
  id?: number
  bienLaiId?: number
  declarationId?: number
  paymentMethod: string
  paymentAmount: number
  paymentDate: string
  transactionId?: string
  bankCode?: string
  status: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface CrmFeeType {
  id?: number
  feeCode: string
  feeName: string
  feeDescription?: string
  baseAmount?: number
  calculationMethod?: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CrmDigitalSignature {
  id?: number
  declarationId: number
  signatureData: string
  algorithm: string
  timestamp: string
  signerName: string
  signerEmail?: string
  certificateInfo?: string
  isValid: boolean
  createdAt?: string
}

export interface CrmUser {
  id?: number
  username: string
  email: string
  fullName: string
  role: string
  department?: string
  isActive: boolean
  lastLogin?: string
  createdAt?: string
  updatedAt?: string
}

export interface CrmReport {
  id?: number
  reportType: string
  title: string
  description?: string
  parameters: any
  generatedDate: string
  generatedBy: number
  filePath?: string
  status: string
}

// === SEARCH PARAMS INTERFACES ===
export interface CrmCompanySearchParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  companyName?: string
  taxCode?: string
  status?: string
}

export interface CrmPaymentSearchParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  paymentMethod?: string
  status?: string
  fromDate?: string
  toDate?: string
  minAmount?: number
  maxAmount?: number
}

export interface CrmThongBaoPhiSearchParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  trangThai?: string
  fromDate?: string
  toDate?: string
  declarationId?: number
}

export interface CrmBienLaiSearchParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  trangThai?: string
  fromDate?: string
  toDate?: string
  hinhThucThanhToan?: string
}

// CRM API Service
export class CrmApiService {
  
  /**
   * Test kết nối API với nhiều endpoint và timeout
   */
  static async testConnection(timeoutMs = 5000): Promise<{ connected: boolean; details: any }> {
    const testResults = {
      connected: false,
      details: {
        endpoints: [],
        error: null,
        networkInfo: {
          userAgent: navigator.userAgent,
          onLine: navigator.onLine,
          timestamp: new Date().toISOString()
        }
      }
    }

    // Test endpoints in order of priority (cập nhật với endpoints thực tế)
    const testEndpoints = [
      { url: `${CRM_API_BASE_URL}/swagger-ui/index.html`, name: 'Swagger UI' },
      { url: `${CRM_API_BASE_URL}/api/tokhai-thongtin/all`, name: 'Tờ khai thông tin API' },
      { url: `${CRM_API_BASE_URL}/actuator/health`, name: 'Health Check' },
    ]

    for (const endpoint of testEndpoints) {
      const result = await this.testSingleEndpoint(endpoint.url, endpoint.name, timeoutMs)
      testResults.details.endpoints.push(result)
      
      if (result.success) {
        testResults.connected = true
        break // At least one endpoint works
      }
    }

    console.log('🔍 CRM API Connection Test Results:', testResults)
    return testResults
  }

  /**
   * Test single endpoint với timeout và detailed logging
   */
  private static async testSingleEndpoint(
    url: string, 
    name: string, 
    timeoutMs: number
  ): Promise<any> {
    const startTime = Date.now()
    
    try {
      console.log(`🔗 Testing ${name}: ${url}`)
      
      // Create abort controller for timeout
      const controller = new AbortController()
      const timeout = setTimeout(() => {
        console.log(`⏰ Timeout reached for ${name} (${timeoutMs}ms)`)
        controller.abort()
      }, timeoutMs)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...getHeaders(false),
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        mode: 'cors', // Explicitly set CORS mode
        signal: controller.signal
      })

      clearTimeout(timeout)
      const duration = Date.now() - startTime

      const result = {
        name,
        url,
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        duration,
        headers: Object.fromEntries(response.headers.entries()),
        timestamp: new Date().toISOString()
      }

      if (response.ok) {
        console.log(`✅ ${name} - Success (${duration}ms)`)
      } else {
        console.log(`❌ ${name} - Failed: ${response.status} ${response.statusText} (${duration}ms)`)
      }

      return result
    } catch (error: any) {
      const duration = Date.now() - startTime
      
      let errorType = 'Unknown'
      let errorMessage = error.message || 'Unknown error'

      if (error.name === 'AbortError') {
        errorType = 'Timeout'
        errorMessage = `Request timed out after ${timeoutMs}ms`
      } else if (error.message.includes('ERR_CONNECTION_TIMED_OUT')) {
        errorType = 'Connection Timeout'
        errorMessage = 'Server did not respond within timeout period'
      } else if (error.message.includes('ERR_CONNECTION_REFUSED')) {
        errorType = 'Connection Refused'
        errorMessage = 'Server actively refused the connection'
      } else if (error.message.includes('ERR_NAME_NOT_RESOLVED')) {
        errorType = 'DNS Resolution Failed'
        errorMessage = 'Could not resolve server hostname'
      } else if (error.message.includes('Failed to fetch')) {
        errorType = 'Network Error'
        errorMessage = 'Network request failed - check server status and CORS'
      }

      console.error(`💥 ${name} failed:`, {
        type: errorType,
        message: errorMessage,
        duration,
        originalError: error
      })

      return {
        name,
        url,
        success: false,
        error: errorType,
        message: errorMessage,
        duration,
        timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * Get all fee declarations - cập nhật sử dụng endpoint thực tế
   */
  static async getAllFeeDeclarations(
    page = 0,
    size = 10,
    sortBy = 'createdAt',
    sortDir = 'desc'
  ): Promise<ApiResponse<any>> {
    // Sử dụng endpoint thực tế từ Swagger UI
    const url = CRM_ENDPOINTS.TOKHAI_THONGTIN_ALL
    return makeApiRequest(url)
  }

  /**
   * Search fee declarations - cập nhật sử dụng endpoint thực tế
   */
  static async searchFeeDeclarations(
    searchParams: CrmFeeDeclarationSearchParams
  ): Promise<ApiResponse<any>> {
    // Sử dụng endpoint /all và filter client-side hoặc với query params nếu server hỗ trợ
    const queryParams = new URLSearchParams()
    
    // Thêm các query params nếu endpoint hỗ trợ
    if (searchParams.page !== undefined) queryParams.append('page', searchParams.page.toString())
    if (searchParams.size !== undefined) queryParams.append('size', searchParams.size.toString())
    if (searchParams.sortBy) queryParams.append('sortBy', searchParams.sortBy)
    if (searchParams.sortDir) queryParams.append('sortDir', searchParams.sortDir)
    if (searchParams.companyId) queryParams.append('companyId', searchParams.companyId.toString())
    if (searchParams.declarationNumber) queryParams.append('declarationNumber', searchParams.declarationNumber)
    if (searchParams.vesselName) queryParams.append('vesselName', searchParams.vesselName)
    if (searchParams.status) queryParams.append('status', searchParams.status)
    if (searchParams.fromDate) queryParams.append('fromDate', searchParams.fromDate)
    if (searchParams.toDate) queryParams.append('toDate', searchParams.toDate)
    
    // Thử với query params trước, nếu không hoạt động thì dùng endpoint /all
    const queryString = queryParams.toString()
    const url = queryString 
      ? `${CRM_ENDPOINTS.TOKHAI_THONGTIN_ALL}?${queryString}`
      : CRM_ENDPOINTS.TOKHAI_THONGTIN_ALL
    
    return makeApiRequest(url)
  }

  /**
   * Get fee declaration by ID - cập nhật sử dụng endpoint thực tế
   */
  static async getFeeDeclarationById(id: number): Promise<ApiResponse<CrmFeeDeclaration>> {
    const url = `${CRM_ENDPOINTS.TOKHAI_THONGTIN}/${id}`
    return makeApiRequest(url)
  }

  /**
   * Create new fee declaration - cập nhật sử dụng endpoint thực tế
   */
  static async createFeeDeclaration(
    data: CrmFeeDeclarationCreateData
  ): Promise<ApiResponse<CrmFeeDeclaration>> {
    return makeApiRequest(CRM_ENDPOINTS.TOKHAI_THONGTIN_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * Update fee declaration - cập nhật sử dụng endpoint thực tế
   */
  static async updateFeeDeclaration(
    id: number,
    data: Partial<CrmFeeDeclarationCreateData>
  ): Promise<ApiResponse<CrmFeeDeclaration>> {
    // Sử dụng endpoint update-status từ Swagger UI
    return makeApiRequest(CRM_ENDPOINTS.TOKHAI_THONGTIN_UPDATE_STATUS, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data })
    })
  }

  /**
   * Delete fee declaration
   */
  static async deleteFeeDeclaration(id: number): Promise<ApiResponse<void>> {
    const url = `${CRM_ENDPOINTS.FEE_DECLARATIONS}/${id}`
    return makeApiRequest(url, {
      method: 'DELETE'
    })
  }

  /**
   * Get all companies
   */
  static async getAllCompanies(): Promise<ApiResponse<CrmCompany[]>> {
    return makeApiRequest(CRM_ENDPOINTS.COMPANIES)
  }

  /**
   * Get company by ID
   */
  static async getCompanyById(id: number): Promise<ApiResponse<CrmCompany>> {
    const url = `${CRM_ENDPOINTS.COMPANIES}/${id}`
    return makeApiRequest(url)
  }

  /**
   * Search companies by tax code
   */
  static async searchCompaniesByTaxCode(taxCode: string): Promise<ApiResponse<CrmCompany[]>> {
    const url = `${CRM_ENDPOINTS.COMPANIES}/search?taxCode=${encodeURIComponent(taxCode)}`
    return makeApiRequest(url)
  }

  /**
   * Create new company
   */
  static async createCompany(data: Omit<CrmCompany, 'id'>): Promise<ApiResponse<CrmCompany>> {
    return makeApiRequest(CRM_ENDPOINTS.COMPANIES, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // === COMPANIES API METHODS ===
  
  /**
   * Lấy tất cả danh sách công ty
   */
  static async getAllCompanies(): Promise<ApiResponse<CrmCompany[]>> {
    return makeApiRequest(CRM_ENDPOINTS.COMPANIES_ALL)
  }

  /**
   * Tìm kiếm công ty
   */
  static async searchCompanies(searchParams: CrmCompanySearchParams): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams()
    
    if (searchParams.page !== undefined) queryParams.append('page', searchParams.page.toString())
    if (searchParams.size !== undefined) queryParams.append('size', searchParams.size.toString())
    if (searchParams.sortBy) queryParams.append('sortBy', searchParams.sortBy)
    if (searchParams.sortDir) queryParams.append('sortDir', searchParams.sortDir)
    if (searchParams.companyName) queryParams.append('companyName', searchParams.companyName)
    if (searchParams.taxCode) queryParams.append('taxCode', searchParams.taxCode)
    if (searchParams.status) queryParams.append('status', searchParams.status)
    
    const url = `${CRM_ENDPOINTS.COMPANIES_SEARCH}?${queryParams.toString()}`
    return makeApiRequest(url)
  }

  /**
   * Tạo công ty mới
   */
  static async createCompany(data: Omit<CrmCompany, 'id'>): Promise<ApiResponse<CrmCompany>> {
    return makeApiRequest(CRM_ENDPOINTS.COMPANIES_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * Cập nhật thông tin công ty
   */
  static async updateCompany(id: number, data: Partial<CrmCompany>): Promise<ApiResponse<CrmCompany>> {
    return makeApiRequest(CRM_ENDPOINTS.COMPANIES_UPDATE, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data })
    })
  }

  /**
   * Xóa công ty
   */
  static async deleteCompany(id: number): Promise<ApiResponse<void>> {
    return makeApiRequest(CRM_ENDPOINTS.COMPANIES_DELETE, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
  }

  // === THÔNG BÁO PHÍ API METHODS ===

  /**
   * Lấy tất cả thông báo phí
   */
  static async getAllThongBaoPhi(): Promise<ApiResponse<CrmThongBaoPhi[]>> {
    return makeApiRequest(CRM_ENDPOINTS.THONG_BAO_PHI_ALL)
  }

  /**
   * Tạo thông báo phí
   */
  static async createThongBaoPhi(data: Omit<CrmThongBaoPhi, 'id'>): Promise<ApiResponse<CrmThongBaoPhi>> {
    return makeApiRequest(CRM_ENDPOINTS.THONG_BAO_PHI_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * Cập nhật thông báo phí
   */
  static async updateThongBaoPhi(id: number, data: Partial<CrmThongBaoPhi>): Promise<ApiResponse<CrmThongBaoPhi>> {
    return makeApiRequest(CRM_ENDPOINTS.THONG_BAO_PHI_UPDATE, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data })
    })
  }

  // === BIÊN LAI API METHODS ===

  /**
   * Lấy tất cả biên lai
   */
  static async getAllBienLai(): Promise<ApiResponse<CrmBienLai[]>> {
    return makeApiRequest(CRM_ENDPOINTS.BIEN_LAI_ALL)
  }

  /**
   * Tạo biên lai mới
   */
  static async createBienLai(data: Omit<CrmBienLai, 'id'>): Promise<ApiResponse<CrmBienLai>> {
    return makeApiRequest(CRM_ENDPOINTS.BIEN_LAI_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * Cập nhật biên lai
   */
  static async updateBienLai(id: number, data: Partial<CrmBienLai>): Promise<ApiResponse<CrmBienLai>> {
    return makeApiRequest(CRM_ENDPOINTS.BIEN_LAI_UPDATE, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data })
    })
  }

  /**
   * Xóa biên lai
   */
  static async deleteBienLai(id: number): Promise<ApiResponse<void>> {
    return makeApiRequest(CRM_ENDPOINTS.BIEN_LAI_DELETE, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
  }

  // === PAYMENTS API METHODS ===

  /**
   * Lấy tất cả thanh toán
   */
  static async getAllPayments(): Promise<ApiResponse<CrmPayment[]>> {
    return makeApiRequest(CRM_ENDPOINTS.PAYMENTS_ALL)
  }

  /**
   * Tìm kiếm thanh toán
   */
  static async searchPayments(searchParams: CrmPaymentSearchParams): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams()
    
    if (searchParams.page !== undefined) queryParams.append('page', searchParams.page.toString())
    if (searchParams.size !== undefined) queryParams.append('size', searchParams.size.toString())
    if (searchParams.sortBy) queryParams.append('sortBy', searchParams.sortBy)
    if (searchParams.sortDir) queryParams.append('sortDir', searchParams.sortDir)
    if (searchParams.paymentMethod) queryParams.append('paymentMethod', searchParams.paymentMethod)
    if (searchParams.status) queryParams.append('status', searchParams.status)
    if (searchParams.fromDate) queryParams.append('fromDate', searchParams.fromDate)
    if (searchParams.toDate) queryParams.append('toDate', searchParams.toDate)
    if (searchParams.minAmount) queryParams.append('minAmount', searchParams.minAmount.toString())
    if (searchParams.maxAmount) queryParams.append('maxAmount', searchParams.maxAmount.toString())
    
    const url = `${CRM_ENDPOINTS.PAYMENTS_SEARCH}?${queryParams.toString()}`
    return makeApiRequest(url)
  }

  /**
   * Tạo thanh toán mới
   */
  static async createPayment(data: Omit<CrmPayment, 'id'>): Promise<ApiResponse<CrmPayment>> {
    return makeApiRequest(CRM_ENDPOINTS.PAYMENTS_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * Cập nhật trạng thái thanh toán
   */
  static async updatePaymentStatus(id: number, status: string): Promise<ApiResponse<CrmPayment>> {
    return makeApiRequest(CRM_ENDPOINTS.PAYMENTS_UPDATE_STATUS, {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    })
  }

  // === FEE TYPES API METHODS ===

  /**
   * Lấy tất cả loại phí
   */
  static async getAllFeeTypes(): Promise<ApiResponse<CrmFeeType[]>> {
    return makeApiRequest(CRM_ENDPOINTS.FEE_TYPES_ALL)
  }

  /**
   * Tạo loại phí mới
   */
  static async createFeeType(data: Omit<CrmFeeType, 'id'>): Promise<ApiResponse<CrmFeeType>> {
    return makeApiRequest(CRM_ENDPOINTS.FEE_TYPES_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // === DIGITAL SIGNATURE API METHODS ===

  /**
   * Ký số tờ khai
   */
  static async signDeclaration(declarationId: number, signatureData: any): Promise<ApiResponse<CrmDigitalSignature>> {
    return makeApiRequest(CRM_ENDPOINTS.DIGITAL_SIGNATURE_SIGN, {
      method: 'POST',
      body: JSON.stringify({
        declarationId,
        ...signatureData
      })
    })
  }

  /**
   * Xác minh chữ ký số
   */
  static async verifySignature(signatureId: number): Promise<ApiResponse<any>> {
    return makeApiRequest(`${CRM_ENDPOINTS.DIGITAL_SIGNATURE_VERIFY}/${signatureId}`)
  }

  // === REPORTS API METHODS ===

  /**
   * Lấy báo cáo hàng ngày
   */
  static async getDailyReports(date: string): Promise<ApiResponse<CrmReport[]>> {
    const url = `${CRM_ENDPOINTS.REPORTS_DAILY}?date=${date}`
    return makeApiRequest(url)
  }

  /**
   * Lấy báo cáo tổng hợp
   */
  static async getSummaryReports(fromDate: string, toDate: string): Promise<ApiResponse<any>> {
    const url = `${CRM_ENDPOINTS.REPORTS_SUMMARY}?fromDate=${fromDate}&toDate=${toDate}`
    return makeApiRequest(url)
  }

  /**
   * Xuất báo cáo
   */
  static async exportReport(reportType: string, parameters: any): Promise<ApiResponse<any>> {
    return makeApiRequest(CRM_ENDPOINTS.REPORTS_EXPORT, {
      method: 'POST',
      body: JSON.stringify({
        reportType,
        parameters
      })
    })
  }

  // === AUTHENTICATION API METHODS ===

  /**
   * Login to CRM system
   */
  static async login(username: string, password: string): Promise<ApiResponse<any>> {
    const loginData = { username, password }
    
    try {
      const response = await makeApiRequest(CRM_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify(loginData)
      })
      
      // Save auth token if provided
      if (response.token) {
        sessionStorage.setItem('authToken', response.token)
        console.log('✅ Auth token saved')
      }
      
      return response
    } catch (error) {
      console.error('❌ CRM Login failed:', error)
      throw error
    }
  }

  /**
   * Refresh auth token
   */
  static async refreshToken(): Promise<ApiResponse<any>> {
    return makeApiRequest(CRM_ENDPOINTS.AUTH_REFRESH, {
      method: 'POST'
    })
  }

  /**
   * Validate auth token
   */
  static async validateToken(): Promise<ApiResponse<any>> {
    return makeApiRequest(CRM_ENDPOINTS.AUTH_VALIDATE)
  }

  /**
   * Logout from CRM system
   */
  static async logout(): Promise<void> {
    try {
      await makeApiRequest(CRM_ENDPOINTS.AUTH_LOGOUT, {
        method: 'POST'
      })
    } catch (error) {
      console.warn('Logout API call failed, but clearing local session:', error)
    } finally {
      // Clear local auth data
      sessionStorage.removeItem('authToken')
      localStorage.removeItem('authToken')
    }
  }

  // === USER MANAGEMENT API METHODS ===

  /**
   * Lấy tất cả người dùng
   */
  static async getAllUsers(): Promise<ApiResponse<CrmUser[]>> {
    return makeApiRequest(CRM_ENDPOINTS.USERS_ALL)
  }

  /**
   * Lấy profile người dùng hiện tại
   */
  static async getUserProfile(): Promise<ApiResponse<CrmUser>> {
    return makeApiRequest(CRM_ENDPOINTS.USERS_PROFILE)
  }

  /**
   * Tạo người dùng mới
   */
  static async createUser(data: Omit<CrmUser, 'id'>): Promise<ApiResponse<CrmUser>> {
    return makeApiRequest(CRM_ENDPOINTS.USERS_CREATE, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * Cập nhật thông tin người dùng
   */
  static async updateUser(id: number, data: Partial<CrmUser>): Promise<ApiResponse<CrmUser>> {
    return makeApiRequest(CRM_ENDPOINTS.USERS_UPDATE, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data })
    })
  }

  /**
   * Xóa người dùng
   */
  static async deleteUser(id: number): Promise<ApiResponse<void>> {
    return makeApiRequest(CRM_ENDPOINTS.USERS_DELETE, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
  }
}

// Export for backwards compatibility
export default CrmApiService
