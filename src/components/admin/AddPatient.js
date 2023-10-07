import React, { useState } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { Dna } from "react-loader-spinner";

function AddPatient(props) {
  const [patient_id, setID] = useState("");
  const [patient_name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [bg, setBgroup] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setID("");
    setName("");
    setDob("");
    resetGender();
    setphoneNo("");
    setEmail("");
    setAddress("");
    setBgroup("");
  };

  const resetGender = () => {
    setGender("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (patient_id.length === 0) {
      toast.warning("Please Enter the Patient_ID");
    } else if (patient_name.length === 0) {
      toast.warning("Please Enter the Patient_Name");
    } else if (dob.length === 0) {
      toast.warning("Please Enter the DOB");
    } else if (gender.length === 0) {
      toast.warning("Please select the Gender");
    } else if (phoneNo.length === 0) {
      toast.warning("Please Enter the PhoneNo");
    } else if (!validatePhoneNumber(phoneNo)) {
      toast.info("Invalid phone number format");
    } else if (email.length === 0) {
      toast.warning("Please Enter the Email");
    } else if (!validateEmail(email)) {
      toast.info("Invalid email format");
    } else if (address.length === 0) {
      toast.warning("Please Enter the Address");
    } else if (bg.length === 0) {
      toast.warning("Please Enter the BloodGroup");
    } else {
      const generatedPassword = generatePassword(8);

      const url = "http://localhost/HealerZ/PHP/admin/addpatient.php";
      let fdata = new FormData();
      fdata.append("Patient_ID", patient_id);
      fdata.append("Patient_Name", patient_name);
      fdata.append("DateOfBirth", dob);
      fdata.append("Gender", gender);
      fdata.append("PhoneNo", phoneNo);
      fdata.append("Email", email);
      fdata.append("Address", address);
      fdata.append("BloodGroup", bg);
      fdata.append("Password", generatedPassword);
      axios
        .post(url, fdata)
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "Patient Added Successfully") {
            setIsLoading(false);
            toast.success(response.data.message);
            resetForm();
          } else {
            setIsLoading(false);
            toast.error("Patient Already Added");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <AdminLayout>
      <div className="Addcontt">
        {/* <h3 className="serhett">Add patient</h3> */}
        <div className="addboxx">
          <h3 className="pataddhed">Add patient</h3>
          <hr />
          {isLoading ? (
            <div style={{ marginLeft: "450px", marginBottom: "30px" }}>
              <Dna
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                style={{ marginLeft: "70px" }}
              />
            </div>
          ) : (
            <div></div>
          )}
          <hr />
          <form>
            <table>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="cont1">
                  <tr>
                    <th>
                      <label>Entroll_No:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"Patient_ID"}
                        placeholder={"CSTXXXXX"}
                        onChange={(e) => setID(e.target.value)}
                        value={patient_id}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Patient_Name:</label>
                    </th>
                    <th className={"addinputt"}>
                      <input
                        type="text"
                        className="form-control1"
                        name={"Patient_Name"}
                        placeholder={"Thanu"}
                        onChange={(e) => setName(e.target.value)}
                        value={patient_name}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Date of Birth:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="date"
                        className="form-control1"
                        name={"DateOfBirth"}
                        onChange={(e) => setDob(e.target.value)}
                        value={dob}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>Gender:</label>
                    </th>
                    <th className={"addinputt"}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="Gender"
                            value="Male"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Male"}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="Gender"
                            value="Female"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Female"}
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="Gender"
                            value="Other"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Other"}
                          />
                          <label className="form-check-label">Other</label>
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Phone_No:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"PhoneNo"}
                        placeholder={"076XXXXXXX"}
                        onChange={(e) => {
                          setphoneNo(e.target.value);
                          setPhoneError(""); // Clear phone number error when typing
                        }}
                        value={phoneNo}
                      />
                      {phoneError && (
                        <span className="error-message">{phoneError}</span>
                      )}
                    </th>
                  </tr>
                </div>

                <div className="cont2">
                  <tr>
                    <th>
                      <label>Email:</label>
                    </th>
                    <th className="addinputt">
                      {" "}
                      <input
                        type="email"
                        className="form-control1"
                        name={"Email"}
                        placeholder={"Thanush11@gmail.com"}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(""); // Clear email error when typing
                        }}
                        value={email}
                      />
                      {emailError && (
                        <span className="error-message">{emailError}</span>
                      )}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>Address:</label>
                    </th>
                    <th className={"addinputt"}>
                      <textarea
                        className={"form-controlll1"}
                        rows={3}
                        name={"Address"}
                        placeholder={"No07,Kili Town,Kilinochchi"}
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <label>Blood Group:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <select
                        className="form-control1"
                        name={"BloodGroup"}
                        onChange={(e) => setBgroup(e.target.value)}
                        value={bg}
                        style={{ height: "30px" }}
                      >
                        <option value="">Choose Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </th>
                  </tr>
                </div>
              </div>
            </table>
            <hr />
          </form>
          <button
            className="btn btn-primary done-button"
            type="submit"
            name={"send"}
            value={"SEND"}
            onClick={handleSubmit}
          >
            ADD
          </button>
          <button
            className="btn btn-secondary done-buttontt3"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
}

export default AddPatient;
