import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import add from '../../assets/icons8-add.gif';
import PrescriptionDrug from './utilites/PrescriptionDrug';

export default function DrugDisplay(props) {

    const [ records, setRecords ] = useState( [] );
    const { selectedId } = props;

    const fetchData = useCallback( async () =>
  {
    if ( selectedId )
    { // Only fetch data if selectedId is not empty
      try
      {
        const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadDrugList.php', { patient_ID: selectedId } );
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
    const fetchInterval = setInterval( fetchData, 500 ); // Fetch data every 1 seconds
    return () => clearInterval( fetchInterval ); // Clean up the interval on unmount
  }, [ fetchData ] );

  return (
    <table className="table table-hover">
    <tbody>
    { Array.isArray( records ) ? (
                records.map( ( records ) =>
                {
                  return <PrescriptionDrug records = {records} />;
                } ) ) : (
                <div className='d-flex justify-content-center align-items-center m-0 p-1'>
                  <img src={ add } className='m-0 p-1' height="50px" alt="select" />
                  <span className='m-0 p-1'> Add drugs </span>
                </div>
              )
              }
    </tbody>
  </table>
  )
}
