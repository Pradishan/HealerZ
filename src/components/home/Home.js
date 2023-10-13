import React, { useState, useEffect } from "react";
import Hnav from "./Hnav";
import Carousel from "./Carousel";
import Hteam from "./Hteam";
import logo from "../../assets/logo.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./Home.css";
import FeatherIcon from "feather-icons-react";
import { MDBFooter, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import CircleIcon from "@mui/icons-material/Circle";
import { IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import availability from "../../assets/Doctors-pana.svg";
import PhoneModal from "./PhoneModal";
import focus from "../../assets/focus1.svg";
import focus2 from "../../assets/focus2.svg";
import focus3 from "../../assets/focus3.svg";
import aboutus from "../../assets/aboutus.svg";
import vaccination from "../../assets/vaccination.svg";
import blooddonation from "../../assets/Blooddonation.svg";
import HvacciReg from "./HvacciReg";
import HbloodReg from "./HbloodReg";

export default function Home() {
  const [showTeam, setShowTeam] = useState(false);
  const [isDoctorSessionOn, setIsDoctorSessionOn] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let login = sessionStorage.getItem("Doctor");
    if (login === "true") {
      setIsDoctorSessionOn(true);
    }
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:healerz763@gmail.com";
  };

  const handlePhoneClick = () => {
    setShowPhoneModal(true);
  };

  const closePhoneModal = () => {
    setShowPhoneModal(false);
  };
  const Teammem = () => {
    setShowTeam(!showTeam);
  };
  return (
    <div>
      <div className="navigationH">
        <Hnav />
      </div>
      <div className="slider p-3" style={{ minHeight: "100vh" }} id="home">
        <Carousel />
        <div className="cardcontenthome">
          <img src={availability} alt="" />
          <div className="cardconthhav">
            <h2>Monday - Friday</h2>
            <h3>9.00 AM - 5.00 PM</h3>
            <h4>Available Time</h4>
          </div>
          <div className="availabiltyiconpos">
            <div>
              {isDoctorSessionOn ? (
                <div className="indicatdoct">
                  <h4>Available</h4>
                  <IconButton className="availabiltyicon">
                    <CircleIcon
                      sx={{ fontSize: "30px" }}
                      style={{ color: "#7CFC00" }}
                    />
                  </IconButton>
                </div>
              ) : (
                <div className="indicatdoct">
                  <h4>Not available</h4>
                  <IconButton className="availabiltyicon">
                    <CircleIcon
                      sx={{ fontSize: "30px" }}
                      style={{ color: "#FF0000" }}
                    />
                  </IconButton>
                </div>
              )}
            </div>
            <div className="indicatmailicon">
              <IconButton
                onClick={handleEmailClick}
                className="contacticonnhome"
              >
                <EmailIcon sx={{ color: "#4B0082" }} />
              </IconButton>
              <IconButton
                onClick={handlePhoneClick}
                className="contacticonnhome"
              >
                <LocalPhoneIcon sx={{ color: "#800000" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="slider p-3" id="services">
        <h1 className="serheddd">OUR Focus</h1>
        <h3 className="serhedddsub">
          We provide the best medical service for UWU
        </h3>
        <div className="servicefocushome">
          <div className="servicefocushomesub">
            <img src={focus} alt="" className="focusimage" />
            <h4>Medical Service Management</h4>
            <p>
              This focus involves efficiently managing medical services within
              the university's health center. It includes tasks such as
              appointment scheduling, resource allocation, and ensuring the
              seamless operation of medical facilities to provide quality care
              to students and staff.
            </p>
          </div>
          <div className="servicefocushomesub">
            <img src={focus2} alt="" className="focusimage" />
            <h4>Doctor-Patient Collaboration</h4>
            <p>
              This aspect emphasizes the importance of effective communication
              and cooperation between healthcare professionals and patients. It
              encourages a patient-centered approach, where doctors work closely
              with patients to understand their needs, provide information, and
              involve them in healthcare decisions.
            </p>
          </div>
          <div className="servicefocushomesub">
            <img src={focus3} alt="" className="focusimage" />
            <h4>Health and Wellness Programs</h4>
            <p>
              These programs aim to promote the overall well-being of the
              university community. They include initiatives like fitness
              classes, mental health workshops, and nutrition counseling to help
              individuals adopt and maintain healthy lifestyles, preventing
              health issues and fostering a culture of well-being.
            </p>
          </div>
        </div>
      </div>

      <div className="container abotus" id="aboutus">
        <div class="row mt-5 p-5 row1 abotuscontainer">
          <div class="col aboutushome">
            <img src={aboutus} alt="HealerZ" />
          </div>
          <div class="col abotuscontentalign">
            <h1 className="serheddd">About us</h1>
            <h3 className="serhedddsub1">
              Exploring our System HealerZ : Learn More About Us
            </h3>
            <hr />
            <p>
              {" "}
              The mission is to create a user-friendly University medical system
              that connects individuals with care, streamlines medical requests,
              enhances communication, and fosters community. The team focuses on
              healthcare accessibility and efficiency through
              technology-assisted systems. Connecting Health and Care offers a
              platform for medical services, allowing users to request and
              download approved reports, doctors to access patient details, and
              administrators to manage events and donations
            </p>
            <hr />
            <button className="btn btn-primary w-100" onClick={Teammem}>
              Meet Our Team
            </button>
          </div>
          <div className="team">{showTeam && <Hteam onClose={Teammem} />}</div>
        </div>
      </div>

      <div className="slider p-3" id="events">
        <h1 className="serheddd">Events</h1>
        <h3 className="serhedddsub">
          Participate in Life-Saving Initiatives: Registration Forms Below
        </h3>
        <div className="container text-center mt-2 contgap1">
          <div className="row  cardcontainer2">
            <div className="col">
              <div className="card cardWrap2">
                <img src={vaccination} alt="" />
                <h1 className="title"> vaccination</h1>
                <HvacciReg onClick={handleShow}></HvacciReg>
              </div>
            </div>
            <div className="col">
              <div className="card cardWrap2">
                <img src={blooddonation} alt="" />
                <h1 className="title">Blood donation</h1>
                <HbloodReg onClick={handleShow}></HbloodReg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MDBFooter
        className="bg-light text-center"
        style={{
          backgroundColor: "white",
          boxShadow: "20px 6px 10px 0px rgba(0, 0, 0, 0.25)",
          marginBottom: "-10px",
        }}
      >
        <MDBContainer className="p-4 pb-0">
          <section className="mb-4">
            <MDBBtn
              floating
              className="m-1 sosicon"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              <FeatherIcon icon="facebook" className="sociccon" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1 sosicon"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <FeatherIcon icon="twitter" className="sociccon" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1 sosicon"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <FeatherIcon icon="mail" className="sociccon" />
            </MDBBtn>
            <MDBBtn
              floating
              className="m-1 sosicon"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <FeatherIcon icon="instagram" className="sociccon" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1 sosicon"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <FeatherIcon icon="linkedin" className="sociccon" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1 sosicon"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
            >
              <FeatherIcon icon="github" className="sociccon" />
            </MDBBtn>
          </section>
        </MDBContainer>
        <hr style={{ width: "350px", marginLeft: "570px" }} />

        <a className="text-dark" href="https://HealerZ.com/">
          <img src={logo} alt="HealerZ" height="50px" />
        </a>
        <hr />
        <div
          className="text-center "
          style={{ backgroundColor: "#fff", marginBottom: "10px" }}
        >
          &copy; {new Date().getFullYear()} Copyright. All rights reserved for
          UWU{" "}
        </div>
      </MDBFooter>

      {showPhoneModal && (
        <PhoneModal show={showPhoneModal} onHide={closePhoneModal} />
      )}
    </div>
  );
}
