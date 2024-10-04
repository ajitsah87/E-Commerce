import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
const categoryLoading = new Array(13).fill(null)
  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };
  useEffect(() => {
    fetchCategoryProduct()
  }, []);
  return(
  <div className="container mx-auto px-4 mt-4">
    <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
      
      { loading?(
        
          
          categoryLoading.map((element,index)=>{
            return(
<div className="size-16 md:size-20 rounded-full overflow-hidden  bg-slate-200 animate-pulse" key={"categoryLoading"+index}>

</div>
            )

          })
        

      ):(
        categoryProduct.map((product, index) => {
          const categoryURL = `/product-category/${encodeURIComponent(product?.category)}`;
         return (
           <Link to={categoryURL} className=" cursor-pointer" key={product?.category}>
             <div className="md:size-20 size-16 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
               <img
                 src={product?.productImage[0]}
                 alt={product?.category}
                 className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
               />
             </div>
             <p className="text-center md:text-base text-sm capitalize">{product.category}</p>
           </Link>
         );
       })
      )
     
      }
    </div>
  </div>
  )
};

export default CategoryList;
