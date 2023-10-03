import React, { useState, useEffect } from "react";
import Layout from "../../layouts/layout";
import powsi from "../../assets/Powsi.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings(props) {
  const [image, setImage] = useState(null);
  // const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currpw, setcurrpw] = useState(null);
  const [changepw, setchangepw] = useState(null);
  const [confirmpw, setconfirmpw] = useState(null);
  const [userdata, setuserdata] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);
 
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost/Healerz/PHP/Inventory/getPharmacistData.php",
//         { params: { pharmacistID: sessionStorage.getItem("pharmacistID") } }
//       );
//       setuserdata(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
  

  const handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const passwordchange = () => {
    if (currpw === null && changepw === null && confirmpw === null) {
      toast.error("Fill Feilds");
    } else {
      if (currpw === userdata.map((data) => data.Password)[0]) {
        if (changepw === null) {
          toast.error("Enter new Password");
        } else if (changepw === confirmpw && changepw !== null) {
          if (currpw === changepw) {
            toast.warn("Existing Password !");
          } else {
            const tempuserdata = [...userdata];
            tempuserdata[0].Password = changepw;
            setuserdata(tempuserdata);
            console.log(userdata[0]);
            axios
              .put(
                "http://localhost/HealerZ/PHP/Inventory/changepharmacistPassword.php",
                userdata[0]
              )
              .then((res) => {
                toast.success("Password Changed Successfully");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          toast.error("Wrong Confirm Password !");
        }
      } else {
        toast.error("Wrong Current Password !");
      }
    }
  };

  return (
    <Layout>
      <div className="settingg">
        <div className="d-flex align-items-center justify-content-center mb-2">
          <div className="d-flex align-items-center justify-content-center ms-2">
            <img
              src={powsi}
              alt="avatar"
              className="rounded-circle me-2"
              width="100px"
              height="100px"
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div>
              <h4 className="m-0">Powsi</h4>
              <p className="fs-5 m-0">Powsi07@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="accordion accordion-flush" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#profile"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Change profile picture
              </button>
            </h2>
            <div
              id="profile"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={handleFileInputChange}
                  />
                </div>
                <button
                  className="btn w-100 text-white shadow btn-gr"
                //   onClick={handleImageUpload}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion accordion-flush mt-4" id="passwordAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#password"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Change Password
              </button>
            </h2>
            <div
              id="password"
              className="accordion-collapse collapse"
              data-bs-parent="#passwordAccordion"
            >
              <div className="accordion-body">
                {userdata.map((data, index) => (
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
                      <label htmlFor="currentPassword">Current Password</label>
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
                      <label htmlFor="confirmPassword">Confirm Password</label>
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
                        Save changes{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <ToastContainer />
      </div>
    </Layout>
  );
}
