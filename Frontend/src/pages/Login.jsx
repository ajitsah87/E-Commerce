import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { setUserDetails } from "../../store/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  // const {fetchUserDetails} = useContext(Context)

  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include", 
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  };

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
  const handleSubmit = async(e) => {
    e.preventDefault();
const dataResponse=await fetch(SummaryApi.signIn.url,{
  method : SummaryApi.signIn.method,
  credentials: "include",
  headers : {
    "content-type" : "application/json"
  },
  body: JSON.stringify(data)

})
const dataApi = await dataResponse.json()
if (dataApi.success) {
  // setUserDetails(dataApi)
  console.log(dataApi)
  toast.success(dataApi.message)
  navigate("/")
  fetchUserDetails()
}
if (dataApi.error) {
  toast.error(dataApi.message)
}


  };
  return (
    <section id="login">
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto  ">
          <div className="w-20 h-20 mx-auto ">
            <img src={loginIcons} alt="login icons " />
          </div>
          <form action="" className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="">Email :</label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  name="email"
                  value={data.name}
                  onChange={handleOnChange}
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
                  placeholder="enter password"
                  className="h-full w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="w-fit block ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have account ?{" "}
            <Link
            to={"/sign-up"}
              className="hover:text-red-700 text-red-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
