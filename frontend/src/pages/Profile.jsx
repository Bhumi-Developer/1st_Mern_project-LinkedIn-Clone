import Nav from '../components/Nav'
import React, { useContext, useEffect, useState } from "react";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { MdOutlineCameraAlt } from "react-icons/md";
import { UserDataContext } from "../context/UserContext";
import { HiPencil } from "react-icons/hi2";
import axios from 'axios';
import EditProfile from '../components/EditProfile';
import Post from '../components/Post';
import ConnectionButton from '../components/ConnectionButton';

function Profile() {
    let { userData, setUserData, edit, setEdit,postData,setPostData,profileData,setProfileData,handleGetProfile } = useContext(UserDataContext);
    let [userConnection,setUserConnection] = useState([])
    let [profilePost,setProfilePost] = useState([])

    // const handleGetUserConnection = async()=>{
    //     try {
    //         let result = await axios.get("http://localhost:3000/api/connection",{withCredentials:true})
    //         setUserConnection(result.data)
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }
    // useEffect(()=>{
    //     handleGetUserConnection()
    // },[])
    useEffect(()=>{
        setProfilePost(postData.filter((post)=>post.author._id==profileData._id))
    },[profileData])

  return (
    <div className='w-full min-h-[100vh] bg-[#eeebda] flex flex-col items-center pt-[80px] p-[20px]'>
      <Nav />
      {edit && <EditProfile />}
      
      <div className='w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px] pb-[40px]'> 

        <div className='relative bg-white pb-[40px] rounded shadow-lg'>
             <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center cursor-pointer">
                        <img src={profileData.coverImage || profile} className="w-full" />
                        {/* <MdOutlineCameraAlt
                          className="absolute left-[10%] top-[65px] w-[25px] h-[25px] text-white cursor-pointer lg:left-[22%]"
                          onClick={() => setEdit(true)}
                        /> */}
                      </div>
                      <div
                        className="w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer items-center justify-center absolute top-[65px] left-[35px]"
                        onClick={() => setEdit(true)}
                      >
                        <img src={profileData.profileImage || profile} className="h-full" />
                      </div>
                      <div className="w-[20px] h-[20px] bg-[#2dc0ff] absolute top-[95px] left-[100px] rounded-full flex justify-center items-center">
                        <TiPlus
                          className="text-white cursor-pointer"
                          onClick={() => setEdit(true)}
                        />
                      </div>
                      <div className="mt-[50px] pl-[20px] text-[19px] font-semibold text-gray-700">
                        <div>{`${profileData.firstname} ${profileData.lastname}`}</div>
                        <div className="text-[19px] font-semibold text-gray-700">{`${
                          profileData.headline || ""
                        }`}</div>
                        <div className="text-[16px] text-gray-500">{`${profileData.location}`}</div>
                        <div className="text-[16px] text-gray-500">{`${profileData.connection.length}`} Connections</div>
                      </div>
                    {profileData._id == userData._id &&   <button
                        className="min-w-[150px] h-[40px] my-[30px] ml-4 rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
                        onClick={() => setEdit(true)}
                      >
                        Edit Profile
                        <HiPencil />
                      </button>}
                      {profileData._id !== userData._id && <div className='ml-4'><ConnectionButton userId={profileData._id}/></div> }
                    </div>

        <div className='w-full h-[100px] flex items-center p-[20px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-lg'>
                {`Post (${profilePost.length})`}
        </div>
        {profilePost.map((post,index)=>(
             <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt}/>
        ))}
        {profileData?.skills?.length>0 && <div className='w-full min-h-[100px] flex flex-col gap-[10px] justify-center p-[20px] font-semibold bg-white shadow-lg rounded-lg'>
            <div className='text-[22px] text-gray-600'>Skills</div>
            <div className='flex flex-wrap justify-start items-center text-gray-600 gap-[10px] p-[20px] text-[20px]'>
                {profileData.skills.map((skill,index)=>(
                    <div key={index}>{skill}</div>
                ))}
                {profileData._id == userData._id &&
                <button className="min-w-[150px] h-[40px] ml-4 rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex  items-center justify-center gap-[10px]" onClick={()=>setEdit(true)}>Add Skills</button>}
            </div>
            </div>}
        {profileData?.education?.length>0 && <div className='w-full min-h-[100px] flex flex-col gap-[10px] justify-center p-[20px] font-semibold bg-white shadow-lg rounded-lg'>
            <div className='text-[22px] text-gray-600'>Education</div>
            <div className='flex flex-col justify-start items-start text-gray-600 gap-[10px] p-[20px] text-[20px]'>
                {profileData.education.map((edu,index)=>(
                   <div key={index}>
                     <div>College : {edu.college}</div>
                     <div>Degree : {edu.degree}</div>
                     <div>Field Of Study : {edu.fieldOfStudy}</div>
                   </div>
                ))}
                {profileData._id == userData._id &&
                <button className="min-w-[150px] h-[40px]  mt-4 p-[20px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex  items-center justify-center gap-[10px]" onClick={()=>setEdit(true)}>Add Education</button>}
            </div>
            </div>}
        {profileData?.experience?.length>0 && <div className='w-full min-h-[100px] flex flex-col gap-[10px] justify-center p-[20px] font-semibold bg-white shadow-lg rounded-lg'>
            <div className='text-[22px] text-gray-600'>Experience</div>
            <div className='flex flex-col justify-start items-start text-gray-600 gap-[10px] p-[20px] text-[20px]'>
                {profileData.experience.map((exp,index)=>(
                   <div key={index}>
                     <div>Title : {exp.title}</div>
                     <div>Company : {exp.company}</div>
                     <div>Description : {exp.description}</div>
                   </div>
                ))}
                {profileData._id == userData._id &&
                <button className="min-w-[150px] h-[40px]  mt-4 p-[20px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex  items-center justify-center gap-[10px]" onClick={()=>setEdit(true)}>Add Experience</button>}
            </div>
            </div>}
        </div>

      </div>
  )
}

export default Profile
