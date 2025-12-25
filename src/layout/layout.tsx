import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import video from '../assets/telegram-cloud-photo-size-2-5354970937419305039-y.jpg'
import { Button, Drawer } from 'antd';
import { useCategoryStore } from '../store/api/categoryApi/category'

const Layout = () => {
  const [open, setOpen] = useState(false);
  const categories = useCategoryStore((state) => state.categories);
  const getCategories = useCategoryStore((state) => state.getCategories)
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  let user = null;
try {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  console.error(error);
  localStorage.removeItem('user');
}

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryClick = (categoryId: number, subCategoryId?: number) => {
    if (subCategoryId) {
      navigate(`/product?subCategory=${subCategoryId}`);
    } else {
      navigate(`/product?category=${categoryId}`);
    }
  };

  return (
    <div className='max-w-[1240px] m-auto'>
      <div className="bg-gray-200">
        <header className='flex items-center justify-between w-[1200px] m-auto p-[5px]'>
          <div className="flex items-center gap-[20px]">
            <select>
              <option value="">Ташкент</option>
            </select>
            <h2>Пункты выдачи</h2>
          </div>
          <div className="num2 flex items-center gap-[20px]">
            <h3 className='text-violet-500'>Стать продавцом</h3>
            <h3 className='text-violet-500'>Открыть пункт выдачи</h3>
            <h3>Вопрос-ответ</h3>
            <h3>Мои заказы</h3>
            <h2>Russion</h2>
          </div>
        </header>
      </div>

      <ul className='flex items-center justify-evenly w-[1200px] gap-[30px] p-[10px]'>
        <Link to={'/'}>
        <img src={video} className='w-[190px]' alt="Logo" />
        </Link>
        <button 
          onClick={() => setOpen(true)}
          className='px-[20px] py-[10px] bg-violet-200 text-violet-400 rounded-[5px]'
        >
          Katalog
        </button>

        <div className="flex items-center justify-between gap-[10px] w-[500px] h-[40px] border border-gray-300 rounded-[5px] px-[30px] py-[10px]">
          <input type="text" placeholder='Искать в подборке' style={{outline: 'none'}} />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>

        <div className="num1 flex items-center m-auto gap-[20px]">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/product'}>Product</Link></li>
          <Button type="primary" onClick={() => setOpen(true)}>Categories</Button>
        </div>

        <div className="num2 flex items-center gap-[20px]">
          <li className="relative group flex items-center gap-[10px] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0a2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1s1-4 6-4s6 3 6 4" />
            </svg>
            {!token && (
              <>
                <Link to="/logIn">Вход</Link>
                <Link to="/register">Регистрация</Link>
              </>
            )}
            {token && (
              <div className="absolute top-[30px] right-0 bg-white shadow-lg rounded-[10px] p-[10px] w-[200px] opacity-0 group-hover:opacity-100 transition-all">
                <p className="font-[600]">{user?.userName || user?.name || 'Пользователь'}</p>
                <p className="text-gray-500 text-[14px]">{user?.email || ''}</p>
                <button
                  className="mt-[10px] text-red-500 text-[14px]"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
                >
                  Выйти
                </button>
              </div>
            )}
          </li>
          <Link to={'/cart'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
          </Link>
        </div>
      </ul>

      <div>
        <Outlet />
      </div>

      <Drawer
        title="Меню"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        width={300}
      >
        {categories.map((category) => (
          <div key={category.id} className="mb-[5px]">
            <div
              className='flex items-end gap-[5px] hover:bg-gray-300 p-[10px] rounded-[5px] cursor-pointer'
              onClick={() => setExpandedCategory(prev => prev === category.id ? null : category.id)}
            >
              <img 
                src={`https://store-api.softclub.tj/images/${category.categoryImage}`} 
                width={30} 
                alt={category.categoryName}
                onError={(ev) => ev.currentTarget.src = 'https://via.placeholder.com/30?text=?'}
              />
              <h1 className='mt-[10px]'>{category.categoryName}</h1>
              <Button type="link" onClick={() => handleCategoryClick(category.id)}>Перейти</Button>
            </div>

            {expandedCategory === category.id && category.subCategories?.length > 0 && (
              <div className='ml-[20px] mt-[5px]'>
                {category.subCategories.map((sub) => (
                  <div 
                    key={sub.id} 
                    className='p-[5px] hover:bg-gray-200 rounded-[5px] cursor-pointer'
                    onClick={() => handleCategoryClick(category.id, sub.id)}
                  >
                    {sub.subCategoryName}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Drawer>
      <footer className='mt-[50px] p-[20px]'>
        <div className="flex items-center justify-evenly items-start">
          <div className="num1 text-gray-400">
            <p className='text-black text-[17px]'>О нас</p>
            <p className='mt-[10px] text-[14px]'>Пункты выдачи</p>
            <p className='mt-[10px] text-[14px]'>О нас</p>
          </div>
          <div className="num1 text-gray-400">
            <p className='text-black text-[17px]'>Пользователям</p>
            <p className='mt-[10px] text-[14px]'>Связаться с нами</p>
            <p className='mt-[10px] text-[14px]'>Вопрос - Ответ</p>
          </div>
          <div className="num1 text-gray-400">
            <p className='text-black text-[17px]'>Для предпринимателей</p>
            <p className='mt-[10px] text-[14px]'>Вход для продавцов</p>
            <p className='mt-[10px] text-[14px]'>Открыть пункт выдачи</p>
          </div>
          <div>
            <p>Скачать приложение</p>
            <div className="flex items-center gap-[20px]">
              <div className="flex items-center gap-[20px] mt-[10px]">
              <div className="flex items-center gap-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
</svg>AppStore
              </div>
              <div className="flex items-center gap-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google-play" viewBox="0 0 16 16">
  <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
</svg>Google play
              </div>
              </div>
            </div>
            <p className='mt-[10px]'>Uzum в соцсетях</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout;
