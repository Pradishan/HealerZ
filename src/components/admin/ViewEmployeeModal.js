import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ViewEmployeeModal(props) {
    const { show, onHide, EmployeeDetails } = props;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Employee Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th className={'detailhed'}>Employee_ID</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.employee_ID}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Employee_Name</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.employee_Name}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Designation</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.role}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Email</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.Email}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>PhoneNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.PhoneNo}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Address</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.Address}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>SLMC RegNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.SLMC}</td>
                        </tr>
                        {/* Add more attributes here */}
                    </tbody>
                </table>
                
                <hr />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewEmployeeModal;