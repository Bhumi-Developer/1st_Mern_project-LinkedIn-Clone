import React, { createContext, useEffect,useState } from 'react'
export const UserDataContext = createContext()
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {io} from "socket.io-client"
// import ConnectionButton from "./ConnectionButton";

 export const socket = io(" https://linkedin-backend-wg07.onrender.com")

function UserContext({children}) {
    const [userData,setUserData] = useState(null)
    const [edit,setEdit] = useState()
    const [postData,setPostData] = useState([])
    const [profileData,setProfileData] = useState([])
    let navigate = useNavigate()

    const getCurrentUser = async()=>{
        try {
            let result = await axios.get(" https://linkedin-backend-wg07.onrender.com/api/user/currentUser",{
              withCredentials: true
            })
            setUserData(result.data)
          
        } catch (error) {
            console.log(error);
            
        }
    }
    const getPost = async()=>{
        try {
            let result = await axios.get(" https://linkedin-backend-wg07.onrender.com/api/post/getpost",{
              withCredentials: true
            })
          //  console.log(result)
           setPostData(result.data)
           
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleGetProfile = async(username)=>{
      try {
        let result = await axios.get(` https://linkedin-backend-wg07.onrender.com/api/user/profile/${username}`,{withCredentials:true})
        // console.log(result)
        setProfileData(result.data)
        navigate("/profile")
      } catch (error) {
        console.log(error);
      }
    }


    useEffect(()=>{
      getCurrentUser()
      getPost()
    },[])
    const value = {
      userData,setUserData,edit,setEdit,postData,setPostData,getPost,profileData,setProfileData,handleGetProfile
    }
  return (
    <div>
        <UserDataContext.Provider value={value}>
        {children}
        </UserDataContext.Provider>
    
    </div>
  )
}

export default UserContext
