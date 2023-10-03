import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "../inventory.css";
import axios from "axios";

function SupplyPopup(props) {
  const notify = () => toast("Drug Supply Successfully!");
  const { show, onHide, drugDetails } = props;
  const [supplyList, setsupplyList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    if (show && drugDetails) {
      fetchData(drugDetails.Prescription_ID);
    }
  }, [show, drugDetails]);

  const fetchData = async (Prescription_ID) => {
    try {
      const response = await axios.get(
        `http://localhost/Healerz/PHP/Inventory/displaysupplydrugs.php?Prescription_ID=${Prescription_ID}`
      );
      console.log("API Response:", response.data);
      setsupplyList(response.data);
      const total = response.data.reduce((acc, item) => acc + item.Days * 3, 0);
      setTotalCount(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee">Drug Supply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <table>
          <tr>
            <th className={"detailhed"}>Date</th>
            <th className={"detailspac"}>:</th>
            <th className={"detaildet"}>{drugDetails && drugDetails.TimeP}</th>
          </tr>
          <tr>
            <th className={"detailhed"}>Prescription_ID</th>
            <th className={"detailspac"}>:</th>
            <th className={"detaildet"}>
              {drugDetails && drugDetails.Prescription_ID}
            </th>
          </tr>
          <tr>
            <th className={"detailhed"}>Patient_ID</th>
            <th className={"detailspac"}>:</th>
            <th className={"detaildet"}>
              {drugDetails && drugDetails.Patient_ID}
            </th>
          </tr>
          <tr>
            <th className={"detailhed"}>Patient_Name</th>
            <th className={"detailspac"}>:</th>
            <th className={"detaildet"}>
              {drugDetails && drugDetails.PatientName}
            </th>
          </tr>
        </table>

        <hr />
        <div className={"table-container-popup "}>
          <table
            className={"table table-hover table-striped"}
            style={{ minWidth: "0px" }}
          >
            <thead className={"top-0 position-sticky h-45"}>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">DRUG_ID</th>
                <th scope="col">TDS</th>
                <th scope="col">AF/BF</th>
                <th scope="col">Days</th>
                <th scope="col">COUNT</th>
              </tr>
            </thead>
            <tbody>
            {supplyList.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.Drug_ID}</td>
                  <td>{item.TDS}</td>
                  <td>{item.Time}</td>
                  <td>{item.Days}</td>
                  <td>{item.Days * 3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <hr style={{ width: "180px", marginLeft: "550px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "575px",
            }}
          >
            <p>Total Count</p>
            <p style={{ paddingLeft: "30px" }}>{totalCount}</p>
          </div>
          <hr style={{ width: "180px", marginLeft: "550px" }} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={notify}
          style={{ backgroundColor: "green" }}
        >
          Update
        </Button>
        <ToastContainer />
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SupplyPopup;
