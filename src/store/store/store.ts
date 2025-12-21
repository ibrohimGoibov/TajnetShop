import axios from 'axios';
import { create } from 'zustand'
import { message } from "antd";
interface LoginData {
  userName: string;
  password: string;
}

interface RegisterStore {
  loading: boolean;
  error: string | null;
  postRegister: (data: RegisterData) => Promise<void>;
  postAccaountLogin: (data: LoginData) => Promise<void>;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  loading: false,
  error: null,
  postRegister: async (data) => {
    try {
      set({ loading: true, error: null });
      await axios.post(
        "http://37.27.29.18:8002/Account/register",
        data
      );

      set({ loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error:
          error?.response?.data?.message
      });
    }
  },
  postAccaountLogin: async (data) => {
  try {
    set({ loading: true, error: null });
    await axios.post(
      "http://37.27.29.18:8002/Account/login",
      data
    );
    set({ loading: false });
    message.success("Good");
  } catch (error: unknown) {
    const err = error as any;
    const errorMessage =
      err?.response?.data?.message || "Not Good";
    set({
      loading: false,
      error: errorMessage,
    });
    message.error(errorMessage);
    console.error(err);
  }
}
}));