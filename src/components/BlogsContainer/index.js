import React from "react";

import "./BlogsContainer.css";

import SingleBlogPost from "./SingleBlogPost";

const BlogsContainer = ({ Blogs }) => {
  return (
    <div className="BlogsContainer">
      {Blogs?.map((blog) => {
        return <SingleBlogPost key={blog._id} data={blog} />;
      })}
    </div>
  );
};

export default BlogsContainer;
