import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center ">
        <h1 className="font-bold text-lg ">All Products</h1>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white  transition-colors py-2 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product{" "}
        </button>
      </div>
      {/* all product Component */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)]  overflow-y-scroll ">
        {allProduct.map((product, index) => {
          return(
            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct}/>
     

       )
        })}
      </div>

      {/* Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
      )}
    </div>
  );
};

export default AllProducts;
