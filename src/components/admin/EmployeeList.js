import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewModal from "./ViewEmployeeModal";
import AdminLayout from "../../layouts/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomConfirmModal from "./ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';

function EmployeeList(props) {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm3, setSearchTerm] = useState("");
  const [searchTerm4, setSearchTerm2] = useState("");
  const [EmployeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [setEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);

  const handleChange3 = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange4 = (event) => {
    setSearchTerm2(event.target.value);
  };


  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchedEmployee = EmployeeList.find(
      (Employee) => Employee.employee_ID === searchTerm3
    );
    if (searchedEmployee) {
      setSelectedEmployee(searchedEmployee);
      setShowModal(true);
      setSearchTerm("");
    } else {
      toast.error("Invalid Employee ID");
    }
  };

  const handleSearchSubmit2 = (event) => {
    event.preventDefault();
    const searchedEmployee = EmployeeList.find(
      (Employee) => Employee.employeeName === searchTerm4
    );
    if (searchedEmployee) {
      setSelectedEmployee(searchedEmployee);
      setShowModal(true);
      setSearchTerm2("");
    } else {
      toast.error("Invalid Employee Name");
    }
  };

  const openModal = (Employee) => {
    setSelectedEmployee(Employee);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/admin/displayEmployeelist.php"
      );
      setEmployeeList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (Employee) => {
    setConfirmModalVisible(true);
    setSelectedEmployeeToDelete(Employee);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalVisible(false);
    const EmployeeToDelete = setEmployeeToDelete;
    setSelectedEmployeeToDelete(null);
    try {
      await axios.delete(
        `http://localhost/Healerz/PHP/admin/deleteemployee.php?Employee_ID=${EmployeeToDelete.employee_ID}`
      );
      toast.success("Employee deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting Employee:", error);
      toast.error("Error deleting Employee");
    }
  };

  return (
    <AdminLayout>
      {/* <h3 className="serhett">Employee List</h3> */}
      <div className={"container Employeelisttable"}>
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
                    placeholder="Filter By Employee ID"
                    value={searchTerm3}
                    onChange={handleChange3}
                    style={{ width: "300px" }}
                  />
                  <div className="search-icon" onClick={handleSearchSubmit}>
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
              <form
                onSubmit={handleSearchSubmit2}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <input
                  className={"SearchBox1"}
                  type="text"
                  placeholder="Filter by Employee Name"
                  value={searchTerm4}
                  onChange={handleChange4}
                  style={{ width: "300px" }}
                />
                 <div className="search-icon" onClick={handleSearchSubmit2}>
                    <SearchIcon />
                  </div>
                  {searchTerm4 && (
                  <div className="search-icon" style={{zIndex:'100',backgroundColor:'white',right:'6px'}} onClick={() => setSearchTerm2("")}>
                   <ClearIcon/>
                  </div>
                )}
              </form>
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
                  <th scope="col">Employee_ID</th>
                  <th scope="col">EmployeeName</th>                
                  <th scope="col">PhoneNo</th>
                  <th scope="col">Email</th>
                  <th scope="col">Addess</th>
                  <th scope="col">SLMC RegNo</th>
                  <th scope="col">UserType</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployeeList.length > 0 ? (
                  filteredEmployeeList.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.employee_ID}</td>
                      <td>{data.employeeName}</td>
                      <td>{data.phoneNo}</td>
                      <td>{data.email}</td>
                      <td>{data.address}</td>
                      <td>{data.regNo}</td>
                      <td>{data.userType}</td>
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
        EmployeeDetails={selectedEmployee}
      />
    </AdminLayout>
  );
}

export default EmployeeList;
