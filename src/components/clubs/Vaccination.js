import React, { useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import the CSS file
import "./Clubs.css";

export default function Vaccination() {
  const [id, setId] = useState("");
  const [vaccinationType, setVaccinationType] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleVaccinationTypeChange = (e) => {
    setVaccinationType(e.target.value);
  };

  const checkVaccinationStatus = () => {
    // Replace this with your actual data or API call to check vaccination status
    // For simplicity, we assume vaccinationStatus is either 'Vaccinated' or 'Not Vaccinated'
    const vaccinationStatus = "Vaccinated"; // Replace with your logic

    setVaccinationStatus(vaccinationStatus);
  };

  return (
    <ClubLayout>
      <div className="Vaccination">
        <h1>Vaccination Checker</h1>
        <div>
          <label>ID:</label>
          <input type="text" value={id} onChange={handleIdChange} />
        </div>
        <div>
          <label>Vaccination Type:</label>
          <select  className="select1"
            value={vaccinationType}
            onChange={handleVaccinationTypeChange}
          >
            <option value="">Select</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
            <option value="Type C">Type C</option>
          </select>
        </div>
        <button onClick={checkVaccinationStatus} className="button1">
          Check Vaccination Status
        </button>
        <div>
          <strong>Vaccination Status:</strong> {vaccinationStatus}
        </div>
      </div>
    </ClubLayout>
  );
}
