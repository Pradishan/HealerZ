import React, { useState, useEffect } from "react";
import Layout from "../../layouts/layout";
import powsi from "../../assets/Powsi.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import default_dp from "../../assets/default_dp.png";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// import { Link } from "react-router-dom";

const Settings = () => {
  const [profilepic, setprofilepic] = useState(default_dp);
  const [userdata, setUserData] = useState([]);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [value, onChange] = useState(new Date());

  // Function to toggle the visibility of the second card
  const handleOpen = () => {
    setShowSecondCard(!showSecondCard);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/Inventory/getPharmacistData.php",
        { params: { pharmacistID: sessionStorage.getItem("pharmacistID") } }
      );

      console.log(response.data);

      // // Check if the response contains the data you expect
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Assuming the response is an array of pharmacist data
        setUserData(response.data);
      } else {
        console.error("No data found or invalid response structure");
      }

      // setUserData(response.data);
      // setEditedAddress(response.data[0].Address);
      // setEditedPhoneNo(response.data[0].PhoneNo);
      // setEditedAllDiseases(response.data[0].SpecialDisease);

      if (response.data[0].Profile) {
        convertBase64ProfileImage(
          response.data[0].Profile,
          response.data[0].ProfileType
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertBase64ProfileImage = (base64, type) => {
    const image = new Image();
    image.src = `data:${type};base64,${base64}`;
    image.onload = () => {
      setprofilepic(image.src);
    };
  };
  return (
    <Layout>
      <div className="settingcardcenter">
        <div className="card settingcard settingcardproff">
          <div className="">
            <div className="form-container">
              <h3 className="serhed6">Settings</h3>
              <div style={{ marginTop: "-50px" }}>
                <div className="profile">
                  <div className="card-container cardprof">
                    <div className="card cardsettprof cardproff">
                      {userdata.map((data, index) => (
                        <div key={index}>
                          <div className="justify-content-center mb-2">
                            <div className="d-flex align-items-center justify-content-center ">
                              <img
                                src={profilepic}
                                alt="avatar"
                                className="rounded-circle me-2"
                                width="100px"
                                height="100px"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div className="button editbuttprof">
                              <button
                                className="btn shadow gradient-button"
                                onClick={handleOpen}
                              >
                                Edit Profile{" "}
                              </button>
                            </div>

                            <div className="d-flex align-items-center justify-content-center">
                              <div>
                                <h2 className="m-0">{data.Pharmacist_Name}</h2>
                                <p className="fs-5 m-0">{data.Pharmacist_ID}</p>
                                <p className="fs-9 settemailposition">
                                  {data.Email}
                                </p>
                              </div>
                            </div>

                            <hr />
                            <div className="d-flex align-items-center justify-content-center">
                              <div>
                                <table>
                                  <tr>
                                    <td>
                                      {" "}
                                      <IconButton className="modalbutthover">
                                        <ContactEmergencyIcon />
                                      </IconButton>
                                    </td>
                                    <td>
                                      <p className="fs-5 m-0">
                                        {data.Designation}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <IconButton className="modalbutthover">
                                        <LocationOnIcon />
                                      </IconButton>
                                    </td>
                                    <td>
                                      <p className="fs-9 m-0">
                                        {" "}
                                        {data.Address}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <IconButton className="modalbutthover">
                                        <LocalPhoneIcon />
                                      </IconButton>
                                    </td>
                                    <td>
                                      <p className="fs-9 m-0">{data.PhoneNo}</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {" "}
                                      <IconButton className="modalbutthover">
                                        <AssignmentIndIcon />
                                      </IconButton>
                                    </td>
                                    <td>
                                      <p className="fs-9 m-0">{data.SLMC}</p>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <hr />
                    </div>
                    {showSecondCard ? (
                      <div className="card cardsettprof2 cardproff">
                        <div className="personalInfo">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              id="phoneNo"
                              placeholder="New Password"
                              style={{ width: "100%" }}
                              // value={editedPhoneNo}
                              // onChange={(e) => {
                              //   setEditedPhoneNo(e.target.value);
                              // }}
                            />
                            <label htmlFor="phoneNo">Change PhoneNo</label>
                          </div>
                          <br />
                          <div className="form-floating">
                            <textarea
                              type="text"
                              className="form-control"
                              id="address_field"
                              placeholder="New Password"
                              style={{ width: "100%" }}
                              // value={editedAddress}
                              // onChange={(e) => {
                              //   setEditedAddress(e.target.value);
                              // }}
                            />
                            <label htmlFor="address_field">
                              Change Address
                            </label>
                          </div>
                          <br />
                          <div className="form-floating">
                            <input
                              type="file"
                              name="Profile"
                              className="form-control"
                              accept=".jpg, .jpeg, .png"
                              id="profilePic"
                              placeholder="Change Profile pic"
                              style={{ width: "100%" }}
                              // onChange={(e) => {
                              //   setEditedProfilePic(e.target.files[0]);
                              // }}
                            />
                            <label htmlFor="ProfilePic">
                              Change profile pic
                            </label>
                          </div>
                          <hr />
                          <div className="button">
                            <button
                              className="btn shadow gradient-button"
                              // onClick={(e) => {
                              //   e.preventDefault();
                              //   handleProfileUpdate();
                              // }}
                            >
                              Save changes{" "}
                            </button>
                          </div>
                        </div>
                        <hr />
                        <div className="personalInfo">
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              id="currentPassword"
                              placeholder="Current Password"
                              // onChange={(e) => {
                              //   setcurrpw(e.target.value);
                              // }}
                              style={{ width: "100%" }}
                            />
                            <label htmlFor="currentPassword">
                              Current Password
                            </label>
                          </div>
                          <br />
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              placeholder="New Password"
                              // onChange={(e) => {
                              //   setchangepw(e.target.value);
                              // }}
                              style={{ width: "100%" }}
                            />
                            <label htmlFor="newPassword">New Password</label>
                          </div>
                          <br />
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              // onChange={(e) => {
                              //   setconfirmpw(e.target.value);
                              // }}
                              style={{ width: "100%" }}
                            />
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                          </div>
                          <hr />
                          <div className="button">
                            <button
                              className="btn shadow gradient-button"
                              // onClick={(e) => {
                              //   e.preventDefault();
                              //   passwordchange();
                              // }}
                            >
                              Save changes{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card cardsettprof2 cardproff">
                        <div className="justify-content-center mb-2">
                        <div className="d-flex align-items-center justify-content-center ">
                        <div className="custom-calendar">
                            <Calendar onChange={onChange} value={value} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
