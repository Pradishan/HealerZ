import React from 'react';

export default function DateTime(props) {
    const { dateTime } = props;

    function formatDateTime(dateTime) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
        
        return formattedDate.replace(/(\d+)(th|st|nd|rd)/, (match, day, suffix) => {
          return day + '<sup>' + suffix + '</sup>';
        });
      }
      
      const DateTime = formatDateTime(dateTime);
    return (<>{DateTime}</>);
}
