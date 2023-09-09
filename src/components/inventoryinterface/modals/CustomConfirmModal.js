import React from "react";
import PropTypes from "prop-types";
import { Modal, Button} from "react-bootstrap"; // You can use any modal library you prefer

const CustomConfirmModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title className="modaltitleee1" style={{color:'darkred'}}>Conformation to delete</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "white" }}>
        <p className="connforrrp">Are you sure you want to delete this drug?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger"  onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

CustomConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CustomConfirmModal;
