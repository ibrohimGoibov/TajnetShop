import { useEffect, useState } from "react";
import { message } from "antd";
import img3 from "../../../assets/image copy 2.png";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { useBrandStore } from "../../../store/api/brandApi/brand";
import { useProductStore } from "../../../store/api/productApi/products";
import { useCategoryStore } from "../../../store/api/categoryApi/category";
import axios from "axios";

interface ProductType {
  id: number;
  productName: string;
  image: string;
  price: number;
}

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
}

const API_URL = "https://store-api.softclub.tj";

const Product = () => {
  const [range, setRange] = useState<[number, number]>([6990, 1989000]);
  const brands = useBrandStore((state) => state.brands);
  const getBrands = useBrandStore((state) => state.getBrands);
  const products = useProductStore((state) => state.products);
  const getProduct = useProductStore((state) => state.getProduct);
  const getCategories = useCategoryStore((state) => state.getCategories);
  const categories = useCategoryStore((state) => state.categories);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const toggleCategory = (id: number) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  const token = localStorage.getItem("token")

  const addToCart = async (product: ProductType) => {
    if (!token) {
      message.warning("Сначала войдите в аккаунт");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/Cart/add-product-to-cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCart((prev) => {
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });

      message.success("Very Good!");
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 400) {
        message.error(err.response.data?.message || "error");
      } else if (err.response?.status === 401) {
        message.error("bad");
      } else {
        message.error("good");
      }
    }
  };

  const handleClick = async (product: ProductType) => {
    try {
      await axios.post("http://localhost:3001/send-product", {
        name: product.productName,
        price: product.price,
      });
      message.success("Good!");
    } catch (err) {
      console.error(err);
      message.error("bad!");
    }
  };

  useEffect(() => {
    getBrands();
    getProduct();
    getCategories();
  }, [getBrands, getProduct, getCategories]);

  return (
    <div>
      <div className="p-[40px]">
        <p className="text-[14px]">Главная / Товары недели</p>
      </div>

      <div className="flex items-start gap-[40px] p-[30px]">
        <div className="num1 w-[300px]">
          <h2 className="text-[18px] mb-[10px]">Категории</h2>

          {brands.map((e) => (
            <p
              key={e.id}
              className="hover:bg-gray-300 px-[20px] py-[10px] rounded-[10px] text-[15px]"
            >
              {e.brandName}
            </p>
          ))}

          <div className="flex justify-between mt-[20px] mb-[10px] gap-[10px]">
            <input
              type="number"
              value={range[0]}
              onChange={(e) => setRange([Number(e.target.value), range[1]])}
              className="border p-1 w-[120px]"
            />
            <input
              type="number"
              value={range[1]}
              onChange={(e) => setRange([range[0], Number(e.target.value)])}
              className="border p-1 w-[120px]"
            />
          </div>

          {categories.map((cat) => (
            <div key={cat.id} className="mb-2">
              <h1
                onClick={() => toggleCategory(cat.id)}
                className="mt-[20px] cursor-pointer"
              >
                {cat.categoryName}
              </h1>
              {activeCategory === cat.id &&
                cat.subCategories.map((sub: any) => (
                  <div key={sub.id} className="ml-4 mt-[10px] cursor-pointer">
                    <h2>{sub.subCategoryName}</h2>
                  </div>
                ))}
            </div>
          ))}

          <Range
            min={0}
            max={2000000}
            step={1000}
            value={range}
            onChange={(value) => setRange(value as [number, number])}
          />
        </div>

        <div className="flex items-center justify-evenly flex-wrap gap-[20px]">
          {products.map((e) => (
            <div
              key={e.id}
              className="num1 rounded-[20px] mt-[30px] transition-all duration-300 hover:shadow-2xl hover:bg-gray-200"
            >
              <div className="relative group w-[250px] h-[300px] m-auto">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt=""
                  className="w-full h-full object-cover rounded-[15px]"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center 
                                bg-black/40 opacity-0 group-hover:opacity-100 
                                transition-all duration-300 rounded-[15px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="white"
                    viewBox="0 0 16 16"
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={() => addToCart(e)}
                  >
                    <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1"/>
                    <path d="M1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"/>
                  </svg>
                </div>
              </div>

              <div className="txt p-[20px]">
                <div className="flex items-center gap-[10px]">
                  <h1 className="text-violet-500 font-[600]">{e.price}</h1>
                  <img src={img3} width={25} alt="" />
                </div>
                <p>{e.productName}</p>
                <button
                  onClick={() => handleClick(e)}
                  className="mt-2 py-1 px-2 bg-violet-500 text-white rounded hover:bg-violet-400"
                >
                  Click to Telegram Bot
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed top-20 right-10 bg-white p-5 rounded-xl shadow-lg w-80">
          <h3 className="font-semibold text-lg mb-4">Корзина</h3>
          {cart.length === 0 && <p>Корзина пуста</p>}
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.productName} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
