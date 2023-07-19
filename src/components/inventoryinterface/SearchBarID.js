import React, { useState } from 'react';

const SearchBarID = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>

            <input className={"SearchBox1"}
                type="text"
                placeholder="DRUG_ID "
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit" className="filterbutt">Filter</button>
        </form>
    );
};

export default SearchBarID;
