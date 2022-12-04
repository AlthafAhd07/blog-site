import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../../features/alertSlice";

import { updateUserData } from "../../../features/authSlice";
import { CheckTokenEx } from "../../../utils/checkTokenExpiration";

const Owner = ({ user, access_token }) => {
  const [username, setUserName] = useState(null);
  const [profession, setProfession] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);

  const dispatch = useDispatch();

  async function HandleUpdate(e) {
    e.preventDefault();
    if (
      !isValidInput(
        dispatch,
        username,
        profession,
        oldPassword,
        newPassword,
        confirmPassword
      )
    )
      return;

    try {
      const token = await CheckTokenEx(access_token, dispatch);

      dispatch(changeLoadingState(true));
      const res = await axios.put(
        "/api/user/updateProfile",
        { username, profession, oldPassword, newPassword, confirmPassword },
        {
          headers: { Authorization: token },
        }
      );
      console.log(res);
      dispatch(
        updateUserData({
          username: username ?? user.username,
          profession: profession ?? user.profession,
        })
      );
      dispatch(changeLoadingState(false));
      dispatch(showSuccessMsg("Profile updated!"));
    } catch (error) {
      dispatch(changeLoadingState(false));
      dispatch(showErrMsg(error.response?.data.msg));
    }
  }

  return (
    <div className="user__data">
      {user && <h2>{user.username}</h2>}
      {!user && <div className="user_name skeleton-text skeleton"></div>}

      {!user && <div className="ProfileImg__skeleton"></div>}
      {user && <img src={user.avatar} alt="" />}
      <form className="user__form" onSubmit={HandleUpdate}>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          value={username || user.username || ""}
          onInput={({ target }) => {
            setUserName(target.value);
          }}
        />
        <label htmlFor="profession">profession :</label>
        <input
          type="text"
          id="profession"
          value={profession || user.profession || ""}
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
  dispatch,
  username,
  profession,
  oldPassword,
  newPassword,
  confirmPassword
) {
  function displayError(msg) {
    dispatch(showErrMsg(msg));
  }

  if (
    !(username || profession || oldPassword || newPassword || confirmPassword)
  ) {
    displayError("Please fill atleast one field!");
    return false;
  }

  if (!!newPassword || !!oldPassword || !!confirmPassword) {
    console.log(newPassword);
    if (!!!newPassword) {
      displayError("Please enter you new password!");
      return false;
    }
    if (!!!oldPassword) {
      displayError("Please enter your old password!");
      return false;
    }
    if (!!!confirmPassword) {
      displayError("Please enter your new password again!");
      return false;
    }
    if (newPassword?.length < 6) {
      displayError("password should contain atleast 6 chars");
      return false;
    }

    if (newPassword !== confirmPassword) {
      displayError("Confirm password does not match!");
      return false;
    }
  }

  return true;
}
