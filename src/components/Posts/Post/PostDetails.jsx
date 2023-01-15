import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUpload, AiOutlineDown } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Likes from "./Likes";
import { likePost, update_post } from "../../../actions/posts";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
 
  const posts = useSelector((state) => state.posts);
  const clickedpost = posts.filter((post) => post._id === id);
  const [commentPost, setComment] = useState([{id:user.results._id ,comment:''}]);
  console.log(commentPost);

  const handleComments = () => {
    dispatch(
      update_post(id, {
        ...clickedpost[0], comments: [...clickedpost[0].comments , commentPost],
      })
    );
  };


  return (
    <>
      <div className="flex justify-center text-black w-[100%] md:w-[60%] flex-col md:flex-row m-auto mt-10 border-black rounded-md ">
        <div className="w-[50%] mr-3">
          <div className="flex justify-between px-4">
            {" "}
            <span
              className="flex left-2 border-2 rounded-full p-1"
              disabled={!user?.results}
              onClick={() => {
                dispatch(likePost(clickedpost[0]._id));
              }}
            >
              <Likes post={clickedpost[0]} />
            </span>{" "}
            <span className="flex">
              <AiOutlineUpload /> <FiMoreHorizontal />{" "}
            </span>{" "}
          </div>
          <div>{clickedpost[0]?.url}</div>
          <h1 className="text-3xl font-semibold mt-6">
            {clickedpost[0]?.title}
          </h1>
          <div className="mt-3">{clickedpost[0]?.message} </div>
          <div>
            <span className=" mt-6 mb-2 font-bold text-xl  flex items-center">
              {" "}
              comments <AiOutlineDown className="mt-1" />
            </span>
            {/* <div>{clickedpost[0].comments.map(comment=>(
              <div className="px-2 py-4 border-2 mb-1 rounded-md">
                {comment}
              </div>
            ))}</div> */}
            <input
              onChange={(e) => setComment({...commentPost.comment , comment: e.target.value})}
              className="font-bold outline-none border-2 border-black w-[80%] p-2 rounded-full"
              type="text"
              placeholder="add comments"
            />
            <button
              onClick={handleComments}
              className="bg-[#851672] px-3 py-2 ml-2 rounded-full text-white "
            >
              send
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <img
            className="w-[100%] sm:w-[100%] rounded-r-lg "
            src={clickedpost[0]?.selectedFile}
            alt=""
          />{" "}
          {clickedpost?.title}
        </div>
      </div>
      <div className="text-center mt-10 font-extrabold">
        More content like this
      </div>
      <div></div>
    </>
  );
}
