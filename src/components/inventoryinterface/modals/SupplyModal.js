
import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import '../inventory.css';

function SupplyPopup(props) {
    const [supplyList, setsupplyList] = useState([
        {No: 1, ID: "DRUG0001", name: "Aspirin", TDS: "1+2+1", AF_BF: "AF", Count: 20},
        {No: 2, ID: "DRUG0025", name: "Metformin", TDS:"1+2+1", AF_BF: "BF", Count: 10},
        {No: 3, ID: "DRUG0008", name: "Escitalopram", TDS:"2+2+1", AF_BF: "BF", Count: 15},
        {No: 4, ID: "DRUG0011", name: "Risperidone", TDS: "1+2+2", AF_BF: "BF", Count: 20},
        {No: 5, ID: "DRUG0009", name: "Amiodarone", TDS: "2+1+2", AF_BF: "BF", Count: 20}


    ])

    const notify = () => toast("Drug Supply Successfully!");
    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="modaltitleee">Drug Supply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>:</th>
                        <th className={"detaildet"}>07-07-2023</th>
                    </tr>
                    <tr>
                        <th>Prescription_ID</th>
                        <th>:</th>
                        <th className={"detaildet"}>PRT0005</th>
                    </tr>
                    <tr>
                        <th>Patient_ID</th>
                        <th>:</th>
                        <th className={"detaildet"}>CST20008</th>
                    </tr>
                    <tr>
                        <th>Patient_Name</th>
                        <th>:</th>
                        <th className={"detaildet"}>Powsi</th>
                    </tr>

                </table>

                <hr/>
                <div className={"table-container-popup "}>
                    <table className={"table table-hover table-striped"} style={{minWidth: '0px',}}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">NO</th>
                            <th scope="col">DRUG_ID</th>
                            <th scope="col">DRUG_NAME</th>
                            <th scope="col">TDS</th>
                            <th scope="col">AF/BF</th>
                            <th scope="col">COUNT</th>
                        </tr>
                        </thead>
                        <tbody >
                        {supplyList.map((data, index) => (<tr>
                            <th scope="row">{data.No}</th>
                            <td>{data.ID}</td>
                            <td>{data.name}</td>
                            <td>{data.TDS}</td>
                            <td>{data.AF_BF}</td>
                            <td>{data.Count}</td>
                        </tr>))}

                        </tbody>
                    </table>
                </div>
                <div>
                    <hr style={{width:'180px', marginLeft:'550px'}}/>
                    <div style={{display:'flex',flexDirection:'row', marginLeft:'575px'}}>
                        <p>Total Count</p>
                        <p style={{paddingLeft:'30px'}}>85</p>
                    </div>
                    <hr style={{width:'180px', marginLeft:'550px'}}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={notify} style={{backgroundColor:'green'}}>Update</Button>
                <ToastContainer/>
                <Button variant="primary" style={{backgroundColor:'blue'}}onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SupplyPopup;
