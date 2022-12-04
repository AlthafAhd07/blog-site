import React, { useEffect, useState } from "react";
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
import { changeLoadingState, showSuccessMsg } from "../../features/alertSlice";
import SinglePostSkeleton from "../../components/skeleton/SinglePostSkeleton";

const UserDashboard = () => {
  const { user, access_token } = useSelector(selectAuth);
  const { userBlogs } = useSelector(selectBlogs);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetUserBlogs(user, userBlogs, setLoadingBlogs);

  async function handleLogOut() {
    try {
      dispatch(changeLoadingState(true));
      await axios.get("/api/user/logout", {
        headers: {
          Authorization: access_token,
        },
      });
      navigate("/");
      dispatch(logout());
      dispatch(showSuccessMsg("Logged out.."));
      dispatch(changeLoadingState(false));
    } catch (error) {
      dispatch(changeLoadingState(false));
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
          {loadingBlogs && <SinglePostSkeleton />}
          {!loadingBlogs && userBlogs?.length < 1 && <h3>No recent Posts..</h3>}
          {!loadingBlogs && !!userBlogs?.length && (
            <SingleBlogPost data={userBlogs?.[0]} />
          )}
        </div>
      </div>
      <div className="user__allPosts">
        <h2>All Posts</h2>
        {!loadingBlogs && userBlogs?.length < 1 && (
          <h3>You are not created a post yet...</h3>
        )}

        <BlogsContainer Blogs={userBlogs} />
      </div>
    </div>
  );
};

export default UserDashboard;

function useGetUserBlogs(user, userBlogs, setLoadingBlogs) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!!userBlogs?.length) {
      setLoadingBlogs(true);
    }

    async function getUserBlogs() {
      try {
        const res = await axios.get(`/api/AllUserBlogs/${user._id}`);
        dispatch(setUserBlogs(res.data));

        setLoadingBlogs(false);
      } catch (error) {
        setLoadingBlogs(false);
        console.log(error);
      }
    }
    getUserBlogs();
  }, [user]);
}
