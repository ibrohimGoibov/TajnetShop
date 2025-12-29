import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageOutlined, SendOutlined, ShoppingCartOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import imgl from '../../../assets/image copy 15.png';

interface Image {
  id: number;
  images: string;
}

interface Product {
  productName: string;
  description?: string;
  price: number;
  images: Image[];
}

const fallbackImages = [imgl, imgl];

const colorSwatches = [
  { name: "Black Titanium", hex: "#1c1c1e" },
  { name: "White Titanium", hex: "#f5f5f7" },
  { name: "Blue Titanium", hex: "#3b4252" },
  { name: "Natural Titanium", hex: "#8e8e93" },
];

const ProductById = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const images = product?.images?.length ? product.images.map(img => `https://store-api.softclub.tj/images/${img.images}`) : fallbackImages;
  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-500 mb-4">
          Главная / Все категории / {product?.productName || "iPhone 15 Pro Max"}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg">
              <img
                src={currentImage}
                alt={product?.productName}
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <span className="bg-gray-700/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </span>
                <Button type="default" shape="circle" icon={<ZoomInOutlined />} className="bg-gray-700/50 border-none hover:bg-gray-600/60" />
              </div>
            </div>

            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    idx === selectedImageIndex ? "border-purple-500" : "border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-2 text-gray-800">
                {product?.productName || "iPhone 15 Pro Max"}
              </h1>

              {/* Contact seller */}
              <div className="my-8">
                <p className="text-lg text-gray-700 mb-4">Contact seller</p>
                <div className="flex gap-4">
                  <Button
                    size="large"
                    icon={<MessageOutlined />}
                    className="flex-1 bg-purple-600 text-white hover:bg-purple-500 rounded-full py-6 text-lg font-medium"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="large"
                    icon={<SendOutlined />}
                    className="flex-1 bg-purple-600 text-white hover:bg-purple-500 rounded-full py-6 text-lg font-medium"
                  >
                    Telegram
                  </Button>
                </div>
              </div>

              {/* Color selection */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-4">Color</p>
                <div className="flex gap-4">
                  {colorSwatches.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-12 h-12 rounded-full border-4 cursor-pointer transition-all ${
                        idx === selectedColor ? "border-purple-500 scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-gray-600">{colorSwatches[selectedColor].name}</p>
              </div>

              {/* Add to cart */}
              <Button
                size="large"
                icon={<ShoppingCartOutlined />}
                className="w-full bg-purple-600 text-white hover:bg-purple-500 rounded-full py-8 text-xl font-semibold shadow-lg"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
