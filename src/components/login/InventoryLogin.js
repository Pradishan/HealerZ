import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function InventoryLogin() {
  const [pharmacistID, setPharmacistID] = useState("");
  const [password, setPassword] = useState("");
  const [logmessage, setLogmessage] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let login = sessionStorage.getItem("Pharmacist");

    if (login === true) {
      navigate("/inventory-interface/dashboard");
    }
    let loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus) {
      setLogmessage(loginStatus);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/HealerZ/PHP/InventoryLogin.php", {
        pharmacistID: pharmacistID,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        const message = response.data.message;

        if (message === "Login successful.") {
          toast.success(message);
          setTimeout(() => {
          sessionStorage.setItem("Pharmacist", true);
          sessionStorage.setItem("pharmacistID", response.data.pharmacistID);
          navigate("/inventory-interface/dashboard");
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
            {/* <p style={{width:'400px'}}>{logmessage}</p> */}
            <div className="card border-0 shadow loginncardpos">
              <div className="card-header bg-white text-center logoaddinglogin"  style={{gap:'30px'}}>
              <InventoryIcon
                  className="loginiconlogin"
                  sx={{ fontSize: "40px" }}
                />
                <h3>Login | Pharmacist</h3>
              </div>
              <div className="card-body">
                <form action="" className="py-2">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="D0001"
                      value={pharmacistID}
                      onChange={(e) => setPharmacistID(e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingInput">Pharmasict ID</label>
                  </div>
                  <div className="form-floating">
                    <input
                       type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <span
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <div className="search-icon">
                          <VisibilityOffIcon/>
                        </div>
                      ) : (
                        <div className="search-icon">
                          <VisibilityIcon/>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="form-check mb-3" style={{marginTop:'15px'}}>
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
           <ToastContainer/>
          </div>
        </div>
      </div>
    </>
  );
}
