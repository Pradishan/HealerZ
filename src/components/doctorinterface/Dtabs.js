import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestPage from './pages/TestPage.js';
import EmailPage from './pages/EmailPage.js';
import MedicalPage from './pages/MedicalPage.js';

export default function Dtabs ( props )
{
  const { selectedId } = props;
  const [ id, setId ] = useState( false );
  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        if ( selectedId )
        {
          const response = await axios.post( 'http://localhost/HealerZ/PHP/patient/getPatient.php', {
            patient_ID: selectedId,
          } );
          setId( response.data[ 0 ] );
          // console.log(response.data[ 0 ]);
        } else
        {
          // Handle the case when selectedId is falsy (null or empty)
          setId( false ); // or setId(false) if you prefer
        }
      } catch ( error )
      {
        console.error( 'Error fetching data:', error );
        setId( false ); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [ selectedId ] );

  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className={ `nav-item ${ ( id ) ? 'nav-hover' : '' }` } role="presentation">
          <button className={ `nav-link text-dark ${ ( id ) ? 'active' : 'disabled' }` } id="test-tab" data-bs-toggle="tab" data-bs-target="#test-tab-pane" type="button" role="tab" aria-controls="test-tab-pane" aria-selected="true"><p className='m-0'>Test</p></button>
        </li>
        <li className={ `nav-item ${ ( id ) ? 'nav-hover' : '' }` } role="presentation">
          <button className={ `nav-link text-dark ${ ( id ) ? '' : 'disabled' }` } id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"><p className='m-0'>Email</p></button>
        </li>
        <li className="nav-item nav-hover" role="presentation">
          <button className={ `nav-link text-dark ${ ( id ) ? '' : 'active' }` } id="medical-tab" data-bs-toggle="tab" data-bs-target="#medical-tab-pane" type="button" role="tab" aria-controls="medical-tab-pane" aria-selected="false"><p className='m-0'>Medical</p></button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        { ( id ) ?
          <div className="tab-pane fade show active" id="test-tab-pane" role="tabpanel" aria-labelledby="test-tab" tabIndex="0"><TestPage selectedId={ selectedId } /></div> : null }
        { ( id ) ?
          <div className="tab-pane fade" id="email-tab-pane" role="tabpanel" aria-labelledby="email-tab" tabIndex="0"><EmailPage selectedId={ selectedId } /></div> : null }
        <div className={ `tab-pane fade ${ ( id ) ? '' : 'show active' }` } id="medical-tab-pane" role="tabpanel" aria-labelledby="medical-tab" tabIndex="0"><MedicalPage /></div>
      </div>
    </>
  )
}
