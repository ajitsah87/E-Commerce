import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async(e,id)=>{
 await   addToCart(e,id)
  fetchUserAddToCart()
  } 
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += scrollElement.current.clientWidth;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= scrollElement.current.clientWidth;
  };
  return (
    <div className="relative container mx-auto my-4 px-6 ">
      <h2 className="text-lg font-semibold py-4 ">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all duration-300 ease-in-out"
        style={{ scrollBehavior: "smooth" }}
        ref={scrollElement}
      >
        <button
          className=" absolute left-3 rounded-full shadow-md bg-white  p-1 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className=" absolute right-3 rounded-full shadow-md bg-white  p-1 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full max-w-[280px]  min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow  ">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse "></div>
                  <div className="p-4 grid gap-3 w-full">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-3 bg-slate-200 animate-pulse rounded-full mb-2"></h2>
                    <p className="capitalize text-slate-500 bg-slate-200 p-1 py-2  animate-pulse w-full rounded-full  "></p>
                    <div className="flex gap-3 w-full">
                      <p className="font-medium text-red-600 p-1 py-2  animate-pulse w-full rounded-full bg-slate-200 "></p>
                      <p className="text-slate-500 line-through p-1 py-2 animate-pulse w-full rounded-full bg-slate-200"></p>
                    </div>
                    <button className="text-sm bg-slate-200 text-white px-3.5 py-2 rounded-full w-full p-1 animate-pulse "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link  to={"product/"+product?._id} className="w-full max-w-[280px]  min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow  ">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center  ">
                    <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-110 transition-all  mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 ">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="font-medium text-red-600 ">
                        {displayINRCurrency(product?.selling)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3.5 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e,product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
