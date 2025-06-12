import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client"
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:3000")

function ConnectionButton({userId}) {
let {userData} = useContext(UserDataContext)
let navigate = useNavigate()

    let [status,setStatus] = useState("")

    const handleSendConnection = async()=>{
        try {
            let result = await axios.post(`http://localhost:3000/api/connection/send/${userId}`,{},{withCredentials:true})
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemoveConnection = async()=>{
        try {
            let result = await axios.delete(`http://localhost:3000/api/connection/remove/${userId}`,{withCredentials:true})
        } catch (error) {
            console.log(error)
        }
    }
    const handleGetStatus = async()=>{
        try {
            let result = await axios.get(`http://localhost:3000/api/connection/getstatus/${userId}`,{withCredentials:true})
            setStatus(result.data.status)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        socket.emit("register",userData._id)
        handleGetStatus()

        socket.on("statusUpdate",({updatedUserId,newStatus})=>{
           if(updatedUserId == userId){
            setStatus(newStatus)
           }
        })
        return()=>{
            socket.off("statusUpdate")
        }

    },[userId])

    const handleClick = async()=>{
        if(status=="disconnect"){
            await handleRemoveConnection()
        }else if(status == "received"){
            navigate("/network")
        }else{
             handleSendConnection()
        }
    }

  return (
    <div>
      <button
        className="min-w-[100px] h-[40px] my-[30px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"onClick={handleClick} disabled={status=="pending"}>
        {status}
      </button>
    </div>
  );
};

export default ConnectionButton;
