import React, { useState } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";

function AddEmployee(props) {
  const [employee_id, setID] = useState('');
  const [employee_name, setName] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pass, setPass] = useState('');
  const [regNo, setReg] = useState('');
  const [userType, setUserType] = useState('');

  const resetForm = () => {
    setID('');
    setName('');
    setphoneNo('');
    setEmail('');
    setAddress('');
    setPass('');
    setReg('');
    setUserType('');
  }

  const handleSubmit = () => {
    if (["admin", "clubadmin"].includes(userType)) {

      if (employee_id.length === 0 || employee_name.length === 0 || pass.length === 0) {
        toast.warning("Please fill in all the required fields");
      } else {
        const url = "http://localhost/HealerZ/PHP/admin/addEmployee.php";
        let fdata = new FormData();
        fdata.append('employee_ID', employee_id);
        fdata.append('employee_name', employee_name);
        fdata.append('password', pass);
        fdata.append('userType', userType);

        axios.post(url, fdata)
          .then((response) => {
            if (response.data.message === "Employee Added Successfully") {
              // Show success message
              toast.success(response.data.message);
              resetForm();
            } else {
              // Show error message
              toast.error("Employee Already Added");
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }

    }

    if (employee_id.length === 0) {
      toast.warning("Please Enter the Employee_ID");
    } else if (employee_name.length === 0) {
      toast.warning("Please Enter the Employee_Name");
    } else if (email.length === 0) {
      toast.warning("Please Enter the Email");
    } else if (phoneNo.length === 0) {
      toast.warning("Please Enter the PhoneNo");
    } else if (address.length === 0) {
      toast.warning("Please Enter the Address");
    } else if (pass.length === 0) {
      toast.warning("Please Enter the Password");
    } else if (regNo.length === 0) {
      toast.warning("Please Enter the SLMC Registration No");
    }

    else {
      const url = "http://localhost/HealerZ/PHP/admin/addEmployee.php";
      let fdata = new FormData();
      fdata.append('employee_ID', employee_id);
      fdata.append('employee_name', employee_name);
      fdata.append('email', email);
      fdata.append('phoneNo', phoneNo);
      fdata.append('address', address);
      fdata.append('password', pass);
      fdata.append('regNo', regNo);
      fdata.append('userType', userType);

      axios.post(url, fdata)
        .then((response) => {
          if (response.data.message === "Employee Added Successfully") {
            // Show success message
            toast.success(response.data.message);
            resetForm();
          } else {
            // Show error message
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
      {/* <div className={ "addboxx mt-4" } style={ { display: "flex", justifyContent: "center", alignItems: "center" } }  > */}
      <div className={"Addcontt "}>
        {/* <div class="card-body">
                        <a class="btn btn-primary">Add Doctor</a>
                    </div>

                    <hr /> */}
        <h3 className="serhett">Add Employee</h3>
        <div className={"addboxx"}>
          <form>
            <table>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="cont1">
                  <tr>
                    <th>
                      <label>Employee ID:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"employee_ID"}
                        placeholder={"DocXXXXX"}
                        onChange={(e) => setID(e.target.value)}
                        value={employee_id}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Name:</label>
                    </th>
                    <th className={"addinputt"}>
                      <input
                        type="text"
                        className="form-control1"
                        name={"employee_name"}
                        placeholder={"Janarthanan"}
                        onChange={(e) => setName(e.target.value)}
                        value={employee_name}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>User Type:</label>
                    </th>
                    <th className={"addinputt"}>
                      <select
                        name="userType"
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        defaultValue="--Select role--"
                      >

                        <option value="" hidden selected>--Select role--</option>
                        <option value="doctor" >Doctor</option>
                        <option value="pharmacist" >Pharmacist</option>
                        <option value="admin" >Admin</option>
                        <option value="clubadmin" >Clubadmin</option>
                      </select>
                      {/* <input
                        type="text"
                        className="form-control1"
                        name={"designation"}
                        placeholder={"XXXXXX"}
                        onChange={(e) => setDesignation(e.target.value)}
                        value={designation}
                      /> */}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Email:</label>
                    </th>

                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"email"}
                        placeholder={"Jana343@gmail.com"}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </th>
                  </tr>

                </div>

                <div className="cont2">
                  <tr>
                    <th>
                      {" "}
                      <label>Phone No:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"phoneNo"}
                        placeholder={"076XXXXXXX"}
                        onChange={(e) => setphoneNo(e.target.value)}
                        value={phoneNo}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>Address:</label>
                    </th>
                    <th className={"addinputt"}>
                      <textarea
                        className={"form-control1"}
                        rows={3}
                        name={"address"}
                        placeholder={"Type here...."}
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      {" "}
                      <label>Password:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="password"
                        className="form-control1"
                        name={"password"}
                        placeholder={"Type password here"}
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      {" "}
                      <label>SLMC Registration No:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"regNo"}
                        placeholder={"SMDXXXXX"}
                        onChange={(e) => setReg(e.target.value)}
                        value={regNo}
                      />
                    </th>
                  </tr>
                  {/* <tr>
                    <th>
                      {" "}
                      <label>Upload Image:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="file"
                        className="form-control1"
                        name={"imageUpload"}
                        placeholder={"choose file"}
                        onChange={(e) => setImage(e.target.files)}
                        value={image}
                      />
                    </th>
                  </tr> */}
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
          <button className="btn btn-secondary done-buttontt3" onClick={resetForm}>Reset</button>
        </div>
        <ToastContainer />
      </div>

      {/* </div> */}
    </AdminLayout>
  );
}

export default AddEmployee;
