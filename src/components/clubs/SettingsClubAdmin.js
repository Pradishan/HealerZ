import React, { useState, useEffect } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import default_dp from "../../assets/avatar.svg";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import setting from "../../assets/clubadminlogin.svg";


const SettingsClubAdmin = () => {
  const [profilepic, setprofilepic] = useState(default_dp);
  const [userdata, setUserData] = useState([]);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [value, onChange] = useState(new Date());
  const [editedPhoneNo, setEditedPhoneNo] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedProfilePic, setEditedProfilePic] = useState(null);
  const [currpw, setcurrpw] = useState(null);
  const [changepw, setchangepw] = useState(null);
  const [confirmpw, setconfirmpw] = useState(null);

  const handleOpen = () => {
    setShowSecondCard(!showSecondCard);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/Inventory/settings/getemployeeData.php",
        { params: { employeeID: sessionStorage.getItem("employeeID") } }
      );

      console.log(response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserData(response.data);
      } else {
        console.error("No data found or invalid response structure");
      }

      setEditedAddress(response.data[0].Address);
      setEditedPhoneNo(response.data[0].PhoneNo);
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

  const handleProfileUpdate = () => {
    if (
      editedPhoneNo.length < 10 ||
      editedPhoneNo.length > 10 ||
      editedPhoneNo[0] != 0
    ) {
      toast.error("Invalid Phone Number");
    } else if (
      userdata[0].Address == editedAddress &&
      userdata[0].PhoneNo == editedPhoneNo &&
      editedProfilePic == null
    ) {
      toast.info("No changes made");
    } else {
      const formData = new FormData();
      formData.append("employee_ID", sessionStorage.getItem("employeeID"));
      formData.append("PhoneNo", editedPhoneNo);
      formData.append("Address", editedAddress);
      editedProfilePic && formData.append("Profile", editedProfilePic);

      axios
        .post(
          "http://localhost/HealerZ/PHP/Inventory/settings/updateProfilePharmacist.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.error) {
            toast.info(res.data.error);
        } else {
            toast.success("Profile updated Successfully");
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const passwordchange = async () => {
    try {
      if (!currpw) {
        toast.warning("Fill the Current Password");
      }else {
        const response = await axios.get(`http://localhost/HealerZ/PHP/Inventory/settings/getPassword.php?employeeID=${userdata[0].employee_ID}`);
  
        const hashedPasswordFromServer = response.data.Password;
        const isCurrentPasswordCorrect = await axios.post('http://localhost/HealerZ/PHP/Inventory/settings/verifyPassword.php', {
          currentPassword: currpw,
          hashedPassword: hashedPasswordFromServer,
        });
  
        if (isCurrentPasswordCorrect.data.isValid) {
          if (!changepw) {
            toast.warning("Fill the New Password");
          }else if (changepw === confirmpw) {
            if (currpw === changepw) {
              toast.info("Existing Password !");
            } else {
              await axios.put(
                "http://localhost/HealerZ/PHP/Inventory/settings/changepharmacistPassword.php",
                { employeeID: userdata[0].employee_ID, newPassword: changepw }
              );
  
              toast.success("Password Changed Successfully");
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            }
          }else if (!confirmpw) {
            toast.warning("Fill the Confirm Password");
          }  else {
            toast.error("Wrong Confirm Password !");
          }
        } else {
          toast.error("Wrong Current Password !");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ClubLayout>
      <div className="settingcardcenter">
        <div className="card settingcard settingcardproff">
          <div className="">
            <div className="form-container">
              <div style={{ marginTop: "-50px" }}>
                <div className="profile">
                  <div className="card-container cardprof">
                    <div className="card cardsettprof cardproff">
                      {userdata.map((data, index) => (
                        <div key={index}>
                          <div className="justify-content-center mb-2">
                            <div className="d-flex align-items-center justify-content-center ">
                              <div className="image-containertt">
                                <img
                                  src={profilepic}
                                  alt="avatar"
                                  className="rounded-circle me-2"
                                  width="100px"
                                  height="100px"
                                  style={{ objectFit: "cover" }}
                                />
                                <div className="zoomed-image">
                                  <img
                                    src={profilepic}
                                    alt="zoomed-avatar"
                                    width="150px" 
                                    height="150px"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="button editbuttprof">
                              <button
                                className="btn shadow gradient-button"
                                onClick={handleOpen}
                              >
                                {showSecondCard
                                  ? "Close Profile"
                                  : "Edit Profile"}
                              </button>
                            </div>

                            <div className="d-flex align-items-center justify-content-center">
                              <div>
                                <h2 className="m-0">{data.employee_Name}</h2>
                                <p className="fs-5 m-0">{data.employee_ID}</p>
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
                                        {data.role}
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
                              value={editedPhoneNo}
                              onChange={(e) => {
                                setEditedPhoneNo(e.target.value);
                              }}
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
                              value={editedAddress}
                              onChange={(e) => {
                                setEditedAddress(e.target.value);
                              }}
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
                              onChange={(e) => {
                                setEditedProfilePic(e.target.files[0]);
                              }}
                            />
                            <label htmlFor="ProfilePic">
                              Change profile pic
                            </label>
                          </div>
                          <hr />
                          <div className="button">
                            <button
                              className="btn shadow gradient-button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleProfileUpdate();
                              }}
                            >
                              Update Profile{" "}
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
                              onChange={(e) => {
                                setcurrpw(e.target.value);
                              }}
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
                              onChange={(e) => {
                                setchangepw(e.target.value);
                              }}
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
                              onChange={(e) => {
                                setconfirmpw(e.target.value);
                              }}
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
                              onClick={(e) => {
                                e.preventDefault();
                                passwordchange();
                              }}
                            >
                              Update Password{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card cardsettprof2 cardproff">
                        <div className="justify-content-center mb-2">
                          <img src={setting} alt="Background" />
                          <div className="d-flex align-items-center justify-content-center ">
                            <Calendar
                              onChange={onChange}
                              value={value}
                              className="custom-calendar"
                            />
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
        <ToastContainer />
      </div>
    </ClubLayout>
  );
};

export default SettingsClubAdmin;
