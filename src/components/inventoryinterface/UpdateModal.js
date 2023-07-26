  import React,{useState} from "react";
import { Modal, Button } from "react-bootstrap";
import './inventory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function UpdateModal(props) {
    // const notify = () => toast("Item Updated Successfully!");
    const notify1 = () => toast("Item Deleted Successfully!");

    const [ID, setID] = useState("");
    const [name, setName] = useState("");
    const [cat, setCat] = useState("");
    const [dos, setDos] = useState("");
    const [des, setDes] = useState("");

    

    const handleUpdate = () => {
        axios.post('http://localhost/update.php', {
            Drug_ID: ID,
            Drug_Name: name,
            Category: cat,
            Drug_dosage: dos,
            Descriptions: des
        })
        .then(response => {
            console.log(response.data); // Debugging: Check the response from the server
            if (response.data === 'success') {
                toast.success("Item Updated Successfully!");
                onHide();
            } else {
                toast.error("Error occurred while updating the item.");
            }
        })
        .catch(error => {
            console.error(error); // Debugging: Check for any errors in the console
            toast.error("An error occurred while updating the item.");
        });
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
                            <th className={"inputfield"}><input type={"text"} name={"Drug_ID"}  placeholder={"DRUGXXXXX"} className={"inputt"} onChange={(e) => setID(e.target.value)} /><br/></th>
                        </tr>
                        <tr>
                            <th>Drug_Name</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_Name"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={(e) => setName(e.target.value)} /><br/></th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className={"inputfield1"}><input type={"text"} name={"Category"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={(e) => setCat(e.target.value)} /><br/></th>
                        </tr>
                        <tr>
                            <th>Dosage</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_dosage"}  placeholder={"XXXmg"} className={"inputt"} onChange={(e) => setDos(e.target.value)} /><br/></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}><textarea name={"Descriptions"}  placeholder={"Type description here..."} className={"inputt"} rows={3} onChange={(e) => setDes(e.target.value)} /><br/></th>
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