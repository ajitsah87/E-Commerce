import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
const BannerProduct = () => {
  const desktopImage = [image1, image2, image3, image4, image5];
  const mobileImage = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    if (desktopImage.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImage.length - 1 > currentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }
    }, 3000)
    return()=> clearInterval(interval)
  }, [currentImage]);
  return (
    <div className="container mx-auto px-6  rounded overflow-hidden" >
      <div className="h-60 md:h-96 w-full bg-slate-200 relative" >
        <div className="absolute z-10 size-full md:flex items-center hidden ">
          <div className="flex justify-between w-full text-2xl p-2">
            <button
              onClick={prevImage}
              className="rounded-full shadow-md hover:bg-white bg-transparent transition-colors p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="rounded-full shadow-md hover:bg-white bg-transparent transition-colors p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop */}
        <div className="md:flex size-full overflow-hidden hidden">
          {desktopImage.map((imageURL, index) => {
            return (
              <div
                className="size-full min-w-full min-h-full transition-all duration-500  "
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={imageURL}
                
              >
                <img src={imageURL} alt="" className="size-full" />
              </div>
            );
          })}
        </div>
        {/* mobile */}
        <div className="flex size-full overflow-hidden md:hidden">
          {mobileImage.map((imageURL, index) => {
            return (
              <div
                className="size-full min-w-full min-h-full transition-all "
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={imageURL}
              >
                <img src={imageURL} alt="" className="size-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
