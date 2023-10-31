import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function RegistrationModal(props) {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Nic, setNic] = useState("");
  const [Phone_no, setPhone_no] = useState("");
  const [Address, setAddress] = useState("");
  const [Event, setEvent] = useState("");
  const [Patient_ID, setPatient_ID] = useState("");

  const resetForm = () => {
    setEmail("");
    setName("");
    setNic("");
    setPhone_no("");
    setAddress("");
    setEvent("");
  };

  const handleSubmit = () => {
    if (Patient_ID.length === 0) {
      toast.warning("Pls Enter the Entroll No");
    } else if (Email.length === 0) {
      toast.warning("Pls Enter the Email Address");
    } else if (Name.length === 0) {
      toast.warning("Pls Enter the Your Name");
    } else if (Nic.length === 0) {
      toast.warning("Pls Enter the Nic_no");
    } else if (Phone_no.length === 0) {
      toast.warning("Pls Enter the Phone_no");
    } else if (Address.length === 0) {
      toast.warning("Pls Enter the Address");
    } else if (Event.length === 0) {
      toast.warning("pls Enter the Event Name");
    } else {
      const url = "http://localhost/HealerZ/PHP/club/addEvent.php";
      const formData = new FormData();
      formData.append("Patient_ID", Patient_ID);
      formData.append("email", Email);
      formData.append("name", Name);
      formData.append("nic", Nic);
      formData.append("phone_no", Phone_no);
      formData.append("address", Address);
      formData.append("event", Event);
      axios
        .post(url, formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "Event Registration Successfully") {
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
              name={"email"}
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              id="floatingPassword"
              placeholder="Email"
              style={{ width: "100%" }}
            />
            <label htmlFor="floatingPassword">Email</label>
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
            <input
              type="text"
              className="form-control"
              name={"nic"}
              value={Nic}
              onChange={(e) => setNic(e.target.value)}
              id="floatingPassword"
              placeholder="Nic NO"
              style={{ width: "100%" }}
            />
            <label htmlFor="floatingPassword">NIC No</label>
          </div>

          <div className="form-floating mt-3">
            <input
              type="text"
              className="form-control"
              name={"phone_no"}
              value={Phone_no}
              onChange={(e) => setPhone_no(e.target.value)}
              id="floatingPassword"
              placeholder="Phone No"
              style={{ width: "100%" }}
            />
            <label htmlFor="floatingPassword">Phone_no</label>
          </div>

          <div className="form-floating mt-3">
            <input
              type="text"
              name={"address"}
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="floatingPassword"
              placeholder="Address"
              style={{ width: "100%" }}
            />
            <label htmlFor="floatingPassword">Address</label>
          </div>

          <div className="form-floating mt-3">
            <select
              name={"event"}
              className="form-control"
              onChange={(e) => setEvent(e.target.value)}
              value={Event}
            >
              <option value={""}>Select Category</option>
              <option value={"vaccination"}>Vaccination</option>
              <option value={"blooddonation"}>Blood Donation</option>
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
          Register
        </Button>
        <ToastContainer />
        <Button variant="secondary uptbut" onClick={resetForm}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegistrationModal;
