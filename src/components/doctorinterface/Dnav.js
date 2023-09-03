import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import logo from "../../assets/logo.png";
import Notifiaction from "./Notifiaction";
import "./doctor.css";
import { useNavigate } from "react-router-dom";
import Dsettings from "./Dsettings";

export default function Dnav ()
{
  const navigate = useNavigate();
  const notificationsData = [];

  for ( let i = 0; i < 20; i++ )
  {
    notificationsData.push( {
      src: `https://source.unsplash.com/random/${ i }`,
      name: `User ${ i + 1 }`,
      id: `cst2000${ i + 1 }`,
      status: Math.floor( Math.random() * 3 ) + 1, // Random status between 1 and 3
    } );
  }

  const logout = () =>
  {
    sessionStorage.setItem( 'Doctor', 'false' );
    sessionStorage.setItem( 'loginStatus', 'Logged out successfully!' );
    navigate( "/loginDoctor" );
  };

  const [ showModal, setShowModal ] = useState( false );

  const toggleModal = () =>
  {
    setShowModal( !showModal );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow fixed-top py-0">
        <div className="container-fluid d-flex align-items-center">
          <a
            href="/"
            className="text-decoration-none color-gradident text-dark fs-5 nav-hover ms-5"
          >
            Home
          </a>
          <div className="d-flex align-items-center justify-content-center">
            {/* logo */ }
            <img src={ logo } alt="HealerZ" height="48px" />
          </div>
          {/* right */ }
          <div className="d-flex align-items-center me-3">
            {/* notification */ }
            <div
              className="position-relative me-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#medicalNotification"
              aria-controls="offcanvasExample"
            >
              <FeatherIcon
                icon="bell"
                className="icon-hover p-2 fs-1"
                height="38px"
                width="38px"
              />

              <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger fs-7 p-1 mt-1">
                99+
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
            {/* profile */ }
            <div className="dropdown me-5">
              <div
                className="d-flex align-items-center icon-hover rounded p-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://source.unsplash.com/random/1"
                  alt="avatar"
                  height="38px"
                  width="38px"
                  className="rounded-circle me-2"
                />
                <p className="mb-0">Pradishan</p>
              </div>

              <ul className="dropdown-menu">
                <li>
                  <div className="dropdown-item" type="button" onClick={ logout }>
                    <div className="d-flex">
                      <FeatherIcon icon="log-out" className="me-2" />
                      <p className="fs-7 mb-0">Logout</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item" type="button" onClick={ toggleModal }>
                    <div className="d-flex">
                      <FeatherIcon icon="settings" className="me-2" />
                      <p className="fs-7 mb-0">Settings</p>
                    </div>
                  </div>
                </li>
                <Dsettings show={showModal} onHide={toggleModal} />
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* notificaton body */ }

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="medicalNotification" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Medical Request
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          { notificationsData.length > 0 ? (
            notificationsData.map( ( notification ) => (
              <Notifiaction
                key={ notification.id }
                src={ notification.src }
                name={ notification.name }
                id={ notification.id }
                status={ notification.status }
              />
            ) )
          ) : (
            <p>No notifications available.</p>
          ) }
        </div>
      </div>
    </>
  );
}
