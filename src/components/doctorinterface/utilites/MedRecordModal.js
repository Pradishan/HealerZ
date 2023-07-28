import React from 'react';
import { Modal} from "react-bootstrap";

export default function MedRecordModal(props) {

    const { show, onHide, recordData } = props;
    const { date,complain ,examination ,tests ,diagnosis,prescription } = recordData;

  return (
    <>
        <Modal  size='lg' show={show} onHide={onHide} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <Modal.Title>Medical Record</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{maxHeight:'70vh',overflowY: 'auto'}}>
            <th scope="col">Date</th>
                <p>{date}</p>
                <h3>Patient complain</h3>
                <p>{complain}</p>
                <h3>On examination  </h3>
                <p>{examination}</p>
                <h3>Tests</h3>
                <p>{tests}</p>
                <h3>Dignosis</h3>
                <p>{diagnosis}</p>
                <h3>Prescription</h3>
                <p>{prescription}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn text-white shadow my-3 btn-gr' onClick={onHide} >Add</button>
                <button className='btn text-white shadow my-3 btn-gr' onClick={onHide} >Close</button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
