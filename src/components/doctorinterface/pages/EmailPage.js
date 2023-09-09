import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import cloud from '../../../assets/icons8-error-cloud.gif';
import Demail from '../Demail';
import MedicalRecords from '../utilites/MedicalRecords';

export default function EmailPage ( props )
{
  const [ records, setRecords ] = useState( [] );
  const { selectedId } = props;

  const fetchData = useCallback( async () =>
  {
    if ( selectedId )
    { // Only fetch data if selectedId is not empty
      try
      {
        const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadMedicalReport.php', { patient_ID: selectedId } );
        setRecords( response.data );
        // console.log( response.data );
      } catch ( error )
      {
        console.error( 'Error fetching data:', error );
      }
    } else
    {
      setRecords( [] );
    }
  }, [ selectedId ] );

  useEffect( () =>
  {
    fetchData();
    const fetchInterval = setInterval( fetchData, 2000 ); // Fetch data every 1 seconds
    return () => clearInterval( fetchInterval ); // Clean up the interval on unmount
  }, [ fetchData ] );

  return (
    <>
      <div className='bg-white p-3 rounded'>
        <div className='d-flex align-items-center justify-content-between m-2'>
          <h5 className='mt-2'>Medical Records</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Records' id='searchRecord' />
              <FeatherIcon icon="search" className='mx-2 text-muted icon-btn' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */ }
        <div className={ "table-container border-0 shadow-none mt-2" } style={ { maxHeight: '30vh', overflow: 'auto', } }>
          <table className="table table-hover" style={ { minWidth: '900px', } }>
            <thead className='top-0 position-sticky bg-white' style={ { zIndex: 1, } }>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Patient complain</th>
                <th scope="col">On examination  </th>
                <th scope="col">Tests</th>
                <th scope="col">Dignosis</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody >
              { Array.isArray( records ) ? (
                records.map( ( records ) =>
                {
                  return <MedicalRecords date={ records.DateandTime } complain={ records.Patientcomplaint } examination={ records.OnExamination } tests={ records.Tests } diagnosis={ records.Confirmeddiagnosis } prescription={ records.Prescription_ID } />;
                } ) ) : (
                <tr>
                  <div className='d-flex justify-content-center align-items-center m-0 p-1'>
                    <img src={ cloud } className='m-0 p-1' height="50px" alt="select" />
                    <span className='m-0 p-1'> No Medical records to display.</span>
                  </div>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>

        {/* Email */ }
        <Demail />

        <div className='d-flex justify-content-between align-items-center m-2'>
          <p className='m-0'>DR.V.K.Pradishan MBBS</p>
          <button className='btn w-25 text-white shadow btn-gr'>Send</button>
        </div>
      </div>
    </>
  )
}
