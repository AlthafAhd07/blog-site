import React from "react";

import "./singleBlogPost.css";

import CategoryAndDate from "../../CategoryAndDate";
import AuthorData from "../../authorData";

import Thumbnail from "./thumnail.png";

const SingleBlogPost = ({ index }) => {
  return (
    <div className="singleBlogPost">
      <img src={Thumbnail} alt="" />
      <div className="postData">
        <CategoryAndDate />
        <h2>How to design a product that can grow itself 10x in year</h2>
        <p>
          Auctor Porta. Augue vitae diam mauris faucibus blandit elit per,
          feugiat leo dui orci. Etiam vestibulum. Nostra netus per conubia
          dolor.
        </p>
        <AuthorData />
      </div>
    </div>
  );
};

export default SingleBlogPost;
