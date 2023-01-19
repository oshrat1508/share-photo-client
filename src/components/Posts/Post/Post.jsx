import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch ,useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { delete_post, likePost } from "../../../actions/posts";
import { fetchUsers } from "../../../api";
import Likes from "./Likes";

export default function Post({ post, setCurrentId, setShowForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.authReducer.users);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleEdit = () => {
    setCurrentId(post._id);
    setShowForm(true);
  };
  const flitered = users?.find((user) => user._id === post.creator);
  // useEffect(
  //   () => async () => {
  //     const { data } = await fetchUsers();
  //     setUsersData(data);
  //   },
  //   []
  // );

  return (
    <div className="text-transparent  hover:text-white ">
      {/* <div className="absolute top-0 right-14 bg-black b h-10 w-2 z-"></div> */}
      <img
        onClick={() => navigate(`/postDetails/${post._id}`)}
        className="w-[240px] rounded-xl "
        src={post.selectedFile}
        alt=""
      />
      <div className="h-0">
        {(user?.results?.googleId === post?.creator ||
          user?.results?._id === post?.creator) && (
          <>
            <button className="absolute top-2 right-4 " onClick={handleEdit}>
              <FiMoreHorizontal size={30} />
            </button>
            <button
              className="flex absolute top-3 right-14"
              onClick={() => {
                dispatch(delete_post(post._id));
              }}
            >
              <AiFillDelete size={22} />
            </button>
          </>
        )}
        <>
        <button
          className="flex absolute  top-2 left-2  p-1"
          disabled={!user?.results}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes   post={post} />
        </button>
        {/* <button className="flex  absolute  top-2 left-10 ">
          <AiOutlineUpload size={25} />
        </button> */}
        </>
      </div>
      {flitered &&
        (flitered.profileImg ? (
          <>
            <Link to={`profile/${flitered?._id}`}>
              <div className=" flex items-center text-black">
                <img
                  className=" mr-5 cursor-pointer bg-slate-200 w-10  h-10 text-center  rounded-full border-2  "
                  src={flitered.profileImg}
                  alt={flitered.name}
                />
                <span className="text-gray-700">{flitered.name}</span>
              </div>
            </Link>
          </>
        ) : (
          <Link to={`profile/${flitered?._id}`}>
            {" "}
            <div className="text-black flex items-center">
              <div className=" cursor-pointer text-black mr-5 bg-slate-200 w-9 h-9 text-center p-1 rounded-full border-2 border-black ">
                {flitered.email[0].toUpperCase()}
              </div>
              {flitered.name}{" "}
            </div>
          </Link>
        ))}
    </div>
  );
}
