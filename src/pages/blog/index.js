import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./blogWrapper.css";

import { selectBlogs } from "../../features/blogSlice";
import { changeLoadingState, showErrMsg } from "../../features/alertSlice";

import Comments from "./comments";
import Blog from "./main/Blog";

import { getSinlgeBlogApi } from "../../api/blogApi";

const BlogWrapper = () => {
  const [blog, setBlog] = useState(null);

  useGetBlog(setBlog);

  return (
    <div className="BlogWrapper">
      <Blog blog={blog} />
      {!!blog && (
        <Comments
          comments={blog?.comments}
          blogId={blog?._id}
          setBlog={setBlog}
        />
      )}
    </div>
  );
};

export default BlogWrapper;

function useGetBlog(setBlog) {
  const { id } = useParams();

  const { allBlogs, userBlogs } = useSelector(selectBlogs);

  const dispatch = useDispatch();

  useEffect(() => {
    // here if the blog in all blogs , It will immediate show to the user and also it refetch in the background and set again ( comments may be changed ) [ performance + upto date data ]
    let concated = [];

    if (allBlogs) {
      concated = allBlogs.concat(userBlogs);
    }

    const checkInLocal = concated.find((blog) => blog._id === id);

    if (checkInLocal) {
      setBlog(checkInLocal);
    }

    async function getSingleBlog() {
      try {
        if (!checkInLocal) {
          dispatch(changeLoadingState(true));
        }
        const res = await getSinlgeBlogApi(id);
        setBlog(res.data);
        dispatch(changeLoadingState(false));
      } catch (error) {
        dispatch(changeLoadingState(false));
        dispatch(showErrMsg(error.response.data.msg));
      }
    }
    getSingleBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
}
