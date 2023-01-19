import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUpload, AiOutlineDown, AiFillDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Likes from "./Likes";
import { likePost, update_post, get_posts } from "../../../actions/posts";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.authReducer.users);
  const clickedpost = posts.filter((post) => post._id === id);
  const [commentPost, setComment] = useState({
    id: user?.results._id,
    comment: "",
  });
console.log(clickedpost[0]);
  const handleComments = () => {
    if(user){
      dispatch(
      update_post(id, {
        ...clickedpost[0],
        comments: [...clickedpost[0]?.comments, commentPost],
      })
    );

    }
  };  

  const deleteComment = (i) => {
    const a = clickedpost[0]?.comments.splice(i, 1);
    dispatch(update_post(id, clickedpost[0]));
  };

  return (
    <>
      <div className="flex items-center md:items-start md:justify-center text-black w-[100%] md:w-[60%] flex-col-reverse md:flex-row m-auto mt-10 border-black rounded-md ">
        <div className="w-[80%] mr-3">
          <div className="flex items-center  w-[100%] md:px-4">
            <span
              className="flex left-2 rounded-full p-1"
              disabled={!user?.results}
              onClick={() => {
                dispatch(likePost(clickedpost[0]._id));
              }}
            >
              <Likes  post={clickedpost[0]} />
            </span>{" "}
            <span className="flex mb-1">
              <AiOutlineUpload size={19} /> 
            </span>
          </div>
          <div>{clickedpost[0]?.url}</div>
          <h1 className="text-3xl font-semibold mt-6">
            {clickedpost[0]?.title}
          </h1>
          <div className="mt-3 w-[100%]">{clickedpost[0]?.message} </div>
          <div>
            {users
              ?.filter((user) => user._id === clickedpost[0]?.creator)
              .map((u, i) => (
                <div className="flex items-center" key={i}>
                  <span>
                    {" "}
                    {u?.profileImg ? (
                      <img
                        className=" w-9 h-9 text-7xl border-2 rounded-full  flex justify-center "
                        src={u.profileImg}
                        alt=""
                      />
                    ) : (
                      <div className="bg-slate-200 w-9 h-9 text-8xl  rounded-full border-black flex items-center justify-center ">
                        <span>{user.results?.email[0].toUpperCase()}</span>{" "}
                      </div>
                    )}{" "}
                  </span>{" "}
                  <span className="text-xl font-semibold ml-2">{u.name}</span>
                </div>
              ))}
          </div>
          <div>
            <span className=" mt-6 mb-2 font-bold text-xl w-[100]  flex items-center">
              {" "}
              comments
            </span>
            {clickedpost[0]?.comments?.map((comment, i) => (
              <div className="border-2 w-[100%] border-black rounded-md md:w-3/4 mb-2 p-2" key={i}>
                <span className="flex font-medium border-b-2 ">
                  {users?.find(user=> user._id === comment.id).profileImg? (
                    <img
                      className=" w-9 h-9 text-7xl border-2 rounded-full  flex justify-center "
                      src={users?.find(user=> user._id === comment.id).profileImg}
                      alt=""
                    />
                  ) : (
                    <div className="bg-slate-200 w-9 h-9 text-8xl rounded-full border-black flex items-center justify-center ">
                      <span>{user?.results?.email[0].toUpperCase()}</span>{" "}
                    </div>
                  )}{" "}
                  {user?.results?.email}
                </span>
                <div className="flex justify-between p-2 w-[100%]">
                  <span className="md:w-[80%]">{comment.comment}</span>
                  {user?.results._id === comment.id && (
                    <span><AiFillDelete size={20} onClick={() => deleteComment(i)} /></span>
                  )}
                </div>{" "}
              </div>
            ))}
            <input
              onChange={(e) =>
                setComment({ ...commentPost, comment: e.target.value })
              }
              className="font-bold outline-none border-2 border-black w-[100%] md:w-[80%] p-2 rounded-full"
              type="text"
              placeholder="add comments"
            />
            <button
              onClick={handleComments}
              className="bg-[#851672] px-3 py-2 w-[40%] mt-2 md:ml-2  rounded-full text-white "
            >
              send
            </button>
          </div>
        </div>
        <div className="w-[80%] md:w-[50%]">
          <img
            className="w-[100%] sm:w-[100%] rounded md:rounded-r-lg "
            src={clickedpost[0]?.selectedFile}
            alt=""
          />{" "}
          {clickedpost?.title}
        </div>
      </div>
    
    </>
  );
}
