import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { MdOutlineCameraAlt } from "react-icons/md";
import { UserDataContext } from "../context/UserContext";
import { HiPencil } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import EditProfile from "../components/EditProfile";
import { HiPhoto } from "react-icons/hi2";
import axios from "axios";
import { useRef } from "react";
import Post from "../components/Post";

function Home() {
  let { userData, setUserData, edit, setEdit,postData,setPostData } = useContext(UserDataContext);
  let [frontendImage,setFrontendImage] = useState("")
  let [backendImage,setBackendImage] = useState("")
  let [description,setDescription] = useState("")
  let [uploadPost,setUploadPost] = useState(false)
  let [posting,setPosting] = useState(false)

  const image = useRef()
  
  const handleImage = (e)=>{
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleUploadPost = async()=>{
    setPosting(true)
    try {
      const formdata = new FormData()
      formdata.append("description",description)
      if(backendImage){
        formdata.append("image",backendImage)
      }
      let result = await axios.post("http://localhost:3000/api/post/create",formdata,
        {withCredentials:true}
      )
      console.log(result)
      setPosting(false)
      setUploadPost(false)
    } catch (error) {
      console.log(error);
      setPosting(false)
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-[#eeebda] pb-[50px]">
      {edit && <EditProfile />}
      <Nav />
      <div className="pt-[80px] flex items-center lg:items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row ">
        <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px]relative">
          <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center">
            <img src={userData.coverImage || profile} className="w-full" />
            <MdOutlineCameraAlt
              className="absolute right-[40px] top-[145px] w-[25px] h-[25px] text-white cursor-pointer lg:left-[22%]"
              onClick={() => setEdit(true)}
            />
          </div>
          <div
            className="w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer items-center justify-center absolute top-[135px] left-[55px]"
            onClick={() => setEdit(true)}
          >
            <img src={userData.profileImage || profile} className="h-full" />
          </div>
          <div className="w-[20px] h-[20px] bg-[#2dc0ff] absolute top-[175px] left-[110px] rounded-full flex justify-center items-center">
            <TiPlus
              className="text-white cursor-pointer"
              onClick={() => setEdit(true)}
            />
          </div>
          <div className="mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700">
            <div>{`${userData.firstname} ${userData.lastname}`}</div>
            <div className="text-[19px] font-semibold text-gray-700">{`${
              userData.headline || ""
            }`}</div>
            <div className="text-[16px] text-gray-500">{`${userData.location}`}</div>
          </div>
          <button
            className="w-[90%] h-[40px] my-[30px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center ml-4 gap-[10px]"
            onClick={() => setEdit(true)}
          >
            Edit Profile
            <HiPencil />
          </button>
        </div>
        {uploadPost &&  <div className=" fixed w-full h-full bg-black  top-0 z-[100] left-0 opacity-[0.6]"></div>}

       {uploadPost && 
        <div className="w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg absolute z-[200] p-[20px] flex items-start justify-start flex-col gap-[20px] ">
          <div
            className="absolute top-[20px] right-[20px] cursor-pointer"
          >
            <RxCross1 className="w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer" onClick={()=>setUploadPost(false)} />
          </div>
          <div className="flex justify-start items-center gap-[10px]">
          <div
            className="w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer items-center justify-center">
            <img src={userData.profileImage || profile} className="h-full" />
          </div>
          <div className="text-[22px]">
            {`${userData.firstname} ${userData.lastname}`}
          </div>
        </div>
        <input type="file" ref={image}  className="hidden" onChange={handleImage}/>
        <textarea className={`w-full ${frontendImage?"h-[200px]":"h-[550px]"} outline-none border-none p-[10px] resize-none text-[19px]`} placeholder="what do you want to talk about..?" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <div className="w-full h-[300px] overflow-hidden flex justify-center items-center">
            <img src={frontendImage || ""} alt="" className="h-full"/>
          </div>
          
        <div className="w-full h-[200px] flex flex-col">
          <div className="p-[30px] flex items-center justify-start border-b-2 border-gray-500">
          <HiPhoto className="w-[24px] h-[24px] text-gray-500 cursor-pointer" onClick={()=>image.current.click()}/>
          </div>
         
            <div className="flex justify-end items-end" >
            <button className="w-[100px] h-[50px] rounded-full bg-blue-400 mt-[20px] text-white" disabled={posting} onClick={handleUploadPost}>{posting?"Posting..":"Post"}</button>
            </div>
        </div>
        </div>
}
        <div className="w-full lg:w-[50%] min-h-[200px] bg-[#eeebda] shadow-lg flex flex-col gap-[20px]">
          <div className="w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center justify-center gap-[10px] p-[20px]">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer items-center justify-center flex ">
              <img src={userData.profileImage || profile} className="h-full" />
            </div>
            <button className="w-[80%] h-[60px] border-2 rounded-full border-gray-500 flex items-center justify-start px-[20px] hover:bg-gray-300" onClick={()=>setUploadPost(true)}>
              Start a post...
            </button>
          </div>
         {postData.map((post,index)=>(
           <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt}/>
         ))}
        </div>

        <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg"></div>
      </div>
    </div>
);
}

export default Home;
