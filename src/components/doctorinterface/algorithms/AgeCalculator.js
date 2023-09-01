import React from 'react';

export default function AgeCalculator(props) {
    const { dateOfBirth } = props;

    // Calculate age based on the date of birth
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        
        // Check if the birthday hasn't occurred yet this year
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const age = calculateAge(dateOfBirth);

    return (<>{age}</>);
}
