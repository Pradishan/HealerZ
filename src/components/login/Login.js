/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const profileopen=()=>{
    navigate('/profile');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow top navbarh">
        <div className="container-fluid">
          <a className="navbar-brand navbar-brand1" href="/login">
            <img src={logo} alt="HealerZ" height="48px" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse navbar-collapse1 collapse "
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav">
              <li className="nav-item nav-link nav-hover navicoon">
                <a className="nav-link" href="/">
                  <FeatherIcon
                    icon="home"
                    className="me-2 naviccon2 nav-hover"
                  />
                  <span className="lettnav">HOME</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="background">
        <div className="cont">
          <div className="design">
            <div className="pill-1 rotate-45"></div>
            <div className="pill-2 rotate-45"></div>
            <div className="pill-3 rotate-45"></div>
            <div className="pill-4 rotate-45"></div>
          </div>
          <div className="login">
            <h3 className="title">User Login</h3>
            <form action="" className="py-2">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="D0001"
                  style={{ width: "100%" }}
                />
                <label htmlFor="floatingInput">User ID</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  style={{ width: "100%" }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn text-white shadow btn-gr mt-3 w-100"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(75, 20, 141, 1) 0%, rgba(224, 64, 253, 1) 100%)",
                  }}
                  onClick={profileopen}
                >
                  Login
                </button>
              </div>
            </form>
            <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>
              Forgot! Username/Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
