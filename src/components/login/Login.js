// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [patientID, setPatientID] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [logmessage, setLogmessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let login = sessionStorage.getItem("patient");

    if (login === true) {
      navigate("/profile");
    }
    let loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus) {
      setLogmessage(loginStatus);
    }
  }, []);

  const profileopen = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLogmessage("");
    axios
      .post("http://localhost/HealerZ/PHP/PatientLogin.php", {
        patientID: patientID,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
        if (response.data.message === "Login successful.") {
          setTimeout(() => {
            sessionStorage.setItem("patient", true);
            sessionStorage.setItem("patientID", response.data.patientID);
            navigate("/profile");
          }, 100);
        }
      })
      .catch((error) => {
        setMessage("Login failed.");
      });
  };

  const errorMessage = (message) => {
    let color;
    switch (message) {
      case "User ID and Password are required.":
        color = "warning";
        break;
      case "Login failed.":
      case "Invalid User ID or Password.":
        color = "danger";
        break;
      case "Method not allowed.":
        color = "warning";
        break;
      case "Login successful.":
        color = "success";
        break;
      default:
        break;
    }
    return (
      <div className={`alert alert-${color} mt-3`} role="alert" style={{bottom:0,position:"absolute"}}>
        {message}
      </div>
    );
  };

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
            {message ? errorMessage(message) : ""}
          </div>
          <div className="login">
            {logmessage ? <p>{logmessage}</p> : ""}
            <h3 className="title">User Login</h3>
            <form action="" className="py-2">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="D0001"
                  style={{ width: "100%" }}
                  value={patientID}
                  onChange={(e) => setPatientID(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
