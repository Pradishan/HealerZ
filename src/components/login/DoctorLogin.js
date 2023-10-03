import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicationIcon from "@mui/icons-material/Medication";

export default function DoctorLogin() {
  const [doctorID, setDoctorID] = useState("");
  const [password, setPassword] = useState("");
  const [logmessage, setLogmessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let login = sessionStorage.getItem("Doctor");

    if (login === "true") {
      navigate("/doctor");
    }
    let loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus) {
      setLogmessage(loginStatus);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/HealerZ/PHP/DoctorLogin.php", {
        doctorID: doctorID,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        const message = response.data.message;

        if (message === "Login successful.") {
          toast.success(message);
          setTimeout(() => {
            sessionStorage.setItem("Doctor", true);
            navigate("/doctor");
          }, 100);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        toast.error("Login failed.");
      });
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-4">
            {/* <p style={{ width: "400px" }}>{logmessage}</p> */}
            <div className="card border-0 shadow loginncardpos">
              <div className="card-header bg-white text-center logoaddinglogin">
                <MedicationIcon
                  className="loginiconlogin"
                  sx={{ fontSize: "40px" }}
                />
                <h3>Login | Doctor</h3>
              </div>
              <div className="card-body">
                <form action="" className="py-2">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="D0001"
                      value={doctorID}
                      onChange={(e) => setDoctorID(e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingInput">Doctor ID</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div
                    className="form-check mb-3"
                    style={{ marginTop: "15px" }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMeCheckbox"
                    />
                    <label
                      className="form-check-label remmberme"
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
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
