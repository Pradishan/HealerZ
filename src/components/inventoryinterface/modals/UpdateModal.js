import React, { useState, useMemo  } from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function UpdateModal(props) {
    const notify1 = () => toast("Item Deleted Successfully!");
    const notify2 = () => toast("Item Updated Successfully!");

    const [inputs, setInputs] = useState(props.inputs);
    const memoizedInputs = useMemo(() => props.inputs, [props.inputs]);

    // Update the inputs state only when it changes
    if (memoizedInputs !== inputs) {
      setInputs(memoizedInputs);
    }
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    };
    



    const handleUpdate = () => {
        // Perform the update action here using the inputs state
        // Example: You can use axios to send a POST request to your backend PHP script with the updated data.
        axios.post(`http://localhost/HealerZ/PHP/update.php`, inputs)
            .then(function (response) {
                console.log(response.data);
                // Handle the success notification here
                notify2();
            })
            .catch(function (error) {
                alert(error);
            });
    };

    const handleDelete = () => {
        // Perform the delete action here using the inputs.Drug_ID
        // Example: You can use axios to send a DELETE request to your backend PHP script.
        axios.delete(`http://localhost/HealerZ/PHP/delete.php?Drug_ID=${inputs.Drug_ID}`)
            .then(function (response) {
                console.log(response.data);
                // Handle the success notification here
                notify1();
                // Handle any other logic after successful deletion
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const { show, onHide } = props;
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
                            <tr>
                                <th>Drug_ID</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"text"}
                                        name={"Drug_ID"}
                                        value={inputs.Drug_ID}
                                        placeholder={"DRUGXXXXXX"}
                                        className={"inputt"}
                                        onChange={handleChange}
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
                                        value={inputs.Drug_Name}
                                        placeholder={"XXXXXXXXXX"}
                                        className={"inputt"}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <th className={"inputfield1"}>
                                    <input
                                        type={"text"}
                                        name={"Category"}
                                        value={inputs.Category}
                                        placeholder={"XXXXXXXXXX"}
                                        className={"inputt"}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Dosage</th>
                                <th className={"inputfield"}>
                                    <input
                                        type={"text"}
                                        name={"Drug_dosage"}
                                        value={inputs.Drug_dosage}
                                        placeholder={"XXXmg"}
                                        className={"inputt"}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </th>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <th className={"inputfield"}>
                                    <textarea
                                        name={"Descriptions"}
                                        value={inputs.Descriptions}
                                        placeholder={"Type description here..."}
                                        className={"inputt"}
                                        rows={3}
                                        onChange={handleChange}
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
                <Button variant="primary" onClick={handleUpdate}>Update</Button>
                <ToastContainer />
                <Button variant="primary" onClick={handleDelete}>Delete</Button>
                <ToastContainer />
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateModal;
