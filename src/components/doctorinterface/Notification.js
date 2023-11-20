import React from 'react';
import Status from './algorithms/Status';
import userDefault from '../../assets/avatar.svg'

export default function Notification ( props )
{
    const { record } = props;
    return (
        <>
            <div className='d-flex align-items-center' >
                {/* profile */ }
                <img src={ record.profilepic ? ( record.profilepic ) : ( userDefault ) } alt='avatar' className='rounded' width='48px' height='48px' />
                <div className='ms-2'>
                    <h5 className='mb-0'>{ record.PatientName }</h5>
                    <p className='text-muted m-0'>{ record.Patient_ID }</p>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
                {/* Status */ }
                <Status status={ record.State } />
            </div>
        </>
    )
}
