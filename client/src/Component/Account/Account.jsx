import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Account.css";
import { useUserContextApi } from "../../contextApi/Context/Usercontext";
import Post from "../Post/Post";
import Userpage from "../User/Userpage";

const Account = () => {

    const {loading,user,Myposts,mypostsdata,myprofile} =useUserContextApi();
console.log(user);
  const [followersToggle, setFollowersToggle] = useState(false);

  const [followingToggle, setFollowingToggle] = useState(false);
  const logoutHandler = () => {
    // dispatch(logoutUser());
    // alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    // await dispatch(deleteMyProfile());
    // dispatch(logoutUser());
  };

  useEffect(() => {
    // dispatch(getMyPosts());
    Myposts()
    myprofile()
  }, []);

  


  return loading === true  ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {mypostsdata && mypostsdata.length > 0   ? (
          mypostsdata.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.Author.avatar.url}
              ownerName={post.Author.name}
              ownerId={post.Author._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>
      {
        user &&   <div className="accountright">
        <Avatar
          src={user && user.avatar && user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.follower.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          // disabled={deleteLoading}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length &&  user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <Userpage
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <Userpage
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
      }
      
    </div>
  );
};

export default Account
