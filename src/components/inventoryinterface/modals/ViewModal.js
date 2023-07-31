// ViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';

function ViewModal(props) {
    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Drug Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <table>
                    <tr>
                        <th>Drug_ID</th>
                        <th>:</th>
                        <th className={"detaildet"}>DRUG0001</th>
                    </tr>
                    <tr>
                        <th>Drug_Name</th>
                        <th>:</th>
                        <th className={"detaildet"}>Aspirin</th>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <th>:</th>
                        <th className={"detaildet"}>Category 1</th>
                    </tr>
                    <tr>
                        <th>Dosage</th>
                        <th>:</th>
                        <th className={"detaildet"}>500mg</th>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <th>:</th>
                        <th className={"detaildet"}>Aspirin is a commonly used medication classified as a nonsteroidal anti-inflammatory drug (NSAID). It is widely known for its pain-relieving, anti-inflammatory, and fever-reducing properties.</th>
                    </tr>

                </table>

                <hr/>
                <div>
                    <div style={{display:"flex",flexDirection:'row'}}>
                        <p style={{marginRight:"120px"}}>StockIn:</p>
                        <p style={{marginRight:"120px"}}>StockOut:</p>
                        <p>Expired:</p>
                    </div>
                    <div style={{marginLeft:"174px"}}>Stock_Count:</div>
                </div>

                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewModal;
