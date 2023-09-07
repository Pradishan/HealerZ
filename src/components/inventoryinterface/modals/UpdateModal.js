import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomConfirmModal from '../modals/CustomConfirmModal';

function UpdateModal(props) {
  const { show, onHide, inputs } = props;
  const [newData, setNewData] = useState({});
  const item = inputs[0] || {}; 

  const [drug_id, setID] = useState(item.Drug_ID);
  const [drug_name, setName] = useState(item.Drug_Name);
  const [category, setCat] = useState(item.Category);
  const [dosage, setDos] = useState(item.Drug_dosage);
  const [description, setDes] = useState(item.Descriptions);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    setNewData({
      Drug_ID: drug_id,
      Drug_Name: drug_name,
      Category: category,
      Drug_dosage: dosage,
      Descriptions: description,
    });
  }, [drug_id, drug_name, category, dosage, description]);

  
  const handleUpdate = () => {
    if (JSON.stringify(newData) === JSON.stringify(item)) {
      toast.info("No data to update!");
      return;
    }
  
    axios
      .put("http://localhost/HealerZ/PHP/Inventory/updateDrug.php", newData)
      .then((response) => {
        console.log(response.data);
        toast.success("Drug updated successfully!");
        onHide();
      })
      .catch((error) => {
        toast.error("Failed to update drug!");
        console.error(error);
      });
  };

  const handleDelete = () => {
    // Show the confirmation modal
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = () => {
    const drugIdToDelete = newData.Drug_ID || item.Drug_ID;

    if (!drugIdToDelete) {
      toast.error("Drug ID not found!");
      return;
    }

    axios
      .delete(`http://localhost/HealerZ/PHP/Inventory/deleteDrug.php?Drug_ID=${drugIdToDelete}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Drug deleted successfully!");
        onHide();
      })
      .catch((error) => {
        toast.error("Failed to delete drug!");
        console.error(error);
      });
      setShowConfirmModal(false);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="modaltitleee">Drug UPDATE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <form>
          <table className={"ADDTable"}>
            <tbody>
              <tr>
                <th>NDC Number</th>
                <th className={"inputfield"}>
                  <input
                    type={"text"}
                    name={"Drug_ID"}
                    defaultValue={drug_id}
                    placeholder={"DRUGXXXXXX"}
                    className={"inputt"}
                    onChange={(e) => setID(e.target.value)}
                  />
                  <br />
                </th>
              </tr>

              <tr>
                <th>Drug_Name</th>
                <th className={"inputfield"}>
                  <input
                    type={"text"}
                    name={"Drug_Name"}
                    defaultValue={drug_name}
                    placeholder={"XXXXXXXXXX"}
                    className={"inputt"}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                </th>
              </tr>

              <tr>
                <th>Category</th>
                <th className={"inputfield"}>
                  <select
                    name={"Category"}
                    defaultValue={category}
                    className={"inputt"}
                    onChange={(e) => setCat(e.target.value)}
                    style={{height:'30px '}}
                  >
                    <option value={""}>Select Category</option>
                    <option value={"Liquid"}>Liquid</option>
                    <option value={"Tablet"}>Tablet</option>
                    <option value={"Capsules"}>Capsules</option>
                    <option value={"Topical"}>Topical</option>
                    <option value={"Suppositories"}>Suppositories</option>
                    <option value={"Drops"}>Drops</option>
                    <option value={"Injections"}>Injections</option>
                    <option value={"Implants"}>Implants</option>
                  </select>
                  <br />
                </th>
              </tr>

              <tr>
                <th>Dosage</th>
                <th className={"inputfield"}>
                  <input
                    type={"text"}
                    name={"Drug_dosage"}
                    defaultValue={dosage}
                    placeholder={"XXXmg"}
                    className={"inputt"}
                    onChange={(e) => setDos(e.target.value)}
                  />
                  <br />
                </th>
              </tr>

              <tr>
                <th>Description</th>
                <th className={"inputfield"}>
                  <textarea
                    name={"Descriptions"}
                    defaultValue={description}
                    placeholder={"Type description here..."}
                    className={"inputt"}
                    rows={3}
                    onChange={(e) => setDes(e.target.value)}
                  />
                  <br />
                </th>
              </tr>
            </tbody>
          </table>
        </form>
        <hr />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary uptbut"
          onClick={handleUpdate}
          style={{ backgroundColor: "green" }}
        >
          Update
        </Button>
        <Button
          variant="primary uptbut"
          onClick={handleDelete}
          style={{ backgroundColor: "red" }}
        >
          Delete
        </Button>
        <ToastContainer />
        <CustomConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteConfirmed}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
