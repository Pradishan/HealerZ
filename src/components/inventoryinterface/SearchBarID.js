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
            <input
                type="text"
                placeholder="Drug_ID"
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Filter</button>
        </form>
    );
};

export default SearchBarID;
