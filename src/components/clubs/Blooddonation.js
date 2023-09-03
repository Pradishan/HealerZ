import React, { useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Clubs.css"; // Import the CSS file

export default function Blooddonation() {
  const [id, setId] = useState("");
  const [donationStatus, setDonationStatus] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const checkDonationStatus = () => {
    // Replace this with your actual logic to check donation status based on the provided ID
    // For simplicity, we assume donationStatus is either 'Donated' or 'Not Donated'
    const donationStatus = "Donated"; // Replace with your logic

    setDonationStatus(donationStatus);
  };

  return (
    <ClubLayout>
      <div className="container BloodDonate">
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
