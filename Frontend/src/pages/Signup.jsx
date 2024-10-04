import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageToBase64 from "../helpers/ImageToBase64";
import { validate } from "../utils/validateForm";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic:"",
  });
const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log("login ", data);
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic= await ImageToBase64(file)
    setData((prev) => ({
      ...prev,
      profilePic : imagePic
    }));
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUp.url,{
        method: SummaryApi.signUp.method,
        headers: {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      
      const dataApi = await dataResponse.json()
      if(dataApi.success){

        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){

        toast.error(dataApi.message)
      }
    }else{
      toast.error("Please Check Password and Confirm Password")
    }
  };  


  return (
    <section id="signup">
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto   ">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons " />
            </div>
            <form action="">
              <label>
                <div className="text-xs bg-opacity-75 pb-4 pt-2 cursor-pointer bg-slate-200 text-center py-4 absolute bottom-0 w-full  ">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                  required
                />
              </label>
            </form>
          </div>
          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="">Name :</label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  placeholder="enter your name"
                  className="h-full w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Email :</label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  placeholder="enter email"
                  className="h-full w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Password :</label>
              <div className="bg-slate-100 p-2 flex ">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  placeholder="enter  password"
                  className="h-full w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="">Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  placeholder="enter confirm password"
                  className="h-full w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="hover:text-red-700 text-red-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <input type="file" />
    </section>
  );
};

export default Signup;
