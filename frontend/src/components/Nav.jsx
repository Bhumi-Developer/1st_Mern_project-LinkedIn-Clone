import React from "react";
import logo1 from "../assets/logo1.png";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsBellFill } from "react-icons/bs";
import profile from "../assets/profile.jpeg"
import { useState } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  let [activeSearch,setActiveSearch] = useState(false)
  let {userData,setUserData} = useContext(UserDataContext)
  let [showPopup,setShowPopup] = useState(false)
  let navigate = useNavigate()

  const handleSignOut = async()=>{
    try {
      const result = await axios.get("http://localhost:3000/api/auth/logout",{withCredentials: true})
      setUserData(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-[60px] bg-[white] fixed top-0 shadow-lg flex justify-between md:justify-around items-center">
      <div className="flex justify-center items-center gap-[10px]">
        <div>
          <img src={logo1} className="w-[50px]" onClick={()=>setActiveSearch(false)}/>
        </div>
        {!activeSearch && <div>
            <IoSearchSharp className="w-[23px] h-[23px] text-gray-600 lg:hidden" onClick={()=>setActiveSearch(true)} />
          </div>}
        <form className={`w-[190px] lg:w-[300px] h-[30px] bg-[#eeebda]  items-center gap-[10px] px-[10px] py-[5px] rounded-md lg:flex ${!activeSearch?"hidden": "flex"}`}>
        <IoSearchSharp className="w-[23px] h-[23px] text-gray-600 " />
          <input type="text" className="w-[80%] h-full bg-transparent outline-none border-0" placeholder="search users..." />
        </form>
      </div>


      <div className="flex justify-center items-center gap-[20px] relative">

          {showPopup && <div className="w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[65px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]">
          <div className="w-[70px] rounded-full overflow-hidden"><img src={profile}/></div>
          <div className="text-[19px] font-semibold text-gray-700">{`${userData.firstname} ${userData.lastname}`}</div>
          <button className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]">View Profile</button>
          <div className="w-full h-[1px] bg-gray-700"></div>
          <div  className="flex items-center justify-start w-full gap-[20px] text-gray-600 "><HiUsers className="w-[23px] h-[23px] text-gray-600"/>
        <div>My Network</div></div>
        <button className="w-[100%] h-[40px] rounded-full border-2 border-[#fe243e] text-[#fe243e]" onClick={handleSignOut}>Sign Out</button>
          </div>}

        <div className="lg:flex flex-col items-center justify-center text-gray-600 hidden"><MdHome className="w-[23px] h-[23px] text-gray-600"/>
        <div>Home</div></div>
        <div  className="lg:flex flex-col items-center justify-center text-gray-600 hidden"><HiUsers className="w-[23px] h-[23px] text-gray-600"/>
        <div>My Network</div></div>
        <div  className="flex flex-col items-center justify-center text-gray-600"><BsBellFill className="w-[23px] h-[23px] text-gray-600 "/>
        <div className="hidden md:block">Notifications</div></div>
        <div className="w-[50px] rounded-full overflow-hidden cursor-pointer" onClick={()=>setShowPopup(prev=>!prev)}><img src={profile}/></div>
      </div>
    </div>
  );
}

export default Nav;
