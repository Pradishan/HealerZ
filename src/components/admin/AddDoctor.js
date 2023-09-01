import React, { useState } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddDoctor(props) {
  const MySwal = withReactContent(Swal);
  const [doctor_id, setID] = useState("");
  const [doctor_name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");
  const [regNo, setReg] = useState("");

  const handleSubmit = () => {
    // if (patient_id.length === 0) {
    //     toast.error("Please Enter the Patient_ID");
    // } else if (patient_name.length === 0) {
    //     toast.error("Please Enter the Patient_Name");

    // }
    // else if (dob.length === 0) {
    //     toast.error("Please Enter the DOB");

    if (address.length === 0) {
      toast.error("Please Enter the Address");
    } else if (pass.length === 0) {
      toast.error("Please Enter the Password");
    } else {
      const url = "http://localhost/HealerZ/PHP/addpatient.php";
      let fdata = new FormData();
      fdata.append("doctor_ID", doctor_id);
      fdata.append("doctor_Name", doctor_name);
      fdata.append("PhoneNo", phoneNo);
      fdata.append("Email", email);
      fdata.append("Address", address);
      fdata.append("Password", pass);
      fdata.append("regNo", regNo);
      fdata.append("imageupload", image);
      axios
        .post(url, fdata)
        .then((response) => {
          // Show success swal notification
          MySwal.fire({
            icon: "success",
            title: response.data,
            customClass: {
              container: "sweetalert-container",
            },
          });
        })
        .catch((error) => {
          // Show error swal notification
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            customClass: {
              container: "sweetalert-container",
            },
          });
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
                        name={"doctor_Name"}
                        placeholder={"Janarthanan"}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setName(e.target.value)}
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
                        name={"Address"}
                        placeholder={"Type here...."}
                        onChange={(e) => setAddress(e.target.value)}
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
                        name={"Password"}
                        placeholder={"Type password here"}
                        onChange={(e) => setPass(e.target.value)}
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
                      />
                    </th>
                  </tr>
                </div>
              </div>
            </table>
            <hr />
            <button
              className="btn btn-primary done-button"
              style={{ left: "700px"}}
              type="submit"
              name={"send"}
              value={"SEND"}
              onClick={handleSubmit}
            >
              ADD
            </button>
          </form>
        </div>
      </div>

      {/* </div> */}
    </AdminLayout>
  );
}

export default AddDoctor;
