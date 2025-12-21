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
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  data: {},
  getCategories: async () => {
    try {
      const res = await axios.get('http://37.27.29.18:8002/Category/get-categories');
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
  getCategoriesById: async (set, get, id) => {
    try {
        let res = await axios.get(`http://37.27.29.18:8002/Category/get-category-by-id?id=${id}`)
        const categoryData = res.data?.data || res.data || null;
        set({ categories: categoryData ? [categoryData] : [] });
    } catch (error) {
        console.error(error);
    }
  }
}));

