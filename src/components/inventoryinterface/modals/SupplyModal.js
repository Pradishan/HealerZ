import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { IconButton } from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';

function SupplyPopup(props) {
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
  

  const handleUpdate = async () => {
    try {
      // Calculate the updated count based on the total count
      const updatedStockCount = totalCount - supplyList.reduce((acc, item) => acc + item.Days * 3, 0);

      // Send a POST request to your PHP script
      const response = await axios.post(
        "http://localhost/Healerz/PHP/Inventory/supplydrugupdate.php",
        {
          Drug_ID: drugDetails.Prescription_ID,
          StockCount: updatedStockCount,
        }
      );

      if (response.data === "Stock Updated Successfully") {
        // Show a success message
        toast.success("Stock Updated Successfully");
        // You can also close the modal or perform other actions as needed
      } else {
        // Show an error message
        toast.error("Error updating stock");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Error updating stock");
    }
  };
  return (
    <>
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header >
        <Modal.Title className="modaltitleee">Drug Supply</Modal.Title>
        {drugDetails && drugDetails.status === "Waiting" && (
          <IconButton
            style={{ color: "blue" }}
            className="modalbutthover"
          >
            <HourglassBottomIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        )}
        {drugDetails && drugDetails.status === "Delivered" && (
          <IconButton
            style={{ color: "green" }}
            className="modalbutthover"
          >
            <VerifiedUserIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        )}
        {drugDetails && drugDetails.status !== "Waiting" && drugDetails.status !== "Delivered" && (
          <IconButton
            style={{ color: "red" }}
            className="modalbutthover"
          >
            <GppBadIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        )}
      </Modal.Header>
      <Modal.Body>
        <hr />
        <table>
          <tbody>
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
          </tbody>
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
                <th scope="col">StockCount</th>
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
                  <td>{item.StockCount}</td>
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
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "485px",
            }}
          >
            <p className="totalcounttthed">Total Count</p>
            <p className={"detailspac"}>=</p>
            <p className="totalcounttt">{totalCount}</p>
          </div>
          <hr />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleUpdate}
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
    </>
  );
}

export default SupplyPopup;
