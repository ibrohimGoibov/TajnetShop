import { useEffect, useState } from "react";
import img3 from "../../../assets/image copy 2.png";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import { useBrandStore } from "../../../store/api/brandApi/brand";
import { useProductStore } from "../../../store/api/productApi/products";
import { useCategoryStore } from "../../../store/api/categoryApi/category";
import axios from "axios";
import { message } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProductType {
  id: number;
  productName: string;
  image: string;
  price: number;
}

const API_URL = "https://store-api.softclub.tj";

const Product = () => {
  const [range, setRange] = useState<[number, number]>([6990, 1989000]);
  const [addingId, setAddingId] = useState<number | null>(null)

  const brands = useBrandStore((state) => state.brands);
  const getBrands = useBrandStore((state) => state.getBrands);
  const products = useProductStore((state) => state.products);
  const getProduct = useProductStore((state) => state.getProduct);
  const getCategories = useCategoryStore((state) => state.getCategories);
  const categories = useCategoryStore((state) => state.categories);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const toggleCategory = (id: number) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  const handleClick = async (product: ProductType) => {
    try {
      await axios.post("http://localhost:3001/send-product", {
        name: product.productName,
        image: product.image,
        price: product.price,
        id: product.id
      });
      alert("Сообщение отправлено в Telegram!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке сообщения");
    }
  };

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Пожалуйста, войдите в аккаунт");
      return;
    }

    setAddingId(productId);

    try {
      await axios.post(
        `${API_URL}/Cart/add-product-to-cart?id=${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Товар добавлен в корзину!");
    } catch (err: any) {
      console.error(err);
      message.error("Не удалось добавить товар в корзину");
    } finally {
      setAddingId(null);
    }
  };

  useEffect(() => {
    getBrands();
    getProduct();
    getCategories();
    AOS.init({ duration: 1000 });
  }, [getBrands, getProduct, getCategories]);

  return (
    <div>
      <div className="p-[40px]">
        <p className="text-[14px]">Главная / Товары недели</p>
      </div>

      <div className="flex items-start gap-[40px] p-[30px]">
        <div className="num1 w-[300px]">
          <h2 className="text-[18px] mb-[10px]">Категории</h2>
          <div className="bg-violet-400">
          {brands.map((e) => (
            <p
            key={e.id}
            className="hover:bg-violet-400 px-[20px] py-[10px] rounded-[10px] text-[15px]"
            >
              {e.brandName}
            </p>
          ))}
          </div>

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
                cat.subCategories?.map((sub: any) => (
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

        
          <div data-aos="zoom-out-up" className="flex items-center justify-evenly flex-wrap gap-[20px]">

          {products.map((e) => (
            <div
            key={e.id}
            className="num1 rounded-[20px] mt-[30px] transition-all duration-300 hover:shadow-2xl hover:bg-gray-200"
            >
              <div className="relative group w-[250px] h-[300px] m-auto">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.productName}
                  className="w-full h-full object-cover rounded-[15px]"
                  />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[15px]">
                  {addingId === e.id ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="white"
                    viewBox="0 0 16 16"
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={() => handleAddToCart(e.id)}
                    >
                      <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5" />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1" />
                      <path d="M1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="txt p-[20px]">
                <div className="flex items-center gap-[10px]">
                  <h1 className="text-violet-500 font-[600]">{e.price}</h1>
                  <img src={img3} width={25} alt="" />
                </div>
                <p>846 000</p>
                <button className="bg-amber-300 text-[12px] px-[5px] py-[2px] rounded-[5px]">
                  59 925 сум/мес
                </button>
                <p>{e.productName}</p>
                <p>🌟4.8 (226 отзывов)</p>

                <button
                  onClick={() => handleClick(e)}
                  className="mt-2 py-1 px-2 bg-violet-500 text-white rounded hover:bg-violet-400"
                  >
                  Click to Telegram Bot
                </button>

                <Link to={`/productById/${e.id}`}>
                  <button className="py-[10px] w-[100%] bg-violet-500 rounded-[5px] text-white mt-[10px] hover:bg-violet-400">
                    Завтра
                  </button>
                </Link>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
  );
};

export default Product;