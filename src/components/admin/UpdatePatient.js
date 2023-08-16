<<<<<<< HEAD
import React,{useState} from 'react';
import './Admin.css';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '../../layouts/AdminLayout';

function UpdatePatient(props) {

    

    const [patient_id, setID] = useState('');
    const [patient_name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [bg, setBgroup] = useState('');
    const [pass, setPass] = useState('');




    const handleADD = () => {
        if (patient_id.length === 0) {
            toast.error("Pls Enter the Patient_ID");
        } else if (patient_name.length === 0) {
            toast.error("Pls Enter the Patient_Name");

        }
        else if (dob.length === 0) {
            toast.error("Pls Enter the DOB");

        }
        else if (phoneNo.length === 0) {
            toast.error("Pls Enter the PhoneNo");

        } else if (email.length === 0) {
            toast.error("Pls Enter the Email");

        } else if (address.length === 0) {
            toast.error("Pls Enter the Address");

        }else if (bg.length === 0) {
            toast.error("Pls Enter the BloodGroup");

        }else if (pass.length === 0) {
            toast.error("Pls Enter the Password");

        } else{
            toast.success("Update successfull");

        }
    }
    
    const notify1 = () => {
        toast.error("Delete successfull");
    }
    return (
        <AdminLayout>
            <div className={"Addcontt"}>
                    <h2 className="heading-purple">Update Patient</h2>
                
                <div className={"addboxx"}>
                    <form>
                        <table>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className='cont1'>
                                    <tr>
                                        <th><label>Patient_ID:</label></th>
                                        <th className={"addinputt"}> <input type="text" className="form-control2" name={"Patient_ID"} placeholder={"CSTXXXXX"} onChange={(e) => setID(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Patient_Name:</label></th>
                                        <th className={"addinputt"}><input type="text" className="form-control2" name={"Patient_Name"} placeholder={"Thanu"} onChange={(e) => setName(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Date of Birth:</label></th>
                                        <th className={"addinputt"}> <input type="date" className="form-control2" name={"DateOfBirth"} onChange={(e) => setDob(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th><label>Gender:</label></th>
                                        <th className={"addinputt"}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        // onChange={(e) => setGender(e.target.value)}
                                                    />
                                                    <label className="form-check-label">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        value="Female"
                                                        //onChange={(e) => setGender(e.target.value)}

                                                    />
                                                    <label className="form-check-label">Female</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        value="Other"
                                                        //onChange={(e) => setGender(e.target.value)}

                                                    />
                                                    <label className="form-check-label">Other</label>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th> <label>Phone_No:</label></th>
                                        <th className={"addinputt"}> <input type="text" className="form-control2" name={"PhoneNo"} placeholder={"076XXXXXXX"} onChange={(e) => setphoneNo(e.target.value)} /></th>
                                    </tr>
                                </div>


                                <div className='cont2'>
                                    <tr>
                                        <th><label>Email:</label></th>
                                        <th className={"addinputt"}> <input type="email" className="form-control2" name={"Email"} placeholder={"Thanush11@gmail.com"} onChange={(e) => setEmail(e.target.value)} /></th>
                                    </tr>
                                    <tr>
                                        <th><label>Address:</label></th>
                                        <th className={"addinputt"}><textarea className={"form-control1"} rows={3} name={"Address"} placeholder={"No07,Kili Town,Kilinochchi"} onChange={(e) => setAddress(e.target.value)} /></th>
                                    </tr>

                                    <tr>
                                        <th><label>Blood Group:</label></th>
                                        <th className={"addinputt"}> <select className="form-control2" name={"BloodGroup"} onChange={(e) => setBgroup(e.target.value)}>
                                            <option value="" >
                                                Choose Blood Group
                                            </option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select></th>
                                    </tr>
                                    <tr>
                                        <th> <label>Password:</label></th>
                                        <th className={"addinputt"}> <input type="password" className="form-control2" name={"Password"} placeholder={"Type here"} onChange={(e) => setPass(e.target.value)} /></th>
                                    </tr>
                                </div>
                            </div>
                        </table>
                        <hr />
                    </form>
                    <div className='Adddelbutt'> 
                    <button className="btn btn-primary done-button3" type="submit" name={"add"} value={"SEND"} onClick={handleADD}>ADD</button>
                    <button className="btn btn-primary done-button3" type="submit" name={"delete"} value={"SEND"} >Delete</button>
                    

                    </div>
                    
                </div>
                <ToastContainer />
            </div>

        </AdminLayout>
        

    );
=======
import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'

export default function UpdatePatient() {
  return (
    <AdminLayout>
      UpdatePatient
    </AdminLayout>
  )
>>>>>>> b268f1e002f6fcc689d5898c190d542279121c00
}

export default UpdatePatient;