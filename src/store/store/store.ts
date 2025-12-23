import axios from 'axios'
import { create } from 'zustand'
import { message } from 'antd'

interface LoginData {
  userName: string
  password: string
}

interface RegisterData {
  userName: string
  password: string
  confirmPassword: string
}

interface RegisterStore {
  loading: boolean
  error: string | null
  postRegister: (data: RegisterData) => Promise<void>
  postAccountLogin: (data: LoginData) => Promise<void>
}

const apiUrl = import.meta.env.VITE_API_URL

export const useRegisterStore = create<RegisterStore>((set) => ({
  loading: false,
  error: null,

  postRegister: async (data) => {
    try {
      set({ loading: true, error: null })

      await axios.post(`${apiUrl}/Account/register`, data)

      message.success('Registered successfully')
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Register error'

      set({ error: errorMessage })
      message.error(errorMessage)
    } finally {
      set({ loading: false })
    }
  },

  postAccountLogin: async (data) => {
    try {
      set({ loading: true, error: null })

      await axios.post(`${apiUrl}/Account/login`, data)

      message.success('Successful')
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Login error'

      set({ error: errorMessage })
      message.error(errorMessage)
    } finally {
      set({ loading: false })
    }
  },
}))
