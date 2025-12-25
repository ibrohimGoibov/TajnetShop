import { create } from "zustand";
import axios from "axios";

const URL = import.meta.env.API_URL;

type CartItem = {
  id: number;
  title: string;
  seller: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
};

interface CartStore {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addToCart: (id: number) => Promise<void>;
  getCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),
  getCart: async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${URL}/Cart/get-products-from-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ cart: data.data });
    } catch (error) {
      console.error("Ошибка при получении корзины:", error);
    }
  },

  addToCart: async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${URL}/Cart/add-product-to-cart?id=${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await get().getCart();
    } catch (error) {
      console.error(error);
    }
  },
}));
