import React, { useState } from 'react';
import './Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '../../layouts/AdminLayout';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddPatient(props) {
    const MySwal = withReactContent(Swal);
    const [patient_id, setID] = useState('');
    const [patient_name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [bg, setBgroup] = useState('');
    const [pass, setPass] = useState('');




    const handleSubmit = () => {
        if (patient_id.length === 0) {
            toast.error("Please Enter the Patient_ID");
        } else if (patient_name.length === 0) {
            toast.error("Please Enter the Patient_Name");

        }
        else if (dob.length === 0) {
            toast.error("Please Enter the DOB");

        }else  if (gender.length === 0) {
            toast.error("Please select the Gender");

        }else if (phoneNo.length === 0) {
            toast.error("Please Enter the PhoneNo");

        } else if (email.length === 0) {
            toast.error("Please Enter the Email");

        } else if (address.length === 0) {
            toast.error("Please Enter the Address");

        } else if (bg.length === 0) {
            toast.error("Please Enter the BloodGroup");

        } else if (pass.length === 0) {
            toast.error("Please Enter the Password");

        } else {
            const url = "http://localhost/HealerZ/PHP/addpatient.php";
            let fdata = new FormData();
            fdata.append('Patient_ID', patient_id);
            fdata.append('Patient_Name', patient_name);
            fdata.append('DateOfBirth', dob);
            fdata.append('Gender', gender);
            fdata.append('PhoneNo', phoneNo);
            fdata.append('Email', email);
            fdata.append('Address', address);
            fdata.append('BloodGroup', bg);
            fdata.append('Password', pass);
            axios.post(url, fdata)
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
    }
    return (
        <AdminLayout>
            <div className={"Addcontt"}>
                   
                
                <div className={"addboxx"}>
                    <form>
                        <table>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className='cont1'>
                                    <tr>
                                        <th><label>Doctor ID:</label></th>
                                        <th className={"addinputt"}> <input type="text" className="form-control2" name={"Doctor_ID"} placeholder={""} onChange={(e) => setID(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Name:</label></th>
                                        <th className={"addinputt"}><input type="text" className="form-control2" name={"Doctor_Name"} placeholder={" "} onChange={(e) => setName(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Designation:</label></th>
                                        <th className={"addinputt"}><input type="text" className="form-control2" name={"Designation"} placeholder={" "} onChange={(e) => setName(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Email:</label></th>
                                        <th className={"addinputt"}> <input type="text" className="form-control2" name={"Email"} onChange={(e) => setDob(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Phone  No:</label></th>
                                        <th className={"addinputt"}> <input type="text" className="form-control2" name={"PhoneNo"} placeholder={"076XXXXXXX"} onChange={(e) => setphoneNo(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th><label>Address:</label></th>
                                        <th className={"addinputt"}><textarea className={"form-control1"} rows={3} name={"Address"} placeholder={""} onChange={(e) => setAddress(e.target.value)} /></th>
                                    </tr>

                                    
                                    <tr>
                                        <th> <label>Password:</label></th>
                                        <th className={"addinputt"}> <input type="password" className="form-control2" name={"Password"} placeholder={"Type here"} onChange={(e) => setPass(e.target.value)} /></th>
                                    </tr>
                                    
                                    <tr>
                                        <th> <label>SLMC Registration No:</label></th>
                                        <th className={"addinputt"}> <input type="text" className="form-control2" name={"registrationNo"} placeholder={""} onChange={(e) => setPass(e.target.value)} /></th>
                                    </tr>
                                </div>

                            </div>
                        </table>
                        <hr />
                    </form>
                    <button className="btn btn-primary done-button" type="submit" name={"send"} value={"SEND"} onClick={handleSubmit}>ADD</button>
                    
                </div>
                <ToastContainer />
            </div>

        </AdminLayout>


    );
}

export default AddPatient;