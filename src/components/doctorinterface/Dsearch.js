import React from 'react';
import FeatherIcon from 'feather-icons-react';

export default function Dsearch() {
    const width = {
        minWidth: '230px',
    }
    return (
        <>
            <div className='bg-white rounded shadow p-3' style={width}>
                <div className='input-group-text bg-gray border-0 rounded-pill' width='200px'>
                    <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search ID' />
                    <FeatherIcon icon="search" className='me-2 text-muted' type='button' />
                </div>
            </div>
        </>
    )
}
