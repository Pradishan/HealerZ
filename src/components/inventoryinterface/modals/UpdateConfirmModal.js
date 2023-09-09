import React from "react";
import PropTypes from "prop-types";
import { Modal, Button} from "react-bootstrap"; // You can use any modal library you prefer

const UpdateConfirmModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title className="modaltitleee1" style={{color:'Green'}}>Conformation to Update</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "white" }}>
        <p>Are you sure you want to Update this Stock</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" style={{width:'200px'}} onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

UpdateConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default UpdateConfirmModal;
