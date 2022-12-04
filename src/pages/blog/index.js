import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import "./blogWrapper.css";

import Comments from "./comments";
import { selectBlogs } from "../../features/blogSlice";
import Blog from "./main/Blog";

const BlogWrapper = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const { allBlogs, userBlogs } = useSelector(selectBlogs);

  const concated = allBlogs.concat(userBlogs);

  useEffect(() => {
    // here if the blog in all blogs , It will immediate show to the user and also it refetch in the background and set again ( comments may be changed ) [ performance + upto date data ]

    const checkInLocal = concated.find((blog) => blog._id === id);

    if (checkInLocal) {
      setBlog(checkInLocal);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    async function getSingleBlog() {
      try {
        const res = await axios.get(`/api/specificBlog/${id}`);
        setBlog(res.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.log(error);
      }
    }
    getSingleBlog();
  }, []);

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
