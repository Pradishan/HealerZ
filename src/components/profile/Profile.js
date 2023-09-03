import React, { useState } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import farhath from "../../assets/farhath.jpg";

const Profile = () => {
  const [medicallist, setmedicallist] = useState([
    { No: 1, date: "07-07-2023" },
    { No: 2, date: "07-04-2023" },
    { No: 3, date: "07-06-2022" },
    { No: 4, date: "07-04-2022" },
    { No: 5, date: "07-11-2021" },
  ]);

  const onPDFdownload = () => {
    // using Java Script method to get PDF file
    fetch('sample.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'CST20008.pdf';
            alink.click();
        })
    })
}
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow top navbarh"
        style={{ zIndex: 1000 }}
      >
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
                  <FeatherIcon
                    icon="home"
                    className="me-2 naviccon2 nav-hover"
                  />
                  <span className="lettnav">HOME</span>
                </a>
              </li>
              <li className="nav-item" style={{ paddingLeft: "30px" }}>
                <a className="nav-link nav-hover " href="/login">
                  <FeatherIcon icon="user" className="me-2 loginiccontt" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <div className="profile">
        <div className="card-container cardprof">
          <div className="card card-1 cardproff">
            <h3 className="serhed7">Profile</h3>
            <hr />
            {/* <div className="card sub-card cardproff">
              <div className="info">
                <h6>Farhath</h6>
                <p className="info">cst20001</p>
                <p className="info"> N0:31, Kandy, Sri Lanka</p>
                <p className="info">0771234567</p>
              </div>
              <div></div>
            </div> */}
            <div className="d-flex  justify-content-center mb-2">
              <div className="d-flex align-items-center justify-content-center ms-2">
                <img
                  src={farhath}
                  alt="avatar"
                  className="rounded-circle me-2"
                  width="100px"
                  height="100px"
                />
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <div>
                  <h4 className="m-0">Farhath</h4>
                  <p className="fs-5 m-0">cst20035</p>
                  <p className="fs-9 m-0"> N0:31, Kandy, Sri Lanka</p>
                  <p className="fs-10 m-0">0771234567</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="info-2">
              <p info-2>
                Age <span className="green">22 years</span>
              </p>
              <p info-2>Gender Male</p>
              <p info-2>
                Blood Group <span className="red">B+</span>{" "}
              </p>
              <p info-2>
                Allergies <span className="blue">No</span>
              </p>
            </div>

            <div className="specialDisease">
              <h6>Special Disease</h6>
              <p>
                "Technophobia Virus" or "Technophobia Syndrome": This fictional
                disease is often portrayed in comedic settings where individuals
                exhibit an irrational fear or aversion to technology. It can
                lead to humorous situations as characters struggle to cope with
                modern devices and advancements.
              </p>
            </div>
            <hr />
            <br />

            <div>
              <h3 className="serhed7">Medical</h3>
              <hr />
              <table className={"table table-hover table-striped "}>
                <thead className={"top-0 position-sticky h-45"}>
                  <th>No</th>
                  <th>Date</th>
                  <th>Download</th>
                </thead>
                <tbody>
                  {medicallist.map((data, index) => (
                    <tr>
                      <th scope="row">{data.No}</th>
                      <td style={{ fontSize: "12px" }}>{data.date}</td>
                      <td>
                        {" "}
                        <Link to="/profile">
                          <div className="button">
                            <button className="btn shadow gradient-buttonnn" onClick={onPDFdownload}>
                              Download
                            </button>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>
          </div>

          <div className="card card-2 cardproff">
            <div className="">
              <div className="form-container">
                <h3 className="serhed6">Request Medical</h3>
                <form id="medical-request-form">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="New Password"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Consulatation Date</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="New Password"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Duration (In Days)</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <textarea
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="New Password"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Message</label>
                  </div>
                  <hr />
                  <div className="button">
                    <button className="btn shadow gradient-button">
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <div className="form-container">
              <h3 className="serhed6">Edit Profile Details</h3>
              <form id="editProfileForm">
                <div className="container">
                  <div className="column-container">
                    <div className="column-1">
                      <div className="sub-row">
                        <h5>Edit Profile</h5>
                      </div>

                      <div className="personalInfo">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="New Password"
                            style={{ width: "100%" }}
                          />
                          <label htmlFor="floatingPassword">
                            Change PhoneNo
                          </label>
                        </div>
                        <br />
                        <div className="form-floating">
                          <textarea
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="New Password"
                            style={{ width: "100%" }}
                          />
                          <label htmlFor="floatingPassword">
                            Change Address
                          </label>
                        </div>
                        <br />
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Change Profile pic"
                            style={{ width: "100%" }}
                          />
                          <label htmlFor="floatingPassword">
                            Change profile pic
                          </label>
                        </div>
                        <hr />
                        <div className="button">
                          <button className="btn shadow gradient-button">
                            Save changes{" "}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="column-2">
                      <div className="sub-row">
                        <h5>Change Password</h5>
                      </div>

                      <div className="personalInfo">
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Current Password"
                            style={{ width: "100%" }}
                          />
                          <label htmlFor="floatingPassword">
                            Current Password
                          </label>
                        </div>
                        <br />
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="New Password"
                            style={{ width: "100%" }}
                          />
                          <label htmlFor="floatingPassword">New Password</label>
                        </div>
                        <br />
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Confirm Password"
                            style={{ width: "100%" }}
                          />
                          <label htmlFor="floatingPassword">
                            Confirm Password
                          </label>
                        </div>
                        <hr />
                        <div className="button">
                          <button className="btn shadow gradient-button">
                            Save changes{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h5>Allergies and Diseases</h5>

                  <div className="allergies">
                    {/* <div className="form-group">
                    <label for="allergies">Allergies:</label>
                    <input
                      type="text"
                      className="form-input"
                      id="allergies"
                      name="allergies"
                    ></input>
                  </div> */}

                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="diseases"
                        placeholder="Confirm Password"
                        // style={{ width: "100%" }}
                        rows={7}
                      ></textarea>
                      <label htmlFor="floatingPassword">
                        Specific Diseases
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="button">
                    <button className="btn shadow gradient-button">
                      Save Changes
                    </button>
                  </div>
                  <hr />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
