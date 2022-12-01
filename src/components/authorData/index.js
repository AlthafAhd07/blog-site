import React from "react";

import "./authorData.css";

import Author from "./author-3.png";

const AuthorData = () => {
  return (
    <div className="authorData">
      <img src={Author} alt="" />
      <span>Jenny Wilson</span>
      <span>Product Designer</span>
    </div>
  );
};

export default AuthorData;
