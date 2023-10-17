import React, { useEffect, useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import the CSS file
import "./vaccination.css";
import axios from "axios";
import Vaccine_reg from "./Vaccine_reg";

export default function Vaccination() {
  const [id, setId] = useState("");
  const [vaccinationType, setVaccinationType] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [vaccinationOption, setVaccinationOption] = useState(null);

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
  useEffect(() => {
    if (vaccinationOption === null) {
      axios
        .post("http://localhost/Healerz/PHP/club/vaccination_Option.php")
        .then((response) => {
          setVaccinationOption(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data", error);
        });
    }
  });

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
          <select
            value={vaccinationType}
            onChange={(e) => handleVaccinationTypeChange(e)}
          >
            <option value={""}>Select</option>
            {vaccinationOption?.map((value, key) => {
              return (
                <option value={value.VaccinationName} key={key}>
                  {value["VaccinationName"]}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={checkVaccinationStatus}>
          Check Vaccination Status
        </button>
        <div>
          <strong>Vaccination Status:</strong> {vaccinationStatus}
        </div>
      </div>
      {vaccinationStatus === "Not vaccinated" && <Vaccine_reg />}
    </ClubLayout>
  );
}
