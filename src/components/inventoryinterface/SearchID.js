import React, { useState } from 'react';

const SearchBarID = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange2 = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit2} style={{display:'flex',flexDirection:'row'}}>

            <input className={"SearchBox1"}
                   type="text"
                   placeholder="DRUG_ID "
                   value={searchTerm}
                   onChange={handleChange2}
            />
            <button type="submit" className="filterbutt">Search</button>
        </form>
    );
};

export default SearchBarID;
