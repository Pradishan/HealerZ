import React, { useState } from 'react';
import './Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '../../layouts/AdminLayout';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddDoctor(props) {
    
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
                
            </div>

        </AdminLayout>


    );
}

export default AddDoctor;