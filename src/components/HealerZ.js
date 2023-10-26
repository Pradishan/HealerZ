import React, { useState, useEffect } from "react";
import wave from "../assets/wave2.png";
import "./HealerZ.css";
import logo from "../assets/logo.png";
import adminlogin from "../assets/commonlogin1.svg";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import { Dna } from "react-loader-spinner";
import Test123 from "./CommonLogin";
import PersonIcon from "@mui/icons-material/Person";
function HealerZ() {
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setDone(true);
    }, 2000);
  }, []);
  return (
    <>
      {!done ? (
        <div>
          <img className="wave3" src={logo} alt="Wave" />
          <div className="loaderhomee">
            <Dna type={"bars"} color={"#03fc4e"} height={500} width={500} />
          </div>
        </div>
      ) : (
        <div>
          <div id="homes">
            <img className="wave" src={wave} alt="Wave" />
            <a href="#loginhome">
              <img className="loginlogoo" src={logo} alt="" />
            </a>
            <div>
              <ul className="loginselect">
                <li className="nav-item nav-link nav-hover navicoon">
                  <a className="nav-link" href="#loginhere">
                    <IconButton aria-label="delete">
                      <PersonIcon sx={{ fontSize: "40px" }} />
                    </IconButton>
                  </a>
                </li>
              </ul>
            </div>
            <div className="containerthlogin neeeeeeee" id="loginhome">
              <div className="downarrroww">
                <IconButton
                  aria-label="delete"
                  className="dahover"
                  href="#loginhere"
                >
                  <KeyboardDoubleArrowDownIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              </div>
              <div className="downhomee">
                <IconButton
                  aria-label="delete"
                  href="/home"
                  className="downhomeicc"
                >
                  <HomeIcon sx={{ fontSize: "50px" }} />
                </IconButton>
              </div>
            </div>
            <div className="containerthlogin" id="loginhere">
              <div className="imggh">
                <img src={adminlogin} alt="Background" />
              </div>
              <div className="loginncardform">
                <h1>Welcome to Healerz!</h1>
                <Test123 />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HealerZ;
