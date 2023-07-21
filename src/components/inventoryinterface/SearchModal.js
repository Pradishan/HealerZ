import React from "react";
import { Modal } from "react-bootstrap";
import './inventory.css';
import 'react-toastify/dist/ReactToastify.css';
// import SearchBarID from "./SearchBarID";
// import SearchBarName from "./SearchBarName";
import SearchID from "./SearchID";

function SearchModal(props) {

    const handleSearch2 = (searchTerm1) => {
        // Perform search logic using the search term
        console.log('Search term:', searchTerm1);
    };
    const { show, onHide } = props;
    return (
        <Modal show={show} onHide={onHide}  className={"moddd"}>
            <Modal.Header closeButton>
                <Modal.Title>Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"SearchSection"} style={{display: 'flex', flexDirection: 'row'}}>
                    <div><h3 className={"content-heading1"}>Search DRUG ID: </h3></div>
                    <div className={"SearchSection3"} >
                        <SearchID onSearch={handleSearch2}/>
                    </div>

                </div>

            </Modal.Body>

        </Modal>

    );
}

export default SearchModal;