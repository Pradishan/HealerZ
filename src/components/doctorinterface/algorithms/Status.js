import React from 'react';

export default function Status(props) {

    const{status} = props;

    let statusMessage;

    switch (status) {
        case "Requested":
            statusMessage = <div className="alert alert-primary m-0 p-1 ms-1 text-center" role="alert">Requested</div>;
            break;
        case "Approved":
            statusMessage = <div className="alert alert-success m-0 p-1 ms-1 text-center" role="alert">Approved</div>;
            break;
        case 'Rejected':
            statusMessage = <div className="alert alert-danger m-0 p-1 ms-1 text-center" role="alert">Rejected</div>;
            break;
        default:
            statusMessage = <div className="alert alert-warning m-0 p-1 ms-1 text-center" role="alert">Unknown Status</div>;
            break;
    }
  return (
    <>
        {statusMessage}
    </>
  )
}
