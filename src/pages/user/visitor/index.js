import React from "react";

const Visitor = ({ data }) => {
  const { username, avatar } = data;
  return (
    <div className="user__data">
      {username && <h2>{username}</h2>}
      {!username && (
        <div
          className="user_name skeleton-text skeleton"
          style={{ width: "270px" }}
        ></div>
      )}

      {!username && <div className="ProfileImg__skeleton"></div>}
      {avatar && <img src={avatar} alt="user profile" />}
    </div>
  );
};

export default Visitor;
