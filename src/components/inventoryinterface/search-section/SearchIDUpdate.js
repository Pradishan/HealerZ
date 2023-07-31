import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import '../inventory.css';
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from "../modals/UpdateModal";
import axios from "axios";

function SearchIDUpdate(props) {
    const [showModal, setShowModal] = useState(false);
    const [Drug_ID, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getUser();
    }

    function getUser() {
        axios.get(`http://localhost/HealerZ/PHP/edit.php/${Drug_ID}`)
            .then(function(response) {
                console.log(response.data);
                setInputs(response.data);
                setShowModal(true); // Show the modal after getting the response
            })
            .catch(function(error) {
                console.error(error);
            });
    }

    const UpdateModal1 = () => {
        setShowModal(!showModal);
    };

    const { show, onHide } = props;
    return ( 
        <Modal show = { show }
        onHide = { onHide }
        className = { "moddd" } >
        <Modal.Header closeButton >
        <Modal.Title> Search </Modal.Title> 
        </Modal.Header> 
        < Modal.Body >
        <div className = { "SearchSection" }
        style = {
            { display: 'flex', flexDirection: 'row' } } >
        <div > <h3 className = { "content-heading1" } > Search DRUG ID: </h3></div >
        <div className = { "SearchSection3" } >
        <form onSubmit = { handleSubmit } >
        <input className = "SearchBox1"
        type = "text"
        placeholder = "DRUG_ID"
        value = { Drug_ID }
        onChange = { handleChange }
        /> 
        <button type = "submit"
        className = "filterbutt" > Search 
        </button> 
        </form> 
        </div> 
        </div> {
            showModal && < UpdateModal show = { showModal }
            onHide = { UpdateModal1 }
            inputs = { inputs }
            />} 
            </Modal.Body> 
            </Modal>
        );
    }

    export default SearchIDUpdate;