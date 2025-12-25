import { useEffect, useRef, useState } from 'react'
import img3 from '../../../assets/image copy 2.png'
import img4 from '../../../assets/trees.png'
import img5 from '../../../assets/756b6f56-9d2d-414c-a9d3-37d40d1c808b.png'
import img6 from '../../../assets/image copy 3.png'
import img7 from '../../../assets/image copy 4.png'
import img8 from '../../../assets/image copy 5.png'
import images1 from '../../../assets/image copy 20.png'
import images2 from '../../../assets/image copy 2.png'
import images3 from '../../../assets/image copy 21.png'
import images4 from '../../../assets/image copy 22.png'
import { Link } from 'react-router-dom'
import { useCategoryStore } from '../../../store/api/categoryApi/category' 
import { useProductStore } from '../../../store/api/productApi/products'

const Home = () => {
  const getCategories = useCategoryStore((state) => state.getCategories)
  const { products, getProduct } = useProductStore()

  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [images1, images2, images3, images4]

  useEffect(() => {
    getCategories()
    getProduct()
  }, [getCategories, getProduct])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
    }
  }, [currentIndex])

  return (
    <div className='max-w-[1200px] m-auto'>
      <div className="overflow-hidden w-full relative h-[400px] my-5">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
            />
          ))}
        </div>
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
          {products.map((e) => (
            <div key={e.id} className="num1 rounded-[20px] mt-[30px] transition-all duration-300 hover:shadow-2xl hover:bg-gray-200">
              <div className="relative group w-[250px] h-[300px] m-auto">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt=""
                  className="w-full h-full object-cover rounded-[15px]"
                />
                <div className="absolute inset-0 flex items-center justify-center 
                                bg-black/40 opacity-0 group-hover:opacity-100 
                                transition-all duration-300 rounded-[15px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="white"
                    viewBox="0 0 16 16"
                    className="cursor-pointer hover:scale-110 transition"
                  >
                    <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1"/>
                    <path d="M1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"/>
                  </svg>
                </div>
              </div>

              <div className="txt p-[20px]">
                <div className="flex items-center gap-[10px]">
                  <h1 className="text-violet-500 font-[600]">1 345 200</h1>
                  <img src={img3} width={25} alt="" />
                </div>
                <p>846 000</p>
                <button className="bg-amber-300 text-[12px] px-[5px] py-[2px] rounded-[5px]">
                  59 925 сум/мес
                </button>
                <p>{e.productName}</p>
                <p>🌟4.8 (226 отзывов)</p>
                <Link to={`productById/${e.id}`}>
                  <button className='py-[10px] w-[100%] bg-violet-500 rounded-[5px] text-white mt-[10px] hover:bg-violet-400'>Завтра</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
