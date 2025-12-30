import { useEffect, useState } from "react";
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
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

const Home = () => {
  const getCategories = useCategoryStore((s) => s.getCategories);
  const { products, getProduct } = useProductStore();
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

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


  const toggleFavorite = (id: number) => {
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      const arr = Array.from(newSet);
      if (arr.length) {
        localStorage.setItem("id", JSON.stringify(arr));
      } else {
        localStorage.removeItem("id");
      }

      return newSet;
    });
  };
  
  
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
        className="rounded-b-[40px] overflow-hidden">
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
        {products.map((p) => {
          const isLiked = likedIds.has(p.id);
        return (
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
                  13 4520
                </span>
                <img src={imgLike} width={22} />
                </div>
                <div onClick={() => toggleFavorite(p.id)} className="cursor-pointer">
                                      {isLiked ? (
                                        <IoMdHeart className="text-red-500 text-xl" />
                                      ) : (
                                        <IoIosHeartEmpty className="text-gray-400 text-xl hover:text-red-300 transition" />
                                      )}
                                    </div>
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
);
})}
      </div>
    </div>
  );
};

export default Home;
