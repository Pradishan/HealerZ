import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ViewDoctorModal(props) {
    const { show, onHide, DoctorDetails } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Doctor Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th className={'detailhed'}>doctor_ID</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.Doctor_ID}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Doctor_Name</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.Doctor_Name}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Designation</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.designation}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Email</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.email}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>PhoneNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.phoneNo}</td>
                        </tr>
                        
                        <tr>
                            <th className={'detailhed'}>Address</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet3'}>{DoctorDetails && DoctorDetails.address}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>SLMC RegNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.regNo}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Password</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{DoctorDetails && DoctorDetails.Password}</td>
                        </tr>
                        {/* Add more attributes here */}
                    </tbody>
                </table>
                
                <hr />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewDoctorModal;