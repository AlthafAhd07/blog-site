import React from "react";

import "./authorData.css";

const AuthorData = ({ author }) => {
  return (
    <section className="authorData">
      <img src={author?.avatar} alt="" />
      <div className="authorName">{author?.username}</div>
      <div className="authorProffesion">{author?.profession}</div>
    </section>
  );
};

export default AuthorData;
