import React, { useState, useEffect } from 'react';
import './Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

function UpdatePatient(props) {
    const [patient_id, setID] = useState('');
    const [patientData, setPatientData] = useState(null);

    const [newData, setNewData] = useState({});

    const updateNewData = (e, field) => {
        setNewData({
            ...newData,
            [field]: e.target.value,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Send a GET request to your PHP search script
        axios.get(`http://localhost/HealerZ/PHP/searchpatient.php?patient_id=${patient_id}`)
            .then(response => {
                const data = response.data;
                console.log(response.data);
                if (data.length === 0) {
                    toast.error("Invalid Patient_ID");
                    setPatientData(null); // Clear patientData on error
                } else {
                    toast.success("Patient Found");
                    setPatientData(data[0]); // Assuming you expect one patient
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('An error occurred');
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        // Collect updated data from form fields
        const updatedData = {
            Patient_ID: patient_id,
            PatientName: newData.PatientName,
            DateOfBirth: newData.DateOfBirth,
            Gender: newData.Gender,
            PhoneNo: newData.PhoneNo,
            Email: newData.Email,
            Address: newData.Address,
            BloodGroup: newData.BloodGroup,
            Password: newData.Password,
        };

        // Send a POST request to your PHP update script
        axios.post('http://localhost/HealerZ/PHP/updatepatient.php', updatedData)
            .then(response => {
                const data = response.data;
                if (data.success) {
                    toast.success('Patient updated successfully');
                } else {
                    toast.error('Failed to update patient');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('An error occurred');
            });
    };

    const handleDelete = () => {
        // Send a POST request to your PHP delete script
        axios.post('/delete-patient.php', { patient_id })
            .then(response => {
                const data = response.data;
                if (data.success) {
                    toast.success('Patient deleted successfully');
                    setPatientData(null); // Clear patientData after deletion
                } else {
                    toast.error('Failed to delete patient');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('An error occurred');
            });
    };

    return (
        <AdminLayout>
            <div className={"Addcontt"}>
                <h2 className="heading-purple">Update Patient</h2>

                <div className={"addboxx"}>
                    <form onSubmit={handleSearch}>
                        <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row', marginLeft: '150px' }}>
                            <div><h3 className={"content-heading"}>Search Patient_ID:</h3></div>
                            <div className={"SearchSection3"}>
                                <input
                                    className="SearchBox4"
                                    type="text"
                                    placeholder="Patient_ID"
                                    value={patient_id}
                                    onChange={(e) => setID(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary done-button4">Search</button>
                            </div>
                        </div>
                    </form>
                    <hr />

                    {patientData && (
                        <form onSubmit={handleUpdate}>
                            {/* Display patient data and update fields */}
                            <table>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className='cont1'>
                                        <tr>
                                            <th><label>Patient_ID:</label></th>
                                            <th className={"addinputt"}> <input type="text" className="form-control1" name={"Patient_ID"} defaultValue={patientData.Patient_ID} onChange={(e) => updateNewData(e, "Patient_ID")} /></th>
                                        </tr>
                                        <tr>
                                            <th> <label>Patient_Name:</label></th>
                                            <th className={"addinputt"}><input type="text" className="form-control1" name={"Patient_Name"} defaultValue={patientData.PatientName} onChange={(e) => updateNewData(e, "PatientName")} /></th>
                                        </tr>
                                        <tr>
                                            <th> <label>Date of Birth:</label></th>
                                            <th className={"addinputt"}> <input type="date" className="form-control1" name={"DateOfBirth"} defaultValue={patientData.DateOfBirth} onChange={(e) => updateNewData(e, "DateOfBirth")} /></th>
                                        </tr>
                                        <tr>
                                            <th><label>Gender:</label></th>
                                            <th className={"addinputt"}>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="Gender"
                                                            value="Male"
                                                            checked={newData.Gender === 'Male'}
                                                            onChange={(e) => updateNewData(e, "Gender")}
                                                        />
                                                        <label className="form-check-label">Male</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="Gender"
                                                            value="Female"
                                                            checked={newData.Gender === 'Female'}
                                                            onChange={(e) => updateNewData(e, "Gender")}
                                                        />
                                                        <label className="form-check-label">Female</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="Gender"
                                                            value="Other"
                                                            checked={newData.Gender === 'Other'}
                                                            onChange={(e) => updateNewData(e, "Gender")}
                                                        />
                                                        <label className="form-check-label">Other</label>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th> <label>Phone_No:</label></th>
                                            <th className={"addinputt"}> <input type="text" className="form-control1" name={"PhoneNo"} defaultValue={patientData.PhoneNo} onChange={(e) => updateNewData(e, "PhoneNo")} /></th>
                                        </tr>
                                    </div>


                                    <div className='cont2'>
                                        <tr>
                                            <th><label>Email:</label></th>
                                            <th className={"addinputt"}> <input type="email" className="form-control1" name={"Email"} defaultValue={patientData.Email} onChange={(e) => updateNewData(e, "Email")} /></th>
                                        </tr>
                                        <tr>
                                            <th><label>Address:</label></th>
                                            <th className={"addinputt"}><textarea className={"form-control1"} rows={3} name={"Address"} defaultValue={patientData.Address} onChange={(e) => updateNewData(e, "Address")} /></th>
                                        </tr>
                                        <tr>
                                            <th><label>Blood Group:</label></th>
                                            <th className={"addinputt"}>
                                                <select className="form-control1" name={"BloodGroup"} defaultValue={patientData.BloodGroup} onChange={(e) => updateNewData(e, "BloodGroup")}>
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
                                                </select>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th> <label>Password:</label></th>
                                            <th className={"addinputt"}> <input type="password" className="form-control1" name={"Password"} defaultValue={patientData.Password} onChange={(e) => updateNewData(e, "Password")} /></th>
                                        </tr>
                                    </div>
                                </div>
                            </table>
                            <hr/>
                            <div className='Adddelbutt'>
                                <button className="btn btn-primary done-button5" type="submit" style={{ backgroundColor: 'green' }}>Update</button>
                                <button className="btn btn-primary done-button5" type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</button>
                            </div>
                        </form>

                    )}
                </div>
                <ToastContainer />
            </div>
        </AdminLayout >
    );
}

export default UpdatePatient;
