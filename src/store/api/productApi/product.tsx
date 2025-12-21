import React, { useEffect, useState } from "react";
import img2 from "../../../assets/d44358tsp2tj49o8b2ng.jpg";
import img3 from "../../../assets/image copy 2.png";
import  Range  from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import { useBrandStore } from "../brandApi/brand";
const Product: React.FC = () => {
  const [range, setRange] = useState<[number, number]>([6990, 1989000]);
  const brands = useBrandStore((state) => state.brands);
  const getBrands = useBrandStore((state) => state.getBrands);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

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
            railStyle={{ backgroundColor: "#ddd" }}
            trackStyle={[{ backgroundColor: "#7f5af0" }]}
            handleStyle={[
              { borderColor: "#7f5af0" },
              { borderColor: "#7f5af0" },
            ]}
          />
        </div>

        <div className="flex items-center justify-evenly flex-wrap gap-[20px]">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="num1 w-[280px] rounded-[20px] mt-[30px] transition-all duration-300 hover:shadow-2xl hover:bg-gray-200"
            >
              <img
                src={img2}
                alt="product"
                className="w-[250px] m-auto"
              />

              <div className="p-[20px]">
                <div className="flex items-center gap-[10px]">
                  <h1 className="text-violet-500 font-[600]">
                    1 345 200
                  </h1>
                  <img src={img3} width={25} alt="icon" />
                </div>

                <p className="line-through text-gray-500">846 000</p>

                <button className="bg-amber-300 text-[12px] px-[5px] py-[2px] rounded-[5px]">
                  59 925 сум/мес
                </button>

                <p className="mt-[5px] font-medium">
                  Офисное кресло Dafna LEO
                </p>
                <p className="text-[14px] text-gray-600">
                  CHROME, с кожаной обивкой
                </p>

                <p>🌟 4.8 (226 отзывов)</p>
                <Link to={'/cart'}>
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
