import React, { useState, useEffect } from 'react';
import MedModal from './utilites/MedModal';
import axios from 'axios';
import DOP from './algorithms/DOB';
import AgeCalculator from './algorithms/AgeCalculator';

export default function Usercard ( props )
{
    const { src, selectedId } = props;
    const width = {
        minWidth: '230px',
    };
    const scroll = {
        maxHeight: '10vh',
        overflowY: 'auto',
    };

    const [ showModal, setShowModal ] = useState( false );
    const [ detail, setDetail ] = useState( null ); // Initialize detail as null initially
    const [ loading, setLoading ] = useState( true ); // Added loading state

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                if ( !selectedId )
                {
                    setLoading( false );
                    return;
                }
                const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/getPatient.php', {
                    patient_ID: selectedId,
                } );
                setDetail( response.data[ 0 ] );
                setLoading( false ); // Set loading to false when data is fetched
            } catch ( error )
            {
                console.error( 'Error fetching data:', error );
                setLoading( false ); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, [ selectedId ] ); // Updated dependency to selectedId

    return (
        <>
            <div className='bg-white shadow rounded p-2' style={ width }>
                { loading ? (
                    <h1>Loading...</h1>
                ) : !selectedId ? (
                    <h3>Selected an Id</h3>
                ) : !detail ? (
                    <h3>No data available</h3>
                ) : (
                    <div className='m-3'>
                        <div className='d-flex align-items-center justify-content-center mb-2'>
                            <div className='d-flex align-items-center justify-content-center ms-2'>
                                <img src={ src } alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                            </div>

                            <div className='d-flex align-items-center justify-content-center'>
                                <div>
                                    <h4 className='m-0'>{ detail.PatientName }</h4>
                                    <p className='fs-5 m-0'>{ selectedId }</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='d-lg-flex flex-md-colum justify-content-between'>
                                <p className='m-0'><DOP inputDate={ detail.DateOfBirth } /></p>
                                <p className='text-muted m-0'><AgeCalculator dateOfBirth={ detail.DateOfBirth } /> years</p>
                            </div>

                            <div className='d-lg-flex flex-md-colum justify-content-between'>
                                <p className='text-muted m-0 me-2 fs-7'>{ detail.Address }</p>
                                <p className='m-0 fs-7'>{ detail.PhoneNo }</p>
                            </div>

                        </div>

                        <hr />

                        <div className='d-flex justify-content-between my-0 py-0'>
                            <p className='m-0'>Age</p>
                            <p className='text-success m-0 fw-bold'><AgeCalculator dateOfBirth={ detail.DateOfBirth } /> years</p>
                        </div>
                        <div className='d-flex justify-content-between my-0 py-0'>
                            <p className='m-0'>Gender</p>
                            <p className='m-0 fw-bold'>{ detail.Gender }</p>
                        </div>
                        <div className='d-flex justify-content-between my-0 py-0'>
                            <p className='m-0'>Bloog group</p>
                            <p className='text-danger m-0 fw-bold'>{ detail.BloodGroup }</p>
                        </div>
                        <div className='d-flex justify-content-between my-0 py-0'>
                            <p className='m-0'>Allergy</p>
                            <p className='text-primary m-0 fw-bold'>No</p>
                        </div>

                        <h5 className='mt-2'>Special Disease</h5>
                        <div style={ scroll }><p className='text-muted m-0'>"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.</p></div>
                        <button className='btn w-100 text-white shadow my-3 btn-gr' onClick={ toggleModal } >Medical Records</button>
                    </div>
                ) }
            </div>
            <MedModal show={ showModal } onHide={ () => setShowModal( false ) } id={ selectedId } />
        </>
    );
}