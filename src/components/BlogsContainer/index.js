import React from "react";

import "./BlogsContainer.css";

import SingleBlogPost from "./SingleBlogPost";
import SinglePostSkeleton from "../skeleton/SinglePostSkeleton";

const BlogsContainer = ({ Blogs }) => {
  const allBlogs = Blogs?.map((blog) => {
    return <SingleBlogPost key={blog._id} data={blog} />;
  });

  const skeletonBlogs = sketonCount.map((c) => {
    return <SinglePostSkeleton key={c} />;
  });

  return (
    <div className="BlogsContainer">
      {!!Blogs.length ? allBlogs : skeletonBlogs}
    </div>
  );
};

export default BlogsContainer;

const sketonCount = [1, 2, 3, 4, 5, 6];
