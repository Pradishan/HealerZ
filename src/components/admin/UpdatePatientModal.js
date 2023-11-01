import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomConfirmModal from "./ConfirmDeleteModal";
import UpdateConfirmModal from "./UpdateConformPatientModal";

function UpdatePatientModal(props) {
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
        "http://localhost/HealerZ/PHP/admin/updatepatient.php",
        newData
      );
      console.log(response.data);
      toast.success("Patient updated successfully!");
      onHide();
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      toast.error("Failed to update Patient!");
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
        `http://localhost/HealerZ/PHP/admin/deletepatient.php?Patient_ID=${newData.Patient_ID}`
      );

      if (response.status === 200) {
        toast.success("Patient deleted successfully!");
        onHide();
      } else {
        toast.error("Failed to delete patient!");
      }
    } catch (error) {
      toast.error("Failed to delete patient!");
      console.error(error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    setNewData({ ...inputs }); 
  }, [inputs]);

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee">Patient Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdate}>
          <table>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="cont1">
                <tr>
                  <th>
                    <label>Entroll_No:</label>
                  </th>
                  <th className="addinputt">
                    {" "}
                    <input
                      type="text"
                      className="form-control1"
                      name="Patient_ID"
                      value={newData.Patient_ID || ""}
                      onChange={(e) =>
                        updateNewData("Patient_ID", e.target.value)
                      }
                      readOnly
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <label>Patient_Name:</label>
                  </th>
                  <th className="addinputt">
                    <input
                      type="text"
                      className="form-control1"
                      name="PatientName"
                      value={newData.PatientName || ""}
                      onChange={(e) =>
                        updateNewData("PatientName", e.target.value)
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <label>Date of Birth:</label>
                  </th>
                  <th className="addinputt">
                    {" "}
                    <input
                      type="date"
                      className="form-control1"
                      name="DateOfBirth"
                      value={newData.DateOfBirth || ""}
                      onChange={(e) =>
                        updateNewData("DateOfBirth", e.target.value)
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>Gender:</label>
                  </th>
                  <th className="addinputt">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Gender"
                          value="Male"
                          checked={newData.Gender === "Male"}
                          onChange={(e) =>
                            updateNewData("Gender", e.target.value)
                          }
                        />
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Gender"
                          value="Female"
                          checked={newData.Gender === "Female"}
                          onChange={(e) =>
                            updateNewData("Gender", e.target.value)
                          }
                        />
                        <label className="form-check-label">Female</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Gender"
                          value="Other"
                          checked={newData.Gender === "Other"}
                          onChange={(e) =>
                            updateNewData("Gender", e.target.value)
                          }
                        />
                        <label className="form-check-label">Other</label>
                      </div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <label>Phone_No:</label>
                  </th>
                  <th className="addinputt">
                    {" "}
                    <input
                      type="text"
                      className="form-control1"
                      name="PhoneNo"
                      value={newData.PhoneNo || ""}
                      onChange={(e) => updateNewData("PhoneNo", e.target.value)}
                    />
                  </th>
                </tr>
              </div>

              <div className="cont2">
                <tr>
                  <th>
                    <label>Email:</label>
                  </th>
                  <th className="addinputt">
                    {" "}
                    <input
                      type="email"
                      className="form-control1"
                      name="Email"
                      value={newData.Email || ""}
                      onChange={(e) => updateNewData("Email", e.target.value)}
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>Address:</label>
                  </th>
                  <th className="addinputt">
                    <textarea
                      className="form-controlll1"
                      rows={3}
                      name="Address"
                      value={newData.Address || ""}
                      onChange={(e) => updateNewData("Address", e.target.value)}
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>Blood Group:</label>
                  </th>
                  <th className="addinputt">
                    <select
                      className="form-control1"
                      name="BloodGroup"
                      value={newData.BloodGroup || ""}
                      onChange={(e) =>
                        updateNewData("BloodGroup", e.target.value)
                      }
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
                  </th>
                </tr>
              </div>
            </div>
          </table>
        </form>
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

export default UpdatePatientModal;
