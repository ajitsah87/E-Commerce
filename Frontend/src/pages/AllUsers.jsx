import React, { useState } from "react";
import { useEffect } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
    
  });


  const fetchAllUser = async () => {
    const fetchData = await fetch(SummaryApi.alluser.url, {
      method: SummaryApi.alluser.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="pb-4 bg-white">
      <table className="userTable w-full">
        <thead>
          <tr className="bg-stone-800 text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((element, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{element?.name}</td>
                <td>{element?.email}</td>
                <td>{element?.role}</td>
                <td>{moment(element?.createdAt).format("ll")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(element)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc = {fetchAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
