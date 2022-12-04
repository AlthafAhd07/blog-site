import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

import { CheckTokenEx } from "../../../utils/checkTokenExpiration";

const UserTop = ({ loadingBlogs, recentBlog }) => {
  const { user, access_token } = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogOut() {
    try {
      dispatch(changeLoadingState(true));

      const token = await CheckTokenEx(access_token, dispatch);

      await axios.get("/api/user/logout", {
        headers: {
          Authorization: token,
        },
      });
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
      <Owner user={user} access_token={access_token} />
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
        {!loadingBlogs && !!!recentBlog && <h3>No recent Posts..</h3>}
        {!loadingBlogs && !!recentBlog && <SingleBlogPost data={recentBlog} />}
      </div>
    </div>
  );
};

export default UserTop;
