import React from "react";

import UserImg from "../author-3.png";

const Owner = () => {
  return (
    <div className="user__data">
      <h2>Althaf Ahamed</h2>
      <img src={UserImg} alt="" />
      <form className="user__form">
        <label htmlFor="username">Username :</label>
        <input type="text" id="username" />
        <label htmlFor="oldPassword">Old Password :</label>
        <input type="text" id="oldPassword" />
        <label htmlFor="newPassword">New Password :</label>
        <input type="text" id="newPassword" />
        <label htmlFor="confirmPassword">Confirm Password :</label>
        <input type="text" id="confirmPassword" />
        <button>Update Profile</button>
      </form>
    </div>
  );
};

export default Owner;
