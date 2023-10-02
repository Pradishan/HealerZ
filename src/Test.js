import React, { useState } from "react";
import wave from "./assets/wave.png";
import "./test.css";
import logo from "./assets/logo.png";
import loginhome from "./assets/loginhome.png";


import adminlogin from "./assets/adminlogin.svg";
import inventorylogin from "./assets/inventorylogin.svg";
import doctorlogin from "./assets/doctorlogin.svg";

import { IconButton } from "@mui/material";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from "@mui/icons-material/Home";
import MedicationIcon from '@mui/icons-material/Medication';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Test() {
  return (
    <div>
      <img className="wave" src={wave} alt="Wave" />
      <img className="loginlogoo" src={logo} alt="" />
      <div>
        <ul className="loginselect">
          <li className="nav-item nav-link nav-hover navicoon">
            <a className="nav-link" href="#adminlogin">
              <IconButton aria-label="delete">
                <AdminPanelSettingsIcon />
              </IconButton>
              <span className="lettnav">Admin Login</span>
            </a>
          </li>
          <li className="nav-item nav-link nav-hover navicoon">
            <a className="nav-link" href="#inventorylogin">
              <IconButton aria-label="delete">
                <AddShoppingCartIcon />
              </IconButton>
              <span className="lettnav">Inventory Login</span>
            </a>
          </li>
          <li className="nav-item nav-link nav-hover navicoon">
            <a className="nav-link" href="#doctorlogin">
              <IconButton aria-label="delete">
                <MedicationIcon  />
              </IconButton>
              <span className="lettnav">Doctor Login</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="containerthlogin" >
        <div >
        <div className="imgghhv">
         <img src={loginhome} alt=""/>
         </div>
         </div>
      </div>
      <div className="containerthlogin" id="adminlogin">
        <div className="imggh">
          <img src={adminlogin} alt="Background" />
        </div>
      </div>
      <div className="containerthlogin" id="inventorylogin">
        <div className="imggh">
          <img src={inventorylogin} alt="Background" />
        </div>
      </div>
      <div className="containerthlogin" id="doctorlogin">
        <div className="imggh">
          <img src={doctorlogin} alt="Background" />
        </div>
      </div>
    </div>
  );
}

export default Test;
