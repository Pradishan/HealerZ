import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function Login() {
  const [patientID, setPatientID] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [logmessage, setLogmessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [rememberMe5, setRememberMe5] = useState(false);

  useEffect(() => {
    const savedAPatientID = localStorage.getItem("patientID");
    const savedRememberMe5 = localStorage.getItem("rememberMe5");

    if (savedRememberMe5 === "true" && savedAPatientID) {
      setPatientID(savedAPatientID);
      setRememberMe5(true);
    }
  }, []);

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
          toast.success(message);
          if (rememberMe5) {
            localStorage.setItem("patientID", patientID);
            localStorage.setItem("rememberMe5", "true");
          } else {
            localStorage.removeItem("patientID");
            localStorage.removeItem("rememberMe5");
          }
          setTimeout(() => {
            sessionStorage.setItem("patient", true);
            sessionStorage.setItem("patientID", response.data.patientID);
            navigate("/profile");
          }, 100);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        setMessage("Login failed.");
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg shadow top navbarh ${
          menuOpen ? "open" : "close"
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand navbar-brand1" href="/login">
            <img src={logo} alt="HealerZ" height="48px" />
          </a>
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            {menuOpen ? (
              <span className="close-icon">&times;</span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>
          <div
            className={`navbar-collapse navbar-collapse1 collapse ${
              menuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav">
              <li className="nav-item nav-link nav-hover navicoon">
                <a className="nav-link" href="/home">
                  <IconButton aria-label="delete">
                    <HomeIcon className="naviccon2 " />
                  </IconButton>
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
            <h3 className="title">User | Login</h3>
            <form action="" className="py-2">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control logininputpat"
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
                  type={showPassword ? "text" : "password"}
                  className="form-control logininputpat"
                  id="floatingPassword"
                  placeholder="Password"
                  style={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                {password && (
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <div className="search-icon">
                        <VisibilityOffIcon />
                      </div>
                    ) : (
                      <div className="search-icon">
                        <VisibilityIcon />
                      </div>
                    )}
                  </span>
                )}
              </div>
              <div className="form-check mb-3" style={{ marginTop: "15px" }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMeCheckbox"
                  checked={rememberMe5}
                  onChange={() => setRememberMe5(!rememberMe5)}
                />
                <label
                  className="form-check-label remmbermepatient"
                  htmlFor="rememberMeCheckbox"
                >
                  Remember Me !
                </label>
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
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
