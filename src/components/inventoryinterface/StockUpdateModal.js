// ViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import './inventory.css';

function StockUpdateModal(props) {
    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Stock UPDATE</Modal.Title>
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
                        <th>Availability</th>
                        <th>:</th>
                        <th className={"detaildet"}>500</th>
                    </tr>

                </table>

                <hr/>
                <div>
                    <table>
                        <tr>
                            <th>Stock_In</th>
                            <th className={"inputfield"}><input type={"number"} name={"drug_id"} className={"inputt"}/><br/></th>
                        </tr>
                        <tr>
                            <th>Expired_Date</th>
                            <th className={"inputfield"}><input type={"date"} name={"drug_name"}  className={"inputt"}/><br/></th>
                        </tr>
                    </table>
                </div>

                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockUpdateModal;
