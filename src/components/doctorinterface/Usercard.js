import React from 'react'

export default function Usercard({ src }) {
    const width = {
        minWidth: '230px',
    }
    const profilSize = {
        maxWidth: '150px',
        maxHeight: '150px',
        minWidth: '150px',
        minHeight: '150px',
    }
    return (
        <>
            <div className='bg-white shadow rounded p-2' style={width}>

                <div className='m-3'>
                    <div className='d-flex align-items-center justify-content-center mb-2'>
                        <div className='d-flex align-items-center justify-content-center ms-2'>
                            <img src={src} alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                        </div>

                        <div className='d-flex align-items-center justify-content-center'>
                            <div>
                                <h3 className='m-0'>FirstName</h3>
                                <p className='fs-4 m-0'>cst20001</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='d-lg-flex flex-md-colum justify-content-between'>
                            <p className='fs-5 m-0'>31 Aug 2000</p>
                            <p className='text-muted m-0'>22 years</p>
                        </div>

                        <div className='d-lg-flex flex-md-colum justify-content-between'>
                            <p className='text-muted m-0 me-2'>No31 newyork ,Sri Lanka</p>
                            <p className='m-0'>070 4470004</p>
                        </div>

                    </div>

                    <hr />

                    <div className='d-flex justify-content-between'>
                        <p className='fs-5 m-0'>Age</p>
                        <p className='fs-6 text-success m-0 fw-bold'>22 years</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p className='fs-5 m-0'>Gender</p>
                        <p className='fs-6 m-0 fw-bold'>Male</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p className='fs-5 m-0'>Bloog group</p>
                        <p className='fs-6 text-danger m-0 fw-bold'>B+</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p className='fs-5 m-0'>Allergy</p>
                        <p className='fs-6 text-primary m-0 fw-bold'>No</p>
                    </div>

                    <h3 className='mt-2'>Special disease</h3>
                    <p className='fs-6 text-muted m-0'>"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.</p>
                    <button className='btn w-100 text-white shadow my-3 btn-gr'>Medical Records</button>
                </div>
            </div>
        </>
    )
}
