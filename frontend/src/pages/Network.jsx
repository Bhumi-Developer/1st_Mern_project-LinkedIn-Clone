import React, { useEffect,useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import profile from "../assets/profile.jpeg"
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

function Network() {
    let [connections,setConnections] = useState([])

    const handleGetRequests = async()=>{
        try {
            let result = await axios.get(` https://linkedin-backend-wg07.onrender.com/api/connection/requests`,{withCredentials:true})
            setConnections(result.data)
        } catch (error) {
           console.log(error);
            
        }
    }
    const handleAcceptConnections = async(requestId)=>{
        try {
            let result = await axios.put(` https://linkedin-backend-wg07.onrender.com/api/connection/accept/${requestId}`,{},{withCredentials:true})
            setConnections(connections.filter((con)=>con._id==requestId))
        } catch (error) {
           console.log(error);
            
        }
    }
    const handleRejectConnections = async(requestId)=>{
        try {
            let result = await axios.put(` https://linkedin-backend-wg07.onrender.com/api/connection/reject/${requestId}`,{},{withCredentials:true})
            setConnections(connections.filter((con)=>con._id==requestId))
        } catch (error) {
           console.log(error);
            
        }
    }
    useEffect(()=>{
        handleGetRequests()
    },[])

  return (
    <div className='w-screen h-[100vh] bg-[#eeebda] pt-[100px] flex flex-col gap-[10px] items-center'>
        <Nav />
      <div className='w-full h-[100px] bg-white shadow-lg rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
            Invitations {connections.length}
      </div>
      {connections.length>0 &&  <div className='w-[100%] max-w-[900px] shadow-lg rounded-lg flex flex-col gap-[20px] min-h-[100px] bg-white'>
        {connections.map((connection,index)=>(
            <div className='w-full min-h-[100px] p-[20px] flex justify-between items-center'>
               <div className='flex justify-center items-center gap-[10px]'>
                <div className="w-[50px] h-[50px]rounded-full overflow-hidden cursor-pointer"><img src={connection.sender.profileImage || profile} className='w-full h-full rounded-full'/></div>
                <div className='text-[19px] font-semibold text-gray-700'>{`${connection.sender.firstname} ${connection.sender.lastname}`}</div>
                </div>
            <div>
                <button className='text-[#18c5ff] font-semibold' onClick={()=>handleAcceptConnections(connection._id)}>
                    <FaRegCheckCircle className='w-[37px] h-[37px]'/>
                     </button>
                <button className='text-[#ff4218] font-semibold' onClick={()=>handleRejectConnections(connection._id)}><RxCrossCircled className='w-[40px] h-[40px]'/></button>
            </div>
            <div></div>

                </div>
        ))}
      </div>}
     
    </div>
  )
}

export default Network
