import { useEffect, useState } from "react";
import img3 from "../../../assets/image copy 2.png";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import { useBrandStore } from "../../../store/api/brandApi/brand";
import { useProductStore } from "../../../store/api/productApi/products";
import { useCategoryStore } from "../../../store/api/categoryApi/category";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
interface ProductType {
  id: number;
  productName: string;
  image: string;
  price: number;
}

const API_URL = "https://store-api.softclub.tj";

const Product = () => {
  const [range, setRange] = useState<[number, number]>([6990, 1989000]);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  
  
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
const addToCart = async (id: any) => {
    try {
      await axios.post(
        `https://store-api.softclub.tj/Cart/add-product-to-cart?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        }
      );
    } catch {
    console.error("Чтото пошло не так.");
    }
  }

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
        <div className="num1 w-[500px] bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Категории</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Бренды</h3>
            <div className="space-y-3">
              {brands.map((e) => (
                <div
                  key={e.id}
                  className="group flex items-center justify-between px-5 py-3.5 rounded-xl hover:bg-violet-50 transition-all duration-200 cursor-pointer"
                >
                  <p className="text-base text-gray-800 font-medium group-hover:text-violet-700 transition-colors">
                    {e.brandName}
                  </p>

                  <div className="w-3 h-11 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-0 bg-violet-600 rounded-full group-hover:h-8 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Цена</h3>
            <div className="flex justify-between gap-3 mb-5">
              <input
                type="number"
                value={range[0]}
                onChange={(e) => setRange([Number(e.target.value), range[1]])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none transition-all"
                placeholder="От"
              />
              <input
                type="number"
                value={range[1]}
                onChange={(e) => setRange([range[0], Number(e.target.value)])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none transition-all"
                placeholder="До"
              />
            </div>

            <Range
              min={0}
              max={2000000}
              step={1000}
              value={range}
              onChange={(value) => setRange(value as [number, number])}
              railStyle={{ backgroundColor: "#e5e7eb" }}
              trackStyle={[{ backgroundColor: "#8b5cf6" }]}
              handleStyle={[
                { borderColor: "#8b5cf6", backgroundColor: "#ffffff", boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.2)" },
                { borderColor: "#8b5cf6", backgroundColor: "#ffffff", boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.2)" },
              ]}
            />
            <div className="text-center mt-2 text-sm text-gray-600">
              {range[0].toLocaleString()} — {range[1].toLocaleString()} сум
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Категории</h3>
            {categories.map((cat) => (
              <div key={cat.id} className="mb-3">
                <h1
                  onClick={() => toggleCategory(cat.id)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-violet-50 transition-all group"
                >
                  <span className="text-base font-medium text-gray-800 group-hover:text-violet-700">
                    {cat.categoryName}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      activeCategory === cat.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </h1>

                {activeCategory === cat.id && cat.subCategories && (
                  <div className="ml-6 mt-3 space-y-2">
                    {cat.subCategories.map((sub: any) => (
                      <div
                        key={sub.id}
                        className="px-4 py-2 rounded-lg hover:bg-violet-50 cursor-pointer transition-all"
                      >
                        <h2 className="text-base text-gray-700 hover:text-violet-600">
                          {sub.subCategoryName}
                        </h2>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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

                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[15px] cursor-pointer"
                >
                  {addingId === e.id ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <div 
                    onClick={() => addToCart(e.id)} className="w-[50px] h-[50px] bg-white rounded-[50%] flex items-center justify-center hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-basket2" viewBox="0 0 16 16">
                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z"/>
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z"/>
                      </svg>
                    </div>
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
                  className="mt-2 py-1 px-2 bg-violet-500 text-white rounded hover:bg-violet-400"
                >
                  Click to Telegram Bot
                </button>

                <Link to={`/productById/${e.id}`}>
                  <button className="py-[10px] w-[100%] bg-violet-500 rounded-[5px] text-white mt-[10px] hover:bg-violet-400">
                    Купить
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