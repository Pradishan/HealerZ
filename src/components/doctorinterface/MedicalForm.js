import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';


export default function MedicalForm (props)
{
    const { selectedId,time } = props;

    const [ formData, setFormData ] = useState( {
        patient_ID: selectedId,
        doctor_ID: sessionStorage.getItem("employeeID"),
        dateandTime: time,
        patientcomplaint: '',
        onExamination: '',
        tests: '',
        confirmeddiagnosis: '',
        prescription_ID: null,
    } );

    // console.log(selectedId);
    formData.patient_ID = selectedId;
    // console.log(formData.patient_ID);

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
                            patient_ID: selectedId,
                            doctor_ID: sessionStorage.getItem("employeeID"),
                            dateandTime: time,
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
            <div className='d-flex justify-content-center align-items-center py-2'>
                <button className='btn w-25 text-white shadow btn-gr' type='submit'>Add medical</button>
            </div>
        </form>
    )
}
