import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { validateEmail } from "../register/index";

import "./auth.css";
import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../features/alertSlice";
import { login, selectAuth } from "../../features/authSlice";
import { loginApi } from "../../api/authApi";
import getAccessToken from "../../utils/getAccessToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { access_token } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, [access_token]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid(email, password, dispatch)) return;

    try {
      dispatch(changeLoadingState(true));

      await loginApi({ email, password });

      localStorage.setItem("logged", true);

      dispatch(showSuccessMsg("Login Success!"));

      const res = await getAccessToken();

      dispatch(changeLoadingState(false));
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      dispatch(showErrMsg(error.response.data.msg));
      dispatch(changeLoadingState(false));
    }
  }
  return (
    <div className="auth">
      <form className="auth__form login" onSubmit={handleSubmit}>
        <h2>Login Now</h2>
        <input
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <section className="login__extraData">
          <div>
            <input type="checkbox" name="" id="keepLogin" />
            <label htmlFor="keepLogin">Keep me logged in</label>
          </div>
          <div>Recovery Password</div>
        </section>
        <button>SIGN IN</button>
        <p>
          New to here : <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

function isValid(email, password, dispatch) {
  if (!email) {
    dispatch(showErrMsg("Please enter your email"));
    return false;
  }
  if (!validateEmail(email)) {
    dispatch(showErrMsg("Please enter a valid email"));
    return false;
  }
  if (!password) {
    showErrMsg("Please enter your password");
    return false;
  }
  return true;
}
