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

    if (!newData.employee_ID) {
      toast.info("Patient_ID is missing in the update data!");
      return;
    }

    try {

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
        "http://localhost/HealerZ/PHP/admin/updateEmployee.php",
        newData
      );
      console.log(response.data);
      toast.success("Employee updated successfully!");
      onHide();
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      toast.error("Failed to update Employee!");
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
        `http://localhost/HealerZ/PHP/admin/deleteemployee.php?employee_ID=${newData.employee_ID}`
      );

      if (response.status === 200) {
        toast.success("Employee deleted successfully!");
        onHide();
      } else {
        toast.error("Failed to delete Employee!");
      }
    } catch (error) {
      toast.error("Failed to delete Employee!");
      console.error(error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    setNewData({ ...inputs });
  }, [inputs]);

  return (
    <Modal show={show} onHide={onHide} centered size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee">Employee Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdate}>
          <table>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="cont1">
                <tr>
                  <th>
                    <label>Employee_ID:</label>
                  </th>
                  <th className="addinputt">
                    {" "}
                    <input
                      type="text"
                      className="form-control1"
                      name="Patient_ID"
                      value={newData.employee_ID || ""}
                      onChange={(e) =>
                        updateNewData("employee_ID", e.target.value)
                      }
                      readOnly
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <label>Employee_Name:</label>
                  </th>
                  <th className="addinputt">
                    <input
                      type="text"
                      className="form-control1"
                      name="PatientName"
                      value={newData.employee_Name || ""}
                      onChange={(e) =>
                        updateNewData("employee_Name", e.target.value)
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <label>Designation:</label>
                  </th>
                  <th className="addinputt">
                    {" "}
                    <select
                      className="form-control1"
                      name={"role"}
                      value={newData.role || ""}
                      onChange={(e) => updateNewData("role", e.target.value)}
                    >
                      <option value="">Choose Designation</option>
                      <option value="admin">Admin</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Clubadmin">Clubadmin</option>
                    </select>
                  </th>
                </tr>
                <tr>
                  <th>
                    {" "}
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
              </div>

              <div className="cont2">
                <tr>
                  <th>
                    <label>PhoneNo:</label>
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
                    <label>SLMC No:</label>
                  </th>
                  <th className="addinputt">
                    <input
                      type="text"
                      className="form-controlll1"
                      name="SLMC"
                      value={newData.SLMC || ""}
                      onChange={(e) => updateNewData("SLMC", e.target.value)}
                    />
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
