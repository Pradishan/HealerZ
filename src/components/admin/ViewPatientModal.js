import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IconButton } from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";

function ViewPatientModal(props) {
  const { show, onHide, PatientDetails } = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="modaltitleee">Patient Detail</Modal.Title>
        <IconButton>
          <Person3Icon
            style={{ color: "darkgreen" }}
            sx={{ fontSize: "40px" }}
          />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <table>
          <tbody>
            <tr>
              <th className={"detailhed"}>Entroll_No</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.Patient_ID}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Patient_Name</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.PatientName}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>DateOfBirth</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.DateOfBirth}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Gender</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.Gender}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>PhoneNo</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.PhoneNo}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Email</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.Email}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Address</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet3"}>
                {PatientDetails && PatientDetails.Address}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>BloodGroup</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {PatientDetails && PatientDetails.BloodGroup}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewPatientModal;
