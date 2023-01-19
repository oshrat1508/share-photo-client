import React from "react";
import { useState, useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { useNavigate, useParams , } from "react-router-dom";
import Post from "../Posts/Post/Post";
import PinterestGrid from "rc-pinterest-grid";
import { fetchUsers } from "../../api";
import { follow_user } from "../../actions/auth";

export default function ProfilePage({ setCurrentId, setShowForm }) {
  const { id } = useParams();
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const users = useSelector((state) => state.authReducer.users);

  console.log( useSelector((state) => state).authReducer.users);
const dispatch = useDispatch()
  
const userProfile = users?.filter((user) => user._id === id);


  const navigate = useNavigate();
  const [myPic, setmyPic] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const posts = useSelector((state) => state.posts);
   const [userFollowing]  = useState(users?.length > 0 ? users?.filter(user=>user?.follow.find(follow=> follow === userProfile[0]?._id)).length : '0')
   const handleMyPic = () => {
    setmyPic(true);
    setLiked(false);
    setSaved(false);
  };
  const handleLike = () => {
    setmyPic(false);
    setLiked(true);
    setSaved(false);
  };
  const handleSaved = () => {
    setmyPic(false);
    setLiked(false);
    setSaved(true);
  };

  const grid =[
    { minScreenWidth: 0,
      maxScreenWidth: 500,
      columns: 2,
      columnWidth: 160,}]
  

  return (
    <div className="flex justify-center ">
      <div className="flex justify-center flex-col items-center m-10">
        {userProfile ? 
        <>
        <div className="m-5 flex ">
          {userProfile[0]?.profileImg ? (
            <img
              className=" w-36 h-36 text-7xl border-2 rounded-full  flex justify-center "
              src={userProfile[0].profileImg}
              alt=""
            />
          ) : (
            <div className="bg-slate-200 w-36 h-36 text-8xl  rounded-full border-black flex items-center justify-center ">
              <span>{userProfile[0]?.email[0].toUpperCase()}</span>{" "}
            </div>
          )}
        </div>
        <div className="mb-2">{userProfile[0]?.email}</div>
        <div className="mb-2">{userProfile[0]?.name}</div>
        <div className="mb-2">{userProfile[0]?.description}description:</div>
        <div onClick={() => {
            dispatch(follow_user(userProfile[0]?._id))
          }} className="p-2 cursor-pointer bg-[#47083d] text-white font-medium rounded-full mb-5">
           follow{userProfile[0]?.follow.find(follow => follow === user.results._id)&&
            'ing'
            }
        </div>
        <div className="mb-2">
         {userFollowing} followering | {userProfile[0]?.follow?.length} followers
        </div>
        {id === user?.results._id ? (
          <div
            onClick={() => navigate(`/edit/${userProfile[0]}`)}
            className="p-2 cursor-pointer bg-[#69135B] text-white font-medium rounded mb-11"
          >
            {" "}
            Edit profile
          </div>
        ) : null}
        <div className="font-bold flex justify-between w-40 mb-2">
          {" "}
          {/* <span
            onClick={handleSaved}
            className="cursor-pointer"
            style={saved ? { borderBottom: "solid 2px" } : null}
          >
            saved
          </span>{" "} */}
          <span
            onClick={handleLike}
            className="cursor-pointer"
            style={liked ? { borderBottom: "solid 2px" } : null}
          >
            liked
          </span>
          <span
            onClick={handleMyPic}
            className="cursor-pointer"
            style={myPic ? { borderBottom: "solid 2px" } : null}
          >
            my Pic
          </span>
        </div>
        <div className="flex justify-evenly flex-wrap">
          {myPic && (
            <PinterestGrid
              columns={4} // how many columns in one row
              columnWidth={240} // width of each block
              gutterWidth={10} // horizontal gutter between each block
              gutterHeight={10} // vertical gutter between each block
              responsive={{customBreakPoints: grid}}    
              >
              {posts
                ?.filter((post) => post.creator === userProfile[0]?._id)
                .map((post, i) => (
                  <div key={i}>
                    <Post post={post} setShowForm={setShowForm}
                setCurrentId={setCurrentId}/>
                  </div>
                ))}
            </PinterestGrid>
          )}
          {liked && (
            <PinterestGrid
              columns={4} // how many columns in one row
              columnWidth={240} // width of each block
              gutterWidth={10} // horizontal gutter between each block
              gutterHeight={10} // vertical gutter between each block
              responsive={{customBreakPoints: grid}}    
              >
              {posts
                ?.filter((post) =>
                  post?.likes?.find((like) => like === userProfile[0]?._id)
                )
                .map((post, i) => (
                  <div key={i}>
              <Post
                post={post}
                setShowForm={setShowForm}
                setCurrentId={setCurrentId}
              />
            </div>
                ))}
            </PinterestGrid>
          )}
        </div>
      </>: " loading ..."}</div>
    </div>
  );
}
