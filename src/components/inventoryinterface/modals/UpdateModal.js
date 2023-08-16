import React, { useState, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import "../inventory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UpdateModal(props) {
  

  // const [inputs, setInputs] = useState(props.inputs);
  const [newData, setNewData] = useState({});

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const { show, onHide } = props;

  const items = props.inputs; // Assuming props.inputs is an array of objects

  const handleUpdate = () => {
    // Check if there is any data to update
    if (Object.keys(newData).length === 0) {
      toast.error("No data to update!");
      return;
    }
  
    // Check if Drug_ID is present in newData
    if (!newData.Drug_ID) {
      toast.error("Drug ID is missing in the update data!");
      return;
    }
  
    // Perform the update operation
    axios
    .put("http://localhost/HealerZ/PHP/updateDrug.php", newData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        toast.success("Drug updated successfully!");
      })
      .catch((error) => {
        // Handle error response
        toast.error("Failed to update drug!");
        console.error(error);
      });
  };
  
  
  
  const handleDelete = () => {
    const drugIdToDelete = newData.Drug_ID || (items.length && items[0].Drug_ID);

    if (!drugIdToDelete) {
      toast.error("Drug ID not found!");
      return;
    }

      axios
        .delete(`http://localhost/HealerZ/PHP/deleteDrug.php?Drug_ID=${drugIdToDelete}`)
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          toast.success("Drug deleted successfully!");
        })
        .catch((error) => {
          // Handle error response
          toast.error("Failed to delete drug!");
          console.error(error);
        });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Drug UPDATE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <form>
          <table className={"ADDTable"}>
            <tbody>
              {items.map((item) => (
                <React.Fragment key={item.Drug_ID}>
                  <tr>
                    <th>Drug_ID</th>
                    <th className={"inputfield"}>
                      <input
                        type={"text"}
                        name={"Drug_ID"}
                        defaultValue={item.Drug_ID}
                        placeholder={"DRUGXXXXXX"}
                        className={"inputt"}
                        onChange={(e) => updateNewData(e, "Drug_ID")}
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
                        defaultValue={item.Drug_Name}
                        placeholder={"XXXXXXXXXX"}
                        className={"inputt"}
                        onChange={(e) => updateNewData(e, "Drug_Name")}
                      />
                      <br />
                    </th>
                  </tr>
              
                  <tr>
                            <th>Category</th>
                            <th className={'inputfield1'}>
                                <select
                                    name={'Category'}
                                    defaultValue={item.Category}
                                    className={'inputt'}
                                    onChange={(e) => updateNewData(e, "Category")}
                                >
                                    <option value={''}>Select Category</option>
                                    <option value={'Category 1'}>Category 1</option>
                                    <option value={'Category 2'}>Category 2</option>
                                    <option value={'Category 3'}>Category 3</option>
                                    <option value={'Category 4'}>Category 4</option>
                                    <option value={'Category 5'}>Category 5</option>
                                    <option value={'Category 6'}>Category 6</option>
                                    <option value={'Category 7'}>Category 7</option>
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
                        defaultValue={item.Drug_dosage}
                        placeholder={"XXXmg"}
                        className={"inputt"}
                        onChange={(e) => updateNewData(e, "Drug_dosage")}
                      />
                      <br />
                    </th>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <th className={"inputfield"}>
                      <textarea
                        name={"Descriptions"}
                        defaultValue={item.Descriptions}
                        placeholder={"Type description here..."}
                        className={"inputt"}
                        rows={3}
                        onChange={(e) => updateNewData(e, "Descriptions")}
                      />
                      <br />
                    </th>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </form>
        <hr />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
        <ToastContainer />
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
