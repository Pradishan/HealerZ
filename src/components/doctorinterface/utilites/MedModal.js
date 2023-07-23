import React from 'react';
import { Modal } from "react-bootstrap";

export default function MedModal(props) {
    const { show, onHide } = props;
  return (
    <>
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Medical Records</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               

            </Modal.Body>
            <Modal.Footer>
                <button className='btn text-white shadow my-3 btn-gr' onClick={onHide} >Close</button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
