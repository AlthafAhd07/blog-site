import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./UserDashBoard.css";

import { selectAuth } from "../../features/authSlice";
import { selectBlogs, setUserBlogs } from "../../features/blogSlice";
import { showErrMsg } from "../../features/alertSlice";

import BlogsContainer from "../../components/BlogsContainer";

import UserTop from "./userTop.js";
import Visitor from "./visitor";
import { getAllUserBlogsApi } from "../../api/blogApi";

const UserDashboard = () => {
  // blogs related to this user id , it can be the current user or any other user
  const [profileBlogs, setProfileBlogs] = useState(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const { user } = useSelector(selectAuth);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useGetUserBlogs(id, user, setLoadingBlogs, setProfileBlogs);

  return (
    <div className="user">
      {id === user?._id ? (
        <UserTop
          loadingBlogs={loadingBlogs}
          recentBlog={profileBlogs?.[0] || null}
        />
      ) : (
        <Visitor data={profileBlogs?.[0].author || {}} />
      )}

      <div className="user__allPosts">
        <h2>All Posts</h2>
        {!loadingBlogs && profileBlogs?.length < 1 && (
          <h3>You are not created a post yet...</h3>
        )}
        <BlogsContainer Blogs={profileBlogs} />
      </div>
    </div>
  );
};

export default UserDashboard;

function useGetUserBlogs(id, user, setLoadingBlogs, setProfileBlogs) {
  const { userBlogs } = useSelector(selectBlogs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id === id) {
      if (!!userBlogs) {
        setLoadingBlogs(false);
        setProfileBlogs(userBlogs);
      }
    }

    async function getUserBlogs() {
      try {
        const res = await getAllUserBlogsApi(id);
        setProfileBlogs(res.data);

        if (user?._id === id) {
          dispatch(setUserBlogs(res.data));
        }

        setLoadingBlogs(false);
      } catch (error) {
        setLoadingBlogs(false);
        dispatch(showErrMsg(error.response.data.msg));
      }
    }
    getUserBlogs();
  }, [id, user._id]);
}
