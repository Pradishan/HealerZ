import React from 'react'
import { useState } from 'react';

export default function MedicalRequest(props) {
    const id =props.id;
    const name =props.name;
    const date =props.date;
    const description =props.description;
    const [status,setStatud] =useState(props.status);

    let medStatus;

    switch (status) {
        case 1:
            medStatus = <div className="alert alert-primary m-0 p-1 ms-1" role="alert">requested</div>;
            break;
        case 2:
            medStatus = <div className="alert alert-success m-0 p-1 ms-1" role="alert">Approved</div>;
            break;
        case 3:
            medStatus = <div className="alert alert-danger m-0 p-1 ms-1" role="alert">Rejected</div>;
            break;
        default:
            medStatus = <div className="alert alert-warning m-0 p-1 ms-1" role="alert">Unknown Status</div>;
            break;
    }

    return (
        <tr className='' key={props.id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{date}</td>
            <td>{description}</td>
            <td>{medStatus}</td>
            <td><button className='btn text-white shadow btn-gr p-1'>View</button></td>
        </tr>
    )
}
