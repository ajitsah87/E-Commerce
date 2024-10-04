import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import {toast} from "react-toastify"
const AdminEditProduct = ({
onClose,
productData,fetchdata
}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage:productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        selling: productData?.selling,
      });
    
      const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
      const [fullScreenImage, setFullScreenImage] = useState("");
      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };
      console.log(data);
      const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudnary = await uploadImage(file);
        setData((prev) => {
          return {
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudnary.url],
          };
        });
      };
      const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => {
          return {
            ...prev,
            productImage: [...newProductImage],
          };
        });
      };
      // Upload Product
      const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await fetch(SummaryApi.updateProduct.url,{
    method : SummaryApi.updateProduct.method,
    credentials : "include",
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify(data)
        })
        console.log("data", data);
        const responseData = await response.json()
        if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchdata()
        }
        if(responseData.error){
          toast.error(responseData?.message)
        }
      };
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full inset-0 flex justify-center items-center  ">
      <div className="bg-white p-4 rounded h-full  w-full max-w-2xl max-h-[80%] overflow-hidden ">
        <div className="flex justify-between items-center ">
          <h1 className="font-bold text-lg">Edit Product</h1>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid  p-4 gap-2 overflow-y-scroll h-full pb-5  "
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter Brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">
            category :
          </label>
          <select
          required
            value={data.category}
            className="p-2 bg-slate-100 border rounded "
            onChange={handleOnChange}
            name="category"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((element, index) => {
              return (
                <option value={element.value} key={element.value + index}>
                  {element.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput" className="">
            <div className="bg-slate-100 p-2 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm ">Upload Product Image</p>
              </div>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </div>
          </label>
          <div className="">
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 ">
                {data.productImage.map((element, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={element}
                        alt="element"
                        className="bg-slate-100 border  cursor-pointer "
                        width={80}
                        height={80}
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(element);
                        }}
                      />
                      <div
                        className="absolute right-[2px] bottom-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer text-xs"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs ">
                *Please Upload Product Image{" "}
              </p>
            )}
          </div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price "
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="selling">Selling Price</label>
          <input
            type="number"
            id="selling"
            name="selling"
            placeholder="Enter Selling Price"
            value={data.selling}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded "
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            rows={3}
            value={data.description}
            name="description"
            onChange={handleOnChange}
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Update Product
          </button>
        </form>
      </div>
      {/* display image full screen */}

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  )
}

export default AdminEditProduct