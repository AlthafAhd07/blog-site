import React from "react";
import { Link } from "react-router-dom";

import "../login/auth.css";

const Register = () => {
  return (
    <div className="auth">
      <form className="auth__form">
        <h2>Create Account</h2>
        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Create</button>
        <p>
          Already Have an Account : <Link to="/login">Login Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
