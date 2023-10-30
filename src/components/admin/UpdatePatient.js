import React, { useState, useEffect } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import CustomConfirmModal from "./ConfirmDeleteModal";
import UpdateConfirmModal from "./UpdateConformPatientModal";

function UpdatePatient(props) {
  const [patient_id, setPatientID] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);

  const [newData, setNewData] = useState({});

  const updateNewData = (field, value) => {
    setNewData({
      ...newData,
      [field]: value,
    });
  };

  const closee = () => {
    setPatientData(null);
    setNewData({});
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost/HealerZ/PHP/admin/searchpatient.php?patient_id=${patient_id}`
      );
      const data = response.data;

      if (data && data.length > 0) {
        toast.success("Patient Found");
        setPatientData(data[0]);
      } else {
        toast.error("Patient not found");
        setPatientData(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setPatientID("");
    }
  };

  const handleUpdateConfirmed = async () => {
    try {
      const response = await axios.put(
        "http://localhost/HealerZ/PHP/admin/updatepatient.php",
        newData
      );
      console.log("Update Response: ", response);

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        setPatientData(null);
        setNewData({});
      } else if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.error("Failed to update patient!");
      }
    } catch (error) {
      toast.error("An error occurred during the update.");
      console.error("Update Error: ", error);
    } finally {
      setShowUpdateConfirmModal(false);
    }
  };

  const handleUpdate = async (e) => {
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

      setShowUpdateConfirmModal(true); 
    } catch (error) {
      toast.error("Failed to update patient!");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!patientData || !patientData.Patient_ID) {
      toast.error("Patient ID not found!");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost/HealerZ/PHP/admin/deletepatient.php?Patient_ID=${patientData.Patient_ID}`
      );
      console.log(response.data);
      toast.success("Patient deleted successfully!");
      setPatientData(null);
      setNewData({});
    } catch (error) {
      toast.error("Failed to delete patient!");
      console.error(error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    if (patientData) {
      setNewData({
        Patient_ID: patientData.Patient_ID,
        PatientName: patientData.PatientName,
        DateOfBirth: patientData.DateOfBirth,
        Gender: patientData.Gender,
        PhoneNo: patientData.PhoneNo,
        Email: patientData.Email,
        Address: patientData.Address,
        BloodGroup: patientData.BloodGroup,
        Password: patientData.Password,
      });
    } else {
      setNewData({});
    }
  }, [patientData]);

  return (
    <AdminLayout>
      <div className="Addcontt">
        <div className="addboxx">
          <h3 className="pataddhed">Update patient</h3>
          <hr />
          <form onSubmit={handleSearch}>
            <div
              className="SearchSection searrrchbox"
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "150px",
              }}
            >
              <div>
                <h3 className="content-heading serachhett">
                  Search by Entroll_No:
                </h3>
              </div>
              <div className="SearchSection3">
                <input
                  className="SearchBox4"
                  type="text"
                  placeholder="Entroll_No"
                  value={patient_id}
                  onChange={(e) => setPatientID(e.target.value)}
                />
                <button type="submit" className="btn btn-primary done-button4">
                  Search
                </button>
              </div>
            </div>
          </form>
          <hr />

          {patientData && (
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
                          onChange={(e) =>
                            updateNewData("PhoneNo", e.target.value)
                          }
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
                          onChange={(e) =>
                            updateNewData("Email", e.target.value)
                          }
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
                          onChange={(e) =>
                            updateNewData("Address", e.target.value)
                          }
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
              <hr />
              <div className="Adddelbutt">
                <button
                  className="btn btn-primary done-button5"
                  type="submit"
                  style={{ backgroundColor: "green" }}
                >
                  Update
                </button>
                <button
                  className="btn btn-primary done-button5"
                  type="button"
                  onClick={handleDelete}
                  style={{ backgroundColor: "red" }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary done-button5"
                  type="button"
                  onClick={closee}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
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
      </div>
    </AdminLayout>
  );
}

export default UpdatePatient;
