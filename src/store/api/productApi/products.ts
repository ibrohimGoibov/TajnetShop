import axios from "axios";
import { create } from "zustand";

interface Product {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: number;
  images: [
  {
    "id": 344,
    "images": "262a328b-a691-409b-b381-7d7d26f3a08d.webp"
  }
];
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

const URL = import.meta.env.VITE_API_URL;

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  getProduct: async () => {
    try {
      const res = await axios.get(
        `${URL}/Product/get-products`
      );
      set({
        products: res.data.data.products,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
