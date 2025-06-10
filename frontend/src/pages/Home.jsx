import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { MdOutlineCameraAlt } from "react-icons/md";
import { UserDataContext } from "../context/UserContext";
import { HiPencil } from "react-icons/hi2";
import EditProfile from "../components/EditProfile";

function Home() {
  let { userData, setUserData,edit,setEdit } = useContext(UserDataContext);
  return (
    <div className="w-full min-h-[100vh] bg-[#eeebda] ">
      {edit && <EditProfile />}
      <Nav />
      <div className="pt-[80px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row">
        <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px]relative">
          <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center">
            <img src={userData.coverImage || ""} className="w-full" />
            <MdOutlineCameraAlt className="absolute right-[40px] top-[145px] w-[25px] h-[25px] text-white cursor-pointer lg:left-[22%]" onClick={()=>setEdit(true)}/>
          </div>
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer items-center justify-center absolute top-[135px] left-[55px]"onClick={()=>setEdit(true)}>
            <img src={userData.profileImage || profile} className="h-full" />
          </div>
          <div className="w-[20px] h-[20px] bg-[#2dc0ff] absolute top-[175px] left-[110px] rounded-full flex justify-center items-center">
            <TiPlus className="text-white cursor-pointer" onClick={()=>setEdit(true)} />
          </div>
          <div className="mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700">
            <div>{`${userData.firstname} ${userData.lastname}`}</div>
            <div className="text-[19px] font-semibold text-gray-700">{`${
              userData.headline || ""
            }`}</div>
            <div className="text-[16px] text-gray-500">{`${userData.location}`}</div>
          </div>
          <button className="w-[90%] h-[40px] my-[30px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center ml-4 gap-[10px]" onClick={()=>setEdit(true)}>
            Edit Profile
            <HiPencil />
          </button>
        </div>

        <div className="w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg"></div>

        <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg"></div>
      </div>
    </div>
  );
}

export default Home;
