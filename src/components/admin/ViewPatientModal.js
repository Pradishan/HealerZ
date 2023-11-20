import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { IconButton } from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";
import default_dp from "../../assets/default_dp.png";

function ViewPatientModal(props) {
  const { show, onHide, PatientDetails } = props;
  const [profilepic, setprofilepic] = useState(default_dp);

  useEffect(() => {
    fetchData(PatientDetails && PatientDetails.Patient_ID);
  }, [PatientDetails]);

  const fetchData = async (Patient_ID) => {
    if (Patient_ID) {
      try {
        const response = await axios.get(
          `http://localhost/Healerz/PHP/patient/getPatientProfile.php?Patient_ID=${Patient_ID}`
        );

        console.log(response.data);
        if (response.data.Profile) {
          const imageType = response.data.ProfileType;
          const base64 = response.data.Profile;

          setprofilepic(`data:${imageType};base64,${base64}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
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
        <div className="empprofdetail">
          <div style={{ textAlign: "center" }}>
            <img
              src={profilepic}
              alt="avatar"
              className="rounded-circle me-2"
              width="200px"
              height="200px"
              style={{ objectFit: "cover" }}
            />
            <hr />
            <div>
              <h2 className="detaildetails">
              {PatientDetails && PatientDetails.Patient_ID}
              </h2>
              <h2 className="detaildetails2">
              {PatientDetails && PatientDetails.PatientName}
              </h2>
              <h2 className="detaildetails2">
              {PatientDetails && PatientDetails.Email}
              </h2>
            </div>
          </div>

          <div className="emptabledata">
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

export default ViewPatientModal;
