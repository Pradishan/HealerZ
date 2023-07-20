import React from 'react'

export default function Notifiaction({ name, id, src, status }) {

    let statusMessage;

    switch (status) {
        case 1:
            statusMessage = <div className="alert alert-primary m-0 p-1 ms-1" role="alert">Waiting</div>;
            break;
        case 2:
            statusMessage = <div className="alert alert-success m-0 p-1 ms-1" role="alert">Selected</div>;
            break;
        case 3:
            statusMessage = <div className="alert alert-danger m-0 p-1 ms-1" role="alert">Rejected</div>;
            break;
        default:
            statusMessage = <div className="alert alert-warning m-0 p-1 ms-1" role="alert">Unknown Status</div>;
            break;
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between m-3 my-2'>
                <div className='d-flex align-items-center'>
                    {/* profile */}
                    <img src={src} alt='avatar' className='rounded' width='48px' height='48px' />
                    <div className='ms-2'>
                        <h5 className='mb-0'>{name}</h5>
                        <p className='text-muted m-0'>{id}</p>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                   {/* Status */}
                   {statusMessage}
                </div>
            </div>
        </>
    )
}
