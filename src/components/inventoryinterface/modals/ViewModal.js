import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../inventory.css";
import { IconButton } from "@mui/material";
import MedicationIcon from '@mui/icons-material/Medication';

function ViewModal(props) {
  const { show, onHide, drugDetails } = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="modaltitleee">Drug Detail</Modal.Title>
        <IconButton>
          <MedicationIcon style={{ color: 'darkgreen' }} sx={{ fontSize: "40px" }} />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <table>
          <tbody>
            <tr>
              <th className={"detailhed"}>Drug_ID</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {drugDetails && drugDetails.Drug_ID}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Drug_Name</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {drugDetails && drugDetails.Drug_Name}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Category</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {drugDetails && drugDetails.Category}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Dosage</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {drugDetails && drugDetails.Drug_dosage}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Description</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet3"}>
                {drugDetails && drugDetails.Descriptions}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div>
          <div style={{ marginLeft: "130px" }} className={"detailhed"}>
            Available Count :
            <span className={"detaildet"}>
              {drugDetails && drugDetails.StockCount}
            </span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;
