import React from "react";

import "./blog.css";

import CategoryAndDate from "../../../components/CategoryAndDate";
import AuthorData from "../../../components/authorData";

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <CategoryAndDate category={blog?.category} date={blog?.updatedAt} />
      <h1>{blog?.title}</h1>
      <AuthorData author={blog?.author} />
      {blog?.thumbnail && (
        <img className="author__thumbnail" src={blog?.thumbnail} alt="" />
      )}
      <pre>{blog?.description}</pre>
    </div>
  );
};

export default Blog;
