import React from 'react';
import FeatherIcon from 'feather-icons-react';

export default function Demail() {
    return (
        <>
            <div className='p-2'>
                <div className='d-flex align-items-center mb-2'>
                    <h5 className='ms-0 m-2'>Email</h5>
                    <div className='d-flex align-items-center'>
                        <div className='input-group-text bg-gray border-0 rounded-pill'>
                            <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Receptionists' id='receptionists'/>
                            <FeatherIcon icon="at-sign" className='mx-2 text-muted icon-btn' />
                        </div>
                    </div>
                </div>
                <div className='p-2 border rounded'>
                    <input type='text' className='form-control no-focus-style border-0' placeholder='Subject' id='subject'/>
                    <hr className='my-1' />
                    <div className="form-floating">
                        <textarea className="form-control border-0" placeholder="Leave a comment here" id="emailMessage" style={{ height: '100px' }}></textarea>
                        <label htmlFor="floatingTextarea2">Type your message...</label>
                    </div>
                </div>
            </div>
        </>
    )
}
