import React, { useState, useEffect } from 'react';
import './Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

function UpdatePatient(props) {
  const [patient_id, setPatientID] = useState('');
  const [patientData, setPatientData] = useState(null);

  const [newData, setNewData] = useState({});

  const updateNewData = (field, value) => {
    setNewData({
      ...newData,
      [field]: value,
    });
  };

  const closee = () => {
    setPatientData(null);
    setNewData({});
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost/HealerZ/PHP/admin/searchpatient.php?patient_id=${patient_id}`);
      const data = response.data;

      if (data.length === 0) {
        toast.error('Invalid Patient_ID');
        setPatientData(null);
      } else {
        toast.success('Patient Found');
        setPatientData(data[0]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    } finally {
      setPatientID('');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (Object.keys(newData).length === 0) {
      toast.info('No data to update!');
      return;
    }

    if (!newData.Patient_ID) {
      toast.info('Patient_ID is missing in the update data!');
      return;
    }

    try {
      const response = await axios.put('http://localhost/HealerZ/PHP/admin/updatepatient.php', newData);
      console.log(response.data);
      toast.success('Patient updated successfully!');
      setPatientData(null);
      setNewData({});
    } catch (error) {
      toast.error('Failed to update Patient!');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!patientData || !patientData.Patient_ID) {
      toast.error('Patient ID not found!');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost/HealerZ/PHP/admin/deletepatient.php?Patient_ID=${patientData.Patient_ID}`);
      console.log(response.data);
      toast.success('Patient deleted successfully!');
      setPatientData(null);
      setNewData({});
    } catch (error) {
      toast.error('Failed to delete patient!');
      console.error(error);
    }
  };

  useEffect(() => {
    // If patientData changes, update newData to reflect the current patientData
    if (patientData) {
      setNewData({
        Patient_ID: patientData.Patient_ID,
        PatientName: patientData.PatientName,
        DateOfBirth: patientData.DateOfBirth,
        Gender: patientData.Gender,
        PhoneNo: patientData.PhoneNo,
        Email: patientData.Email,
        Address: patientData.Address,
        BloodGroup: patientData.BloodGroup,
        Password: patientData.Password,
      });
    } else {
      setNewData({});
    }
  }, [patientData]);

  return (
    <AdminLayout>
      <div className="Addcontt">
        <h3 className="serhett">Update patient</h3>

        <div className="addboxx">
          <form onSubmit={handleSearch}>
            <div className="SearchSection searrrchbox" style={{ display: 'flex', flexDirection: 'row', marginLeft: '150px' }}>
              <div><h3 className="content-heading serachhett">Search by Entroll_No:</h3></div>
              <div className="SearchSection3">
                <input
                  className="SearchBox4"
                  type="text"
                  placeholder="Entroll_No"
                  value={patient_id}
                  onChange={(e) => setPatientID(e.target.value)}
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
                  <div className="cont1">
                    <tr>
                      <th><label>Entroll_No:</label></th>
                      <th className="addinputt"> <input type="text" className="form-control1" name="Patient_ID" value={newData.Patient_ID || ''} onChange={(e) => updateNewData('Patient_ID', e.target.value)} /></th>
                    </tr>
                    <tr>
                      <th> <label>Patient_Name:</label></th>
                      <th className="addinputt"><input type="text" className="form-control1" name="PatientName" value={newData.PatientName || ''} onChange={(e) => updateNewData('PatientName', e.target.value)} /></th>
                    </tr>
                    <tr>
                      <th> <label>Date of Birth:</label></th>
                      <th className="addinputt"> <input type="date" className="form-control1" name="DateOfBirth" value={newData.DateOfBirth || ''} onChange={(e) => updateNewData('DateOfBirth', e.target.value)} /></th>
                    </tr>
                    <tr>
                      <th><label>Gender:</label></th>
                      <th className="addinputt">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="Gender"
                              value="Male"
                              checked={newData.Gender === "Male"}
                              onChange={(e) => updateNewData('Gender', e.target.value)}
                            />
                            <label className="form-check-label">Male</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="Gender"
                              value="Female"
                              checked={newData.Gender === "Female"}
                              onChange={(e) => updateNewData('Gender', e.target.value)}
                            />
                            <label className="form-check-label">Female</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="Gender"
                              value="Other"
                              checked={newData.Gender === "Other"}
                              onChange={(e) => updateNewData('Gender', e.target.value)}
                            />
                            <label className="form-check-label">Other</label>
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th> <label>Phone_No:</label></th>
                      <th className="addinputt"> <input type="text" className="form-control1" name="PhoneNo" value={newData.PhoneNo || ''} onChange={(e) => updateNewData('PhoneNo', e.target.value)} /></th>
                    </tr>
                  </div>

                  <div className="cont2">
                    <tr>
                      <th><label>Email:</label></th>
                      <th className="addinputt"> <input type="email" className="form-control1" name="Email" value={newData.Email || ''} onChange={(e) => updateNewData('Email', e.target.value)} /></th>
                    </tr>
                    <tr>
                      <th><label>Address:</label></th>
                      <th className="addinputt"><textarea className="form-controlll1" rows={3} name="Address" value={newData.Address || ''} onChange={(e) => updateNewData('Address', e.target.value)} /></th>
                    </tr>
                    <tr>
                      <th><label>Blood Group:</label></th>
                      <th className="addinputt">
                        <select className="form-control1" name="BloodGroup" value={newData.BloodGroup || ''} onChange={(e) => updateNewData('BloodGroup', e.target.value)}>
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
                    
                  </div>
                </div>
              </table>
              <hr />
              <div className="Adddelbutt">
                <button className="btn btn-primary done-button5" type="submit" style={{ backgroundColor: 'green' }}>Update</button>
                <button className="btn btn-primary done-button5" type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</button>
                <button className="btn btn-primary done-button5" type="button" onClick={closee} style={{ backgroundColor: 'blue' }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
}

export default UpdatePatient;
