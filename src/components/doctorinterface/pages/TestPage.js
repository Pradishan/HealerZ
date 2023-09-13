import React, { useState } from 'react';
import axios from "axios";
import CurrentTime from '../CurrentTime';
import Drug from '../Drug';
import DrugDisplay from '../DrugDisplay';
import { ToastContainer, toast } from 'react-toastify';

export default function TestPage ( props )
{
  const { selectedId } = props;

  const [ formData, setFormData ] = useState( {
    patient_ID: selectedId,
    doctor_ID: 'D001',
    patientcomplaint: '',
    onExamination: '',
    tests: '',
    confirmeddiagnosis: ''
  } );

  // console.log(selectedId);
  formData.patient_ID = selectedId;
  // console.log(formData.patient_ID);
  const [ done, setDone ] = useState( false )
  const handleSubmit = ( e ) =>
  {

    e.preventDefault();

    if ( formData.patientcomplaint === '' || formData.patientcomplaint === null )
    {

      toast.error( "Pls Enter the patient complaint" );
    } else if ( formData.onExamination === '' || formData.onExamination === null )
    {

      toast.error( "Pls Enter the on Examination" );

    }
    else if ( formData.tests === '' || formData.tests === null )
    {

      toast.error( "Pls Enter the tests" );

    }
    else if ( formData.confirmeddiagnosis === '' || formData.confirmeddiagnosis === null )
    {

      toast.error( "Pls Enter the confirmed diagnosis" );

    } else
    {

      axios.post( 'http://localhost/HealerZ/PHP/doctor/addMedicalReport.php', formData )
        .then( ( response ) =>
        {
          console.log( 'Data send successfully!', response.data );
          // console.log( formData );
          if ( response.data.success )
          {
            toast.success( response.data.message );
            setDone( false );
            setFormData( {
              patient_ID: selectedId,
              doctor_ID: 'D001',
              patientcomplaint: '',
              onExamination: '',
              tests: '',
              confirmeddiagnosis: ''
            } );
          } else
          {
            toast.error( response.data.message );
          }

          // You can do further actions or show success messages here.
        } )
        .catch( ( error ) =>
        {
          console.error( 'Error adding data:', error );
          toast.error( 'error' );
          // Handle errors or show error messages here.
        } );
    }
  };

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setDone( true );
    setFormData( ( prevFormData ) => ( {
      ...prevFormData,
      [ name ]: value,
    } ) );
  };

  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <form onSubmit={ handleSubmit }>
          <div className='row p-2'>
            <div className='col-6'>
              <div className="form-floating">
                <input type="hidden" name="patient_ID" value={ selectedId } onChange={ handleChange } />
                <textarea className="form-control" placeholder="Leave a comment here" name='patientcomplaint' value={ formData.patientcomplaint } onChange={ handleChange } id="floatingTextarea1" style={ { height: '100px' } }></textarea>
                <label htmlFor="floatingTextarea2">Patient complain</label>
              </div>
            </div>
            <div className='col-6'>
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" name='onExamination' value={ formData.onExamination } onChange={ handleChange } id="floatingTextarea2" style={ { height: '100px' } }></textarea>
                <label htmlFor="floatingTextarea2">On examination</label>
              </div>
            </div>
          </div>
          <div className='row p-2'>
            <div className='col-6'>
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" name='tests' value={ formData.tests } onChange={ handleChange } id="floatingTextarea3" style={ { height: '100px' } }></textarea>
                <label htmlFor="floatingTextarea2">Tests</label>
              </div>
            </div>
            <div className='col-6'>
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" name='confirmeddiagnosis' value={ formData.confirmeddiagnosis } onChange={ handleChange } id="floatingTextarea4" style={ { height: '100px' } }></textarea>
                <label htmlFor="floatingTextarea2">Confirmed diagnosis</label>
              </div>
            </div>
          </div>
          {/* <div className='d-flex justify-content-center align-items-center py-2'>
            <button className='btn w-25 text-white shadow btn-gr' type='submit'>Add medical</button>
          </div> */}
          { done ? ( <div className='d-flex justify-content-center align-items-center py-2'>
            <button className='btn w-25 text-white shadow btn-gr' type='submit'>Done</button>
          </div>
          ) : null }
        </form >
        <div className='row'>
          <div className='col'>
            <div className='d-flex align-items-center justify-content-between'>
              <h5 className='mt-2'>Prescription</h5>
              <div className='d-flex align-items-center'>
                <Drug selectedId={ selectedId } />
              </div>
              <div className='d-md-none d-lg-flex align-items-center'>
                <div className='mx-1'><CurrentTime /></div>
              </div>
            </div>
            <div className='m-2'>
              <DrugDisplay selectedId={ selectedId } />
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <p className='m-0'>DR.V.K.Pradishan MBBS</p>

            </div>
          </div>
        </div>

      </div >
      <ToastContainer />
    </>
  )
}
