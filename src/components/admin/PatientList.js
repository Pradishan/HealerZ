import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewModal from "./ViewPatientModal";
import AdminLayout from "../../layouts/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomConfirmModal from "./ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";

function PatientList(props) {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm3, setSearchTerm] = useState("");
  const [searchTerm4, setSearchTerm2] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [setPatientToDelete, setSelectedPatientToDelete] = useState(null);
  const [filteredPatientList, setFilteredPatientList] = useState([]);

  const handleChange3 = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange4 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchedPatient = patientList.find(
      (patient) => patient.Patient_ID === searchTerm3
    );
    if (searchedPatient) {
      setSelectedPatient(searchedPatient);
      setShowModal(true);
      setSearchTerm("");
    } else {
      toast.error("Invalid Patient ID");
    }
  };

  const handleSearchSubmit2 = (event) => {
    event.preventDefault();
    const searchedPatient = patientList.find(
      (patient) => patient.PatientName === searchTerm4
    );
    if (searchedPatient) {
      setSelectedPatient(searchedPatient);
      setShowModal(true);
      setSearchTerm2("");
    } else {
      toast.error("Invalid Patient Name");
    }
  };

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter the patient list based on ID, Name, and Blood Group filters
    const filteredList = patientList.filter(
      (patient) =>
        patient.Patient_ID.includes(searchTerm3) &&
        patient.PatientName.toLowerCase().includes(searchTerm4.toLowerCase()) &&
        (selectedBloodGroup === "" || patient.BloodGroup === selectedBloodGroup)
    );
    setFilteredPatientList(filteredList);
  }, [searchTerm3, searchTerm4, selectedBloodGroup, patientList]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/admin/displaypatientlist.php"
      );
      setPatientList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (patient) => {
    setConfirmModalVisible(true);
    setSelectedPatientToDelete(patient);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalVisible(false);
    const patientToDelete = setPatientToDelete;
    setSelectedPatientToDelete(null);
    try {
      await axios.delete(
        `http://localhost/Healerz/PHP/admin/deletepatienttt.php?id=${patientToDelete.Patient_ID}`
      );
      toast.success("Patient deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting Patient:", error);
      toast.error("Error deleting Patient");
    }
  };

  return (
    <AdminLayout>
      <h3 className="serhett">Patient List</h3>
      <div className={"container patientlisttable"}>
        <div className={"p-5"}>
          <hr />
          <div
            className={"SearchSection"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* <div>
              <h3 className={"content-heading"}>Filter the Results : </h3>
            </div> */}
            <div className="SearchSection2">
              <div className="search-input-container">
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <input
                    className={"SearchBox1"}
                    type="text"
                    placeholder="PATIENT_ID"
                    value={searchTerm3}
                    onChange={handleChange3}
                    style={{ width: "300px" }}
                  />
                  <div className="search-icon" onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </div>
                </form>
              </div>
              <div className="search-input-container">
              <form
                onSubmit={handleSearchSubmit2}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <input
                  className={"SearchBox1"}
                  type="text"
                  placeholder="PATIENT_Name"
                  value={searchTerm4}
                  onChange={handleChange4}
                  style={{ width: "300px" }}
                />
                 <div className="search-icon" onClick={handleSearchSubmit2}>
                    <SearchIcon />
                  </div>
              </form>
              </div>
              <select
                className={"SearchBox1"}
                value={selectedBloodGroup}
                onChange={handleBloodGroupChange}
                style={{ width: "300px" }}
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
          </div>
          <hr />
          <div className={"table-container"}>
            <table className={"table table-hover table-striped "}>
              <thead
                className={"top-0 position-sticky h-45"}
                style={{ zIndex: 100 }}
              >
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">Patient_ID</th>
                  <th scope="col">PatientName</th>
                  <th scope="col">Gender</th>
                  <th scope="col">DateOfBirth</th>
                  <th scope="col">PhoneNo</th>
                  <th scope="col">BloodGroup</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatientList.length > 0 ? (
                  filteredPatientList.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.Patient_ID}</td>
                      <td>{data.PatientName}</td>
                      <td>{data.Gender}</td>
                      <td>{data.DateOfBirth}</td>
                      <td>{data.PhoneNo}</td>
                      <td>{data.BloodGroup}</td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => openModal(data)}
                          style={{ color: "green" }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => handleDelete(data)}
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
        <CustomConfirmModal
          show={confirmModalVisible}
          onHide={() => setConfirmModalVisible(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
      <ViewModal
        show={showModal}
        onHide={() => setShowModal(false)}
        PatientDetails={selectedPatient}
      />
    </AdminLayout>
  );
}

export default PatientList;
