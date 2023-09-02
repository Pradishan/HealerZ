import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import powsi from "../../assets/Powsi.jpg";
import axios from "axios";

export default function InventoryLogin() {
  const [pharmacistID, setPharmacistID] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [logmessage, setLogmessage] = useState(null);
  const navigate = useNavigate();

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
    e.preventDefault(); // Prevent default form submission behavior
    axios
      .post("http://localhost/HealerZ/PHP/InventoryLogin.php", {
        pharmacistID: pharmacistID,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
        if (response.data.message === "Login successful.") {
          setTimeout(() => {
            sessionStorage.setItem("Pharmacist", true);
            navigate("/inventory-interface/dashboard");
          }, 100);
        }
      })
      .catch((error) => {
        setMessage("Login failed.");
      });
  };
  const errorMessgae = (message) => {
    let color;
    switch (message) {
      case "Pharmacist ID and Password are required.":
        color = "warning";
        break;
      case "Login failed.":
        color = "danger";
        break;
      case "Invalid Pharmacist ID or Password.":
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
      <div className={"alert alert-" + color + " mt-3"} role="alert">
        {message}
      </div>
    );
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <div
          style={{ display: "flex", flexDirection: "row",alignItems:'center',justifyContent:'center'}}
        >
          <img
            src={powsi}
            alt="avatar"
            height="100px"
            className="mb-3"
            style={{ borderRadius: "50%" }}
          />
          <div
            style={{
              height: "80px",
              width: "2px",
              backgroundColor: "black",
              margin: "10px",
            }}
          ></div>
          <img src={logo} alt="avatar" height="100px" className="mb-3" />
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4">
            <p>{logmessage}</p>
            <div className="card border-0 shadow">
              <div className="card-header bg-white text-center">
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
            {/* errror message */}
            {message ? errorMessgae(message) : ""}
          </div>
        </div>
      </div>
    </>
  );
}
