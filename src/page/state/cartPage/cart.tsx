import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../../assets/telegram-cloud-photo-size-2-5362090799195164261-x.jpg";
import { message } from "antd";

const API_URL = "https://store-api.softclub.tj";
const USD_RATE = 125;

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // токен авторизации

  const fetchCart = async () => {
    if (!token) {
      message.warning("Сначала войдите в аккаунт");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/Cart/get-products-from-cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data || []);
    } catch (err) {
      console.error(err);
      message.error("Ошибка при получении корзины");
    }
  };

  const changeQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * USD_RATE * item.quantity,
    0
  );

  const checkout = async () => {
    if (!token) {
      message.warning("Сначала войдите в аккаунт");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3001/checkout", {
        name: "Ali",
        phone: "+992900000000",
        address: "Dushanbe",
        items: cartItems.map((i) => `${i.productName} x${i.quantity}`).join(", "),
        total: totalPrice.toString(),
      });
      message.success("✅ Заказ отправлен в Telegram");
      setCartItems([]);
    } catch (err) {
      console.error(err);
      message.error("Ошибка при оформлении заказа");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F4FF] p-6">
      <h2 className="text-2xl font-semibold mb-6">Ваша корзина</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Товары */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5">
          {cartItems.length === 0 && <p>Корзина пуста</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-t">
              <img
                src={item.image || logo}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.productName}</h4>
                <p className="text-sm text-gray-500">Цена: {item.price * USD_RATE} $</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-md bg-violet-100 text-violet-600"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-md bg-violet-100 text-violet-600"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-violet-600 font-semibold">
                  {(item.price * USD_RATE * item.quantity).toLocaleString()} $
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Итого */}
        <div className="bg-white rounded-xl p-5 h-fit">
          <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.productName} × {item.quantity}</span>
              <span>{(item.price * USD_RATE * item.quantity).toLocaleString()} $</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-semibold text-violet-600">
            <span>Итого</span>
            <span>{totalPrice.toLocaleString()} $</span>
          </div>

          <button
            className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-xl text-lg mt-4"
            onClick={checkout}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? "Отправка..." : "Перейти к оформлению"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
