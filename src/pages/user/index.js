import React, { useEffect } from "react";
import axios from "axios";

import "./UserDashBoard.css";

import SingleBlogPost from "../../components/BlogsContainer/SingleBlogPost";
import BlogsContainer from "../../components/BlogsContainer";
import Owner from "./owner";
import Visitor from "./visitor";

import { useDispatch, useSelector } from "react-redux";

import { logout, selectAuth } from "../../features/authSlice";
import { selectBlogs, setUserBlogs } from "../../features/blogSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, access_token } = useSelector(selectAuth);
  const { userBlogs } = useSelector(selectBlogs);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetUserBlogs(user);

  async function handleLogOut() {
    try {
      await axios.get("/api/user/logout", {
        headers: {
          Authorization: access_token,
        },
      });
      navigate("/");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user">
      <div className="user__top">
        <Owner user={user} access_token={access_token} />
        {/* <Visitor /> */}
        <div className="user__recentPost">
          <button
            className="createPost__button"
            onClick={() => navigate("/createBlog")}
          >
            Create Post
          </button>
          <button
            className="createPost__button logout__button "
            onClick={handleLogOut}
          >
            Log out
          </button>
          <h2>Recent Post</h2>
          {userBlogs.length < 1 && <h3>No recent Posts..</h3>}
          <SingleBlogPost data={userBlogs[0]} />
        </div>
      </div>
      <div className="user__allPosts">
        <h2>All Posts</h2>
        {userBlogs.length < 1 && <h3>You are not created a post yet...</h3>}

        <BlogsContainer Blogs={userBlogs} />
      </div>
    </div>
  );
};

export default UserDashboard;

function useGetUserBlogs(user) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserBlogs() {
      try {
        const res = await axios.get(`/api/AllUserBlogs/${user._id}`);
        dispatch(setUserBlogs(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    getUserBlogs();
  }, [user]);
}
