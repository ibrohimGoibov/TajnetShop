import img10 from '../../../assets/image copy 6.png'
import img11 from '../../../assets/image copy 7.png'
import img12 from '../../../assets/image copy 8.png'
import img13 from '../../../assets/image copy 9.png'
import img14 from '../../../assets/image copy 10.png'
import img15 from '../../../assets/image copy 11.png'
import img16 from '../../../assets/image copy 12.png'
import img17 from '../../../assets/image copy 13.png'
import img18 from '../../../assets/image copy 14.png'
import { Link } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const About = () => {
  useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);
  return (
    <div>
      <div className="p-[30px]">
        <Link to={'/'}>
      <button className='px-[20px] py-[10px] rounded-[10px] bg-violet-500 text-white '>← Назад</button>
        </Link>
      </div>
      <div data-aos="flip-right">
      <img width={1220} className='m-auto' src={img10} alt="" />
      </div>
      <div className="flex items-center justify-evenly mt-[20px]">
        <div data-aos="fade-right">
        <img width={600} src={img11} alt="" />
        </div>
        <div data-aos="fade-left">
        <img width={600} src={img12} alt="" />
        </div>
      </div>
      <div className="flex items-center justify-evenly mt-[20px]">
        <div data-aos="fade-up-left">
        <img width={600} src={img13} alt="" />
        </div>
        <div data-aos="fade-down-right">
        <img width={600} src={img14} alt="" />
        </div>
      </div>
      <div className="flex items-center justify-evenly mt-[20px]">
        <div data-aos="zoom-in-left">
        <img width={600} src={img15} alt="" />
        </div>
        <div data-aos="zoom-in-right">
        <img width={600} src={img16} alt="" />
        </div>
      </div>
      <div className="flex items-center justify-evenly mt-[20px]">
        <div data-aos="fade-up" data-aos-duration="3000">
        <img width={600} src={img17} alt="" />
</div>
<div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
        <img width={600} src={img18} alt="" />
</div>
      </div>
    </div>
  )
}

export default About