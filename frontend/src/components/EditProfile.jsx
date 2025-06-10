import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { UserDataContext } from "../context/UserContext";
import  axios  from "axios";
import { useContext,useRef } from "react";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { MdOutlineCameraAlt } from "react-icons/md";

function EditProfile() {
  let { edit, setEdit, userData, setUserData } = useContext(UserDataContext);
  let [firstname,setFirstName] = useState(userData.firstname || "")
  let [lastname,setLastName] = useState(userData.lastname || "")
  let [username,setUserName] = useState(userData.username || "")
  let [headline,setHeadline] = useState(userData.headline || "")
  let [location,setLocation] = useState(userData.location || "")
  let [gender,setGender] = useState(userData.gender || "")
  let [skills,setSkills] = useState(userData.skills || [])
  let [newSkills,setNewSkills] = useState("")
  let [education,setEducation] = useState(userData.education || [])
  let [newEducation,setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: ""
  })
  let [experience,setExperience] = useState(userData.experience || [])
  let [newExperience,setNewExperience] = useState({
    title: "",
    company: "",
    description: ""
  })

  const addSkill = (e)=>{
    e.preventDefault()
    if(newSkills && !skills.includes(newSkills)){
      setSkills([...skills,newSkills])
    }
    setNewSkills("")
  }
  const addEducation = (e)=>{
    e.preventDefault()
    if(newEducation.college && newEducation.degree && newEducation.fieldOfStudy ){
      setEducation([...education,newEducation])
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: ""
    })
  }
  const addExperience = (e)=>{
    e.preventDefault()
    if(newExperience.title && newExperience.company && newExperience.description ){
      setExperience([...experience,newExperience])
    }
    setNewExperience({
      title: "",
    company: "",
    description: ""
    })
  }
  const removeSkill=(skill)=>{
    if(skills.includes(skill)){
      setSkills(skills.filter((s)=>s!==skill))
    }
  }
  const removeEducation=(edu)=>{
    if(education.includes(edu)){
      setEducation(education.filter((e)=>e!==edu))
    }
  }
  const removeExperience=(exp)=>{
    if(experience.includes(exp)){
      setExperience(experience.filter((ex)=>ex!==exp))
    }
  }
  let [frontendProfileImage,setFrontendProfileImage]= useState(userData.profileImage || profile)
  let [backendProfileImage,setBackendProfileImage]= useState()
  let [frontendCoverImage,setFrontendCoverImage]= useState(userData.coverImage || profile)
  let [backendCoverImage,setBackendCoverImage]= useState()
  let [saving,setSaving] = useState(false)

  const handleProfileImage = (e)=>{
    let file = e.target.files[0]
    setBackendProfileImage(file)
    setFrontendProfileImage(URL.createObjectURL(file))
  }

  const handleCoverImage = (e)=>{
    let file = e.target.files[0]
    setBackendCoverImage(file)
    setFrontendCoverImage(URL.createObjectURL(file))
  }

  const profileImage = useRef()
  const coverImage = useRef()

  const handleSaveProfile = async()=>{
    setSaving(true)
    try {
      let formdata = new FormData()
      formdata.append("firstname",firstname)
      formdata.append("lastname",lastname)
      formdata.append("username",username)
      formdata.append("headline",headline)
      formdata.append("location",location)
      formdata.append("skills",JSON.stringify(skills))
      formdata.append("education",JSON.stringify(education))
      formdata.append("experience",JSON.stringify(experience))

      if(backendProfileImage){
        formdata.append("profileImage",backendProfileImage)


        
      }
      if(backendCoverImage){
        formdata.append("coverImage",backendCoverImage)
      }
      let result = await axios.put("http://localhost:3000/api/user/updateprofile",formdata,{withCredentials:true})
      setUserData(result.data)
      setSaving(false)
      setEdit(false)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="w-full h-[100vh] fixed top-0  z-[100] flex justify-center items-center">

      <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage}/>
      <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage}/>
      <div className="w-full h-full bg-black opacity-[0.5] absolute"></div>
      <div className="w-[90%] max-w-[500px] h-[600px] bg-white relative z-[200] shadow-lg rounded-lg p-[10px] overflow-auto">
        <div
          className="absolute top-[20px] right-[20px]"
          onClick={() => setEdit(false)}
        >
          <RxCross1 className="w-[25px] h-[25px] text-gray-800 font-bold" />
        </div>

        <div className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden " onClick={()=>coverImage.current.click()}>
          <img src={frontendCoverImage} className="w-full"/>
           <MdOutlineCameraAlt className="absolute right-[40px] top-[155px] w-[25px] h-[25px] text-white cursor-pointer lg:left-[22%]"/>
        </div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden cursor-pointer items-center justify-center absolute top-[145px] left-[35px]" onClick={()=>profileImage.current.click()}>
          <img src={frontendProfileImage } className="h-full" />
        </div>
        <div className="w-[20px] h-[20px] bg-[#2dc0ff] absolute top-[189px] left-[100px] rounded-full flex justify-center items-center">
          <TiPlus className="text-white cursor-pointer" />
        </div>


        <div className="w-full flex flex-col items-center justify-center gap-[20px] mt-[35px]">
           <input type="text" placeholder="firstname" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" value={firstname} onChange={(e)=>setFirstName(e.target.value)}/> 
           <input type="text" placeholder="lastname" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" value={lastname} onChange={(e)=>setLastName(e.target.value)}/> 
           <input type="text" placeholder="username" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" value={username} onChange={(e)=>setUserName(e.target.value)}/> 
           <input type="text" placeholder="headline" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" value={headline} onChange={(e)=>setHeadline(e.target.value)}/> 
           <input type="text" placeholder="location" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" value={location} onChange={(e)=>setLocation(e.target.value)}/> 
           <input type="text" placeholder="gender (male/female/other)" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" value={gender} onChange={(e)=>setGender(e.target.value)}/> 

           <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
              <h1 className="text-[19px] font-semibold">Skills</h1>
              {skills && (<div className="flex flex-col gap-[10px]">
                {skills.map((skill,index)=>{
                  return <div key={index} className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center"><span>{skill}</span><RxCross1 className="w-[20px] h-[20px] text-gray-800 font-bold" onClick={()=>removeSkill(skill)} /></div>
                })}
                </div>)}
                <div className="flex flex-col gap-[10px] items-start">
                  <input type="text" placeholder="add new skill " value={newSkills} onChange={(e)=>setNewSkills(e.target.value)} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <button className="w-[90%] h-[40px] my-[10px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center ml-4 gap-[10px]"  onClick={addSkill}>Add</button>
                </div>
           </div>
           <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
              <h1 className="text-[19px] font-semibold">Education</h1>
              {education && (<div className="flex flex-col gap-[10px]">
                {education.map((edu,index)=>{
                  return <div key={index} className="w-full border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center">
                    <div>
                      <div>College: {edu.college}</div>
                      <div>Degree: {edu.degree}</div>
                      <div>Field Of Study: {edu.fieldOfStudy}</div>
                    </div>
                    
                    <RxCross1 className="w-[20px] h-[20px] text-gray-800 font-bold" onClick={()=>removeEducation(edu)} /></div>
                })}
                </div>)}
                <div className="flex flex-col gap-[10px] items-start">
                  <input type="text" placeholder="college " value={newEducation.college} onChange={(e)=>setNewEducation({...newEducation,college:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <input type="text" placeholder="degree " value={newEducation.degree} onChange={(e)=>setNewEducation({...newEducation,degree:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <input type="text" placeholder="field of study " value={newEducation.fieldOfStudy} onChange={(e)=>setNewEducation({...newEducation,fieldOfStudy:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <button className="w-[90%] h-[40px] my-[10px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center ml-4 gap-[10px]"  onClick={addEducation}>Add</button>
                </div>
           </div>
           <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
              <h1 className="text-[19px] font-semibold">Experience</h1>
              {experience && (<div className="flex flex-col gap-[10px]">
                {experience.map((experience,index)=>{
                  return <div key={index} className="w-full border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center">
                    <div>
                      <div>Title: {experience.title}</div>
                      <div>Company: {experience.company}</div>
                      <div>Description: {experience.description}</div>
                    </div>
                    
                    <RxCross1 className="w-[20px] h-[20px] text-gray-800 font-bold" onClick={()=>removeExperience(experience)} /></div>
                })}
                </div>)}
                <div className="flex flex-col gap-[10px] items-start">
                  <input type="text" placeholder="title " value={newExperience.title} onChange={(e)=>setNewExperience({...newExperience,title:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <input type="text" placeholder="company " value={newExperience.company} onChange={(e)=>setNewExperience({...newExperience,company:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <input type="text" placeholder="description " value={newExperience.description} onChange={(e)=>setNewExperience({...newExperience,description:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg" />
                  <button className="w-[90%] h-[40px] my-[10px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center ml-4 gap-[10px]"  onClick={addExperience}>Add</button>
                </div>
           </div>

            <button type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-full hover:bg-blue-700 transition" disabled={saving} onClick={handleSaveProfile}>{saving?"Loading...": "Save Profile"}</button>

        </div>

      </div>
    </div>
  );
}

export default EditProfile;
