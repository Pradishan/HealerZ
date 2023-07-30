import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import '../inventory.css';
import 'react-toastify/dist/ReactToastify.css';
import StockUpdateModal from "../modals/StockUpdateModal";

function SearchIDUpdate(props) {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle search logic here
        console.log(`Searching for ${searchTerm}...`);
    }

    const UpdateModal2 = () => {
        setShowModal(!showModal);
    };
    const { show, onHide } = props;
    return ( 
        <Modal show = { show }
        onHide = { onHide }
        className = { "moddd" } >
        <Modal.Header closeButton >
        <Modal.Title > Search </Modal.Title> 
        </Modal.Header> 
        <Modal.Body >
        <div className = { "SearchSection" }
        style = {
            { display: 'flex', flexDirection: 'row' } } >
        <div> 
            <h3 className = { "content-heading1" } > Search DRUG ID: </h3></div >
        <div className = { "SearchSection3" } >
        <form onSubmit = { handleSubmit } >
        <input className = "SearchBox1"
        type = "text"
        placeholder = "DRUG_ID "
        value = { searchTerm }
        onChange = { handleChange }
        /> 
        <button type = "submit"
        className = "filterbutt"
        onClick = { UpdateModal2 } > Search </button> <
        StockUpdateModal show = { showModal }
        onHide = { UpdateModal2 }
        />
        </form>
        </div>

        </div>

        </Modal.Body>

        </Modal>

    );
}

export default SearchIDUpdate;