// API service for SunLighter backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = null
    this.refreshToken = null
    
    // Initialize tokens from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken')
      this.refreshToken = localStorage.getItem('refreshToken')
    }
  }

  // Set authorization headers
  getHeaders(isFormData = false) {
    const headers = {}
    
    // Only set Content-Type for JSON, let browser set it for FormData
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }
    
    return headers
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const isFormData = options.body instanceof FormData
    const config = {
      headers: this.getHeaders(isFormData),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      // Handle 401 (Unauthorized) by trying to refresh token
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          // Retry the original request with new token
          config.headers = this.getHeaders(isFormData)
          const retryResponse = await fetch(url, config)
          return await this.handleResponse(retryResponse)
        }
      }
      
      return await this.handleResponse(response)
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Handle API response
  async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = 'Something went wrong. Please try again.'
      
      try {
        const errorData = await response.json()
        
        // Handle different types of error responses
        if (errorData.detail) {
          // FastAPI validation errors
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => err.msg || err.message || 'Validation error').join(', ')
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail
          } else {
            errorMessage = 'Validation failed. Please check your input.'
          }
        } else if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.error) {
          errorMessage = errorData.error
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Please check your information and try again.'
        } else if (response.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.'
        } else if (response.status === 403) {
          errorMessage = 'Access denied. You do not have permission to perform this action.'
        } else if (response.status === 404) {
          errorMessage = 'Resource not found. Please try again.'
        } else if (response.status === 409) {
          errorMessage = 'This information already exists. Please use different details.'
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.'
        }
      } catch (parseError) {
        // If we can't parse the error response
        if (response.status === 400) {
          errorMessage = 'Invalid request. Please check your information.'
        } else if (response.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.'
        } else if (response.status === 409) {
          errorMessage = 'Email already exists. Please use a different email address.'
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.'
        } else {
          errorMessage = `Request failed (${response.status}). Please try again.`
        }
      }
      
      throw new Error(errorMessage)
    }
    
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    
    return response.text()
  }

  // Store tokens
  setTokens(accessToken, refreshToken) {
    this.token = accessToken
    this.refreshToken = refreshToken
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  // Clear tokens
  clearTokens() {
    this.token = null
    this.refreshToken = null
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    if (!this.refreshToken) return false

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.refreshToken}`  // Send refresh token as Bearer token
        }
      })

      if (response.ok) {
        const data = await response.json()
        this.setTokens(data.access_token, data.refresh_token || this.refreshToken)
        return true
      } else {
        this.clearTokens()
        return false
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.clearTokens()
      return false
    }
  }

  // Authentication APIs
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    
    if (response.access_token) {
      this.setTokens(response.access_token, response.refresh_token)
    }
    
    return response
  }

  async login(email, password) {
    // Create form data as expected by OAuth2PasswordRequestForm
    const formData = new FormData()
    formData.append('username', email)  // OAuth2 expects 'username' field
    formData.append('password', password)
    
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: formData
    })
    
    if (response.access_token) {
      this.setTokens(response.access_token, response.refresh_token)
    }
    
    return response
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      this.clearTokens()
    }
  }

  // User APIs
  async getCurrentUser() {
    return await this.request('/users/me')
  }

  async updateProfile(userData) {
    return await this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  // Employment APIs
  async getEmployments() {
    return await this.request('/employments/')
  }

  async createEmployment(employmentData) {
    return await this.request('/employments/', {
      method: 'POST',
      body: JSON.stringify(employmentData)
    })
  }

  async updateEmployment(employmentId, employmentData) {
    return await this.request(`/employments/${employmentId}`, {
      method: 'PUT',
      body: JSON.stringify(employmentData)
    })
  }

  async deleteEmployment(employmentId) {
    return await this.request(`/employments/${employmentId}`, {
      method: 'DELETE'
    })
  }

  async setCurrentEmployment(employmentId) {
    return await this.request(`/employments/${employmentId}/set-current`, {
      method: 'PUT'
    })
  }

  // Verification Code APIs
  async getVerificationCodes() {
    return await this.request('/verification-codes/')
  }

  async createVerificationCode(codeData) {
    return await this.request('/verification-codes/', {
      method: 'POST',
      body: JSON.stringify(codeData)
    })
  }

  async verifyCode(code) {
    return await this.request('/verification-codes/verify', {
      method: 'POST',
      body: JSON.stringify({ code })
    })
  }

  async revokeVerificationCode(codeId) {
    return await this.request(`/verification-codes/${codeId}/revoke`, {
      method: 'POST'
    })
  }

  // Access Log APIs
  async getAccessLogs() {
    return await this.request('/access-logs/')
  }

  // Admin APIs (for employers)
  async searchUsers(query) {
    return await this.request(`/admin/users/search?q=${encodeURIComponent(query)}`)
  }

  async getAllAccessLogs() {
    return await this.request('/access-logs/')
  }

  // Health check
  async healthCheck() {
    return await fetch(`${this.baseURL.replace('/api/v1', '')}/health`)
      .then(response => response.json())
  }

  // Employer-specific APIs
  async getEmployerVerificationRequests() {
    return await this.request('/employer/verification-requests')
  }

  async sendVerificationRequest(requestData) {
    return await this.request('/employer/verification-requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    })
  }

  async updateVerificationRequest(requestId, updateData) {
    return await this.request(`/employer/verification-requests/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    })
  }

  async getEmployees() {
    return await this.request('/employer/employees')
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService

// Named exports for specific functionalities
export const auth = {
  register: (userData) => apiService.register(userData),
  login: (email, password) => apiService.login(email, password),
  logout: () => apiService.logout(),
  getCurrentUser: () => apiService.getCurrentUser(),
}

export const employment = {
  getAll: () => apiService.getEmployments(),
  create: (data) => apiService.createEmployment(data),
  update: (id, data) => apiService.updateEmployment(id, data),
  delete: (id) => apiService.deleteEmployment(id),
  setCurrentEmployment: (id) => apiService.setCurrentEmployment(id),
}

export const verification = {
  getCodes: () => apiService.getVerificationCodes(),
  createCode: (data) => apiService.createVerificationCode(data),
  verifyCode: (code) => apiService.verifyCode(code),
  verify: (code) => apiService.verifyCode(code), // Alias for easier use
  revokeCode: (id) => apiService.revokeVerificationCode(id),
  getAccessLogs: () => apiService.getAccessLogs(),
}

export const admin = {
  searchUsers: (query) => apiService.searchUsers(query),
  getAllAccessLogs: () => apiService.getAllAccessLogs(),
  getAccessLogs: () => apiService.getAccessLogs(),
}

export const employer = {
  getVerificationRequests: () => apiService.getEmployerVerificationRequests(),
  sendVerificationRequest: (data) => apiService.sendVerificationRequest(data),
  updateVerificationRequest: (id, data) => apiService.updateVerificationRequest(id, data),
  getEmployees: () => apiService.getEmployees(),
}

// Combined API object for easier importing
export const api = {
  auth,
  employment,
  verification,
  admin,
  employer,
}
