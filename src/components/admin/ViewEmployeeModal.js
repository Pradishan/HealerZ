import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { IconButton } from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";
import default_dp from "../../assets/default_dp.png";

function ViewEmployeeModal(props) {
  const { show, onHide, EmployeeDetails } = props;
  const [profilepic, setprofilepic] = useState(default_dp);

  useEffect(() => {
    fetchData(EmployeeDetails && EmployeeDetails.employee_ID);
  }, [EmployeeDetails]);

  const fetchData = async (employeeID) => {
    if (employeeID) {
      try {
        const response = await axios.get(
          `http://localhost/Healerz/PHP/Inventory/settings/getemployeeProfile.php?employeeID=${employeeID}`
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
        <Modal.Title className="modaltitleee">Employee Detail</Modal.Title>
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
              width="250px"
              height="250px"
              style={{ objectFit: "cover" }}
            />
            <hr />
            <div>
              <h2 className="detaildetails">
                {EmployeeDetails && EmployeeDetails.role}
              </h2>
              <h2 className="detaildetails2">
                {EmployeeDetails && EmployeeDetails.employee_Name}
              </h2>
              <h2 className="detaildetails2">
                {EmployeeDetails && EmployeeDetails.Email}
              </h2>
            </div>
          </div>

          <div className="emptabledata">
            <table>
              <tbody>
                <tr>
                  <th className={"detailhed"}>Employee_ID</th>
                  <th className={"detailspac"}>:</th>
                  <td className={"detaildet"}>
                    {EmployeeDetails && EmployeeDetails.employee_ID}
                  </td>
                </tr>
                <tr>
                  <th className={"detailhed"}>Employee_Name</th>
                  <th className={"detailspac"}>:</th>
                  <td className={"detaildet"}>
                    {EmployeeDetails && EmployeeDetails.employee_Name}
                  </td>
                </tr>
                <tr>
                  <th className={"detailhed"}>Email</th>
                  <th className={"detailspac"}>:</th>
                  <td className={"detaildet"}>
                    {EmployeeDetails && EmployeeDetails.Email}
                  </td>
                </tr>
                <tr>
                  <th className={"detailhed"}>Phone No</th>
                  <th className={"detailspac"}>:</th>
                  <td className={"detaildet"}>
                    {EmployeeDetails && EmployeeDetails.PhoneNo}
                  </td>
                </tr>
                <tr>
                  <th className={"detailhed"}>SLMC No</th>
                  <th className={"detailspac"}>:</th>
                  <td className={"detaildet"}>
                    {EmployeeDetails && EmployeeDetails.SLMC}
                  </td>
                </tr>
                <tr>
                  <th className={"detailhed"}>Address</th>
                  <th className={"detailspac"}>:</th>
                  <td className={"detaildet"}>
                    {EmployeeDetails && EmployeeDetails.Address}
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

export default ViewEmployeeModal;
