import React from "react";

import "./BlogsContainer.css";
import SingleBlogPost from "./SingleBlogPost";

const BlogsContainer = () => {
  return (
    <div className="BlogsContainer">
      <SingleBlogPost />
      <SingleBlogPost />
      <SingleBlogPost />
      <SingleBlogPost />
    </div>
  );
};

export default BlogsContainer;
