import React from "react";

import "./authorData.css";

import Author from "./author-3.png";

const AuthorData = () => {
  return (
    <section className="authorData">
      <img src={Author} alt="" />
      <div className="authorName">Jenny Wilson</div>
      <div className="authorProffesion">Product Designer</div>
    </section>
  );
};

export default AuthorData;
