import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { IconButton } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import UpdateConfirmModal from "./UpdateConfirmModal";

function SupplyPopup(props) {
  const { show, onHide, drugDetails } = props;
  const [supplyList, setsupplyList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
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
      const total = response.data.reduce((acc, item) => {
        const tdsNumbers = item.TDS.split("+").map(Number);
        const tdsTotal = tdsNumbers.reduce((sum, num) => sum + num, 0);
        return acc + tdsTotal * item.Days;
      }, 0);

      setTotalCount(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmUpdate = () => {
    const url = "http://localhost/Healerz/PHP/Inventory/supplydrugupdate.php";
    let fdata = new FormData();
    fdata.append(
      "Drug_ID",
      supplyList.map((item) => item.Drug_ID)
    );
    fdata.append(
      "StockCount",
      supplyList.map((item) => {
        const tdsNumbers = item.TDS.split("+").map(Number);
        const tdsTotal = tdsNumbers.reduce((sum, num) => sum + num, 0);
        return tdsTotal * item.Days;
      })
    );

    axios
      .post(url, fdata)
      .then((response) => {
        console.log(response);
        toast.success("Drug Distributed Successfully.!");
        onHide();
        setConfirmModalVisible(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header>
          <Modal.Title className="modaltitleee">Drug Supply</Modal.Title>
          {drugDetails && drugDetails.status === "Waiting" && (
            <IconButton style={{ color: "blue" }} className="modalbutthover">
              <HourglassBottomIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          )}
          {drugDetails && drugDetails.status === "Delivered" && (
            <IconButton style={{ color: "green" }} className="modalbutthover">
              <VerifiedUserIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          )}
          {drugDetails &&
            drugDetails.status !== "Waiting" &&
            drugDetails.status !== "Delivered" && (
              <IconButton style={{ color: "red" }} className="modalbutthover">
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
                <th className={"detaildet"}>
                  {drugDetails && drugDetails.TimeP}
                </th>
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
                    <td>
                      {(() => {
                        const tdsNumbers = item.TDS.split("+").map(Number);
                        const tdsTotal = tdsNumbers.reduce(
                          (sum, num) => sum + num,
                          0
                        );
                        return tdsTotal * item.Days;
                      })()}
                    </td>
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
            onClick={handleAdd}
            style={{ backgroundColor: "green" }}
          >
            Update
          </Button>
          <ToastContainer />
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {confirmModalVisible && (
        <UpdateConfirmModal
          show={confirmModalVisible}
          onHide={() => setConfirmModalVisible(false)}
          onConfirm={handleConfirmUpdate}
        />
      )}
    </>
  );
}

export default SupplyPopup;
