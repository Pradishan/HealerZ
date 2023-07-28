import React from 'react'
import { useState } from 'react';
import MedRequestModal from './MedRequestModal';

export default function MedicalRequest(props) {

    const { id, name, date, duration, description, status } = props;
    const [status1, setStatus] = useState(status);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    let medStatus;

    switch (status1) {
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
        <>
            <tr className='' key={props.id}>
                <td>{id}</td>
                <td>{name}</td>
                <td style={{ minWidth: '100px', }}>{date}</td>
                <td className='text-center'>{duration}</td>
                <td className='text-truncate' style={{ maxWidth: '200px', }}>{description}</td>
                <td>{medStatus}</td>
                <td className='text-center'><button className='btn text-white btn-gr p-1' onClick={toggleModal} >View</button></td>
            </tr>
            <MedRequestModal show={showModal} onHide={toggleModal} data={""} />
        </>
    )
}
