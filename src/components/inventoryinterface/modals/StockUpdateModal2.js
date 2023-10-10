import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../inventory.css";
import UpdateConfirmModal from "./confirmationmodal/UpdateConfirmModal";

function StockUpdateModal(props) {
  const { show, onHide, inputs } = props;

  const [Stock_IN, setStockIN] = useState("");
  const [Drug_ID, setID] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  

  const addStockCount = (value) => {
    if (inputs && inputs.Drug_ID) {
      setID(inputs.Drug_ID);
      setStockIN(parseInt(inputs.StockCount) + parseInt(value));
    }
  };

  const handleAdd = (drug) => {
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (Drug_ID === "") {
      toast.warning("Please select a drug.");
    } else if (Stock_IN === "") {
      toast.warning("Please enter the Stock Count.");
    } else {
      const url = "http://localhost/HealerZ/PHP/Inventory/stockupdate.php";
      let fdata = new FormData();
      fdata.append("Drug_ID", Drug_ID);
      fdata.append("StockCount", Stock_IN);

      axios
        .post(url, fdata)
        .then((response) => {
          toast.success("Stock Updated Successfully.!");
          onHide();
          setUpdateTrigger(!updateTrigger);
          setConfirmModalVisible(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modaltitleee">Stock UPDATE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <hr />
          <table>
            <tbody>
              <tr>
                <th className={"detailhed"}>Drug_ID</th>
                <th className={"detailspac"}>:</th>
                <th className={"detaildet"} name={"Drug_ID"}>
                  {inputs && inputs.Drug_ID}
                </th>
              </tr>
              <tr>
                <th className={"detailhed"}>Drug_Name</th>
                <th className={"detailspac"}>:</th>
                <th className={"detaildet"}>
                  {inputs && inputs.Drug_Name}
                </th>
              </tr>
              <tr>
                <th className="detailhed">Available Count</th>
                <th className={"detailspac"}>:</th>
                <th className={"detaildet"}>
                  {inputs && inputs.StockCount}
                </th>
              </tr>
            </tbody>
          </table>
          <hr />
          <div>
            <form>
              <table>
                <tbody>
                  <tr>
                    <th className={"detailhed"}>Stock_In</th>
                    <td className={"inputfield"}>
                      <input
                        type={"number"}
                        name={"StockCount"}
                        className={"SearchBox1"}
                        style={{width:'300px'}}
                        onChange={(e) => addStockCount(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary uptbut"
            onClick={() => handleAdd(inputs)}
            style={{ backgroundColor: "green",width:'130px'}}
          >
            Update
          </Button>
          <ToastContainer />
          <Button
            variant="secondary uptbut"
            onClick={onHide}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {confirmModalVisible && (
        <UpdateConfirmModal
          show={confirmModalVisible}
          onHide={() => setConfirmModalVisible(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default StockUpdateModal;
