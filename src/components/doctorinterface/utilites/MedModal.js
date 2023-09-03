import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from "react-bootstrap";

export default function MedModal ( props )
{
    const { show, onHide, id } = props;
    const [ records, setRecords ] =  useState([]);

    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadMedicalReport.php', { patient_ID: id } );
                setRecords( response.data );
            } catch ( error )
            {
                console.error( 'Error fetching data:', error );
            }
        };
        fetchData();
    }, [ id ] ); 

    return (
        <Modal size='xl' show={ show } onHide={ onHide } backdrop="static" keyboard={ false }>
            <Modal.Header closeButton>
                <Modal.Title>Medical Records | {id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-3" style={ { maxHeight: '70vh', overflow: 'auto' } }>
                        <nav id="datenavbar" className="h-10 flex-column align-items-stretch pe-4 border-end">
                            <nav className="nav nav-pills flex-column">
                                { Array.isArray(records) ? (records.map( ( record ) => (
                                    <a key={ record.DateandTime } className={ `nav-link` } href={ `#${ record.DateandTime }` }>{ record.DateandTime }</a>
                                ) )) : (
                                    <p>No records to display.</p>
                                  ) }
                            </nav>
                        </nav>
                    </div>
                    <div className="col-9" style={ { maxHeight: '70vh', overflow: 'auto' } }>
                        <div data-bs-spy="scroll" data-bs-target="#datenavbar" data-bs-offset="0" className="scrollspy-example-2" tabIndex="0">
                            { Array.isArray(records) ? (records.map( ( record ) => (
                                <div key={ record.DateandTime } id={ record.DateandTime }>
                                    <p><span className='fw-bold'>Date : </span>{ record.DateandTime }</p>
                                    <h5>Patient complain</h5>
                                    <p>{ record.Patientcomplaint }</p>
                                    <h5>On examination</h5>
                                    <p>{ record.OnExamination }</p>
                                    <h5>Tests</h5>
                                    <p>{ record.Tests }</p>
                                    <h5>Diagnosis</h5>
                                    <p>{ record.Confirmeddiagnosis }</p>
                                    <h5>Prescription</h5>
                                    <p>{ record.Prescription_ID }</p>
                                    <hr />
                                </div>
                            ) )) : (
                                <p>No records to display.</p>
                              ) }
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
