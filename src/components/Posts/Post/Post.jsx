import React from "react";
import { useState ,} from "react";
import { useEffect } from "react";
import {
  AiOutlineHeart,
  AiFillDelete,
  AiFillHeart,
  AiOutlineUpload,
} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
import { delete_post, likePost } from "../../../actions/posts";
import { fetchUsers } from "../../../api";
import Likes from "./Likes";






export default function Post({ post, setCurrentId, setShowForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleEdit = () => {
     setCurrentId(post._id)
     setShowForm(true);
  };
  const flitered = usersData?.find((user) => user._id === post.creator);
  useEffect(
    () => async () => {
      const { data } = await fetchUsers();
      setUsersData(data);
    },
    []
  );

  return (
    <div className="">
      <img
        onClick={() => navigate(`/postDetails/${post._id}`)}
        className="w-[240px] rounded-xl "
        src={post.selectedFile}
        alt=""
      />
      <div className="flex text-white ">
        {(user?.results?.googleId === post?.creator ||
          user?.results?._id === post?.creator) && (
          <>
            <button
              className="absolute top-4 right-4"
              onClick={handleEdit}
            >
              <FiMoreHorizontal size={30} />
            </button>
            <button
              className="flex absolute bottom-10 right-3"
              onClick={() => {
                dispatch(delete_post(post._id));
              }}
            >
              <AiFillDelete size={22} />
            </button>
          </>
        )}
        <button
          className="flex absolute  bottom-10 left-2 border-2 rounded-full p-1"
          disabled={!user?.results}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes post={post} />
        </button>
        <button className="flex absolute bottom-11 left-16">
          <AiOutlineUpload size={25} />
        </button>
      </div>
      {flitered &&
        (flitered.profileImg ? (
          <>
            <Link to={`profile/${flitered?._id}`}><div className=" flex items-center text-black">
              <img
                className=" mr-5 cursor-pointer bg-slate-200 w-10  h-10 text-center  rounded-full border-2  "
                src={flitered.profileImg}
                alt={flitered.name}
              />
            <span className="text-gray-700">{flitered.name}</span>  
            </div></Link>
          </>
        ) : (
          <Link to={`profile/${flitered?._id}`}> <div className="text-black flex items-center">
            <div className=" cursor-pointer text-black mr-5 bg-slate-200 w-9 h-9 text-center p-1 rounded-full border-2 border-black ">
              {flitered.email[0].toUpperCase()}
            </div>
            {flitered.name}{" "}
          </div></Link>
        ))}

        
    </div>
  );
}
