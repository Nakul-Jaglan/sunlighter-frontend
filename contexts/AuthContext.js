"use client"

import { createContext, useContext, useReducer, useEffect } from 'react'
import apiService, { auth } from '../services/api'

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null
      }
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null
      }
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      
      // Check if we have tokens
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
      
      if (!token) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        return
      }

      // Verify token and get user data
      const user = await auth.getCurrentUser()
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user })
    } catch (error) {
      console.error('Auth check failed:', error)
      // Clear invalid tokens
      apiService.clearTokens()
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message })
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
    }
  }

  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
      
      const response = await auth.login(email, password)
      
      // Get user data after successful login
      const user = await auth.getCurrentUser()
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user })
      
      return { success: true, user }
    } catch (error) {
      console.error('Login failed:', error)
      
      // Extract readable error message  
      let errorMessage = 'Login failed. Please check your credentials.'
      
      if (error.message) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage })
      return { success: false, error: errorMessage }
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
    }
  }

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
      
      const response = await auth.register(userData)
      
      // Get user data after successful registration
      const user = await auth.getCurrentUser()
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user })
      
      return { success: true, user }
    } catch (error) {
      console.error('Registration failed:', error)
      
      // Extract readable error message
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error.message) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage })
      throw new Error(errorMessage)  // Throw so the component can catch it
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
    }
  }

  const logout = async () => {
    try {
      await auth.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT })
    }
  }

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  }

  const updateProfile = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
      
      const updatedUser = await auth.updateProfile(userData)
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser })
      
      return true
    } catch (error) {
      console.error('Profile update failed:', error)
      
      let errorMessage = 'Profile update failed. Please try again.'
      if (error.message) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage })
      return false
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
    }
  }

  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    login,
    register,
    logout,
    clearError,
    checkAuthStatus,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
