import axios from "axios";
import React, { useState } from "react";

import UserImg from "../author-3.png";

const Owner = ({ user, access_token }) => {
  const [username, setUserName] = useState(() => user.username);
  const [profession, setProfession] = useState(() => user.profession);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  async function HandleUpdate(e) {
    e.preventDefault();
    if (
      !isValidInput(
        username,
        profession,
        oldPassword,
        newPassword,
        confirmPassword
      )
    )
      return;
    try {
      const res = await axios.put(
        "/api/user/updateProfile",
        { username, profession, oldPassword, newPassword, confirmPassword },
        {
          headers: { Authorization: access_token },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user__data">
      <h2>{user.username}</h2>
      <img src={user.avatar} alt="" />
      <form className="user__form" onSubmit={HandleUpdate}>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          value={username ?? ""}
          onInput={({ target }) => {
            setUserName(target.value);
          }}
        />
        <label htmlFor="profession">profession :</label>
        <input
          type="text"
          id="profession"
          value={profession ?? ""}
          onInput={({ target }) => {
            setProfession(target.value);
          }}
        />
        <label htmlFor="oldPassword">Old Password :</label>
        <input
          type="text"
          id="oldPassword"
          onInput={({ target }) => {
            setOldPassword(target.value);
          }}
        />
        <label htmlFor="newPassword">New Password :</label>
        <input
          type="text"
          id="newPassword"
          onInput={({ target }) => {
            setNewPassword(target.value);
          }}
        />
        <label htmlFor="confirmPassword">Confirm Password :</label>
        <input
          type="text"
          id="confirmPassword"
          onInput={({ target }) => {
            setconfirmPassword(target.value);
          }}
        />
        <button>Update Profile</button>
      </form>
    </div>
  );
};

export default Owner;

function isValidInput(
  username,
  profession,
  oldPassword,
  newPassword,
  confirmPassword
) {
  if (
    !(username || profession || oldPassword || newPassword || confirmPassword)
  )
    return false;

  if (newPassword.length > 0) {
    if (!oldPassword.length > 0) return false;
    if (!confirmPassword.length > 0) return false;

    if (newPassword !== confirmPassword) return false;
  }

  return true;
}
