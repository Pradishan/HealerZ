import React, { useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./blooddonation.css"; // Import the CSS file
import axios from "axios";
import bddonate from "../../assets/blddonate.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const availabilityColor =
    checkDonationAvailability(donationhist?.[0]?.Date) === "Can Donate"
      ? "green"
      : "red";

  return (
    <ClubLayout>
      <div className="container Blooddonation">
        <h3 className="bdhedchechheading">Blood Donation Portal</h3>
        <div className="contbloddont">
          <div className="container Blooddonation">
            {" "}
            {}
            <h3 className="bdhedchechhead">Blood Donation Checker</h3>
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
            <hr />
            <button className="btn btn-danger" onClick={checkDonationStatus}>
              Check Donation Status
            </button>
            <hr />
          </div>
          {donationhist !== null && (
            <div className="container Blooddonation">
              <h3 className="serhed7">Donation Detail</h3>
              <hr />
              <div className="donathisdetail">
                <div className="donatehispart">
                  <h4 style={{marginLeft:'10px'}}>Donar Detail</h4>
                  <table>
                    <tbody className="donatdettt">
                      <tr>
                        <th>Entroll No</th>
                        <th>:</th>
                        <td>{donationhist[0]?.PatientId}</td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <th>:</th>
                        <td>{donationhist[0]?.name}</td>
                      </tr>
                      <tr>
                        <th>Blood Group</th>
                        <th>:</th>
                        <td style={{ color: "red" }}>
                          {donationhist[0]?.BloodGroup}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="vertical-linedonate"></div>
                <div className="donatehispart">
                  <h4>Donation History</h4>
                  <table>
                    <tbody className="donatdettt">
                    <tr>
                      <th>No</th>
                      <th style={{ paddingLeft: "15px" }}>Doantion Date</th>
                    </tr>
                    {donationhist.map((history, key) => {
                      return (
                        <tr key={key}>
                          <th>{key + 1}</th>
                          <td style={{ paddingLeft: "15px" }}>
                            {history?.Date}
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
              <h3
                className="availabilitycheck"
                style={{ color: availabilityColor }}
              >
                {checkDonationAvailability(donationhist?.[0]?.Date)}
              </h3>
            </div>
          )}
          {donationhist === null && (
            <div className="container Blooddonation">
              <div className="notdonatedstatus">
                <img src={bddonate} height="150px" alt="" />
                <strong>{donationStatus}</strong>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </ClubLayout>
  );
}
