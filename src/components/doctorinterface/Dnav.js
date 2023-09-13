import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import FeatherIcon from "feather-icons-react";
import logo from "../../assets/logo.png";
import Notification from "./Notification"; 
import "./doctor.css";
import { useNavigate } from "react-router-dom";
import Dsettings from "./Dsettings";
import MedRequestModal from "./utilites/MedRequestModal";
import {Offcanvas,Button } from 'react-bootstrap';


export default function Dnav() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost/HealerZ/PHP/doctor/loadNotification.php');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const fetchInterval = setInterval(fetchData, 2000);
    return () => clearInterval(fetchInterval);
  }, [fetchData]);

  const logout = () => {
    sessionStorage.setItem('Doctor', 'false');
    sessionStorage.setItem('loginStatus', 'Logged out successfully!');
    navigate("/loginDoctor");
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <img src={logo} alt="HealerZ" height="48px" />
          </div>
          <div className="d-flex align-items-center me-3">
            <div
              className="position-relative me-2"
              type="button"
              onClick={handleShow}
            >
              <FeatherIcon
                icon="bell"
                className="icon-hover p-2 fs-1"
                height="38px"
                width="38px"
              />
              <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger fs-7 p-1 mt-1">
                {records.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
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
                  <div className="dropdown-item" type="button" onClick={logout}>
                    <div className="d-flex">
                      <FeatherIcon icon="log-out" className="me-2" />
                      <p className="fs-7 mb-0">Logout</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item" type="button" onClick={toggleModal}>
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

       <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.MedicalRequest_ID}
                type="button"
                className='icon-hover rounded p-2 d-flex align-items-center justify-content-between m-3 my-2'
                onClick={() => openModal(record.MedicalRequest_ID)}
              >
                <Notification record={record} />
              </div>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
          {selectedData ? (
            <MedRequestModal show={showModal} onHide={() => setShowModal(false)} data={selectedData} />
          ) : (
            null
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
