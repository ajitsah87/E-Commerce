import React, { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
   
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto my-4 px-6">
      <h2 className="text-lg font-semibold py-4 ">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none ">
        {data.map((product, index) => {
          return (
            <div className="w-full max-w-[280px] min-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow flex ">
              <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]  ">
                <img src={product.productImage[0]} alt="" className="object-scale-down h-full hover:scale-110 transition-all"/>
              </div>
              <div className="p-4 grid">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">{product?.productName}</h2>
                <p className="capitalize text-slate-500 ">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="font-medium text-red-600 ">{ displayINRCurrency(product?.selling)}</p>
                  <p className="text-slate-500 line-through">{ displayINRCurrency(product?.price)}</p>
                </div>
                <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full">Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
