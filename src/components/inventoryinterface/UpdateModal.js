  import React,{useState} from "react";
import { Modal, Button } from "react-bootstrap";
import './inventory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function UpdateModal(props) {
    // const notify = () => toast("Item Updated Successfully!");
    const notify1 = () => toast("Item Deleted Successfully!");

    const [drugData, setDrugData] = useState({
        Drug_ID: "DRUG00005",
        Drug_Name: "Amoxicillin",
        Category: "Option 1",
        Drug_dosage: "500mg",
        Descriptions: "dbhwbhd dwdbhuwqbhwqd dwqhdbwqhdbhwqd  wqhdbhwqyb"
    });

    const handleUpdate = () => {
        // Send the updated drug data to the PHP script using Axios
        axios.post("http://localhost/update.php", drugData)
            .then(response=>alert(response.data))
            .catch(error => alert(error));
    };

    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Drug UPDATE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <form>
                    <table className={"ADDTable"}>
                        <tr>
                            <th>Drug_ID</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_ID"}  placeholder={"DRUGXXXXX"} className={"inputt"} value={drugData.Drug_ID}/><br/></th>
                        </tr>
                        <tr>
                            <th>Drug_Name</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_Name"} placeholder={"XXXXXXXXXX"} className={"inputt"} value={drugData.Drug_Name}/><br/></th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className={"inputfield1"}><input type={"text"} name={"Category"} placeholder={"XXXXXXXXXX"} className={"inputt"} value={drugData.Category} /><br/></th>
                        </tr>
                        <tr>
                            <th>Dosage</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_dosage"}  placeholder={"XXXmg"} className={"inputt"} value={drugData.Drug_dosage}/><br/></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}><textarea name={"Descriptions"}  placeholder={"Type description here..."} className={"inputt"} rows={3} value={drugData.Descriptions}/><br/></th>
                        </tr>
                    </table>
                </form>


                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate} >Update</Button>
                <ToastContainer/>
                <Button variant="primary" onClick={notify1} >Delete</Button>
                <ToastContainer/>
            </Modal.Footer>
        </Modal>

    );
}

export default UpdateModal;