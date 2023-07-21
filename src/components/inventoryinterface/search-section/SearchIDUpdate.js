import React, { useState } from 'react';
import UpdateModal from "../UpdateModal";

const SearchIDUpdate = ({ onSearch }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange2 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };
    const UpdateModal1 = () => {
        setShowModal(!showModal);
    };

    return (
        <form onSubmit={handleSubmit2} style={{display:'flex',flexDirection:'row'}}>

            <input className={"SearchBox1"}
                   type="text"
                   placeholder="DRUG_ID "
                   value={searchTerm}
                   onChange={handleChange2}
            />
            <button type="submit" className="filterbutt" onClick={UpdateModal1}>Search</button>
            <UpdateModal show={showModal} onHide={UpdateModal1} />
        </form>

    );
};

export default SearchIDUpdate;
