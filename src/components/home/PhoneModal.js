import React from "react";
import { Modal } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function PhoneModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}  centered>
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee1" style={{color:'#228B22'}}>Call</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="phonemodalicon">
          <LocalPhoneIcon style={{ fontSize: "40px",color:'#800000' }} />
          <p>021-221-0721</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
