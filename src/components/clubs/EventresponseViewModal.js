import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IconButton } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VaccinesIcon from "@mui/icons-material/Vaccines";

function EventresponseViewModal(props) {
  const { show, onHide, EventDetails } = props;

  let eventIcon = null;
  if (EventDetails && EventDetails.event === "vaccination") {
    eventIcon = (
      <IconButton>
        <VaccinesIcon style={{ color: "green" }} sx={{ fontSize: "40px" }} />
      </IconButton>
    );
  } else if (EventDetails && EventDetails.event === "blooddonation") {
    eventIcon = (
      <IconButton>
        <WaterDropIcon style={{ color: "red" }} sx={{ fontSize: "40px" }} />
      </IconButton>
    );
  }

  let eventname = null;
  if (EventDetails && EventDetails.event === "vaccination") {
    eventname = (
      <span className="hedeventdet">{EventDetails && EventDetails.event}</span>
    );
  } else if (EventDetails && EventDetails.event === "blooddonation") {
    eventname = (
      <span className="hedeventdet" style={{ color: "red" }}>
        {EventDetails && EventDetails.event}
      </span>
    );
  }

  return (
    <Modal show={show} onHide={onHide} centered size="md" backdrop="static">
      <Modal.Header>
        <Modal.Title className="modaltitleeeevent">
          Event Response Detail ( {eventname} )
        </Modal.Title>
        {eventIcon}
      </Modal.Header>
      <Modal.Body>
        <h6 className="eventresdate">{EventDetails && EventDetails.Date}</h6>
        <table>
          <tbody>
            <tr>
              <th className={"detailhed"}>Entroll_No</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {EventDetails && EventDetails.Patient_ID}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Name</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {EventDetails && EventDetails.name}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Email</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {EventDetails && EventDetails.email}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>NIC No</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {EventDetails && EventDetails.nic}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>PhoneNo</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {EventDetails && EventDetails.phone_no}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Address</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet"}>
                {EventDetails && EventDetails.address}
              </td>
            </tr>
            <tr>
              <th className={"detailhed"}>Event</th>
              <th className={"detailspac"}>:</th>
              <td className={"detaildet3"}>
                {EventDetails && EventDetails.event}
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

export default EventresponseViewModal;
