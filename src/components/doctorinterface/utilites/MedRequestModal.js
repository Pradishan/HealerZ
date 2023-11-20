import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Status from '../algorithms/Status';
import DateTime from '../algorithms/DateTime';
import userDefault from '../../../assets/avatar.svg';
import DOP from '../algorithms/DOB';
import AgeCalculator from '../algorithms/AgeCalculator';
import { toast } from 'react-toastify';

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
  const [ profilepic, setprofilepic ] = useState( userDefault );
  const [ detail, setDetail ] = useState( {} );
  const [ temp, setTemp ] = useState( {} );
  const [ formData, setFormData ] = useState( {
    Request_ID: data.Request_ID,
    patient_ID: data.patient_ID,
    Doctor_ID: data.Doctor_ID,
    startDate: '',
    endDate: '',
    Message: '',
    status: '',
    Doctor_name: '',
    Patient_Name: '',
  } );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await axios.post(
          'http://localhost/HealerZ/PHP/patient/getMedicalRequest.php',
          {
            MedicalRequest_ID: data.Request_ID,
          }
        );
        setDetail( response.data[ 0 ] );
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
      }
    };

    fetchData();
  }, [ data ] );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await axios.post(
          'http://localhost/HealerZ/PHP/doctor/getMedicalcertificate.php',
          {
            Request_ID: data.Request_ID,
            patient_ID: data.patient_ID,
            Doctor_ID: data.Doctor_ID,
          }
        );
        setTemp( response.data );
        // console.log( response.data );
        setFormData( {
          Request_ID: data.Request_ID,
          patient_ID: data.patient_ID,
          Doctor_ID: data.Doctor_ID,
          startDate: response.data.StartDate,
          endDate: response.data.EndDate,
          Message: response.data.Message,
          status: response.data.State,
          Doctor_name: response.data.Doctor_name,
          Patient_Name: response.data.Patient_Name,
        } );
      } catch ( error )
      {
        console.error( 'Error fetching data:', error );
      }
    };

    fetchData();
  }, [ data ] );

  const convertBase64ProfileImage = ( base64, type ) =>
  {
    const image = new Image();
    image.src = `data:${ type };base64,${ base64 }`;
    image.onload = () =>
    {
      setprofilepic( image.src );
    };
  };

  const handleRequest = ( e ) =>
  {
    e.preventDefault();

    if ( formData.Message === '' || formData.Message === null )
    {
      toast.error( "You can't leave the Message field empty" );
    } else if ( formData.startDate === '' || formData.startDate === null )
    {
      toast.error( "You can't leave the Start Date field empty" );
    } else if ( formData.endDate === '' || formData.endDate === null )
    {
      toast.error( "You can't leave the End Date field empty" );
    } else if ( formData.status === '' || formData.status === 'Requested' )
    {
      toast.error( 'Please select a status' );
    } else
    {
      axios
        .put( 'http://localhost/HealerZ/PHP/doctor/handleRequest.php', formData )
        .then( ( response ) =>
        {
          console.log( 'Data sent successfully!', response.data );
          if ( response.data.success )
          {
            toast.success( response.data.message );
            onHide();
          } else
          {
            toast.error( response.data.message );
          }
        } )
        .catch( ( error ) =>
        {
          console.log( formData );
          console.error( 'Error adding data:', error );
          toast.error( 'Error' );
        } );
    }
  };

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setFormData( ( prevFormData ) => ( {
      ...prevFormData,
      [ name ]: value,
    } ) );
  };

  return (
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
                  src={ profilepic ? profilepic : userDefault }
                  alt='Avatar'
                  className='rounded-circle me-2'
                  width='100px'
                  height='100px'
                />
              </div>

              <div className='d-flex align-items-center justify-content-center'>
                <div>
                  <h4 className='m-0'>{ detail.PatientName }</h4>
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
                <p className='m-0'>Blood group</p>
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
                <div className='d-flex align-items-center justify-content-between mt-2'>
                  <p className='m-0 me-4 fw-bold'>Message</p>
                </div>
                <div className='d-flex align-items-center justify-content-between mt-0'>
                  <p style={ { maxHeight: '10rem', maxWidth: '30rem', overflow: 'auto' } }>{ detail.Message }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <form onSubmit={ handleRequest }>
          <p>
            I, { temp.Doctor_name } (doctor)<br />
            hereby certify that : { temp.Patient_Name }<br />
            is unfit for work
            <div className="d-flex align-items-center">
              from
              <input
                className="ms-3 form-control border-0"
                style={ { width: "9rem" } }
                type="date"
                name="startDate"
                value={ formData.startDate }
                onChange={ handleChange }
              />
              to
              <input
                className="ms-3 form-control border-0"
                style={ { width: "9rem" } }
                type="date"
                name="endDate"
                value={ formData.endDate }
                onChange={ handleChange }
              />
            </div>
          </p>
          <div>
            <div className="d-flex">
              <p className="me-3">State:</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="Requested"
                  value="Requested"
                  checked={ formData.status === 'Requested' }
                  onChange={ handleChange }
                  disabled
                />
                <label className="form-check-label" htmlFor="Requested">
                  Requested
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="Approved"
                  value="Approved"
                  checked={ formData.status === 'Approved' }
                  onChange={ handleChange }
                />
                <label className="form-check-label" htmlFor="Approved">
                  Approved
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="Rejected"
                  value="Rejected"
                  checked={ formData.status === 'Rejected' }
                  onChange={ handleChange }
                />
                <label className="form-check-label" htmlFor="Rejected">
                  Rejected
                </label>
              </div>
            </div>
          </div>

          <h4> (Description) because of :</h4>
          <div className='form-floating'>
            <textarea className='form-control' placeholder='Leave a comment here' name='Message' id='messagefromdoctor' style={ { height: '100px' } } value={ formData.Message } onChange={ handleChange }></textarea>
            <label htmlFor='messagefromdoctor'>Message</label>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <img src='https://source.unsplash.com/random/1' alt='Avatar' height='38px' width='38px' className='rounded-circle me-2' />
              <p className='m-0'>DR.V.K.Pradishan MBBS</p>
            </div>
            <button className="btn text-white shadow my-3 btn-gr" type="submit">
              Done
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
