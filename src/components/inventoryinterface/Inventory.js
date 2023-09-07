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

  const handleChange3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  const handleChange4 = (event) => {
    setSearchTerm4(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchByDrugID = () => {
    const searchedDrug = drugList.find((drug) => drug.Drug_ID === searchTerm3);
    if (searchedDrug) {
      setSelectedDrug(searchedDrug);
      setShowModal(true);
      setSearchTerm3("");
    } else {
      toast.error("Invalid Drug ID");
    }
  };

  const handleSearchByDrugName = () => {
    const searchedDrug1 = drugList.find((drug) => drug.Drug_Name === searchTerm4);
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
    const filteredData = drugList.filter((drug) =>
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

  return (
    <Layout>
      <div className={"container"}>
        <div className={"p-5"}>
          <div
            className={"SearchSection"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>
              <h3 className="content-heading">Filter the Results : </h3>
            </div>
            <div className="SearchSection2">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  className={"SearchBox1"}
                  type="text"
                  placeholder="NDC Number"
                  value={searchTerm3}
                  onChange={handleChange3}
                />
                <button
                  type="button"
                  className="filterbutt"
                  onClick={handleSearchByDrugID}
                >
                  Filter
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  className={"SearchBox1"}
                  type="text"
                  placeholder="DRUG_Name"
                  value={searchTerm4}
                  onChange={handleChange4}
                />
                <button
                  type="button"
                  className="filterbutt"
                  onClick={handleSearchByDrugName}
                >
                  Filter
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <select
                  className="SearchBox1" 
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  style={{width:'250px'}}
                >
                  <option value={''}>Select Category</option>
                  <option value={'Liquid'}>Liquid</option>
                  <option value={'Tablet'}>Tablet</option>
                  <option value={'Capsules'}>Capsules</option>
                  <option value={'Topical'}>Topical</option>
                  <option value={'Suppositories'}>Suppositories</option>
                  <option value={'Drops'}>Drops</option>
                  <option value={'Injections'}>Injections</option>
                  <option value={'Implants'}>Implants</option>
                </select>
              </div>
            </div>
          </div>
          <div className={"table-container w-100 p-0"}>
            <table
              className={"table table-hover table-striped "}
              style={{ minWidth: "0px" }}
            >
              <thead
                className={"top-0 position-sticky h-45"}
                style={{ zIndex: 100 }}
              >
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
                    <td colSpan="7">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
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
    </Layout>
  );
}

export default Inventory;
