import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./userTop.css";

import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../../features/alertSlice";
import { logout, selectAuth } from "../../../features/authSlice";

import Owner from "../owner";

import SinglePostSkeleton from "../../../components/skeleton/SinglePostSkeleton";
import SingleBlogPost from "../../../components/BlogsContainer/SingleBlogPost";

import { logoutApi } from "../../../api/authApi";

const UserTop = ({ loadingBlogs, recentBlog }) => {
  const { user } = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogOut() {
    try {
      dispatch(changeLoadingState(true));

      await logoutApi();
      navigate("/");
      dispatch(logout());
      dispatch(showSuccessMsg("Logged out.."));
      dispatch(changeLoadingState(false));
    } catch (error) {
      dispatch(changeLoadingState(false));
      dispatch(showErrMsg(error.response.data.msg));
    }
  }

  return (
    <div className="user__top">
      <Owner user={user} />
      <div className="user__recentPost">
        <button
          className="createPost__button"
          onClick={() => navigate("/createBlog")}
        >
          Create Blog
        </button>
        <button
          className="createPost__button logout__button "
          onClick={handleLogOut}
        >
          Log out
        </button>
        <h2>Recent Post</h2>
        {loadingBlogs && <SinglePostSkeleton />}
        {!loadingBlogs && !!!recentBlog && <h3>No recent Posts..</h3>}
        {!loadingBlogs && !!recentBlog && <SingleBlogPost data={recentBlog} />}
      </div>
    </div>
  );
};

export default UserTop;
