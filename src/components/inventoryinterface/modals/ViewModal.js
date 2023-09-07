import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../inventory.css';

function ViewModal(props) {
    const { show, onHide, drugDetails } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title className="modaltitleee">Drug Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th className={'detailhed'}>Drug_ID</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{drugDetails && drugDetails.Drug_ID}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Drug_Name</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{drugDetails && drugDetails.Drug_Name}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Category</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{drugDetails && drugDetails.Category}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Dosage</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet'}>{drugDetails && drugDetails.Drug_dosage}</td>
                        </tr>
                        <tr>
                            <th className={'detailhed'}>Description</th>
                            <th className={'detailspac'}>:</th>
                            <td className={'detaildet3'}>{drugDetails && drugDetails.Descriptions}</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div>
                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p style={{ marginRight: '70px' }} className={'detailhed'}>StockIn :<span className={'detaildet'}>300</span></p>
                        <p style={{ marginRight: '60px' }} className={'detailhed'}>StockOut :<span className={'detaildet'}>400</span></p>
                        <p className={'detailhed'}>Expired :<span className={'detaildet'}>25</span></p>
                    </div> */}
                    <div style={{ marginLeft: '150px' }} className={'detailhed'}>Stock_Count :<span className={'detaildet'}>{drugDetails && drugDetails.StockCount}</span></div>
                </div>
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

export default ViewModal;
