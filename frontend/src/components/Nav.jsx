import React, { useEffect } from "react";
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
  let {userData,setUserData,handleGetProfile} = useContext(UserDataContext)
  let [showPopup,setShowPopup] = useState(false)
  let navigate = useNavigate()
  let [searchInput,setSearchInput] = useState("")
  let [searchData,setSearchData] = useState([])

  const handleSignOut = async()=>{
    try {
      const result = await axios.get("http://localhost:3000/api/auth/logout",{withCredentials: true})
      setUserData(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/user/search", {
        params: { query: searchInput },
        withCredentials: true,
      });
      setSearchData(result.data);
      // console.log(result.data)
    } catch (error) {
      setSearchData([])
      console.error("Search error:", error.response?.data || error.message);
    }
  };
  
useEffect(()=>{
 
    handleSearch()
  
},[searchInput])

  return (
    <div className="w-full h-[60px] bg-[white] fixed top-0 shadow-lg flex justify-between md:justify-around items-center z-[50]">
      <div className="flex justify-center items-center gap-[10px]">
        <div>
          <img src={logo1} className="w-[50px]" onClick={()=>setActiveSearch(false)}/>
        </div>
        {!activeSearch && <div>
            <IoSearchSharp className="w-[23px] h-[23px] text-gray-600 lg:hidden" onClick={()=>setActiveSearch(true)} />
          </div>}

          {searchData.length >0 &&  <div className="absolute top-[70px] min-h-[100px] left-[0px] lg:left-[20px] shadow-lg w-[100%] lg:w-[700px] bg-white flex flex-col gap-[20px] p-[20px] overflow-auto">
            {searchData.map((sea)=>(
              <div className="flex gap-[20px] items-center border-b-2 border-b-gray-300 p-[5px] hover:bg-gray-200 cursor-pointer rounded-lg" onClick={()=>handleGetProfile(sea.username)}>
               <div className="w-[70px] rounded-full overflow-hidden"><img src={sea.profileImage || profile}/></div>
              <div> <div className="text-[19px] font-semibold text-gray-700">{`${sea.firstname} ${sea.lastname}`}</div>
              <div className="text-[15px] font-semibold text-gray-500">{`${sea.headline }`}</div></div>
              </div>
            ))}
            
            
            </div> }



        <form className={`w-[190px] lg:w-[300px] h-[30px] bg-[#eeebda]  items-center gap-[10px] px-[10px] py-[5px] rounded-md lg:flex ${!activeSearch?"hidden": "flex"}`}>
        <IoSearchSharp className="w-[23px] h-[23px] text-gray-600 " />
          <input type="text" className="w-[80%] h-full bg-transparent outline-none border-0" placeholder="search users..." onChange={(e)=>setSearchInput(e.target.value)} value={searchInput} />
        </form>
      </div>


      <div className="flex justify-center items-center gap-[20px] relative">

          {showPopup && <div className="w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[65px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]">
          <div className="w-[70px] rounded-full overflow-hidden"><img src={userData.profileImage || profile}/></div>
          <div className="text-[19px] font-semibold text-gray-700">{`${userData.firstname} ${userData.lastname}`}</div>
          <button className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]" onClick={()=>handleGetProfile(userData.username)}>View Profile</button>
          <div className="w-full h-[1px] bg-gray-700"></div>
          <div  className="flex items-center justify-start w-full gap-[20px] text-gray-600 cursor-pointer " onClick={()=>navigate("/network")}><HiUsers className="w-[23px] h-[23px] text-gray-600" />
        <div>My Network</div></div>
        <button className="w-[100%] h-[40px] rounded-full border-2 border-[#fe243e] text-[#fe243e]" onClick={handleSignOut}>Sign Out</button>
          </div>}

        <div className="lg:flex flex-col items-center justify-center text-gray-600 hidden cur" onClick={()=>navigate("/")}><MdHome className="w-[23px] h-[23px] text-gray-600" />
        <div>Home</div></div>
        <div  className="lg:flex flex-col items-center justify-center text-gray-600 hidden cursor-pointer" onClick={()=>navigate("/network")}><HiUsers className="w-[23px] h-[23px] text-gray-600"/>
        <div>My Network</div></div>
        <div  className="flex flex-col items-center justify-center text-gray-600" onClick={()=>navigate("/notification")}><BsBellFill className="w-[23px] h-[23px] text-gray-600 "/>
        <div className="hidden md:block" >Notifications</div></div>
        <div className="w-[50px] rounded-full overflow-hidden cursor-pointer" onClick={()=>setShowPopup(prev=>!prev)}><img src={userData.profileImage || profile}/></div>
      </div>
    </div>
  );
}

export default Nav;
