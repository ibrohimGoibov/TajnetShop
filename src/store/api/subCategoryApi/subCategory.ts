import axios from "axios";
import { create } from "zustand";

const URL = import.meta.env.VITE_API_URL;

export interface SubCategory {
  id: number;
  subCategoryName: string;
}

interface ProductStore {
  data: SubCategory[];
  loading: boolean;

  getSubCategoriesByCategoryId: (categoryId: number) => Promise<void>;
  clearSubCategories: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  data: [],
  loading: false,

  getSubCategoriesByCategoryId: async (categoryId) => {
    set({ loading: true });

    try {
      const res = await axios.get(
        `${URL}/SubCategory/get-sub-category-by-id?id=${categoryId}`
      );

      set({ data: res.data.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  clearSubCategories: () => set({ data: [] }),
}));
