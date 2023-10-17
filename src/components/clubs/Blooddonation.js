import React, { useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./blooddonation.css"; // Import the CSS file
import axios from "axios";

export default function Blooddonation() {
  const [id, setId] = useState("");
  const [donationStatus, setDonationStatus] = useState("");
  const [donationhist, setDonationhist] = useState(null);

  const checkDonationAvailability = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 90 ? "Can Donate" : "Cannot Donate";
  };

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
        if (response.data.message === "Donated") {
          setDonationhist(response.data.details);
        } else {
          setDonationhist(null);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  };

  return (
    <ClubLayout>
      <div className="container Blooddonation">
        {" "}
        {}
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
      {donationhist !== null && (
        <div>
          <table>
            <tr>
              <td>Blood Group</td>
              <td>{donationhist[0]?.BloodGroup}</td>
            </tr>
            <tr>
              <td>Blood Donation Availability</td>
              <td>{checkDonationAvailability(donationhist[0]?.Date)}</td>
            </tr>
            <tr>
              <td colSpan={1}>Donation History</td>
            </tr>
            {donationhist.map((history, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{history?.Date}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </ClubLayout>
  );
}
