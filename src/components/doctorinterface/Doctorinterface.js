import React, { useState, useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';
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
  const [selectedId, setSelectedId] = useState("");
  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadPatientList.php');
        setIds( response.data );
        // console.log( response.data );
      } catch ( error )
      {
        console.error( 'Error fetching data:', error );
      }
    };

    fetchData();
  } );

  const handleOptionSelect = (event) => {
    setSelectedId(event.target.value);
  };

  return ( <>
    <Dnav />
    <div className="row mt-5">
      <div className="col-3 m-3 mt-4" >
        <div className="mt-3 me-0">
          {/* search */ }
          <div className='bg-white rounded shadow p-3' style={ { minWidth: '230px' } }>
            <form className="d-flex" role="search">
              <div className='input-group-text bg-gray border-0 rounded-pill'>
                <input className='form-control rounded-pill border-0 bg-gray' list="datalistOptions" id="medDataList" type="search" aria-label="Search" placeholder='Search Paient ID' onChange={handleOptionSelect} />
                {/* <FeatherIcon icon="plus-circle" className='mx-2 text-success icon-btn' type="submit" /> */}
              </div>
              <datalist id="datalistOptions" className="bg-white text-muted">
              {Array.isArray(ids) ? (
                ids.map( ( id ) =>
                {
                  return <option value={id.Patient_ID} />;
                } )) : (
                  <option value="No IDs to display." />
                )
              }
              </datalist>
            </form>
          </div>
        </div>
        <div className="my-3 me-0">
          <Usercard src={ 'https://source.unsplash.com/random/2' } selectedId={selectedId} />
        </div>
      </div>

      {/* {main tap} */ }
      <div className="col-8 m-3 mt-5" >
        <div style={ timeLeft }><CurrentTime /></div>
        <Dtabs />
      </div>
    </div>
  </> );
}
