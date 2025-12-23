import React, { useEffect, useState } from 'react'
import phone1 from '../../../assets/image copy 15.png'
import iphone from '../../../assets/image copy 16.png'
import { Tabs } from 'antd';
import { Rate } from "antd";
import copy from '../../../assets/image copy 17.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const onChange = (key: string) => {
  console.log(key);
};
const CategoriesById = () => {
    const  [data, setData] = useState({});
    const {id} = useParams();
    async function getById() {
        try {
            let {data} = await axios.get(`http://37.27.29.18:8002/Category/get-category-by-id?id=${id}`)
            setData(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getById()
    }, [id])
    
  return (
    <div className='p-[40px]'>
        <p>Главная / Все категории / Наборы посуды для приготовления</p>
        <h1 className='text-[30px] font-[400] w-[700px]'>Смартфон {data.categoryName} 128/256 ГБ, 1-SIM/Dual-SIM, чехол в подарок</h1>
        <div className="flex items-start justify-between w-[90%] mt-[30px]">
            <div className="num1 flex items-start gap-[20px]">
                <div className="num">
                    <img src={`https://store-api.softclub.tj/images/${data.categoryImage}`}  className='rounded-[10px] bg-gray-400 ' width={250} alt="" />
                </div>
                <div className="num1">
                    <img src={`https://store-api.softclub.tj/images/${data.categoryImage}`} width={450} className='rounded-[20px]' alt="" />
                <h1 className='text-[25px] font-[600] mt-[10px]'>4.8 <Rate disabled defaultValue={4.8} allowHalf /></h1>
                <img src={copy} alt="" />
                </div>

            </div>
            <div className="num2">
            <p>Цвет: Белый</p>
            <img src={iphone} className='w-[250px]' alt="" />
            <p className='mt-[20px]'>Модель: {data.categoryName}</p>
            <div className="flex items-center gap-[10px] mt-[10px]">
                <button className='border px-[20px] py-[10px] rounded-[20px]'>16 Pro 128 GB</button>
                <button className='border px-[20px] py-[10px] rounded-[20px]'>16 Pro 256 GB</button>
            </div>
            <div className="flex items-center gap-[10px] mt-[10px]">
                <button className='border px-[20px] py-[10px] rounded-[20px]'>16 Pro Max 256 GB</button>
                <button className='border px-[20px] py-[10px] rounded-[20px]'>16 Pro Max 512 GB</button>
            </div>
            <div className="mt-[10px] border-gray-400 border rounded-[20px] p-[15px]">
                <button className='bg-violet-400 px-[20px] py-[10px] w-[320px] text-white flex items-center justify-start rounded-[10px]'>Лавина выгоды</button>
                <h1 className='text-[30px] p-[10px] font-[600] text-violet-500'>13 859 010 сум</h1>
                <p className='ml-[10px] mt-[-10px]'>Без карты Uzum 13 999 000 сум</p>
                <s className='text-gray-400 ml-[10px]'>21 000 000</s>
                    <Tabs
    style={{marginTop: '10px'}}
    onChange={onChange}
    type="card"
    items={Array.from({ length: 3 }).map((_, i) => {
      const id = String(i + 1);
      return {
        label: id === "1"
  ? "24 мес"
  : id === "2"
    ? "12 мес"
    : "6 мес",
        key: id,
        children: id == "1" ? '991 595 сум' : id == "2" ? '1 633 216 сум' : "2 939 790 сум",
      };
    })}
  />
  <div className="flex items-center justify-evenly">
        <button className='bg-gray-300 px-[20px] py-[10px] w-[250px] rounded-[10px] hover:bg-gray-400 mt-[10px]'>Купить в 1 клик</button>
        <button className='bg-gray-300 p-[12px] rounded-[10px] hover:bg-gray-400 mt-[10px]'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg></button>
  </div>
  <button className='text-[16px] bg-violet-500 w-[90%] m-auto mt-[10px] rounded-[10px] ml-[15px] py-[5px] text-[white]'>Добавить в корзину <br />
        <span className='text-[12px] mt-[-5px]'>Доставим 26 декабря</span></button>
            <div className="flex items-center gap-[10px] p-[10px] ml-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>
            <p> Можно купить 5 шт</p>
            </div>
            <div className="flex items-center gap-[10px] p-[10px] mt-[-10px] ml-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg>
            <p>10 человек купили на этой неделе</p>
            </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default CategoriesById