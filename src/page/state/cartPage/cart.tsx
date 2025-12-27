import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../../assets/telegram-cloud-photo-size-2-5362090799195164261-x.jpg";

const USD_RATE = 125;

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

const Cart = () => {
  const [data, setData] = useState<CartItem[]>([]);
  const token = localStorage.getItem("token");

  async function getCart() {
    if (!token) return;
    try {
      const res = await axios.get(
        "https://store-api.softclub.tj/Cart/get-products-from-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const items = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setData(items);
    } catch (error) {
      console.error("Ошибка загрузки корзины", error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const total = data.reduce(
    (sum, e) => sum + e.price * e.quantity * USD_RATE,
    0
  );

  return (
    <div className="min-h-screen bg-[#F6F4FF] p-6">
      <h2 className="text-2xl font-semibold mb-6">Ваша корзина</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6">
          {data.length === 0 && (
            <p className="text-gray-500">Корзина пуста</p>
          )}

          {data.map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-4 py-4 border-b last:border-b-0"
            >
              <img
                src={e.image || logo}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h4 className="font-medium text-lg">{e.productName}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Цена за шт: {(e.price * USD_RATE).toLocaleString()} $
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600">
                  −
                </button>
                <span className="w-8 text-center font-medium">
                  {e.quantity}
                </span>
                <button className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600">
                  +
                </button>
              </div>

              <div className="text-right min-w-[120px]">
                <p className="font-semibold text-violet-600 text-lg">
                  {(e.price * e.quantity * USD_RATE).toLocaleString()} $
                </p>
                <button className="text-sm text-red-500 mt-1 hover:underline">
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>

          {data.map((e) => (
            <div key={e.id} className="flex justify-between text-sm mb-2">
              <span>
                {e.productName} × {e.quantity}
              </span>
              <span>
                {(e.price * e.quantity * USD_RATE).toLocaleString()} $
              </span>
            </div>
          ))}

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-violet-600">
            <span>Итого</span>
            <span>{total.toLocaleString()} $</span>
          </div>

          <button className="w-full mt-6 bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-xl text-lg">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
