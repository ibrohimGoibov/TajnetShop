import axios from 'axios'
import { create } from 'zustand'

interface ProductImage {
  id: number
  images: string
}

export interface Product {
  id: number
  productName: string
  image: string
  color: string
  price: number
  images: ProductImage[]
  hasDiscount: boolean
  discountPrice: number
  quantity: number
  productInMyCart: boolean
  categoryId: number
  categoryName: string
  productInfoFromCart: null
}

interface ProductStore {
  products: Product[]
  getProduct: () => Promise<void>
}

const apiUrl = import.meta.env.VITE_API_URL

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  getProduct: async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/Product/get-products`
      )
      set({ products: res.data.data.products })
    } catch (error) {
      console.error('getProduct error:', error)
    }
  },
}))
