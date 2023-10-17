import React, { useState } from "react";
import axios from "axios";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    vaccinationId: "",
    vaccinationName: "",
    manuDate: "",
    expDate: "",
    patientId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to your backend for database insertion using Axios
      const response = await axios.post(
        "http://localhost/Healerz/PHP/club/vaccination_details.php",
        formData
      );

      console.log("Data successfully inserted:", response.data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="vaccinationId">Vaccination ID:</label>
              <input
                type="text"
                id="vaccinationId"
                name="vaccinationId"
                value={formData.vaccinationId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="vaccinationName">Vaccination Name:</label>
              <input
                type="text"
                id="vaccinationName"
                name="vaccinationName"
                value={formData.vaccinationName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="manuDate">Manufacturing Date:</label>
              <input
                type="date"
                id="manuDate"
                name="manuDate"
                value={formData.manuDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="expDate">Expiration Date:</label>
              <input
                type="date"
                id="expDate"
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="patientId">Patient ID:</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
}
