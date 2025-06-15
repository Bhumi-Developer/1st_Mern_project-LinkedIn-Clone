import React, { useContext, useEffect } from "react";
import profile from "../assets/profile.jpeg";
import moment from "moment";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { AiFillLike } from "react-icons/ai";
import { LuSendHorizontal } from "react-icons/lu";
import ConnectionButton from "./ConnectionButton";
import { socket } from "../context/UserContext";

function Post({ id, author, like, comment, description, image, createdAt}) {
  let { userData, setUserData, getPost,profileData,setProfileData,handleGetProfile } = useContext(UserDataContext);
  let [more, setMore] = useState(false);
  let [likes, setLikes] = useState([]);
  let [commentContent, setCommentContent] = useState("");
  let [comments, setComments] = useState([]);
  let [showComment,setShowComment] = useState(false)

  const handleLike = async () => {
    try {
      let result = await axios.post(
        ` https://linkedin-backend-wg07.onrender.com/api/post/like/${id}`,
        {},
        { withCredentials: true }
      );
      setLikes(result.data.like);
      setCommentContent("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        ` https://linkedin-backend-wg07.onrender.com/api/post/comment/${id}`,
        { content: commentContent },
        { withCredentials: true }
      );
      setComments(result.data.comment);
      setCommentContent("")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    socket.on("likeUpdated",({postId,likes})=>{
      if(postId==id){
        setLikes(likes)
      }
    })
    socket.on("commentAdded",({postId,comm})=>{
      if(postId==id){
        setComments(comm)
      }
    })
    return ()=>{
      socket.off("likeUpdated")
      socket.off("commentAdded")
    }
  },[id])
  useEffect(()=>{
    setLikes(like)
    setComments(comment)
  },[like,comment])

  return (
    <div className="w-full min-h-[200px] bg-white rounded-lg shadow-lg p-[20px] flex flex-col gap-[20px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-start gap-[10px] " onClick={()=>handleGetProfile(author.username)} >
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer items-center justify-center flex ">
            <img src={author.profileImage || profile} className="h-full" />
          </div>
          <div>
            <div className="text-[22px] font-semibold">{`${author.firstname} ${author.lastname}`}</div>
            <div className="text-[16px]">{author.headline}</div>
            <div className="text-[16px]">{moment(createdAt).fromNow()}</div>
          </div>
        </div>
        <div>
          {userData._id!=author._id && <ConnectionButton userId={author._id}/>}
        </div>
      </div>
      <div
        className={`w-full ${
          !more ? "max-h-[100px] overflow-hidden" : ""
        } pl-[50px]`}
      >
        {description}
      </div>
      <div
        className="pl-[50px] text-[19px] font-semibold cursor-pointer"
        onClick={() => setMore((prev) => !prev)}
      >
        {more ? "Read less" : "Read more.."}
      </div>
      {image && (
        <div className="w-full h-[300px] overflow-hidden flex justify-center rounded-lg">
          <img src={image} alt="" className="h-full rounded-lg" />
        </div>
      )}
      <div>
        <div className="w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500">
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <AiOutlineLike className="text-[#2dc0ff] w-[20px] h-[20px]" />
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center justify-center gap-[5px] text-[18px] cursor-pointer">
            <span onClick={()=>setShowComment(prev=>!prev)}>
              {comment.length} <span>comments</span>
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center w-full p-[20px] gap-[20px]">
          {!likes.includes(userData._id) && (
            <div
              className="flex justify-center items-center gap-[5px] cursor-pointer"
              onClick={handleLike}
            >
              <AiOutlineLike className="w-[24px] h-[24px]" />
              <span>Like</span>
            </div>
          )}
          {likes.includes(userData._id) && (
            <div
              className="flex justify-center items-center gap-[5px] cursor-pointer "
              onClick={handleLike}
            >
              <AiFillLike className="w-[24px] h-[24px] text-[#2dc0ff]" />
              <span className="text-[#2dc0ff] font-semibold">Liked</span>
            </div>
          )}
          <div className="flex justify-center items-center gap-[5px] cursor-pointer" onClick={()=>setShowComment(prev=>!prev)}>
            <FaRegCommentDots className="w-[24px] h-[24px]" />
            <span>Comment</span>
          </div>
        </div>
        {showComment && <div>
          <form
            className="w-full flex justify-between items-center border-b-2 border-b-gray-300 p-[10px]"
            onSubmit={handleComment}
          >
            <input
              type="text"
              placeholder="leave a comment"
              className="outline-none border-none"
              onChange={(e) => setCommentContent(e.target.value)}
              value={commentContent}
            />
            <button>
              <LuSendHorizontal className="text-[#2dc0ff] w-[22px] h-[22px]" />
            </button>
          </form>
          <div className="flex flex-col gap-[20px]">
            {comments.map((com) => {
                // console.log(com.user)
              return (
                <div
                  key={com._id}
                  className="flex flex-col gap-[20px] border-b-2 p-[20px] border-b-gray-300"
                >
                  <div className="w-full flex justify-start items-center gap-[10px]">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
                      <img
                        src={com.user.profileImage || profile}
                        className="h-full"
                      />
                    </div>
                   <div>
                   <div className="text-[16px] font-semibold">
                      {`${com.user.firstname || ""} ${
                        com.user?.lastname || ""
                      }`}
                      {/* <div>{moment(com.createdAt).fromNow()}</div> */}
                    </div>
                   </div>
                  </div>
                  <div className="pl-[50px]">{com.content}</div>
                </div>
              );
            })}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Post;
