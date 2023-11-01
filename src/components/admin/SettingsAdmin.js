import React, { useState } from "react";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { Dna } from "react-loader-spinner";

function SettingsAdmin(props) {

    const [employee_ID, setID] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userdata, setuserdata] = useState([]);

    const resetForm = () => {
        setID("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleSubmit = () => {
        if (currentPassword.length === 0) {
            toast.warning("Please Enter the current password");
        } else if (newPassword.length === 0) {
            toast.warning("Please Enter the new password");
        } else if (confirmPassword.length === 0) {
            toast.warning("Please Confirm the new password");
        } else if (newPassword !== confirmPassword) {
            toast.warning("New passwords do not match");
        } else if (employee_ID.length === 0) {
            toast.warning("Please Enter the ID");
        } else {
            setIsLoading(true);

            const url = "http://localhost/HealerZ/PHP/admin/changePassword.php";
            const data = {
                employee_ID,
                currentPassword,
                newPassword,
                confirmPassword,
            };


            axios
                .put(url, data)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        setIsLoading(false);
                        toast.success(response.data.message);

                        // Update the userdata state with the new password
                        setuserdata((prevData) => {
                            const updatedData = [...prevData];
                            if (updatedData.length > 0) {
                                updatedData[0].Password = newPassword;
                            }
                            return updatedData;
                        });

                        resetForm();
                    } else {
                        setIsLoading(false);
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error("An error occurred while changing the password.");
                    console.error(error);
                });
        }
    };



    return (
        <AdminLayout>
            <div className="Addcontt">
                {/* <h3 className="serhett">Add patient</h3> */}
                <div className="addboxx">
                    <h3 className="pataddhed">Settings</h3>
                    <hr />
                    {isLoading ? (
                        <div style={{ marginLeft: "450px", marginBottom: "30px" }}>
                            <Dna
                                visible={true}
                                height="150"
                                width="150"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                                style={{ marginLeft: "70px" }}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <hr />
                    <form>
                        <table  style={{ display: "flex", justifyContent: "space-around" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className="cont1" >
                                    <tr>
                                        <th>
                                            <label>Employee_ID:</label>
                                        </th>
                                        <th className={"addinputt"}>
                                            {" "}
                                            <input
                                                type="text"
                                                className="form-control1"
                                                name={"employee_ID"}
                                                placeholder={"--ID--"}
                                                onChange={(e) => setID(e.target.value)}
                                                value={employee_ID}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label>Current Password:</label>
                                        </th>
                                        <th className={"addinputt"}>
                                            {" "}
                                            <input
                                                type="password"
                                                className="form-control1"
                                                name={"currentPassword"}
                                                placeholder={""}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            {" "}
                                            <label>New Password:</label>
                                        </th>
                                        <th className={"addinputt"}>
                                            <input
                                                type="password"
                                                className="form-control1"
                                                name={"newPassword"}
                                                placeholder={""}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label>Confirm Password:</label>
                                        </th>
                                        <th className={"addinputt"}>
                                            {" "}
                                            <input
                                                type="password"
                                                className="form-control1"
                                                name={"confirmPassword"}
                                                placeholder={""}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <button
                        className="btn btn-secondary done-buttontt3"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                </div>
                <ToastContainer />
            </div>
        </AdminLayout>
    );
}

export default SettingsAdmin;



