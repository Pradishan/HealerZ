import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ViewEmployeeModal(props) {
    const { show, onHide, EmployeeDetails } = props;

    return (
        <Modal show={show} onHide={onHide}>
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
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.employeeName}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>PhoneNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.phoneNO}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Email</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.email}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Address</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.address}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>SLMC RegNo</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{EmployeeDetails && EmployeeDetails.regNo}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>UserType</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet3'}>{EmployeeDetails && EmployeeDetails.userType}</td>
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

export default ViewEmployeeModal;