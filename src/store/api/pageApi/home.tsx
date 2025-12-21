import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import img1 from '../../../assets/image copy.png'
import img2 from '../../../assets/d44358tsp2tj49o8b2ng.jpg'
import img3 from '../../../assets/image copy 2.png'
import img4 from '../../../assets/trees.png'
import img5 from '../../../assets/756b6f56-9d2d-414c-a9d3-37d40d1c808b.png'
import img6 from '../../../assets/image copy 3.png'
import img7 from '../../../assets/image copy 4.png'
import img8 from '../../../assets/image copy 5.png'
import { Link } from 'react-router-dom'
import { useCategoryStore } from '../categoryApi/category' 
const Home = () => {
  const categories = useCategoryStore((state) => state.categories);
  const getCategories = useCategoryStore((state) => state.getCategories)
  useEffect(() => {
    getCategories()
  }, [getCategories])
  return (
    <div>
      <div className="w-[1200px] m-auto my-5">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
       <SwiperSlide>
            <img src={img1} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div className="flex items-center justify-evenly">
      <button className='flex items-center gap-[10px] px-[20px] py-[10px] bg-gray-300 w-[200px] h-[60px] justify-center rounded-[10px]'><img src={img8} width={25} alt="" />Мужская одежда</button>
      <button className='flex items-center gap-[10px] px-[20px] py-[10px] bg-gray-300 w-[200px] h-[60px] justify-center rounded-[10px]'><img src={img5} width={25} alt="" />Детский мир</button>
      <button className='flex items-center gap-[10px] px-[20px] py-[10px] bg-gray-300 w-[200px] h-[60px] justify-center rounded-[10px]'><img src={img6} width={25} alt="" />Гарантия низких цен</button>
      <button className='flex items-center gap-[10px] px-[20px] py-[10px] bg-gray-300 w-[200px] h-[60px] justify-center rounded-[10px]'><img src={img7} width={25} alt="" />Модный базар</button>
      <button className='flex items-center gap-[10px] px-[20px] py-[10px] bg-gray-300 w-[200px] h-[60px] justify-center rounded-[10px]'><img src={img4} width={25} alt="" />Новый год</button>
    </div>
    <h1 className='p-[40px] text-[40px]'>Популярное</h1>
    <div className="p-[40px]">
      <div className='flex items-center justify-evenly flex-wrap'>
      {categories.map((e) => {
        return (
      <div className="num1 rounded-[20px] mt-[30px] transition-all duration-300 hover:shadow-2xl hover:bg-gray-200">
        <img src={`http://37.27.29.18:8002/images/${e.categoryImage}`} alt="" width={250} className='w-[250px] h-[300px] m-auto' />
        <div className="txt p-[20px]">
          <div className="flex items-center gap-[10px]">
          <h1 className='text-violet-500 font-[600]'>1 345 200</h1>
          <img src={img3} width={25} alt="" />
          </div>
          <p>846 000</p>
          <button className='bg-amber-300 text-[12px] px-[5px] py-[2px] rounded-[5px]'>59 925 сум/мес</button>
          <p>{e.categoryName}</p>
          <p>🌟4.8 (226 отзывов)</p>
          <Link to={`/categoriesById/${e.id}`}>
          <button className='flex justify-center px-[20px] py-[10px] w-[100%] transition-all duration-300 bg-violet-500 hover:bg-white hover:border-violet-500 hover:text-violet-500 text-white mt-[10px] rounded-[10px] items-center gap-[10px]'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"/>
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg>Завтра</button>
          </Link>
        </div>
      </div>
        )
      })}
      </div>
    </div>
    </div>
  )
}

export default Home