import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewModal from "./modals/ViewModal";
import Layout from "../../layouts/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./inventory.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomConfirmModal from "./modals/CustomConfirmModal";
import SearchIcon from "@mui/icons-material/Search";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import StockUpdateModal from "./modals/StockUpdateModal2";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateIcon from "@mui/icons-material/Update";
import AddModal from "./modals/AddModal";
import SearchModal from "./search-section/SearchIDStkUpdate";
import SearchIDUpdate from "./search-section/SearchIDUpdate";

function Inventory(props) {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm3, setSearchTerm3] = useState("");
  const [searchTerm4, setSearchTerm4] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category
  const [drugList, setDrugList] = useState([]);
  const [filteredDrugList, setFilteredDrugList] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedDrugToDelete, setSelectedDrugToDelete] = useState(null);
  const [showStockUpdateModal, setShowStockUpdateModal] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const addModal = () => {
    setShowModal4(!showModal4);
    fetchData();
  };
  const searchModal = () => {
    setShowModal2(!showModal2);
    fetchData();
  };
  const searchModal2 = () => {
    setShowModal3(!showModal3);
    fetchData();
  };

  const handleEdit = (drug) => {
    setSelectedDrug(drug);
    setShowStockUpdateModal(true);
    fetchData();
  };

  const handleChange3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  const handleChange4 = (event) => {
    setSearchTerm4(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchByDrugID = (event) => {
    event.preventDefault();
    const searchedDrug = drugList.find((drug) => drug.Drug_ID === searchTerm3);
    if (searchedDrug) {
      setSelectedDrug(searchedDrug);
      setShowModal(true);
      setSearchTerm3("");
    } else {
      toast.error("Invalid Drug ID");
    }
  };

  const handleSearchByDrugName = (event) => {
    // const searchedDrug1 = drugList.find((drug) => drug.Drug_Name === searchTerm4);
    event.preventDefault();
    const searchedDrug1 = drugList.find(
      (drug) => drug.Drug_Name === searchTerm4
    );
    if (searchedDrug1) {
      setSelectedDrug(searchedDrug1);
      setShowModal(true);
      setSearchTerm4("");
    } else {
      toast.error("Invalid Drug Name");
    }
  };

  const openModal = (drug) => {
    setSelectedDrug(drug);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = drugList.filter(
      (drug) =>
        drug.Drug_ID.includes(searchTerm3) &&
        drug.Drug_Name.toLowerCase().includes(searchTerm4.toLowerCase()) &&
        drug.Category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setFilteredDrugList(filteredData);
  }, [searchTerm3, searchTerm4, selectedCategory, drugList]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/Inventory/displaydrugs.php"
      );
      setDrugList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (drug) => {
    setConfirmModalVisible(true);
    setSelectedDrugToDelete(drug);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalVisible(false);
    const drugToDelete = selectedDrugToDelete;
    setSelectedDrugToDelete(null);
    try {
      await axios.delete(
        `http://localhost/Healerz/PHP/Inventory/deleteDruggg.php?id=${drugToDelete.Drug_ID}`
      );
      toast.success("Drug deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting drug:", error);
      toast.error("Error deleting drug");
    }
  };
  useEffect(() => {
    fetchData();
  }, [updateTrigger]);

  return (
    <Layout>
      {/* <h3 className="serhedd">Drug Detail</h3> */}

      <div>
        <div className="hedcontinvent">
          <div className="inventoryhedding">
            {" "}
            <h4>Drug Detail</h4>
          </div>
          <div className="inventorybuttongroup">
            <button className="btn btn-success" onClick={addModal}>
              Drug ADD
              <AddCircleIcon className="icoinvent" />
            </button>
            <button className="btn btn-primary" onClick={searchModal2}>
              Drug Update
              <UpdateIcon className="icoinvent" />
            </button>
            <button className="btn btn-dark" onClick={searchModal}>
              Stock Update
              <LocalGroceryStoreIcon className="icoinvent" />
            </button>
          </div>
        </div>

        <div className="container tabconttt">
          <div className="p-5">
            <hr />
            <div
              className="SearchSection"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div className="SearchSection2">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="search-input-container">
                    <form onSubmit={handleSearchByDrugID}>
                      <input
                        className="SearchBox1"
                        type="text"
                        placeholder="Filter by NDC Number"
                        value={searchTerm3}
                        onChange={handleChange3}
                        style={{ width: "300px" }}
                      />
                      <div
                        className="search-icon"
                        onClick={handleSearchByDrugID}
                      >
                        <SearchIcon />
                      </div>
                      {searchTerm3 && (
                        <div
                          className="search-icon si2"
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
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="search-input-container">
                    <form onSubmit={handleSearchByDrugName}>
                      <input
                        className={"SearchBox1"}
                        type="text"
                        placeholder="Filter by DRUG_Name"
                        value={searchTerm4}
                        onChange={handleChange4}
                        style={{ width: "300px" }}
                      />
                      <div
                        className="search-icon"
                        onClick={handleSearchByDrugName}
                      >
                        <SearchIcon />
                      </div>
                      {searchTerm4 && (
                        <div
                          className="search-icon"
                          style={{
                            zIndex: "100",
                            backgroundColor: "white",
                            right: "6px",
                          }}
                          onClick={() => setSearchTerm4("")}
                        >
                          <ClearIcon />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="search-input-container">
                    <select
                      className="SearchBox1"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      style={{ width: "300px" }}
                    >
                      <option value={""}>Filter by Category</option>
                      <option value={"Liquid"}>Liquid</option>
                      <option value={"Tablet"}>Tablet</option>
                      <option value={"Capsules"}>Capsules</option>
                      <option value={"Topical"}>Topical</option>
                      <option value={"Suppositories"}>Suppositories</option>
                      <option value={"Drops"}>Drops</option>
                      <option value={"Injections"}>Injections</option>
                      <option value={"Implants"}>Implants</option>
                    </select>

                    {selectedCategory && (
                      <div
                        className="search-icon"
                        style={{
                          zIndex: "100",
                          backgroundColor: "white",
                          right: "3px",
                        }}
                        onClick={() => setSelectedCategory("")}
                      >
                        <ClearIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={"table-container w-100 p-0"}>
              <table
                className={"table table-hover table-striped "}
                style={{ minWidth: "0px" }}
              >
                <thead className={"top-0 position-sticky h-45"}>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">NDC No</th>
                    <th scope="col">DRUG_NAME</th>
                    <th scope="col">Category</th>
                    <th scope="col">Drug_Dosage</th>
                    <th scope="col">AVAILABLE_COUNT</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody className="h-50">
                  {filteredDrugList.length > 0 ? (
                    filteredDrugList.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.Drug_ID}</td>
                        <td>{data.Drug_Name}</td>
                        <td>{data.Category}</td>
                        <td>{data.Drug_dosage}</td>
                        <td>{data.StockCount}</td>
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
                            aria-label="edit"
                            className="viewbutt"
                            onClick={() => handleEdit(data)}
                            style={{ color: "green" }}
                          >
                            <LocalGroceryStoreIcon />
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
                      <td colSpan="7">No results found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <ViewModal
        show={showModal}
        onHide={() => setShowModal(false)}
        drugDetails={selectedDrug}
      />
      <CustomConfirmModal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
      <StockUpdateModal
        show={showStockUpdateModal}
        onHide={() => {
          setShowStockUpdateModal(false);
          setUpdateTrigger(!updateTrigger); // Toggle the trigger
        }}
        inputs={selectedDrug} // Pass the selected drug (if needed) as inputs to the modal
      />

      <AddModal show={showModal4} onHide={addModal} />
      <SearchModal show={showModal2} onHide={searchModal} />
      <SearchIDUpdate show={showModal3} onHide={searchModal2} />
    </Layout>
  );
}

export default Inventory;
