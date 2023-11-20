import React, { useState, useEffect } from 'react';
import MedModal from './utilites/MedModal';
import axios from 'axios';
import DOP from './algorithms/DOB';
import AgeCalculator from './algorithms/AgeCalculator';
import select from '../../assets/icons8-select.gif';
import user from '../../assets/icons8-user.gif';
import Loader from '../Loader';
import userDefault from '../../assets/avatar.svg'

export default function Usercard ( props )
{
    const { selectedId } = props;
    const width = {
        minWidth: '230px',
    };
    const scroll = {
        maxHeight: '10vh',
        overflowY: 'auto',
    };

    const [ profilepic, setprofilepic ] = useState( userDefault );
    const [ showModal, setShowModal ] = useState( false );
    const [ detail, setDetail ] = useState( null ); // Initialize detail as null initially
    const [ loading, setLoading ] = useState( true ); // Added loading state

    const toggleModal = () =>
    {
        setShowModal( !showModal );
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
                const response = await axios.post( 'http://localhost/HealerZ/PHP/patient/getPatient.php', {
                    patient_ID: selectedId,
                } );
                setDetail( response.data[ 0 ] );
                setLoading( false );
                if ( response.data[ 0 ].Profile )
                {
                    convertBase64ProfileImage(
                        response.data[ 0 ].Profile,
                        response.data[ 0 ].ProfileType
                    );
                } else
                {
                    setprofilepic( userDefault );
                }

            } catch ( error )
            {
                console.error( 'Error fetching data:', error );
                setLoading( false ); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, [ selectedId ] ); // Updated dependency to selectedId

    const convertBase64ProfileImage = ( base64, type ) =>
    {
        const image = new Image();
        image.src = `data:${ type };base64,${ base64 }`;
        image.onload = () =>
        {
            setprofilepic( image.src );
        };
    };

    return (
        <>
            <div className='bg-white shadow rounded p-2' style={ width }>
                { loading ? (
                    <Loader load={ true } />
                ) : !selectedId ? (
                    <div className='d-flex justify-content-center align-items-center my-5 py-5'>
                        <img src={ select } height="50px" alt="select" />
                        <span className='ms-2'> Select a patientID</span>
                    </div>
                ) : !detail ? (
                    <div className='d-flex justify-content-center align-items-center my-5 py-5'>
                        <img src={ user } height="50px" alt="select" />
                        <span className='ms-2'> Patient not found </span>
                    </div>
                ) : (
                    <div className='m-3'>
                        <div className='d-flex align-items-center justify-content-center mb-2'>
                            <div className='d-flex align-items-center justify-content-center ms-2'>
                                <img src={ profilepic } alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                            </div>

                            <div className='d-flex align-items-center justify-content-center'>
                                <div>
                                    <h4 className='m-0'>{ detail.PatientName }</h4>
                                    <p className='fs-5 m-0'>{ selectedId }</p>
                                    <p className='fs-7 m-0 text-primary'>{ detail.Email }</p>
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


                        <h5 className='mt-2'>Special Disease</h5>
                        <div style={ scroll }>{ detail.SpecialDisease ? ( <p className='text-muted m-0'>{ detail.SpecialDisease }</p> ) : <p className='text-muted m-0'>No Special Disease to show </p> }</div>
                        <button className='btn w-100 text-white shadow my-3 btn-gr' onClick={ toggleModal } >Medical Records</button>
                    </div>
                ) }
            </div>
            <MedModal show={ showModal } onHide={ () => setShowModal( false ) } id={ selectedId } />
        </>
    );
}