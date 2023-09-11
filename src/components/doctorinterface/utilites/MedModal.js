import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import select from '../../../assets/icons8-select.gif';
import cloud from '../../../assets/icons8-error-cloud.gif';
import file from '../../../assets/icons8-file.gif';
import { Modal, Col, Nav, Row, Tab } from "react-bootstrap";
import DateTime from '../algorithms/DateTime';



export default function MedModal ( props )
{
    const { show, onHide, id } = props;
    const [ records, setRecords ] = useState( [] );

    const fetchData = useCallback( async () =>
    {
        try
        {
            const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadMedicalReport.php', { patient_ID: id } );
            setRecords( response.data );
        } catch ( error )
        {
            console.error( 'Error fetching data:', error );
        }
    }, [ id ] );

    useEffect( () =>
    {
        fetchData();
    }, [ fetchData ] );

    return (
        <Modal size='xl' show={ show } onHide={ onHide } backdrop="static" keyboard={ false }>
            <Modal.Header closeButton>
                <Modal.Title>Medical Records | { id }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={ 3 }>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item style={ { maxHeight: '70vh', overflowY: 'auto' } }>
                                    { Array.isArray( records ) ? ( records.map( ( record ) => (
                                        <Nav.Link eventKey={ record.MedicalRecord_ID }><DateTime dateTime={ record.DateandTime } /></Nav.Link>
                                    ) ) ) : (
                                        <div className='d-flex flex-column justify-content-center align-items-center mt-5 pt-5'>
                                            <img src={ file } height="50px" alt="select" />
                                            <br />
                                            <span className='ms-2'> No records to display.</span>
                                        </div>
                                    ) }
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={ 9 }>
                            <Tab.Content style={ { height: '70vh', overflowY: 'auto' } }>
                                { Array.isArray( records ) ? (
                                    <Tab.Pane eventKey="first">
                                        <div className='d-flex justify-content-center align-items-center mt-5 pt-5'>
                                            <img src={ select } height="50px" alt="select" />
                                            <span className='ms-2'> Select a date and time to see the previous Medical Record</span>
                                        </div>
                                    </Tab.Pane>
                                ) : null }
                                { Array.isArray( records ) ? ( records.map( ( record ) => (
                                    <Tab.Pane eventKey={ record.MedicalRecord_ID }>
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
                                    </Tab.Pane>
                                ) ) ) : (
                                    <div className='d-flex justify-content-center align-items-center mt-5 pt-5'>
                                        <img src={ cloud } height="50px" alt="select" />
                                        <span className='ms-2'> No records to display.</span>
                                    </div>
                                ) }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    );
}
