import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomConfirmModal from '../admin/ConfirmDeleteModal';
import UpdateConfirmModal from '../admin/UpdateConformPatientModal';

function UpdateEvent(props) {
  const { show, onHide, inputs } = props;
  const [newData, setNewData] = useState({ ...inputs }); 
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const updateNewData = (field, value) => {
    setNewData({
      ...newData,
      [field]: value,
    });
  };

  const handleUpdate = () => {
    setShowUpdateConfirmModal(true);
  };

  const handleUpdateConfirmed = async (e) => {
    e.preventDefault();

    if (Object.keys(newData).length === 0) {
      toast.info("No data to update!");
      return;
    }

    if (!newData.Patient_ID) {
      toast.info("Patient_ID is missing in the update data!");
      return;
    }

    try {
      if (newData.DateOfBirth) {
        const selectedDOB = new Date(newData.DateOfBirth);
        const currentDate = new Date();
        if (selectedDOB > currentDate) {
          toast.info("Please select a past date for Date of Birth.");
          return;
        }
      }

      if (newData.PhoneNo && !/^\d{10}$/.test(newData.PhoneNo)) {
        toast.info("Invalid phone number format");
        return;
      }

      if (
        newData.Email &&
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newData.Email)
      ) {
        toast.info("Invalid email format");
        return;
      }

      const response = await axios.put(
        "http://localhost/HealerZ/PHP/club/updateEvent.php",
        newData
      );
      console.log(response.data);
      toast.success("Event updated successfully!");
      onHide();
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      toast.error("Failed to update Response!");
      console.error(error);
    }
    setShowUpdateConfirmModal(false);
  };

  const handleDelete = async () => {
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await axios.delete(
        `http://localhost/HealerZ/PHP/club/deleteEvent.php?Event_ID=${newData.Event_ID}`
      );

      if (response.status === 200) {
        toast.success("Response deleted successfully!");
        onHide();
      } else {
        toast.error("Failed to delete Response !");
      }
    } catch (error) {
      toast.error("Failed to delete Response!");
      console.error(error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    setNewData({ ...inputs }); 
  }, [inputs]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee">Update Response</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <form>
        <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name={"Patient_ID"}
                    value={newData.Patient_ID || ""}
                    onChange={(e) =>
                      updateNewData("Patient_ID", e.target.value)
                    }
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
                    value={newData.email || ""}
                    onChange={(e) =>
                      updateNewData("email", e.target.value)
                    }
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
                    value={newData.name || ""}
                      onChange={(e) =>
                        updateNewData("name", e.target.value)
                      }
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
                    value={newData.nic || ""}
                      onChange={(e) =>
                        updateNewData("nic", e.target.value)
                      }
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
                    value={newData.phone_no || ""}
                      onChange={(e) =>
                        updateNewData("phone_no", e.target.value)
                      }
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
                    value={newData.address || ""}
                      onChange={(e) =>
                        updateNewData("address", e.target.value)
                      }
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
                    value={newData.event || ""}
                    onChange={(e) =>
                      updateNewData("event", e.target.value)
                    }
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
          onClick={handleUpdate}
          style={{ backgroundColor: "green" }}
        >
          Update
        </Button>
        <Button
          variant="primary uptbut"
          onClick={handleDelete}
          style={{ backgroundColor: "red" }}
        >
          Delete
        </Button>
        <ToastContainer />
        <CustomConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteConfirmed}
        />
        <UpdateConfirmModal
            show={showUpdateConfirmModal}
            onHide={() => setShowUpdateConfirmModal(false)}
            onConfirm={handleUpdateConfirmed}
          />
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateEvent;
