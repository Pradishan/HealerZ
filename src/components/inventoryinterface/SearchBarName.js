import React, { useState } from 'react';

const SearchBarName = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange1 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit1 = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit1}>
            <input
                type="text"
                placeholder="DRUG_NAME"
                value={searchTerm}
                onChange={handleChange1}
            />
            <button type="submit">Filter</button>
        </form>
    );
};

export default SearchBarName;