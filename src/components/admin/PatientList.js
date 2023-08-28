import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';

import ViewModal from './ViewPatientModal';
import AdminLayout from '../../layouts/AdminLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PatientList(props) {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm3, setSearchTerm] = useState('');
    const [searchTerm4, setSearchTerm2] = useState('');
    const [patientList, setpatientList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleChange3 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChange4 = (event) => {
        setSearchTerm2(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchedPatient = patientList.find(patient => patient.Patient_ID === searchTerm3); // Search for the patient by ID
        if (searchedPatient) {
            setSelectedPatient(searchedPatient);
            setShowModal(true);
            setSearchTerm('');
        } else {
            toast.error('Invalid Patient ID');
        }
    };
    const handleSearchSubmit2 = (event) => {
        event.preventDefault();
        const searchedPatient = patientList.find(patient => patient.PatientName=== searchTerm4); // Search for the patient by Name
        if (searchedPatient) {
            setSelectedPatient(searchedPatient);
            setShowModal(true);
            setSearchTerm2('');
        } else {
            toast.error('Invalid Patient Name');
        }
    };

    const openModal = (patient) => {
        setSelectedPatient(patient);
        setShowModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/Healerz/PHP/admin/displaypatientlist.php');
            setpatientList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <AdminLayout>
            <h2 className="heading-purple" style={{paddingLeft:'50px' , paddingTop:'20px'}}>Patient List</h2>
            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div><h3 className={"content-heading"}>Filter the Results : </h3></div>
                        <div className={"SearchSection2"}>
                            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
                                <input
                                    className={"SearchBox1"}
                                    type="text"
                                    placeholder="PATIENT_ID"
                                    value={searchTerm3}
                                    onChange={handleChange3}
                                />
                                <button type="submit" className="filterbutt">Filter</button>
                            </form>
                            <form onSubmit={handleSearchSubmit2} style={{ display: 'flex', flexDirection: 'row' }}>
                                <input
                                    className={"SearchBox1"}
                                    type="text"
                                    placeholder="PATIENT_Name"
                                    value={searchTerm4}
                                    onChange={handleChange4}
                                />
                                <button type="submit" className="filterbutt">Filter</button>
                            </form>
                        </div>
                    </div>
                    <div className={"table-container "}>
                        <table className={"table table-hover table-striped "}>
                            <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">Patient_ID</th>
                                    <th scope="col">PatientName</th>
                                    <th scope="col">DateOfBirth</th>
                                    <th scope="col">PhoneNo</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">BloodGroup</th>
                                    <th scope="col">VIEW</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientList.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.Patient_ID}</td>
                                        <td>{data.PatientName}</td>
                                        <td>{data.DateOfBirth}</td>
                                        <td>{data.PhoneNo}</td>
                                        <td>{data.Email}</td>
                                        <td>{data.BloodGroup}</td>
                                        <td>
                                            <FeatherIcon
                                                className={"viewbutt"}
                                                icon={"eye"}
                                                onClick={() => openModal(data)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <ViewModal
                show={showModal}
                onHide={() => setShowModal(false)}
                PatientDetails={selectedPatient}
            />
        </AdminLayout>
    );
}

export default PatientList;