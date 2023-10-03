import React, { useState, useEffect } from "react";
import Layout from "../../layouts/layout";
import "./inventory.css";
import SupplyModal from "./modals/SupplyModal";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomConfirmModal from "./modals/CustomConfirmModal";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';


function Supply(props) {
  const [showModal, setShowModal] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const supplymodal = () => {
    setShowModal(!showModal);
  };
  const [searchTerm3, setSearchTerm] = useState("");
  const [searchTerm4, setSearchTerm2] = useState("");
  const [presList, setPresList] = useState([]);
  const [filteredPresList, setFilteredPresList] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);

  const [searchDate, setSearchDate] = useState("");
  const handleChangeDate = (event) => {
    setSearchDate(event.target.value);
  };

  const handleChange3 = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChange4 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    console.log(`Searching for ${searchTerm3}...`);
  };
  const handleSubmit4 = (event) => {
    event.preventDefault();
    console.log(`Searching for ${searchTerm4}...`);
  };
  const handleDelete = () => {
    setConfirmModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/Inventory/displayPrescriptions.php"
      );
      setPresList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const filteredData = presList.filter(
      (prescription_list) =>
        prescription_list.Prescription_ID.includes(searchTerm3) &&
        prescription_list.Patient_ID.includes(searchTerm4) &&
        (searchDate === "" || prescription_list.TimeP.includes(searchDate))
    );
    setFilteredPresList(filteredData);
  }, [searchTerm3, searchTerm4, searchDate, presList]);


  const openModal = (drug) => {
    setSelectedDrug(drug);
    setShowModal(true);
  };

  return (
    <Layout>
      <h3 className="serhedd">Supply Detail</h3>
      <div className={"container tabconttt"}>
        <div className={"p-5"}>
          <hr />
          <div
            className={"SearchSection"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className={"SearchSection2"}>
              <div className="search-input-container">
                <form onSubmit={handleSubmit3}>
                  <input
                    className="SearchBox1"
                    type="text"
                    placeholder="Filter by Prescription_ID"
                    value={searchTerm3}
                    onChange={handleChange3}
                    style={{ width: "300px" }}
                  />
                  <div className="search-icon" onClick={supplymodal}>
                    <SearchIcon />
                  </div>
                  {searchTerm3 && (
                  <div className="search-icon" style={{zIndex:'100',backgroundColor:'white',right:'6px'}} onClick={() => setSearchTerm("")}>
                   <ClearIcon/>
                  </div>
                )}
                </form>
              </div>
              <div className="search-input-container">
                <form onSubmit={handleSubmit4}>
                  <input
                    className="SearchBox1"
                    type="text"
                    placeholder="Filter by Patient_ID"
                    value={searchTerm4}
                    onChange={handleChange4}
                    style={{ width: "300px" }}
                  />
                  <div className="search-icon" onClick={supplymodal}>
                    <SearchIcon />
                  </div>
                  {searchTerm4 && (
                  <div className="search-icon" style={{zIndex:'100',backgroundColor:'white',right:'6px'}} onClick={() => setSearchTerm2("")}>
                   <ClearIcon/>
                  </div>
                )}
                </form>
              </div>

              <div className="search-input-container">
                <input
                  className="SearchBox1"
                  type="date"
                  placeholder="Filter by Date"
                  value={searchDate}
                  onChange={handleChangeDate}
                  style={{ width: "300px" }}
                />
                {searchDate && (
                  <div className="search-icon" style={{zIndex:'100',backgroundColor:'white',right:'4px'}} onClick={() => setSearchDate("")}>
                   <ClearIcon/>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className={"table-container "}>
            <table className={"table table-hover table-striped "}>
              <thead className={"top-0 position-sticky h-45"}>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">DATE</th>
                  <th scope="col">PRESCRIPTION_ID</th>
                  <th scope="col">PATIENT_ID</th>
                  <th scope="col">PATIENT_NAME</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredPresList.length > 0 ? (
                  filteredPresList.map((data, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data.TimeP}</td>
                      <td>{data.Prescription_ID}</td>
                      <td>{data.Patient_ID}</td>
                      <td>{data.PatientName}</td>
                      <td
                        className={
                          data.status === "Waiting"
                            ? "waiting"
                            : data.status === "Delivered"
                            ? "delivered"
                            : "rejected"
                        }
                      >
                        {data.status}
                      </td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => openModal(data)}
                          style={{ color: "green" }}
                        >
                          <BrowserUpdatedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={handleDelete}
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SupplyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        drugDetails={selectedDrug}
      />
      <CustomConfirmModal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
      />
    </Layout>
  );
}

export default Supply;
