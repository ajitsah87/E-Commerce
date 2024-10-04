import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
    const [menuDisplay,setMenuDisplay] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(state => state?.user?.user)
    useEffect(()=>{
if (user?.role !== ROLE.ADMIN) {
  navigate("/")
}
    },[user])
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className=" h-32  flex justify-center items-center flex-col ">
        <div className="text-5xl cursor-pointer relative flex justify-center" >
            {
              user?.profilePic? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>
              ): (
<FaRegCircleUser/>
              )
            }
            </div>
            <p className=" capitalize text-lg font-semibold">{user?.name}</p>
            <p className="text-sm ">{user?.role}</p>
        </div>
    <div className="">
        <nav className="grid p-4">
            <Link to={"all-users"} className="hover:bg-slate-100 px-2 py-1">All Users</Link>
            <Link to={"all-products"} className="hover:bg-slate-100 px-2 py-1">All Product</Link>
        </nav>
    </div>
      </aside>
      <main className="h-full w-full p-4"><Outlet/></main>
    </div>
  );
};

export default AdminPanel;
