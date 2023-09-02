import React from "react";
import logo from "../../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import "./Home.css";
import { IconButton } from "@mui/material";

import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeIcon from "@mui/icons-material/Home";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';


export default function Hnav() {
  return (
    <nav className="navbar navbar-expand-lg shadow top navbarh">
      <div className="container-fluid">
        <a className="navbar-brand navbar-brand1" href="/">
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
                {/* <FeatherIcon icon="home" className='me-2 naviccon2 nav-hover' /> */}
                <IconButton aria-label="delete">
                  <HomeIcon />
                </IconButton>
                <span className="lettnav">HOME</span>
              </a>
            </li>
            <li className="nav-item nav-link nav-hover navicoon">
              <a className="nav-link" href="#services">
                {/* <FeatherIcon icon="box" className="me-2 naviccon2 nav-hover" /> */}
                <IconButton aria-label="delete">
                  <MedicalServicesIcon />
                </IconButton>
                <span className="lettnav">SERVICES</span>
              </a>
            </li>
            <li className="nav-item nav-link nav-hover navicoon">
              <a className="nav-link" href="#aboutus">
                {/* <FeatherIcon icon="activity" className='me-2 naviccon2 nav-hover' /> */}
                <IconButton aria-label="delete">
                  <VolunteerActivismIcon />
                </IconButton>
                <span className="lettnav">ABOUT US</span>
              </a>
            </li>
            <li className="nav-item nav-link nav-hover navicoon">
              <a className="nav-link" href="#events">
                {/* <FeatherIcon
                  icon="calendar"
                  className="me-2 naviccon2 nav-hover"
                /> */}
                 <IconButton aria-label="delete">
                  <LocalActivityIcon />
                </IconButton>
                <span className="lettnav">EVENTS</span>
              </a>
            </li>
            <li className="nav-item" style={{ paddingLeft: "30px" }}>
              <a className="nav-link nav-hover " href="/login">
                <FeatherIcon icon="user" className="me-2 loginiccon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
