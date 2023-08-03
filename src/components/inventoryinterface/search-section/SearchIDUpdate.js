import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import '../inventory.css';
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from "../modals/UpdateModal";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchIDUpdate(props) {
    const [showModal, setShowModal] = useState(false);
    const [Drug_ID, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [drug_name, setName] = useState('');
    const [category, setCat] = useState('');
    const [dosage, setDos] = useState('');
    const [description, setDes] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        getUser();
    };

    function getUser() {
        axios.get(`http://localhost/HealerZ/PHP/display.php?Drug_ID=${Drug_ID}`)
            .then(function (response) {
                console.log(response.data);
                setInputs(response.data);
                if (response.data == 0) {
                    toast.error("Invalid Drug_ID");
                } else {
                    setSearchResults(response.data);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    const handleUpdate = () => {
        // Perform the update action here using the inputs state
        // Example: You can use axios to send a POST request to your backend PHP script with the updated data.
        if (drug_name.length === 0) {
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

        } else {
            // Create a new object with the updated drug information
            const updatedDrug = {
                Drug_ID: Drug_ID, // Assuming you have the Drug_ID from the item in the searchResults array
                Drug_Name: drug_name,
                Category: category,
                Drug_dosage: dosage,
                Descriptions: description,
            };

            // Send a POST request to update the drug information
            axios
                .post("http://localhost/HealerZ/PHP/update.php", updatedDrug)
                .then((response) => {
                    console.log(response.data);
                    toast.success("Drug information updated successfully!");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to update drug information.");
                });
        }


    };


    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide} className={"moddd"}>
            <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div><h3 className={"content-heading1"}>Search DRUG ID:</h3></div>
                    <div className={"SearchSection3"}>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="SearchBox1"
                                type="text"
                                placeholder="DRUG_ID"
                                value={Drug_ID}
                                onChange={handleChange}
                            />
                            <button type="submit" className="filterbutt">Search</button>
                        </form>
                    </div>
                </div>

                {searchResults.map(item => (
                    <p key={item.Drug_ID}>
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
                                                value={item.Drug_ID}
                                                className={"inputt"}
                                                readOnly // Make it read-only
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
                                                placeholder={item.Drug_Name}
                                                className={"inputt"}
                                                onChange={(e) => setName(e.target.value)}
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
                                                placeholder={item.Category}
                                                className={"inputt"}
                                                onChange={(e) => setCat(e.target.value)}
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
                                                placeholder={item.Drug_dosage}
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
                                                placeholder={item.Descriptions}
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
                    </p>
                ))}
                <ToastContainer />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SearchIDUpdate;
