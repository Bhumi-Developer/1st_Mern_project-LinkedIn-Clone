import React, { createContext, useEffect,useState } from 'react'
export const UserDataContext = createContext()
import axios from 'axios'

function UserContext({children}) {
    const [userData,setUserData] = useState(null)

    const getCurrentUser = async()=>{
        try {
            let result = await axios.get("http://localhost:3000/api/auth/currentUser",{
              withCredentials: true
            })
            setUserData(result.data)
          
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
      getCurrentUser()
    },[])
    const value = {
      userData,setUserData
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