import React, { useState } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { Password } from "@mui/icons-material";

function AddDoctor(props) {
  const [doctor_id, setID] = useState('');
  const [doctor_name, setName] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pass, setPass] = useState('');
  const [image, setImage] = useState('');
  const [regNo, setReg] = useState('');
  const [designation, setDesignation] = useState('');

  const resetForm = () => {
    setID('');
    setName('');
    setphoneNo('');
    setEmail('');
    setAddress('');
    setPass('');
    setImage('');
    setReg('');
    setDesignation('');
}

  const handleSubmit = () => {
    if (doctor_id.length === 0) {
      toast.warning("Please Enter the Doctor_ID");
    } else if (doctor_name.length === 0) {
      toast.warning("Please Enter the Doctor_Name");
    } else if (designation.length === 0) {
      toast.warning("Please Enter the Designation");
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
    }else {
      const url = "http://localhost/HealerZ/PHP/admin/addDoctor.php";
      let fdata = new FormData();
            fdata.append('doctor_ID', doctor_id);
            fdata.append('doctor_name', doctor_name);
            fdata.append('designation', designation);
            fdata.append('email', email);
            fdata.append('phoneNo', phoneNo);
            fdata.append('address', address);
            fdata.append('password', pass);
            fdata.append('regNo', regNo);
            fdata.append('imageUpload', image);
            axios.post(url, fdata)
            .then((response) => {
                if (response.data.message === "Doctor Added Successfully") {
                    // Show success message
                    toast.success(response.data.message);
                    resetForm(); 
                } else {
                    // Show error message
                    toast.error("Doctor Already Added");
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
        <h3 className="serhett">Add Doctor</h3>
        <div className={"addboxx"}>
          <form>
            <table>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="cont1">
                  <tr>
                    <th>
                      <label>Doctor ID:</label>
                    </th>
                    <th className={"addinputt"}>
                      {" "}
                      <input
                        type="text"
                        className="form-control1"
                        name={"doctor_ID"}
                        placeholder={"DocXXXXX"}
                        onChange={(e) => setID(e.target.value)}
                        value={doctor_id}
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
                        name={"doctor_name"}
                        placeholder={"Janarthanan"}
                        onChange={(e) => setName(e.target.value)}
                        value={doctor_name}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <label>Designation:</label>
                    </th>
                    <th className={"addinputt"}>
                      <input
                        type="text"
                        className="form-control1"
                        name={"designation"}
                        placeholder={"XXXXXX"}
                        onChange={(e) => setDesignation(e.target.value)}
                        value={designation}
                      />
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
                </div>

                <div className="cont2">
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
                  <tr>
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
          <button className="btn btn-secondary done-buttontt3" onClick={resetForm}>Reset</button>
        </div>
        <ToastContainer />
      </div>

      {/* </div> */}
    </AdminLayout>
  );
}

export default AddDoctor;
