import { useEffect, useState } from "react";
import img3 from "../../../assets/image copy 2.png";

import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import { useBrandStore } from "../../../store/api/brandApi/brand";
import { useProductStore } from "../../../store/api/productApi/products";

const Product = () => {
  const [range, setRange] = useState<[number, number]>([6990, 1989000]);

  const brands = useBrandStore((state) => state.brands);
  const getBrands = useBrandStore((state) => state.getBrands);

  const products = useProductStore((state) => state.products);
  const getProduct = useProductStore((state) => state.getProduct);

  useEffect(() => {
    getBrands();
    getProduct();
  }, [getBrands, getProduct]);

  return (
    <div>
      <div className="p-[40px]">
        <p className="text-[14px]">Главная / Товары недели</p>
      </div>

      <div className="flex items-start gap-[40px] p-[30px]">
        <div className="num1 w-[300px]">
          <h2 className="text-[18px] mb-[10px]">Категории</h2>

          {brands.map((e) => (
            <p
              key={e.id}
              className="hover:bg-gray-300 px-[20px] py-[10px] rounded-[10px] text-[15px]"
            >
              {e.brandName}
            </p>
          ))}

          <div className="flex justify-between mt-[20px] mb-[10px]">
            <input
              type="number"
              value={range[0]}
              onChange={(e) =>
                setRange([Number(e.target.value), range[1]])
              }
              className="border p-1 w-[120px]"
            />
            <input
              type="number"
              value={range[1]}
              onChange={(e) =>
                setRange([range[0], Number(e.target.value)])
              }
              className="border p-1 w-[120px]"
            />
          </div>

          <Range
            min={0}
            max={2000000}
            step={1000}
            value={range}
            onChange={(value) => setRange(value as [number, number])}
          />
        </div>

        <div className="flex items-center justify-evenly flex-wrap gap-[20px]">
          {products.map((e) => (
            <div
              key={e.id}
              className="num1 w-[280px] rounded-[20px] mt-[30px] transition-all duration-300 hover:shadow-2xl hover:bg-gray-200"
            >
              <img
                src={`http://37.27.29.18:8002/images/${e.image}`}
                alt={e.productName}
                className="w-[250px] m-auto"
              />

              <div className="p-[20px]">
                <div className="flex items-center gap-[10px]">
                  <h1 className="text-violet-500 font-[600]">
                    {e.price.toLocaleString()}
                  </h1>
                  <img src={img3} width={25} alt="icon" />
                </div>
                <p className="mt-[5px] font-medium">
                  {e.productName}
                </p>

                <p className="text-[14px] text-gray-600">
                  Цвет: {e.color}
                </p>

                <Link to={`/productById/${e.id}`}>
                  <button className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] w-full bg-violet-500 text-white mt-[10px] rounded-[10px]">
                    👜 В корзину
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
