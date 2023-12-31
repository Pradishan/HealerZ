import React, { useState, useEffect, useCallback } from 'react';
import Dnav from "./Dnav";
import './doctor.css';
import Usercard from "./Usercard";
import Dtabs from "./Dtabs";
import CurrentTime from "./CurrentTime";
import axios from 'axios';

export default function Doctorinterface ()
{
  const timeLeft = {
    position: 'absolute',
    top: '6rem',
    right: '2rem',
  }

  const [ ids, setIds ] = useState( [] );
  const [ selectedId, setSelectedId ] = useState( "" );

  const fetchData = useCallback( async () =>
  {
    try
    {
      const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadPatientList.php' );
      setIds( response.data );
      // console.log( response.data );
    } catch ( error )
    {
      console.error( 'Error fetching data:', error );
    }
  }, [] );

  useEffect( () =>
  {
    fetchData();
  }, [ fetchData ] );

  const handleOptionSelect = ( event ) =>
  {
    setSelectedId( event.target.value );
  };

  return (
    <>
      <Dnav />
      <div className="row mt-5">
        <div className="col-3 m-3 mt-4">
          <div className="mt-3 me-0">
            <div className='bg-white rounded shadow p-3'>
              <form className="d-flex justify-content-center" role="search" onSubmit={(e) => e.preventDefault()}>
                <div className='input-group-text bg-gray border-0 rounded-pill w-100'>
                  <input className='form-control form-control-lg rounded-pill border-0 bg-gray w-100' list="datalistOptions" id="patDataList" type="search" aria-label="Search" placeholder='Search Paient ID' onChange={ handleOptionSelect } />
                </div>
                <datalist id="datalistOptions">
                  { Array.isArray( ids ) ? (
                    ids.map( ( id ) =>
                    {
                      return <option key={id.Patient_ID} value={ id.Patient_ID } />;
                    } )
                  ) : (
                    <option value="No IDs to display." />
                  ) }
                </datalist>
              </form>
            </div>
          </div>
          <div className="my-3 me-0">
            <Usercard selectedId={ selectedId } />
          </div>
        </div>

        <div className="col-8 m-3 mt-5">
          <div style={ timeLeft }><CurrentTime /></div>
          <Dtabs selectedId = {selectedId} />
        </div>
      </div>
    </>
  );
}
