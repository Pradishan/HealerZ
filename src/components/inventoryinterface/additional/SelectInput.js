import React, { useState } from 'react';
import '../inventory.css';

const SelectInput = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onChange(selectedValue);
    };

    return (
        <div className="select-input">
            <br/>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {/*<p>Selected option: {selectedOption}</p>*/}
        </div>
    );
};

export default SelectInput;
