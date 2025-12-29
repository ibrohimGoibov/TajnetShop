import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import '../../../App.css'
import "aos/dist/aos.css"
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

import imgLike from "../../../assets/image copy 2.png";
import banner1 from "../../../assets/image copy 20.png";
import banner2 from "../../../assets/image copy 21.png";
import banner3 from "../../../assets/image copy 22.png";

import { useCategoryStore } from "../../../store/api/categoryApi/category";
import { useProductStore } from "../../../store/api/productApi/products";
import axios from "axios";

const Home = () => {
  const getCategories = useCategoryStore((s) => s.getCategories);
  const { products, getProduct } = useProductStore();

  const banners = [banner1, banner2, banner3];

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
    getCategories();
    getProduct();
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="min-h-screen w-[94%] m-auto mt-[30px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        className="rounded-b-[40px] overflow-hidden"
      >
        {banners.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              className="w-full h-[420px] object-cover"
              alt="banner"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className="text-[42px] font-bold px-[40px] mt-[60px]">
        🔥 Популярное
      </h1>

      <div
        data-aos="fade-up"
        className="p-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-[24px] overflow-hidden shadow-md
                       hover:shadow-2xl transition-all duration-300
                       hover:-translate-y-2"
          >
            <div className="relative group h-[280px]">
              <img
                src={`https://store-api.softclub.tj/images/${p.image}`}
                className="w-full h-full object-cover"
                alt={p.productName}
              />

              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition"
              >
                <div onClick={() => addToCart(p.id)} className="bg-white p-[14px] rounded-full hover:scale-110 transition cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket2" viewBox="0 0 16 16">
  <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z"/>
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z"/>
</svg>
                </div>
              </div>
            </div>

            <div className="p-[20px] space-y-[8px]">
                <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <span className="text-violet-600 font-bold text-[18px]">
                  1 345 200
                </span>
                <img src={imgLike} width={22} />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg>
              </div>

              <p className="text-gray-400 line-through">1 846 000</p>

              <span className="inline-block bg-amber-300 text-[12px] px-[8px] py-[3px] rounded-full">
                59 925 сум/мес
              </span>

              <p className="font-medium line-clamp-2">
                {p.productName}
              </p>

              <p className="text-sm text-gray-500">
                ⭐ 4.8 (226 отзывов)
              </p>

              <Link to={`productById/${p.id}`}>
                <button
                  className="w-full mt-[10px] py-[10px]
                             bg-gradient-to-r from-violet-500 to-fuchsia-500
                             text-white rounded-[12px]
                             hover:opacity-90 transition"
                >
                  Купить
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
