import React, { useState }  from "react";
import { Modal, Button } from "react-bootstrap";
import './inventory.css';
import SelectInput from "./additional/SelectInput";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddModal(props) {
    const [formData, setFormData] = useState({
        drug_id: "",
        drug_name: "",
        category: "",
        dosage: "",
        description: ""
    });


   

    // const options = ['Option 1', 'Option 2', 'Option 3','Option 4','Option 5','Option 6','Option 7','Option 8','Option 8'];

    // const handleSelectChange = (selectedOption) => {
    //     setFormData({
    //         ...formData,
    //         category: selectedOption
    //     });
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    


    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the form data to the PHP backend using fetch
        fetch("addDrug.php", {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.text())
        .then(data => {
            // Show a toast notification upon successful submission
            notify();
            console.log(data);
        })
        .catch(error => console.error(error));
    };

    const notify = () => toast("Item Added Successfully!");
    const { show, onHide } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Drug ADD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <table className={"ADDTable"}>
                        <tr>
                            <th>Drug_ID</th>
                            <th className={"inputfield"}><input type={"text"} name={"drug_id"} placeholder={"DRUGXXXXX"} className={"inputt"} onChange={handleInputChange} value={formData.drug_id}/><br/></th>
                        </tr>
                        <tr>
                            <th>Drug_Name</th>
                            <th className={"inputfield"}><input type={"text"} name={"drug_name"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={handleInputChange} value={formData.drug_name}/><br/></th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className={"inputfield1"}><input type={"text"} name={"category"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={handleInputChange} value={formData.category}/><br/></th>
                        </tr>
                        <tr>
                            <th>Dosage</th>
                            <th className={"inputfield"}><input type={"text"} name={"dosage"} placeholder={"XXXmg"} className={"inputt"}  onChange={handleInputChange} value={formData.dosage}/><br/></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}><textarea name={"description"}  placeholder={"Type description here..."} className={"inputt"} rows={3} onChange={handleInputChange} value={formData.description}/><br/></th>
                        </tr>
                    </table>
                </form>


                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={handleSubmit} >Add</Button>
                <ToastContainer />
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default AddModal;