import React, { useState } from 'react';
import Layout from '../../layouts/layout';
import powsi from "../../assets/Powsi.jpg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings(props) {
    const [image, setImage] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleImageUpload = async () => {
        if (!image) {
            setErrorMessage('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost/Healerz/PHP/Inventory/uploadImage.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSuccessMessage('Image uploaded successfully.');
            } else {
                setErrorMessage('Error uploading image.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while uploading the image.');
        }
    };


    const handleChangePassword = async () => {
        if (!newPassword) {
            setErrorMessage('Password cannot be empty.');
            return;
        }

        try {
            console.log("New Password:", newPassword);
            const response = await axios.post('http://localhost/Healerz/PHP/Inventory/changepassword.php', {
                Pharmacist_ID: 'new', 
                newPassword,
                
            }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setSuccessMessage('Password changed successfully.');
            } else {
                setErrorMessage('Error changing password.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while changing the password.');
        }
    };


    const handleFileInputChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Layout>
            <div className="settingg">
                <div className='d-flex align-items-center justify-content-center mb-2'>
                    <div className='d-flex align-items-center justify-content-center ms-2'>
                        <img src={powsi} alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                    </div>

                    <div className='d-flex align-items-center justify-content-center'>
                        <div>
                            <h4 className='m-0'>Powsi</h4>
                            <p className='fs-5 m-0'>Powsi07@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="accordion accordion-flush" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#profile" aria-expanded="false" aria-controls="collapseOne">
                                Change profile picture
                            </button>
                        </h2>
                        <div id="profile" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                               
                                <div className="form-floating mb-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileInputChange} />
                                </div>
                                <button className='btn w-100 text-white shadow btn-gr' onClick={handleImageUpload}>
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion accordion-flush mt-4" id="passwordAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#password" aria-expanded="false" aria-controls="collapseTwo">
                                Change Password
                            </button>
                        </h2>
                        <div id="password" className="accordion-collapse collapse" data-bs-parent="#passwordAccordion">
                            <div className="accordion-body">
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="New Password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                    />
                                    <label for="floatingPassword">New Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="New Password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                    />
                                    <label for="floatingPassword">Confirm Password</label>
                                </div>
                                <button className='btn w-100 text-white shadow my-3 btn-gr' onClick={handleChangePassword}>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <ToastContainer />
            </div>
        </Layout>
    );
}
