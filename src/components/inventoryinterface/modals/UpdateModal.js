import React, { useState, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import "../inventory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UpdateModal(props) {
  const [newData, setNewData] = useState({});

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const { show, onHide } = props;

  const items = props.inputs; 

  const handleUpdate = () => {
    if (Object.keys(newData).length === 0) {
      toast.info("No data to update!");
      return;
    }
    if (!newData.Drug_ID) {
      toast.info("Drug ID is missing in the update data!");
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
    const drugIdToDelete = newData.Drug_ID || (items.length && items[0].Drug_ID);

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
                            <th className={'inputfield'}>
                                <select
                                    name={'Category'}
                                    defaultValue={item.Category}
                                    className={'inputt'}
                                    onChange={(e) => updateNewData(e, "Category")}
                                    style={{height:'30px '}}
                                >
                                   <option value={''}>Select Category</option>
                                    <option value={'Liquid'}>Liquid</option>
                                    <option value={'Tablet'}>Tablet</option>
                                    <option value={'Capsules'}>Capsules</option>
                                    <option value={'Topical'}>Topical</option>
                                    <option value={'Suppositories'}>Suppositories</option>
                                    <option value={'Drops'}>Drops</option>
                                    <option value={'Injections'}>Injections</option>
                                    <option value={'Implants'}>Implants</option>
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
        <Button variant="primary uptbut" onClick={handleUpdate} style={{backgroundColor:'green'}}>
          Update
        </Button>
        <Button variant="primary uptbut" onClick={handleDelete} style={{backgroundColor:'red'}}>
          Delete
        </Button>
        <ToastContainer />
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
