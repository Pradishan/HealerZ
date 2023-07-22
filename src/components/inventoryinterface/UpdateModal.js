  import React from "react";
import { Modal, Button } from "react-bootstrap";
import './inventory.css';
import SelectInput from "./additional/SelectInput";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateModal(props) {
    const notify = () => toast("Item Updated Successfully!");
    const notify1 = () => toast("Item Deleted Successfully!");

    const options = ['Option 1', 'Option 2', 'Option 3','Option 4','Option 5','Option 6','Option 7','Option 8','Option 8'];

    const handleSelectChange = (selectedOption) => {
        console.log('Selected option:', selectedOption);
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
                            <th className={"inputfield"}><input type={"text"} name={"drug_id"}  value={"DRUG00005"} placeholder={"DRUGXXXXX"} className={"inputt"} /><br/></th>
                        </tr>
                        <tr>
                            <th>Drug_Name</th>
                            <th className={"inputfield"}><input type={"text"} name={"drug_name"} placeholder={"XXXXXXXXXX"} value={"Amoxicillin"} className={"inputt"}/><br/></th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className={"inputfield1"}><SelectInput options={options} onChange={handleSelectChange} className={"inputt"}/><br/></th>
                        </tr>
                        <tr>
                            <th>Dosage</th>
                            <th className={"inputfield"}><input type={"text"} name={"dosage"} value={"500mg"} placeholder={"XXXmg"} className={"inputt"}/><br/></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}><textarea name="message"  value={"dbhwbhd dwdbhuwqbhwqd dwqhdbwqhdbhwqd  wqhdbhwqyb"} placeholder={"Type description here..."} className={"inputt"} rows={3}/><br/></th>
                        </tr>
                    </table>
                </form>


                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={notify} >Update</Button>
                <ToastContainer/>
                <Button variant="primary" onClick={notify1} >Delete</Button>
                <ToastContainer/>
            </Modal.Footer>
        </Modal>

    );
}

export default UpdateModal;