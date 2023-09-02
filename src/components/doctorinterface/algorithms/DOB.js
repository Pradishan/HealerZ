import React from 'react';

export default function DOP(props) {
    const { inputDate } = props;

    function formatDate(inputDate) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', options);
    }

    const formattedDate = formatDate(inputDate);

    return <>{formattedDate}</>;
}

