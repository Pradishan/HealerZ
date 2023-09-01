import React, { useState } from 'react';
import axios from "axios";
import FeatherIcon from 'feather-icons-react';
import CurrentTime from '../CurrentTime';
import { ToastContainer, toast } from 'react-toastify';

// Get the current date and time
const currentDate = new Date();

// Format the date (YYYY-MM-DD HH:mm:ss format)
const formattedDate = currentDate.toISOString().slice( 0, 19 ).replace( 'T', ' ' );

export default function TestPage ()
{

  const [ formData, setFormData ] = useState( {
    patient_ID: 'cst20001',
    doctor_ID: 'D001',
    dateandTime: formattedDate,
    patientcomplaint: '',
    onExamination: '',
    tests: '',
    confirmeddiagnosis: '',
    prescription_ID: null,
  } );

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
          console.log( formData );
          if ( response.data.success )
          {
            toast.success( response.data.message );
            setFormData( {
              patient_ID: 'cst20001',
              doctor_ID: 'D001',
              dateandTime: formattedDate,
              patientcomplaint: '',
              onExamination: '',
              tests: '',
              confirmeddiagnosis: '',
              prescription_ID: null,
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
          // toast.error('error');
          // Handle errors or show error messages here.
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
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <form onSubmit={ handleSubmit }>
          <div className='row p-2'>
            <div className='col-6'>
              <div className="form-floating">
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
          <div className='d-flex justify-content-center align-items-center py-2'>
            <button className='btn w-25 text-white shadow btn-gr' type='submit'>Add medical</button>
          </div>
        </form>
        <div className='row'>
          <div className='col'>
            <div className='d-flex align-items-center justify-content-between'>
              <h5 className='mt-2'>Prescription</h5>
              <div className='d-flex align-items-center'>

                <form className="d-flex" role="search">
                  <div className='input-group-text bg-gray border-0 rounded-pill'>
                    <input className='form-control rounded-pill border-0 bg-gray' list="datalistOptions" id="medDataList" type="search" aria-label="Search" placeholder='Search Drug' />
                    <FeatherIcon icon="plus-circle" className='mx-2 text-success icon-btn' type="submit" />
                  </div>
                  <datalist id="datalistOptions" className="bg-white text-muted">
                    <option value="Software Engeneer" />
                    <option value="Data Scientist" />
                    <option value="QA Engeneer" />
                    <option value="HR" />
                    <option value="Developer" />
                  </datalist>
                </form>
                
              </div>
              <div className='d-md-none d-lg-flex align-items-center'>
                <p className='m-0 fw-bold mx-1'>Sharoon</p>|<p className='text-success m-0 fw-bold mx-1'>22 years</p> | <p className='text-primary m-0 fw-bold mx-1'>Male</p> | <div className='mx-1'><CurrentTime /></div>
              </div>
            </div>
            <div className='m-2'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td className='d-flex justify-content-end'><FeatherIcon icon="trash-2" className='me-2 text-danger icon-btn' type='button' /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <p className='m-0'>DR.V.K.Pradishan MBBS</p>
              <button className='btn w-25 text-white shadow btn-gr' type='submit'>Done</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
