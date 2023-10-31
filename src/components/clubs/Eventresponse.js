import React, { useState, useEffect } from "react";
import axios from "axios";
import ClubLayout from "../../layouts/ClubLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomConfirmModal from "../admin/ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import UpdateModal from "./UpdateEvent";
import ViewModal from "./EventresponseViewModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RegistrationModal from "./RegistrationModal";
import "./Clubs.css";

function EventList(props) {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm3, setSearchTerm3] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [eventlist, setEventList] = useState([]);
  const [selectedEvtReg, setSelectedEvtReg] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [evtRegToDelete, setEvtRegToDelete] = useState(null);
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const addModal = () => {
    setShowModal4(!showModal4);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [updateTrigger]);

  const handleChangeDate = (event) => {
    setSearchDate(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [showUpdateModal]);

  const handleChange3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchedEvtReg = eventlist.find(
      (evtreg) => evtreg.evtreg_ID === searchTerm3
    );
    if (searchedEvtReg) {
      setSelectedEvtReg(searchedEvtReg);
      setShowModal(true);
      setSearchTerm3("");
    } else {
      toast.error("Invalid evtreg ID");
    }
  };

  const openModal = (evtreg) => {
    setSelectedEvtReg(evtreg);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredList = eventlist.filter(
      (evtreg) =>
        evtreg.Patient_ID.includes(searchTerm3) &&
        (searchDate === "" || evtreg.Date.includes(searchDate)) &&
        (selectedBloodGroup === "" || evtreg.event === selectedBloodGroup)
    );
    setFilteredEventList(filteredList);
  }, [searchTerm3, searchDate, selectedBloodGroup, eventlist]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/club/displayeventresponse.php"
      );
      setEventList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (evtreg) => {
    setConfirmModalVisible(true);
    setEvtRegToDelete(evtreg);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalVisible(false);
    const evtregToDelete = evtRegToDelete;
    setEvtRegToDelete(null);
    try {
      await axios.delete(
        `http://localhost/Healerz/PHP/club/deleteEvent.php?evtreg_id=${evtregToDelete.evtreg_id}`
      );
      toast.success("Response deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting Response :", error);
      toast.error("Error deleting Response ");
    }
  };

  const handleUpdate = (evtreg) => {
    setSelectedEvtReg(evtreg);
    setShowUpdateModal(true);
  };

  return (
    <ClubLayout>
      <button className="btn shadow gradient-button eventaddbutt" onClick={addModal}>
        Registration
        <AddCircleIcon className="icoinvent"/>
      </button>
      <div className="container eventlisttable">
        <div className={"p-5"}>
          <hr />
          <div
            className={"SearchSection"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="SearchSection2">
              <div className="search-input-container">
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <input
                    className={"SearchBox1"}
                    type="text"
                    placeholder="Filter By Entroll_No"
                    value={searchTerm3}
                    onChange={handleChange3}
                    style={{ width: "300px" }}
                  />
                  <div className="search-icon" onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </div>
                  {searchTerm3 && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "6px",
                      }}
                      onClick={() => setSearchTerm3("")}
                    >
                      <ClearIcon />
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
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "4px",
                    }}
                    onClick={() => setSearchDate("")}
                  >
                    <ClearIcon />
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="search-input-container">
                  <select
                    className={"SearchBox1"}
                    value={selectedBloodGroup}
                    onChange={handleBloodGroupChange}
                    style={{ width: "300px" }}
                  >
                    <option value="">Choose Event</option>
                    <option value="blooddonation">Blood Donation</option>
                    <option value="vaccination">Vaccination</option>
                  </select>
                  {selectedBloodGroup && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "3px",
                      }}
                      onClick={() => setSelectedBloodGroup("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="table-containertt">
            <table className={"table table-hover table-striped"}>
              <thead
                className={"top-0 position-sticky h-45"}
                style={{ zIndex: 100 }}
              >
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">Entroll_No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">PhoneNo</th>
                  <th scope="col">Date</th>
                  <th scope="col">Event</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody className="h-50">
                {filteredEventList.length > 0 ? (
                  filteredEventList.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.Patient_ID}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone_no}</td>
                      <td>{data.Date}</td>
                      <td>{data.event}</td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => openModal(data)}
                          style={{ color: "blue" }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          className="viewbutt"
                          onClick={() => handleUpdate(data)}
                          style={{ color: "green" }}
                        >
                          <EditIcon />
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
        EventDetails={selectedEvtReg}
      />
      <UpdateModal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
          setUpdateTrigger(!updateTrigger);
        }}
        inputs={selectedEvtReg} // Pass the selected evtreg data to the UpdateModal
      />
       <RegistrationModal show={showModal4} onHide={addModal} />
    </ClubLayout>
  );
}

export default EventList;
