import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import {
  AiOutlineSearch,
  AiFillPlusCircle,
  AiFillHome, AiOutlineLogout,AiOutlineLogin
} from "react-icons/ai";
import Logo from "../Img/LOGO.png";
import Form from "../Form/Form";

export default function Navbar({setShowForm ,showForm , currentId ,setCurrentId ,setSearch}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isOpen, setIsOpen] = useState(false);
  const [searchResponsive, setSearchResponsive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="flex items-center w-[100%] md:static fixed bottom-0 z-40
     justify-between m-auto p-3 bg-white ">
      <div>
        {user ? (
          <div className="flex items-center justify-around md:justify-between w-[110px] md:w-[160px] ">
          <button
            onClick={() =>logOut()}
            className=" border-4 text-[#4d1644]  px-2 md:px-4 py-2  rounded-full font-bold"
          >
           <span className="hidden md:flex ">Log out</span> 
            <AiOutlineLogout className=" flex md:hidden"/>          </button>
            
            
            <div onClick={() => navigate(`/profile/${user.results._id}`)} className="ml-2 flex flex-col items-center">
              {user.results.profileImg ? (
                <img  className=" cursor-pointer bg-slate-200 w-10 h-10 text-center  rounded-full border-2  " src={user.results.profileImg} alt={user.results.name} />
              ) : (
                <div
                 
                  className=" cursor-pointer bg-slate-200 w-9 h-9 text-center p-1 rounded-full border-2 border-black "
                >
                  {user.results.email[0].toUpperCase()}
                </div>
              )}
            </div>
          
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className=" border-2 text-white bg-[#851672] px-4 py-2  rounded-md font-bold"
          >
           <span className="hidden md:flex">Sing In</span> 
            <AiOutlineLogin className=" flex md:hidden"/>
          </button>
        )}
      </div>

     
      <div>
        <div
          onClick={()=>{setShowForm(!showForm)
            setCurrentId(null)}}
          className="flex md:items-center border-2 text-white bg-[#69135B] p-3 md:px-4 md:py-2 rounded-md font-bold"
        >
         <span className="md:flex hidden">pic</span>  <AiFillPlusCircle className="md:mt-1 md:ml-1" />
        </div>
      </div>
       <div className="flex items-center md:border-2 md:px-2 md:py-1 md:w-[70%] rounded-2xl md:bg-slate-100">
        <AiOutlineSearch onClick={()=>setSearchResponsive(!searchResponsive)} className="mr-2 text-xl mt-1" />
        {searchResponsive ? <input 
        onChange={(e)=>setSearch(e.target.value)}
          className="outline-none absolute bottom-[57px] left-0 h-10 text-black w-[100%] bg-gray-200 rounded-t-md "
          placeholder="search"
          type="text"
        /> :null}
        <input 
        onChange={(e)=>setSearch(e.target.value)}
          className="outline-none w-[98%] bg-transparent hidden md:flex"
          placeholder="search"
          type="text"
        />
      </div>
      <div
        style={{ boxShadow: "0 3px 10px rgba(204,42,278,0.95" }}
        onClick={() => navigate("/")}
        className=" cursor-pointer  border-[#69135B] font-medium px-2 py-2 rounded-full"
      >
        <span className="hidden md:flex">Home</span> 
        <AiFillHome className=" flex md:hidden"/>
      </div>
      <div className=" text-4xl font-bold w-14 hidden md:flex">
        <img className="rounded-full" src={Logo} alt="LOGO" />
      </div>

      {showForm &&
      <Form currentId={currentId} setShowForm={setShowForm}/>
      }
    </div>
  );
}
