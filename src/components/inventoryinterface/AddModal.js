import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './inventory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddModal(props) {
    const MySwal = withReactContent(Swal);

    const [drug_id, setID] = useState('');
    const [drug_name, setName] = useState('');
    const [category, setCat] = useState('');
    const [dosage, setDos] = useState('');
    const [description, setDes] = useState('');

    const handleSubmit = () => {
        if (drug_id.length === 0) {
            // alert("Pls Enter the Drug_ID");
            toast.error("Pls Enter the Drug_ID");
        } else if (drug_name.length === 0) {
            // alert("Pls Enter the Drug_Name");
            toast.error("Pls Enter the Drug_Name");
    
        }
        else if (category.length === 0) {
            // alert("Pls Enter the Category");
            toast.error("Pls Enter the Category");
            
        }
        else if (dosage.length === 0) {
            // alert("Pls Enter the Dosage");
            toast.error("Pls Enter the Dosage");
           
        } else if (description.length === 0) {
            // alert("Pls Enter the Descrption");
            toast.error("Pls Enter the Descrption");
            
        }
        else {
            const url = "http://localhost/add.php";
            let fdata = new FormData();
            fdata.append('Drug_ID', drug_id);
            fdata.append('Drug_Name', drug_name);
            fdata.append('Category', category);
            fdata.append('Drug_dosage', dosage);
            fdata.append('Descriptions', description);

            // axios.post(url,fdata)
            // .then(response=>alert(response.data))
            // .catch(error=>alert(error));

            axios.post(url, fdata)
                .then((response) => {
                    // Show success swal notification
                    MySwal.fire({
                        icon: "success",
                        title: response.data,
                        customClass: {
                            container: "sweetalert-container",
                        },
                    });
                })
                .catch((error) => {
                    // Show error swal notification
                    MySwal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message,
                        customClass: {
                            container: "sweetalert-container",
                        },
                    });
                });

        }
    }

    const { show, onHide } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Drug ADD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <form>
                    <table className={"ADDTable"}>
                        <tr>
                            <th>Drug_ID</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_ID"} placeholder={"DRUGXXXXX"} className={"inputt"} onChange={(e) => setID(e.target.value)} /><br /></th>
                        </tr>
                        <tr>
                            <th>Drug_Name</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_Name"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={(e) => setName(e.target.value)} /><br /></th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className={"inputfield1"}><input type={"text"} name={"Category"} placeholder={"XXXXXXXXXX"} className={"inputt"} onChange={(e) => setCat(e.target.value)} /><br /></th>
                        </tr>
                        <tr>
                            <th>Dosage</th>
                            <th className={"inputfield"}><input type={"text"} name={"Drug_dosage"} placeholder={"XXXmg"} className={"inputt"} onChange={(e) => setDos(e.target.value)} /><br /></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}><textarea name={"Descriptions"} placeholder={"Type description here..."} className={"inputt"} rows={3} onChange={(e) => setDes(e.target.value)} /><br /></th>
                        </tr>
                    </table>
                </form>


                <hr />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" name={"send"} value={"SEND"} onClick={handleSubmit}>Add</Button>
                <ToastContainer />
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default AddModal;