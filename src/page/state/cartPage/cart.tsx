import { useState } from "react";
import logo from "../../../assets/telegram-cloud-photo-size-2-5362090799195164261-x.jpg";

const USD_RATE = 125;
const IPHONE_PRICE_USD = 1200;

const Cart = () => {
  const [count, setCount] = useState(1);
  const priceSum = IPHONE_PRICE_USD * USD_RATE * count;
  const oldPrice = priceSum + 200_000;

  return (
    <div className="min-h-screen bg-[#F6F4FF] p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Ваша корзина, 1 товар
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5">
          <label className="flex items-center gap-2 text-violet-600 mb-4">
            <input type="checkbox" checked />
            <span>Снять все</span>
          </label>

          <div className="flex items-center gap-4 py-4 border-t">
            <input type="checkbox" checked />

            <img
              src={logo}
              className="w-20 h-20 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h4 className="font-medium">
                iPhone 16 Pro Max
              </h4>
              <p className="text-sm text-gray-500">
                Продавец: Apple Store
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="w-8 h-8 rounded-md bg-violet-100 text-violet-600"
              >
                −
              </button>

              <span className="w-6 text-center">{count}</span>

              <button
                onClick={() => setCount((c) => c + 1)}
                className="w-8 h-8 rounded-md bg-violet-100 text-violet-600"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="text-violet-600 font-semibold">
                {priceSum.toLocaleString()} $
              </p>
              <p className="text-xs text-gray-400">
                без карты {oldPrice.toLocaleString()} $
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Ваш заказ
          </h3>

          <div className="flex justify-between mb-4">
            <span>iPhone 16 Pro Max × {count}</span>
            <span className="font-semibold">
              {priceSum.toLocaleString()} $
            </span>
          </div>

          <div className="flex justify-between mb-6">
            <span>Итого</span>
            <span className="font-semibold text-violet-600">
              {priceSum.toLocaleString()} $
            </span>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-xl text-lg">
            Перейти к оформлению
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
