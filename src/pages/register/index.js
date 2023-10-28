import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../login/auth.css";

import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../features/alertSlice";
import { login, selectAuth } from "../../features/authSlice";
import { registerApi } from "../../api/authApi";
import getAccessToken from "../../utils/getAccessToken";

const initalState = {
  username: "",
  profession: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [userData, setUserData] = useState(initalState);

  const { access_token } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, [access_token]);

  function handleInput({ target }) {
    setUserData((old) => ({ ...old, [target.name]: target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid(userData, dispatch)) return;

    try {
      dispatch(changeLoadingState(true));

      await registerApi(userData);

      dispatch(showSuccessMsg("Account Created!"));

      navigate("/");

      localStorage.setItem("logged", true);

      const res = await getAccessToken();

      dispatch(changeLoadingState(false));
      dispatch(login(res.data));
    } catch (error) {
      dispatch(changeLoadingState(false));
      dispatch(showErrMsg(error.response.data.msg));
    }
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          name="username"
          type="text"
          placeholder="Enter your name"
          onInput={handleInput}
        />
        <input
          name="profession"
          type="text"
          placeholder="Your profession"
          onInput={handleInput}
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          onInput={handleInput}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onInput={handleInput}
        />
        <input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          onInput={handleInput}
        />
        <button>Create</button>
        <p>
          Already Have an Account : <Link to="/login">Login Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

function isValid(props, dispatch) {
  const { username, email, profession, password, confirm_password } = props;

  if (!(username && email && profession && password && confirm_password)) {
    dispatch(showErrMsg("Please fill all fields"));
    return false;
  }
  if (!username) {
    dispatch(showErrMsg("Please enter a username"));
    return false;
  }
  if (username.length < 4) {
    dispatch(showErrMsg("Username should contain atleat 4 characters"));
    return false;
  }

  if (!email) {
    dispatch(showErrMsg("Please enter an email"));
    return false;
  }

  if (!validateEmail(email)) {
    dispatch(showErrMsg("Please enter a valid e-mail"));
    return false;
  }

  if (!profession) {
    dispatch(showErrMsg("Please enter your current profession"));
    return false;
  }

  if (!password) {
    dispatch(showErrMsg("Please enter a password"));
    return false;
  }

  if (password.length < 6) {
    dispatch(showErrMsg("Password should contain atleast 6 characters"));
    return false;
  }

  if (!confirm_password) {
    dispatch(showErrMsg("Please enter your password again"));
    return false;
  }

  if (password !== confirm_password) {
    dispatch(showErrMsg("Confirm password does not match"));
    return false;
  }

  return true;
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
