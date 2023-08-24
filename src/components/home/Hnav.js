import React from 'react';
import logo from '../../assets/logo.png';
import FeatherIcon from 'feather-icons-react';
import  './Hnav.css'

export default function Hnav() {
  return (
    <nav className="navbar navbar-expand-lg shadow top navbarh">
    <div className="container-fluid">
      <a className="navbar-brand navbar-brand1" href="Home.js"><img src={logo} alt="HealerZ" height='48px' /></a>
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse navbar-collapse1 collapse " id="navbarTogglerDemo02">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <a className="nav-link mt-2 nav-hover" aria-current="page" href="#">HOME</a>
          </li>
          <li className="nav-item">
            <a className="nav-link mt-2 nav-hover" href="#services">SERVICES</a>
          </li>
          <li className="nav-item">
            <a className="nav-link mt-2 nav-hover" href="#aboutus">ABOUT US</a>
          </li>
          <li className="nav-item">
            <a className="nav-link mt-2 nav-hover " href="#events">EVENTS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-hover " href="#profile">
            <FeatherIcon icon="user" className='me-2' />
            </a>
          </li>
        </ul>
       </div>
    </div>
  </nav>
  )
}