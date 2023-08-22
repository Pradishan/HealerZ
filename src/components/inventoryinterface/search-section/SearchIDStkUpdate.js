import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import '../inventory.css';
import 'react-toastify/dist/ReactToastify.css';
import StockUpdateModal from "../modals/StockUpdateModal";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchIDstkUpdate(props) {
    const [showModal, setShowModal] = useState(false);
    const [Drug_ID, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({});

    const handleChange2 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        getUser();
    };

    function getUser() {
        axios.get(`http://localhost/HealerZ/PHP/Inventory/display.php?Drug_ID=${Drug_ID}`)
            .then(function(response) {
                console.log(response.data);
                setInputs(response.data);
                if(response.data==0){
                    toast.error("Invalid Drug_ID");
                    setShowModal(false);
                    
                   
                }else{
                    setShowModal(true);
                   // Show the modal after getting the response
                }
                   
                
                
            })
            .catch(function(error) {
                console.error(error);
            })
            .finally(() => {
                // Reset the Drug_ID state after a successful search
                setSearchTerm('');
            });
    }

    const UpdateModal2 = () => {
        setShowModal(!showModal);
    };

    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide} className={"moddd"}>
            <Modal.Header closeButton>
                <Modal.Title>Stock Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div><h3 className={"content-heading1"}>Search DRUG ID:</h3></div>
                    <div className={"SearchSection3"}>
                        <form onSubmit={handleSubmit2}>
                            <input
                                className="SearchBox1"
                                type="text"
                                placeholder="DRUG_ID"
                                value={Drug_ID}
                                onChange={handleChange2}
                            />
                            <button type="submit" className="filterbutt">Search</button>
                        </form>
                    </div>
                </div>
                {showModal && <StockUpdateModal show={showModal} onHide={UpdateModal2} inputs={inputs} />}
                <ToastContainer/>
            </Modal.Body>
        </Modal>
       
    );
}

export default SearchIDstkUpdate;
