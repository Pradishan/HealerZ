import React,{useState} from 'react';
import './Admin.css';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add(props) {


    const [patient_id, setID] = useState('');
    const [patient_name, setName] = useState('');
    const [dob, setDob] = useState('');
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

        }
        else if (phoneNo.length === 0) {
            toast.error("Please Enter the PhoneNo");

        } else if (email.length === 0) {
            toast.error("Please Enter the Email");

        } else if (address.length === 0) {
            toast.error("Please Enter the Address");

        }else if (bg.length === 0) {
            toast.error("Please Enter the BloodGroup");

        }else if (pass.length === 0) {
            toast.error("Please Enter the Password");

        } else{
            toast.error("Please Enter the Descrption");

        }
    }
    return (
        <div className={"Addcontt"}>
            <header className="App-headerr">
                <h2 className="heading-purple">Add Patient</h2>
            </header>
            <div className={"addboxx"}>
                <form>
                    <table>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div className='cont1'>
                                <tr>
                                    <th><label>Patient_ID:</label></th>
                                    <th className={"addinputt"}> <input type="text" className="form-control" name={"Patient_ID"} placeholder={"CSTXXXXX"} onChange={(e) => setID(e.target.value)}/></th>
                                </tr>
                                <tr>
                                    <th> <label>Patient_Name:</label></th>
                                    <th className={"addinputt"}><input type="text" className="form-control" name={"Patient_Name"} placeholder={"Thanu"} onChange={(e) => setName(e.target.value)} /></th>
                                </tr>
                                <tr>
                                    <th> <label>Date of Birth:</label></th>
                                    <th className={"addinputt"}> <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)} /></th>
                                </tr>
                                <tr>
                                    <th><label>Gender:</label></th>
                                    <th className={"addinputt"}>
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="Male"

                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="Female"

                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="Other"

                                            />
                                            <label className="form-check-label">Other</label>
                                        </div>
                                    </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th> <label>Phone_No:</label></th>
                                    <th className={"addinputt"}> <input type="text" className="form-control" name={"PhoneNo"} placeholder={"076XXXXXXX"} onChange={(e) => setphoneNo(e.target.value)} /></th>
                                </tr>






                            </div>
                            <div className='cont2'>
                                <tr>
                                    <th><label>Email:</label></th>
                                    <th className={"addinputt"}> <input type="email" className="form-controll" name={"Email"} placeholder={"Thanush11@gmail.com"} onChange={(e) => setEmail(e.target.value)} /></th>
                                </tr>
                                <tr>
                                    <th><label>Address:</label></th>
                                    <th className={"addinputt"}><textarea className={"form-controll1"} rows={3} name={"Address"} placeholder={"No07,Kili Town,Kilinochchi"} onChange={(e) => setAddress(e.target.value)}/></th>
                                </tr>

                                <tr>
                                    <th><label>Blood Group:</label></th>
                                    <th className={"addinputt"}> <select className="form-controll"  name={"BloodGroup"}  onChange={(e) => setBgroup(e.target.value)}>
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
                                    <th className={"addinputt"}> <input type="password" className="form-controll" name={"Password"} placeholder={"Type here"} onChange={(e) => setPass(e.target.value)} /></th>
                                </tr>

                            </div>
                        </div>
                    </table>
                    <hr/>
                    <button className="btn btn-primary done-buttonn" onClick={handleSubmit}>ADD</button>
                    <ToastContainer />
                </form>

            </div>




        </div>

    );
}

export default Add;