import { create } from 'zustand'
import axios from 'axios';

interface Brand {
  id: number;
  brandName: string;
}
const URL = import.meta.env.API_URL;

interface BrandStore {
  brands: Brand[];
  getBrands: () => Promise<void>;
}

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  getBrands: async () => {
    try {
      let res = await axios.get(`${URL}/Brand/get-brands`);
      const brandsArray = Array.isArray(res.data) ? res.data : res.data?.data || [];
      set({ brands: brandsArray });
    } catch (error) {
      console.error(error);
    }
  }
}));