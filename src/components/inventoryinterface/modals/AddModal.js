import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


function AddModal(props) {
    const [drug_id, setID] = useState('');
    const [drug_name, setName] = useState('');
    const [category, setCat] = useState('');
    const [dosage, setDos] = useState('');
    const [description, setDes] = useState('');
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const resetForm = () => {
        setID('');
        setName('');
        setCat('');
        setDos('');
        setDes('');
    }
    const validateDrugID = (input) => {
        return /^\d{7}$/.test(input);
    }

    const handleSubmit = () => {
        if (drug_id.length === 0) {
            toast.warning("Pls Enter the Drug_ID");
        }else if (!validateDrugID(drug_id)) {
            toast.info("Please enter a valid 7-digit NDC Code");
        } else if (drug_name.length === 0) {
            toast.warning("Pls Enter the Drug_Name");
        }
        else if (category.length === 0) {
            toast.warning("Pls Enter the Category");
        }
        else if (dosage.length === 0) {
            toast.warning("Pls Enter the Dosage");
        } else if (description.length === 0) {
            toast.warning("Pls Enter the Descrption");
        }
        else {
            const url = "http://localhost/HealerZ/PHP/Inventory/addDrug.php";
            let fdata = new FormData();
            fdata.append('Drug_ID', drug_id);
            fdata.append('Drug_Name', drug_name);
            fdata.append('Category', category);
            fdata.append('Drug_dosage', dosage);
            fdata.append('Descriptions', description);

            axios.post(url, fdata)
                .then((response) => {
                    console.log(response.data);
                    if(response.data.message==="Drug Added Successfully"){
                        toast.success(response.data.message);
                        resetForm();
                        setUpdateTrigger(!updateTrigger);
                    }else{
                        toast.error("Drug Already Added");
                    }
                    
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    }

    const { show, onHide } = props;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="modaltitleee">Drug ADD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <hr />
                <form>
                    <table className={"ADDTable"}>
                        <tr>
                            <th>NDC Number</th>
                            <th className={"inputfield"}>
                                <input
                                    type={"text"}
                                    name={"Drug_ID"}
                                    placeholder={"DRUGXXXXX"}
                                    className="SearchBox1"
                                    onChange={(e) => setID(e.target.value)}
                                    value={drug_id}
                                    maxLength={7}
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
                                    placeholder={"XXXXXXXXXX"}
                                    className="SearchBox1"
                                    onChange={(e) => setName(e.target.value)}
                                    value={drug_name}
                                />
                                <br />
                            </th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th className='inputfield'>
                                <select
                                    name={'Category'}
                                    className="SearchBox1"
                                    onChange={(e) => setCat(e.target.value)}
                                    value={category}
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
                                    placeholder={"XXXmg"}
                                    className="SearchBox1"
                                    onChange={(e) => setDos(e.target.value)}
                                    value={dosage}
                                />
                                <br />
                            </th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th className={"inputfield"}>
                                <textarea
                                    name={"Descriptions"}
                                    placeholder={"Type description here..."}
                                    className="SearchBox1 inputt"
                                    rows={3}
                                    onChange={(e) => setDes(e.target.value)}
                                    value={description}
                                />
                                <br />
                            </th>
                        </tr>
                    </table>
                </form>
                <hr />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary uptbut" type="submit" name={"send"} value={"SEND"} onClick={handleSubmit} style={{backgroundColor:'green',width:'130px'}}>Add</Button>
                <ToastContainer />
                <Button variant="secondary uptbut"   onClick={resetForm}>Reset</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddModal;
