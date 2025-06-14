import React from "react";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx"

function Notification() {
  let [notificationData, setNotificationData] = useState([]);

  const handleGetNotification = async () => {
    try {
      let result = await axios.get(
        "http://localhost:3000/api/notification/get",
        { withCredentials: true }
      );
      setNotificationData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledeleteNotification = async (id) => {
    try {
      let result = await axios.delete(
        `http://localhost:3000/api/notification/deleteone/${id}`,
        { withCredentials: true }
      );
      await handleGetNotification()
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearAllNotification = async () => {
    try {
      let result = await axios.delete(
        `http://localhost:3000/api/notification/deletemany`,
        { withCredentials: true }
      );
      await handleGetNotification()
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = (type)=>{
    if(type == "like"){
        return "liked your Post."
    }else if(type == "comment"){
        return "commented on your Post."
    }else{
        return "accepted your Request."
    }
  }

  useEffect(() => {
    handleGetNotification();
  });

  return (
    <div className="w-screen h-[100vh] bg-[#eeebda] pt-[100px] flex flex-col gap-[10px] items-center">
      <Nav />
      <div className="w-full h-[100px] bg-white shadow-lg rounded-lg flex items-center p-[10px] text-[22px] text-gray-600 gap-[10%]">
        <div>
        Notifications: {notificationData.length}
        </div>
        
       {notificationData.length >0 &&  <button className="min-w-[100px] h-[40px] rounded-full border-2 border-[#fe243e] text-[#fe243e]" onClick={handleClearAllNotification}>Clear All</button>}
        </div>
        {notificationData.length > 0 && (
          <div className="w-[100%] max-w-[900px] shadow-lg rounded-lg flex flex-col gap-[20px]   overflow-auto bg-white pt-10 pl-10 mb-10">
            {notificationData.map((noti, index) => (
              <div className="w-full min-h-[100px] pt-10 pb-10 flex justify-between items-center border-b-2 border-b-gray-200" key={index}>
                <div >
                <div className="flex justify-center items-center gap-[10px]">
                  <div className="w-[50px] h-[50px]rounded-full overflow-hidden cursor-pointer">
                    <img
                      src={noti.relatedUser.profileImage || profile}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="text-[19px] font-semibold text-gray-700">{`${noti.relatedUser.firstname} ${noti.relatedUser.lastname} ${handleMessage(noti.type)}`}</div>
                 
                
                
                </div>
                {noti.relatedPost && <div className="flex items-center gap-[10px] ml-[80px] min-h-[60px] overflow-hidden pt-[0px]">
                    <div className="w-[80px] h-[50px] overflow-hidden">
                        <img src={noti.relatedPost.image} className="h-full"/>
                        </div>
                        <div>{noti.relatedPost.description}</div>
                        <div>

                        </div>
                    </div>
                }</div>
                <div className="flex justify-center items-center gap-[10px]">
                     <RxCross1 className="w-[25px] h-[25px] text-gray-800 font-bold" onClick={()=>handledeleteNotification(noti._id)}/>
                </div>
               
              </div>
            ))}
          </div>
        )}
      </div>
    
  );
}

export default Notification;
