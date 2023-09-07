import React from "react";
import PropTypes from "prop-types";
import { Modal, Button} from "react-bootstrap"; // You can use any modal library you prefer

const ConfirmDeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title className="modaltitleee">Conformation</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "white" }}>
        <p>Are you sure you want to delete this Patient Data ?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
