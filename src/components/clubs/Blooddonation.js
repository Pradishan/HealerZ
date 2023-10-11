import React, { useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./blooddonation.css"; // Import the CSS file
import axios from "axios";

export default function Blooddonation() {
  const [id, setId] = useState("");
  const [donationStatus, setDonationStatus] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const checkDonationStatus = () => {
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post(
        "http://localhost/Healerz/PHP/club/blood_Donation_Status.php",
        formData
      )
      .then((response) => {
        setDonationStatus(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  };

  return (
    <ClubLayout>
      <div className="container Blooddonation">
        {" "}
        {/* Apply the "container" class */}
        <h1>Blood Donation Checker</h1>
        <div>
          <label>ID:</label>
          <input type="text" value={id} onChange={handleIdChange} />
        </div>
        <button onClick={checkDonationStatus}>Check Donation Status</button>
        <div>
          <strong>Donation Status:</strong> {donationStatus}
        </div>
      </div>
    </ClubLayout>
  );
}
