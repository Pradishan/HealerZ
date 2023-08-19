import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ViewPatientModal(props) {
    const { show, onHide, PatientDetails } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Patient Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th className={'detailhed'}>Patient_ID</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.Patient_ID}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Patient_Name</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.PatientName}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>DateOfBirth</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.DateOfBirth}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Gender</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.Gender}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>PhoneNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.PhoneNo}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Email</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.Email}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Address</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet3'}>{PatientDetails && PatientDetails.Address}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>BloodGroup</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.BloodGroup}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Password</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{PatientDetails && PatientDetails.Password}</td>
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

export default ViewPatientModal;