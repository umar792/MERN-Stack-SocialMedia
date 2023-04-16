import React, { useEffect } from "react";
import "./Home.css";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useUserContextApi } from "../../contextApi/Context/Usercontext";
import Userpage from "../User/Userpage";
import Post from "../Post/Post";

const Home = () => {
    const {user,loading,Alluser,posts} = useUserContextApi();
    return loading === true ? (
        <Loader />
      ) : (
        <div className="home">
          <div className="homeleft">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post._id}
                  postId={post._id}
                  caption={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.Author.url}
                  ownerName={post.Author.name}
                  ownerId={post.Author._id}
                />
              ))
            ) : (
              <Typography variant="h6">No posts yet</Typography>
            )}
          </div>
          <div className="homeright">
            {Alluser && Alluser.length > 0 ? (
              Alluser.map((user) => (
                <Userpage
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              ))
            ) : (
              <Typography>No Users Yet</Typography>
            )}
          </div>
        </div>
      );
    };
    

export default Home
