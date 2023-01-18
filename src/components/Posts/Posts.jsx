import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import PinterestGrid from "rc-pinterest-grid";

export default function Posts({ setCurrentId, setShowForm, search }) {
  const posts = useSelector((state) => state.posts);

  const grid =[
    { minScreenWidth: 0,
      maxScreenWidth: 500,
      columns: 2,
      columnWidth: 160,}]
  

  return (
    <div className="flex  w-[100%] justify-center mt-12">
      {!posts.length ? (
        <TailSpin
          height="80"
          width="80"
          radius="9"
          color="black"
          ariaLabel="loading"
          wrapperStyle
        />
      ) : (
        <PinterestGrid
        columns={6}            
        columnWidth={240}      
        gutterWidth={10}       
        gutterHeight={10}  
        responsive={{customBreakPoints: grid}}    

        >
          {posts
            .filter((post) => {
              if (search == "") {
                return post;
              } else if (
                post.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post, i) => (
              <div key={i}>
                <Post
                  className="bg-black"
                  post={post}
                  setShowForm={setShowForm}
                  setCurrentId={setCurrentId}
                />
              </div>
            ))}
        </PinterestGrid>
      )}
    </div>
  );
}
