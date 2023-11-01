import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function BloodDonationModal(props) {
  const [Patient_ID, setPatient_ID] = useState("");
  const [Name, setName] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");

  const resetForm = () => {
    setName("");
    setBloodGroup("");
    setPatient_ID("");
  };

  const handleSubmit = () => {
    if (Patient_ID.length === 0) {
      toast.warning("Pls Enter the Entroll No");
    } else {
      const url = "http://localhost/HealerZ/PHP/club/addBlooddonation.php";
      const formData = new FormData();
      formData.append("Patient_ID", Patient_ID);
      formData.append("BloodGroup", BloodGroup);
      formData.append("name", Name);
      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "Successfully Donated") {
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

  const { show, onHide } = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee">Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <form>
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
          <div className="form-floating mt-3">
            <input
              type="text"
              className="form-control"
              name={"name"}
              value={Name}
              onChange={(e) => setName(e.target.value)}
              id="floatingPassword"
              placeholder="Name"
              style={{ width: "100%" }}
            />
            <label htmlFor="floatingPassword">Name</label>
          </div>
          <div className="form-floating mt-3">
            <select
              value={BloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="form-select"
              id="floatingVaccinationType"
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
          </div>
        </form>
        <hr />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary uptbut"
          type="submit"
          name={"send"}
          value={"SEND"}
          onClick={handleSubmit}
          style={{ backgroundColor: "green", width: "130px" }}
        >
          Donate
        </Button>
        <Button variant="secondary uptbut" onClick={resetForm}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BloodDonationModal;
