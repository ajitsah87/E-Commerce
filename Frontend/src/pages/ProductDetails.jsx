import React, { useCallback, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import SummaryApi from "../common";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa6";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    Price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage,setZoomImage]=useState(false)
  const [rating, setRating] = useState(0);
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  console.log("data", data);
  useEffect(() => {
    const generateRandomRating = () => {
      const min = 2.2;
      const max = 4.7;
      return (Math.random() * (max - min) + min).toFixed(1);
    };
    setRating(generateRandomRating());
  }, []);
  useEffect(() => {
    fetchProductDetails();
  }, []);
  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };
  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({
      x,
      y,
    });
    
  },[zoomImageCoordinate]);
  const handleImageLeaveZoom=()=>{
    setZoomImage(false)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* image */}
        <div className=" h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="size-[300px] lg:size-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt={data.productImage}
              onMouseMove={handleZoomImage} 
              onMouseLeave={handleImageLeaveZoom}
              className="size-full object-scale-down mix-blend-multiply cursor-pointer "
            />
            {/* product zoom */}
            {
              zoomImage &&(
                <div className=" hidden absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 lg:block overflow-hidden z-10">
                <div
                  className="size-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-125 "
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
                <img src="" alt="" />
              </div>
              )
            }
           
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((element, index) => {
                  return (
                    <div
                      className="size-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="size-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="size-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* description */}
        {loading ? (
          <div className="grid w-full gap-2">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8  rounded-full inline-block w-full"></p>
            <h2 className=" text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full "></h2>
            <p className=" capitalize bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full "></p>
            <div className="bg-slate-200 h-6 lg:h-8 animate-pulse w-full "></div>
            <div className="flex items-center gap-2 text-2xl font-medium lg:text-3xl text-red-600 my-1 h-6 lg:h-8 animate-pulse w-full ">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 animate-pulse bg-slate-200 rounded w-full"></button>
              <button className="h-6 lg:h-8 animate-pulse bg-slate-200 rounded w-full"></button>
            </div>
            <div className="w-full">
              <p className="bg-slate-200 font-medium my-1 h-6 lg:h-8 animate-pulse w-full"></p>
              <p className="bg-slate-200 font-medium my-1 h-10 lg:h-12 animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div>
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit ">
              {data?.brandName}
            </p>
            <h2 className=" text-2xl lg:text-4xl font-medium ">
              {data?.productName}
            </h2>
            <p className=" capitalize text-slate-400  ">{data?.category}</p>
            <div className="-z-10">
              <Rating
                className=""
                placeholderRating={rating}
                placeholderSymbol={
                  <FaStar
                    style={{
                      color: "#ffdc18",
                      fontSize: "clamp(42px,6vw,52px)",
                    }}
                  />
                }
                fullSymbol={
                  <FaStar
                    style={{
                      color: "#ffdc18",
                      fontSize: "clamp(42px,6vw,52px)",
                    }}
                  />
                }
                emptySymbol={
                  <FaStar
                    style={{
                      color: "#d7d7d7",
                      fontSize: "clamp(42px,6vw,52px)",
                    }}
                  />
                }
                readonly={true}
              />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium lg:text-3xl text-red-600 my-1 ">
              <p className="text-red-600">
                {displayINRCurrency(data?.selling)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-green-400 rounded px-3 py-1 min-w-[120px] text-green-600 font-medium hover:bg-green-600 hover:text-white transition-colors">
                Buy
              </button>
              <button className="border-2 border-red-400 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white  transition-colors ">
                Add To Cart
              </button>
            </div>
            <div className="">
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p className="text-slate-600 font-medium my-1">
                {data?.description}
              </p>
            </div>
          </div>
        )}
      </div>
      {
        data.category && (

          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
        )
      }
    </div>
  );
};
export default ProductDetails;
