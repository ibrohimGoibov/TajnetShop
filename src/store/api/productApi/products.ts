import axios from "axios";
import { create } from "zustand";

interface Product {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  productInMyCart: boolean;
  categoryId: number;
  categoryName: string;
  productInfoFromCart: null;
}

interface ProductStore {
  products: Product[];
  getProduct: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  getProduct: async () => {
    try {
      const res = await axios.get(
        "http://37.27.29.18:8002/Product/get-products"
      );
      set({
        products: res.data.data.products,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
