import React, { useState } from 'react';
import StockUpdateModal from "../StockUpdateModal";

const SearchIDStock = ({ onSearch }) => {
    const [showModal1, setShowModal1] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange2 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };
    const UpdateStockModal = () => {
        setShowModal1(!showModal1);
    };

    return (
        <form onSubmit={handleSubmit2} style={{display:'flex',flexDirection:'row'}}>

            <input className={"SearchBox1"}
                   type="text"
                   placeholder="DRUG_ID "
                   value={searchTerm}
                   onChange={handleChange2}
            />
            <button type="submit" className="filterbutt" onClick={UpdateStockModal}>Search</button>
            <StockUpdateModal show={showModal1} onHide={UpdateStockModal} />
        </form>

    );
};

export default  SearchIDStock;
