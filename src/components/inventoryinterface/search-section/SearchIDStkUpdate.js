import React, { useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
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
                }
                   
                
                
            })
            .catch(function(error) {
                console.error(error);
            })
            .finally(() => {
                setSearchTerm('');
            });
    }

    const UpdateModal2 = () => {
        setShowModal(!showModal);
    };

    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide} className={"moddd"} centered>
            <Modal.Header closeButton>
                <Modal.Title className="modaltitleee">Update Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                   
                    <div className={"SearchSection3"}>
                        <form onSubmit={handleSubmit2}>
                        <div className="form-floating mb-3">
                            <input
                                className="form-control form-contttt"
                                id="floatingInput"
                                type="text"
                                placeholder="NDC Number"
                                value={Drug_ID}
                                onChange={handleChange2}
                            />
                            <label htmlFor="floatingInput" className="flotingtexxtt">Search by National Drug Code(NDC) Number</label>
                            </div>
                            <hr/>
                            <button type="submit" className="searchbuttt">Search</button>
                            
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
