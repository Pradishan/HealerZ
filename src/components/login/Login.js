/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Login.css'; // Make sure to have the styles in a file named Login.css


function Login() {
  return (
    <body className="background">
     <div className="cont">
      <div className="design">
        <div className="pill-1 rotate-45"></div>
        <div className="pill-2 rotate-45"></div>
        <div className="pill-3 rotate-45"></div>
        <div className="pill-4 rotate-45"></div>
      </div>
      <div className="login">
        <h3 className="title">User Login</h3>
        <div className="text-input">
          <i className="ri-user-fill"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div className="text-input">
          <i className="ri-lock-fill"></i>
          <input type="password" placeholder="Password" />
        </div>
        <button className="login-btn">LOGIN</button>
        <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>Forgot Username/Password?</a>
      </div>
    </div>
    </body>
    
  );
};

export default Login;
