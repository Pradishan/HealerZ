import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import DateTime from '../algorithms/DateTime';
import Status from '../algorithms/Status';
import cloud from '../../../assets/icons8-error-cloud.gif';
import MedRequestModal from '../utilites/MedRequestModal';
import userDefault from '../../../assets/avatar.svg'


function calculateDateDuration ( startDateStr, endDateStr )
{
  const startDate = new Date( startDateStr );
  const endDate = new Date( endDateStr );

  const timeDifference = endDate - startDate;
  const daysDifference = timeDifference / ( 1000 * 3600 * 24 );

  return Math.abs( daysDifference );
}


export default function MedicalPage ()
{

  const [ records, setRecords ] = useState( [] );
  const [ showModal, setShowModal ] = useState( false );
  const [ selectedData, setSelectedData ] = useState( null );
  const [ searchName, setSearchName ] = useState( "" );
  const [ searchID, setSearchID ] = useState( "" );
  const [ searchStatus, setSearchStatus ] = useState( "" );
  const [ filteredMedical, setFilteredMedical ] = useState( [] );


  const fetchData = useCallback( async () =>
  {
    try
    {
      const response = await axios.post( 'http://localhost/HealerZ/PHP/patient/loadMedicalRequest.php' );
      const updatedRecords = response.data.map( record =>
      {
        if ( record.Profile && record.ProfileType )
        {
          const image = new Image();
          image.src = `data:${ record.ProfileType };base64,${ record.Profile }`;
          return { ...record, profilepic: image.src };
        }
        return { ...record, profilepic: userDefault };
      } );
      setRecords( updatedRecords );
      // console.log( response.data );

    } catch ( error )
    {
      console.error( 'Error fetching data:', error );
    }
  }, [] );

  useEffect( () =>
  {
    fetchData();
    const fetchInterval = setInterval( fetchData, 2000 );
    return () => clearInterval( fetchInterval );
  }, [ fetchData ] );

  const handleSearchName = ( event ) =>
  {
    setSearchName( event.target.value );
  };

  const handleSearchID = ( event ) =>
  {
    setSearchID( event.target.value );
  };

  const handleSearchStatus = ( event ) =>
  {
    setSearchStatus( event.target.value );
  };

  useEffect( () =>
  {
    const filteredData = records.filter(
      ( record ) =>
        record.State.includes( searchStatus ) && record.PatientName.toLowerCase().includes( searchName.toLowerCase() ) && record.Patient_ID.toLowerCase().includes( searchID.toLowerCase() )
    );
    setFilteredMedical( filteredData );
  }, [ searchStatus, searchName, searchID, records ] );

  const openModal = ( data ) =>
  {
    setSelectedData( data );
    setShowModal( true );
  };
  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='mt-2'>Medical Request</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search by name' id='requestSearchNAME    ' value={ searchName } onChange={ handleSearchName } />
              <FeatherIcon icon="search" className='mx-2 text-muted icon-btn' type='button' />
            </div>
          </div>

          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search by ID' id='requestSearchID' value={ searchID } onChange={ handleSearchID } />
              <FeatherIcon icon="search" className='mx-2 text-muted icon-btn' type='button' />
            </div>
          </div>

          <div className='d-flex align-items-center'>
            <select id='statusfilter' className="form-select rounded-pill border-0 bg-gray" aria-label="Default select example" value={ searchStatus } onChange={ handleSearchStatus }>
              <option defaultValue="">All</option>
              <option value="Requested">Requested</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button className='mx-2 p-1 btn rounded-pill icon-btn' onClick={ () => { setSearchName( '' ); setSearchID( '' ); setSearchStatus( '' ); } }><FeatherIcon icon="rotate-ccw" className='text-success m-0 p-0' /></button>
        </div>




        {/* tabele */ }
        <div className={ "table-container border-0 shadow-none mt-2" } style={ { overflow: 'auto', } }>
          <table className="table table-hover px-2" style={ { minWidth: '800px', } }>
            <thead className='top-0 position-sticky' style={ { zIndex: 1, } }>
              <tr className='bg-white'>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              { Array.isArray( filteredMedical ) && filteredMedical.length > 0 ? (
                filteredMedical.map( ( record ) => (
                  <tr className="" key={ record.MedicalRequest_ID }>
                    <td>{ record.Patient_ID }</td>
                    <td> <img src={ record.profilepic } alt='avatar' className='rounded-circle me-2' width='25px' height='25px' />{ record.PatientName }</td>
                    <td style={ { minWidth: '100px' } }>
                      <DateTime dateTime={ record.ConsultationDate } />
                    </td>
                    <td className='text-center'>  { record.StartDate && record.EndDate ? (
                      `${ calculateDateDuration( record.StartDate, record.EndDate ) } ${ calculateDateDuration( record.StartDate, record.EndDate ) > 1
                        ? 'days'
                        : 'day'
                      }`
                    ) : (
                      'N/A'
                    ) }</td>
                    <td className='text-truncate' style={ { maxWidth: '200px' } }>
                      { record.Message }
                    </td>
                    <td><Status status={ record.State } /></td>
                    <td className='text-center'>
                      <button className='btn text-white btn-gr p-1' onClick={ () => openModal( { 'Request_ID': record.MedicalRequest_ID, 'patient_ID': record.Patient_ID, 'Doctor_ID': sessionStorage.getItem( "employeeID" ) } ) } >View</button>
                    </td>
                  </tr>
                ) )
              ) : (
                <tr>
                  <td>
                    <div className='d-flex justify-content-center align-items-center m-0 p-1'>
                      <img src={ cloud } className='m-0 p-1' height="50px" alt="select" />
                      <span className='m-0 p-1'>No Medical records to display.</span>
                    </div>
                  </td>
                </tr>
              ) }
            </tbody>
          </table>
          {
            selectedData ? ( <MedRequestModal show={ showModal } onHide={ () => setShowModal( false ) } data={ selectedData } /> ) : ( null )
          }
        </div>
      </div >
    </>
  )
}
