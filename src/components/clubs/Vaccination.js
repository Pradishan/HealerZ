import React, { useEffect, useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import the CSS file
import "./vaccination.css";
import axios from "axios";
import vaccinatedicon from "../../assets/vaccination.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Vaccination() {
  const [id, setId] = useState("");
  const [vaccinationType, setVaccinationType] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [Patient_ID, setPatient_ID] = useState("");
  const [VaccinationName, setVaccinationName] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleVaccinationTypeChange = (e) => {
    setVaccinationType(e.target.value);
  };

  const checkVaccinationStatus = () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("vaccinationType", vaccinationType);

    axios
      .post(
        "http://localhost/Healerz/PHP/club/vaccination_details.php",
        formData
      )
      .then((response) => {
        setVaccinationStatus(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  };

  const resetForm = () => {
    setPatient_ID("");
    setVaccinationName("");
  };

  const handleSubmit = () => {
    if (Patient_ID.length === 0) {
      toast.warning("Pls Enter the Entroll No");
    } else {
      const url = "http://localhost/HealerZ/PHP/club/addVaccine.php";
      const formData = new FormData();
      formData.append("Patient_ID", Patient_ID);
      formData.append("VaccinationName", VaccinationName);
      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "Vaccine Registration Successfully") {
            toast.success(response.data.message);
            resetForm();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error("Failed to add Event");
          console.error(error);
        });
    }
  };

  return (
    <ClubLayout>
      <div>
        <div className="container Blooddonation">
          <h3 className="bdhedchechheading" style={{ color: "green" }}>
            Vaccination Portal
          </h3>
          <div className="contbloddont">
            <div className="container Blooddonation">
              {" "}
              {}
              <h3 className="bdhedchechhead">Vaccination Checker</h3>
              <hr />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name={"Patient_ID"}
                  value={id}
                  onChange={handleIdChange}
                  id="floatingPassword"
                  placeholder="Email"
                  style={{ width: "100%" }}
                />
                <label htmlFor="floatingPassword">Entroll_No</label>
              </div>
              <div className="form-floating">
                <select
                  value={vaccinationType}
                  onChange={(e) => handleVaccinationTypeChange(e)}
                  className="form-select"
                  id="floatingVaccinationType"
                >
                  <option value={""}>Select the Vaccine Category</option>
                  <option value={"Fizer"}>Fizer</option>
                  <option value={"CovidShield"}>CovidShield</option>
                  <option value={"Sinopharm"}>Sinopharm</option>
                </select>
              </div>
              <hr />
              <button
                className="btn btn-danger"
                onClick={checkVaccinationStatus}
              >
                Check Vaccination Status
              </button>
              <hr />
            </div>
            {vaccinationStatus === "Not vaccinated" ? (
              <div className="container Blooddonation">
                <h3 className="bdhedchechhead">Registration</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name={"Patient_ID"}
                      value={Patient_ID}
                      onChange={(e) => setPatient_ID(e.target.value)}
                      id="floatingPassword"
                      placeholder="Email"
                      style={{ width: "100%" }}
                    />
                    <label htmlFor="floatingPassword">Entroll_No</label>
                  </div>
                  <div className="form-floating">
                    <select
                      value={VaccinationName}
                      onChange={(e) => setVaccinationName(e.target.value)}
                      className="form-select"
                      id="floatingVaccinationType"
                    >
                      <option value={""}>Select the Vaccine Category</option>
                      <option value={"Fizer"}>Fizer</option>
                      <option value={"CovidShield"}>CovidShield</option>
                      <option value={"Sinopharm"}>Sinopharm</option>
                    </select>
                  </div>
                  <hr />
                  <div>
                    <button className="btn btn-success">Get Vaccine</button>
                  </div>
                  <hr />
                </form>
              </div>
            ) : (
              <div className="container Blooddonation">
                <div className="notdonatedstatus23">
                  <img src={vaccinatedicon} height="200px" alt="" />
                  {vaccinationStatus ? (
                    <strong> {vaccinationStatus}</strong>
                  ) : (
                    <strong>Wear mask</strong>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </ClubLayout>
  );
}
