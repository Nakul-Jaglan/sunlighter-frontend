"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiService, { auth } from '../services/api'
import { toast } from 'sonner'

const useAuthStore = create(persist((set, get) => ({
  user: null,
  userType: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  checkAuthStatus: async () => {
    try {
      set({ isLoading: true, error: null })
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
      if (!token) {
        set({ isLoading: false })
        return
      }
      const user = await auth.getCurrentUser()
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      console.error('Auth check failed:', error)
      set({ error: error.message, isLoading: false, isAuthenticated: false, user: null })
    }
  },

  login: async (email, password, userType) => {
    try {
        set({ isLoading: true, error: null })
        await auth.login(email, password, userType)
        const user = await auth.getCurrentUser(userType)
        set({ user, isAuthenticated: true, isLoading: false, userType })
        toast.success("Logged in Successfully")
        return { success: true, user }
    } catch (error) {
        console.error('Login failed:', error)
        const errorMessage = error?.message || 'Login failed. Please check your credentials.'
        set({ error: errorMessage, isLoading: false })
        toast.error(errorMessage)
        return { success: false, error: errorMessage }
    }
  },


  register: async (userData, userType) => {
    try {
      set({ isLoading: true, error: null })
      await auth.register(userData, userType)
      const user = await auth.getCurrentUser(userType)
      set({ user, isAuthenticated: true, isLoading: false })
      return { success: true, user }
    } catch (error) {
      console.error('Registration failed:', error)
      const errorMessage = error?.message || (typeof error === 'string' ? error : 'Registration failed. Please try again.')
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  logout: async () => {
    try {
      await auth.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
        set({ user: null, isAuthenticated: false, isLoading: false, error: null })
    }
  },

  updateProfile: async (userData) => {
    try {
      set({ isLoading: true, error: null })
      const updatedUser = await auth.updateProfile(userData)
      set({ user: updatedUser, isLoading: false })
      return true
    } catch (error) {
      console.error('Profile update failed:', error)
      const errorMessage = error?.message || (typeof error === 'string' ? error : 'Profile update failed. Please try again.')
      set({ error: errorMessage, isLoading: false })
      return false
    }
  },

  clearError: () => set({ error: null }),

  setUserType: (userType) => set({ userType })
})))

export default useAuthStore
