import React, { useState } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { Dna } from "react-loader-spinner";

function AddEmployee(props) {
  const [employee_ID, setID] = useState("");
  const [employee_Name, setName] = useState("");
  const [role, setrole] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [SLMC, setSLMC] = useState("");

  const resetForm = () => {
    setID("");
    setName("");
    resetrole();
    setphoneNo("");
    setEmail("");
    setAddress("");
    setSLMC("");
   
  };

  const resetrole = () => {
    setrole("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = () => {
    if (employee_ID.length === 0) {
      toast.warning("Please Enter the employee_ID");
    } else if (employee_Name.length === 0) {
      toast.warning("Please Enter the employee_Name");
    }  else if (role.length === 0) {
      toast.warning("Please select the role");
    }  else if (email.length === 0) {
      toast.warning("Please Enter the Email");
    } else if (!validateEmail(email)) {
      toast.info("Invalid email format");
    }else if (phoneNo.length === 0) {
      toast.warning("Please Enter the PhoneNo");
    } else if (!validatePhoneNumber(phoneNo)) {
      toast.info("Invalid phone number format");
    } else if (address.length === 0) {
      toast.warning("Please Enter the Address");
    }else if(SLMC.length===0){
      toast.warning("Please Enter the SLMC");
    }  else {
      setIsLoading(true);
      const generatedPassword = generatePassword(8);

      const url = "http://localhost/HealerZ/PHP/admin/addEmployee.php";
      let fdata = new FormData();
      fdata.append("employee_ID", employee_ID);
      fdata.append("employee_Name", employee_Name);
      fdata.append("role", role);
      fdata.append("Email", email);
      fdata.append("PhoneNo", phoneNo);
      fdata.append("Address", address);
      fdata.append("SLMC", SLMC);
      fdata.append("Password", generatedPassword);
      axios
        .post(url, fdata)
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "Employee Added Successfully") {
            setIsLoading(false);
            toast.success(response.data.message);
            resetForm();
          } else {
            setIsLoading(false);
            toast.error("Employee Already Added");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <AdminLayout>
      <div className="Addcontt">
        {/* <h3 className="serhett">Add patient</h3> */}
        <div className="addboxx">
          <h3 className="pataddhed">Add Employee</h3>
          <hr />
          {isLoading ? (
            <div style={{ marginLeft: "450px", marginBottom: "30px" }}>
              <Dna
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                style={{ marginLeft: "70px" }}
              />
            </div>
          ) : (
            <div></div>
          )}
          <hr />
          <form>
            <table>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="cont1">
                  <tr>
                    <th>
                      <label>Employee_ID:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"employee_ID"}
                        placeholder={"XXXXXXX"}
                        onChange={(e) => setID(e.target.value)}
                        value={employee_ID}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Employee_Name:</label>
                    </th>
                    <th className={"addinputt"}>
                      <input
                        type="text"
                        className="form-control1"
                        name={"employee_Name"}
                        placeholder={"Jana"}
                        onChange={(e) => setName(e.target.value)}
                        value={employee_Name}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>Designation:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <select
                        className="form-control1"
                        name={"role"}
                        onChange={(e) => setrole(e.target.value)}
                        value={role}
                        style={{ height: "30px" }}
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
                      <label>Email:</label>
                    </th>
                    <th className="addinputt">
                      {" "}
                      <input
                        type="email"
                        className="form-control1"
                        name={"Email"}
                        placeholder={"Thanush11@gmail.com"}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(""); // Clear email error when typing
                        }}
                        value={email}
                      />
                      {emailError && (
                        <span className="error-message">{emailError}</span>
                      )}
                    </th>
                  </tr>
                 
                </div>

                <div className="cont2">
                <tr>
                    <th>
                      {" "}
                      <label>Phone_No:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"PhoneNo"}
                        placeholder={"076XXXXXXX"}
                        onChange={(e) => {
                          setphoneNo(e.target.value);
                          setPhoneError(""); // Clear phone number error when typing
                        }}
                        value={phoneNo}
                      />
                      {phoneError && (
                        <span className="error-message">{phoneError}</span>
                      )}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>Address:</label>
                    </th>
                    <th className={"addinputt"}>
                      <textarea
                        className={"form-controlll1"}
                        rows={3}
                        name={"Address"}
                        placeholder={"No07,Kili Town,Kilinochchi"}
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>SLMC RegNo:</label>
                    </th>
                    <th className={"addinputt"}>
                      <input
                        type="text"
                        className="form-control1"
                        name={"SLMC"}
                        placeholder={"SLXXXXXX"}
                        onChange={(e) => setSLMC(e.target.value)}
                        value={SLMC}
                      />
                    </th>
                  </tr>
                </div>
              </div>
            </table>
            <hr />
          </form>
          <button
            className="btn btn-primary done-button"
            type="submit"
            name={"send"}
            value={"SEND"}
            onClick={handleSubmit}
          >
            ADD
          </button>
          <button
            className="btn btn-secondary done-buttontt3"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
}

export default AddEmployee;
