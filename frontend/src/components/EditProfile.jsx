import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';

function EditProfile() {
  let {edit,setEdit,userData,setUserData} = useContext(UserDataContext)
  return (
    <div className='w-full h-[100vh] fixed top-0  z-[100] flex justify-center items-center'>
      <div className='w-full h-full bg-black opacity-[0.5] absolute'></div>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-white relative z-[200] shadow-lg rounded-lg p-[10px]'>
        <div className='absolute top-[20px] right-[20px]'onClick={()=>setEdit(false)}><RxCross1 className='w-[25px] h-[25px] text-gray-800 font-bold'/></div>

        <div className='w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden'>
          <img src=''/>

        </div>

      </div>
    </div>
  )
}

export default EditProfile
