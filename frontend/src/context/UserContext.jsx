import React, { createContext, useEffect,useState } from 'react'
export const UserDataContext = createContext()
import axios from 'axios'

function UserContext({children}) {
    const [userData,setUserData] = useState(null)
    const [edit,setEdit] = useState()
    const [postData,setPostData] = useState([])


    const getCurrentUser = async()=>{
        try {
            let result = await axios.get("http://localhost:3000/api/user/currentUser",{
              withCredentials: true
            })
            setUserData(result.data)
          
        } catch (error) {
            console.log(error);
            
        }
    }
    const getPost = async()=>{
        try {
            let result = await axios.get("http://localhost:3000/api/post/getpost",{
              withCredentials: true
            })
          //  console.log(result)
           setPostData(result.data)
          
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
      getCurrentUser()
      getPost()
    },[])
    const value = {
      userData,setUserData,edit,setEdit,postData,setPostData,getPost
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