import React from "react";

import "./UserDashBoard.css";

import SingleBlogPost from "../../components/BlogsContainer/SingleBlogPost";
import BlogsContainer from "../../components/BlogsContainer";
import Owner from "./owner";
import Visitor from "./visitor";

const UserDashboard = () => {
  return (
    <div className="user">
      <div className="user__top">
        <Owner />
        {/* <Visitor /> */}
        <div className="user__recentPost">
          <h2>Recent Post</h2>
          <SingleBlogPost />
        </div>
      </div>
      <div className="user__allPosts">
        <h2>All Posts</h2>
        <BlogsContainer />
      </div>
    </div>
  );
};

export default UserDashboard;
