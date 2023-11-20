import React from "react";
import PropTypes from "prop-types";
import { Modal, Button} from "react-bootstrap";
import { IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const RejectConfirmModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header>
        <Modal.Title className="modaltitleee1" style={{color:'darkred'}}>Conformation to Reject !</Modal.Title>
        <IconButton style={{color:'darkred'}}><CancelIcon sx={{ fontSize: "40px" }}/></IconButton> 
      </Modal.Header>
      <Modal.Body style={{ background: "white" }}>
        <p className="connforrrp">Are you sure you want to Reject this Supply ?</p>
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

RejectConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default RejectConfirmModal;
