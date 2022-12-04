import React from "react";
import { useNavigate } from "react-router-dom";

import "./authorData.css";

const AuthorData = ({ author }) => {
  const navigate = useNavigate();

  return (
    <section
      className="authorData"
      onClick={() => navigate(`/user/${author.userId}`)}
    >
      <img src={author?.avatar} alt="" />
      <div className="authorName">{author?.username}</div>
      <div className="authorProffesion">{author?.profession}</div>
    </section>
  );
};

export default AuthorData;
