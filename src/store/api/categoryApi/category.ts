import { create } from 'zustand';
import axios from 'axios';

interface SubCategory {
  id: number;
  subCategoryName: string;
}

interface Category {
  id: number;
  categoryImage: string;
  subCategories: SubCategory[];
  categoryName: string;
}

interface CategoryStore {
  categories: Category[];
  getCategories: () => Promise<void>;
  getCategoryById: (id: number) => Promise<void>;
}

const URL = import.meta.env.VITE_API_URL;

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],

  getCategories: async () => {
    try {
      const res = await axios.get(`${URL}/Category/get-categories`);
      const categoriesArray: Category[] = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      set({ categories: categoriesArray });
    } catch (error) {
      console.error(error);
      set({ categories: [] });
    }
  },

  getCategoryById: async (id: number) => {
    try {
      const res = await axios.get(`${URL}/Category/get-category-by-id?id=${id}`);
      const categoryData: Category | null = res.data?.data || res.data || null;
      set({ categories: categoryData ? [categoryData] : [] });
    } catch (error) {
      console.error(error);
      set({ categories: [] });
    }
  },
}));
