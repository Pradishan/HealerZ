import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MedicalRequest.css"; // Create this CSS file for custom styles

const MedicalRequestForm = () => {
  // JavaScript to handle form submission and display the alert
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your logic to handle form submission and display the alert goes here
    alert('Request was sent!');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="form-container">
            <h2 className="mb-4">Request Medical</h2>
            <form onSubmit={handleSubmit} id="medical-request-form">

              <div className="form-group">
                <label htmlFor="consultation-date">Consultation Date:</label>
                <input type="date" className="form-input" id="consultation-date" name="consultation-date" required />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (in days):</label>
                <input type="number" className="form-input" id="duration" name="duration" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea className="form-input" id="message" name="message" rows="4" required></textarea>
              </div>
              <div className="button">
                <button className="gradient-button">Submit Request</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="status-container">
            <h3>Request Status</h3>
            <p className="requestDate">Request Submitted Date</p>
            <div className="row">
             <p className="col-md-6">State: <span className="request-state">Approved</span></p>
             <p className="col-md-6 moveLeft">07/05/2023</p>
            </div>
            <div className="row">
             <p className="col-md-6">State: <span className="request-state">Approved</span></p>
             <p className="col-md-6 moveLeft">09/05/2023</p>
            </div>
            <div className="row">
             <p className="col-md-6">State: <span className="request-state">Pending</span></p>
             <p className="col-md-6 moveLeft">17/06/2023</p>
            </div>
            <p className="note1">Download the medical in PDF format after the request is approved by the doctor. </p>
          </div>

          <div className="download-container">
            <h3>Download Medical</h3>
            <p className="note2">Download the medical according to the submitted date.</p>
            <p className="date">07/05/2023</p>
            <div className="buttonDownload">
                <button className="gradient-button">Download PDF</button>
              </div>
              <p className="date">09/05/2023</p>
            <div className="buttonDownload">
                <button className="gradient-button">Download PDF</button>
              </div>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRequestForm;