import React from 'react'
import { useState } from 'react';

export default function MedicalRequest(props) {
    const id =props.id;
    const name =props.name;
    const date =props.date;
    const description =props.description;
    const [status,setStatus] =useState(props.status);

    let medStatus;

    switch (status) {
        case 1:
            medStatus = <div className="alert alert-primary m-0 p-1 ms-1 text-center" role="alert">requested</div>;
            break;
        case 2:
            medStatus = <div className="alert alert-success m-0 p-1 ms-1 text-center" role="alert">Approved</div>;
            break;
        case 3:
            medStatus = <div className="alert alert-danger m-0 p-1 ms-1 text-center" role="alert">Rejected</div>;
            break;
        default:
            medStatus = <div className="alert alert-warning m-0 p-1 ms-1 text-center" role="alert">Unknown Status</div>;
            break;
    }

    return (
        <tr className='' key={props.id}>
            <td>{id}</td>
            <td>{name}</td>
            <td style={{minWidth:'100px',}}>{date}</td>
            <td className='text-truncate' style={{maxWidth:'200px',}}>{description}</td>
            <td>{medStatus}</td>
            <td className='text-center'><button className='btn text-white btn-gr p-1'>View</button></td>
        </tr>
    )
}
