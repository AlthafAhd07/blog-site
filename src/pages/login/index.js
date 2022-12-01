import React from "react";
import { Link } from "react-router-dom";

import "./auth.css";

const Login = () => {
  return (
    <div className="auth">
      <form className="auth__form login">
        <h2>Login Now</h2>
        <input type="email" placeholder="Enter your email address" />
        <input type="password" placeholder="Password" />
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
