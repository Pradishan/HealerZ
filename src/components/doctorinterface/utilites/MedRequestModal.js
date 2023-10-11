import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Status from '../algorithms/Status';
import DateTime from '../algorithms/DateTime';
import userDefault from '../../../assets/userDefault.jpg'
import DOP from '../algorithms/DOB';
import AgeCalculator from '../algorithms/AgeCalculator';

function calculateDateDuration ( startDateStr, endDateStr )
{
  const startDate = new Date( startDateStr );
  const endDate = new Date( endDateStr );

  const timeDifference = endDate - startDate;
  const daysDifference = timeDifference / ( 1000 * 3600 * 24 );

  return Math.abs( daysDifference );
}


export default function MedRequestModal ( props )
{
  const { show, onHide, data } = props;

  const [ detail, setDetail ] = useState( {} );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await axios.post(
          'http://localhost/HealerZ/PHP/doctor/getMedicalRequest.php',
          {
            MedicalRequest_ID: data,
          }
        );
        setDetail( response.data[ 0 ] );
        // console.log(response.data[0]);
        // console.log(data);
      } catch ( error )
      {
        console.error( 'Error fetching data:', error );
      }
    };

    fetchData();
  }, [ data ] );

  return (
    <>
      <Modal size='lg' show={ show } onHide={ onHide } backdrop='static' keyboard={ false }>
        <Modal.Header closeButton>
          <Modal.Title>Medical Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-6'>
              <div className='d-flex align-items-center justify-content-center mb-2'>
                <div className='d-flex align-items-center justify-content-center ms-2'>
                  <img
                    src={ detail.Profile ? ( detail.Profile ) : ( userDefault ) }
                    alt='Avatar'
                    className='rounded-circle me-2'
                    width='100px'
                    height='100px'
                  />
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                  <div>
                    <h4 className='m-0'>{ detail.PatientName } </h4>
                    <p className='fs-5 m-0'>{ detail.Patient_ID }</p>
                    <p className='fs-7 m-0 text-primary'>{ detail.Email }</p>
                  </div>
                </div>
              </div>
              <div className='mx-4 px-4'>
                <div className='d-flex  justify-content-between'>
                  <p className='m-0'><DOP inputDate={ detail.DateOfBirth } /></p>
                  <p className='text-muted m-0'><AgeCalculator dateOfBirth={ detail.DateOfBirth } /> years</p>
                </div>

                <div className='d-flex justify-content-between'>
                  <p className='text-muted m-0 me-2 fs-7'>{ detail.Address }</p>
                  <p className='m-0 fs-7'>{ detail.PhoneNo }</p>
                </div>
                <div className='d-flex justify-content-between my-0 py-0'>
                  <p className='m-0'>Bloog group</p>
                  <p className='text-danger m-0 fw-bold'>{ detail.BloodGroup }</p>
                </div>
              </div>
            </div>

            <div className='col-6 ms-0 ps-0'>
              <div className='d-flex'>
                <div
                  className='pe-3'
                  style={ { borderLeft: '1px solid gray', height: '10rem' } }
                ></div>

                <div>
                  <h3>Request</h3>
                  <div className='d-flex justify-content-between'>
                    <p className='m-0 me-3'>Consulted Date</p>
                    <p className='m-0 fw-bold'>
                      <DateTime dateTime={ detail.ConsultationDate } />
                    </p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p className='m-0'>Duration</p>
                    <p className='m-0 fw-bold'>
                      { detail.StartDate && detail.EndDate ? (
                        `${ calculateDateDuration( detail.StartDate, detail.EndDate ) } ${ calculateDateDuration( detail.StartDate, detail.EndDate ) > 1
                          ? 'days'
                          : 'day'
                        }`
                      ) : (
                        'N/A'
                      ) }
                    </p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between mt-2'>
                    <p className='m-0 me-4'>Status</p>
                    <Status status={ detail.State } />
                  </div>

                  <div className='btn-group mt-1' role='group' aria-label='Basic radio toggle button group'>
                    <input type='radio' className='btn-check' name='btnradio' id='btnradio1' autoComplete='off' />
                    <label className='btn btn-outline-success' htmlFor='btnradio1'>
                      Approve
                    </label>

                    <input type='radio' className='btn-check' name='btnradio' id='btnradio2' autoComplete='off' />
                    <label className='btn btn-outline-danger' htmlFor='btnradio2'>
                      Reject
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4>Description</h4>
          <p style={ { maxHeight: '10rem', overflow: 'auto' } }>{ detail.description }</p>

          <div className='form-floating'>
            <textarea className='form-control' placeholder='Leave a comment here' id='messaagefromdoctor' style={ { height: '100px' } }></textarea>
            <label htmlFor='floatingTextarea2'>Message</label>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <img src='https://source.unsplash.com/random/1' alt='Avatar' height='38px' width='38px' className='rounded-circle me-2' />
              <p className='m-0'>DR.V.K.Pradishan MBBS</p>
            </div>
            <button className='btn text-white shadow my-3 btn-gr' onClick={ onHide }>
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
