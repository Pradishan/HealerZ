import React from 'react';

export default function Status(props) {

    const{primary,success,danger,status} = props;

    let statusMessage;

    switch (status) {
        case 1:
            statusMessage = <div className="alert alert-primary m-0 p-1 ms-1" role="alert">{primary}</div>;
            break;
        case 2:
            statusMessage = <div className="alert alert-success m-0 p-1 ms-1" role="alert">{success}</div>;
            break;
        case 3:
            statusMessage = <div className="alert alert-danger m-0 p-1 ms-1" role="alert">{danger}</div>;
            break;
        default:
            statusMessage = <div className="alert alert-warning m-0 p-1 ms-1" role="alert">Unknown Status</div>;
            break;
    }
  return (
    <>
        {statusMessage}
    </>
  )
}
