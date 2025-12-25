import { create } from "zustand";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

interface ApiStore {
  token: string | null;
  setToken: (token: string) => void;

  get: <T = any>(endpoint: string) => Promise<T>;
  post: <T = any>(endpoint: string, data?: any) => Promise<T>;
  put: <T = any>(endpoint: string, data?: any) => Promise<T>;
  delete: <T = any>(endpoint: string) => Promise<T>;
}

export const useApiStore = create<ApiStore>((set, get) => ({
  token: localStorage.getItem("token"),

  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  get: async (endpoint) => {
    try {
      const res = await axios.get(`${URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${get().token || ""}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const res = await axios.post(`${URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${get().token || ""}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const res = await axios.put(`${URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${get().token || ""}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const res = await axios.delete(`${URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${get().token || ""}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
