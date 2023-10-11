import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import FeatherIcon from 'feather-icons-react';

export default function PrescriptionDrug ( props )
{
    const { records } = props;
    const [ update, setUpdate ] = useState( false );
    const [ formData, setFormData ] = useState( {
        Prescription_list_ID: records.Prescription_list_ID,
        Patient_ID: records.Patient_ID,
        tds: records.TDS,
        days: records.Days,
        time: records.Time,
    } );


    const handleSubmit = ( e ) =>
    {

        e.preventDefault();

        if ( formData.tds === '' || formData.tds === null )
        {
            toast.error( "you cant lave empty TDS feald" );
        } else if ( formData.days === '' || formData.days === null )
        {
            toast.error( "you cant lave epmty Days feald" );
        } else if ( formData.time === '' || formData.time === null )
        {
            toast.error( "you cant lave epmty Time feald" );
        } else
        {

            axios.post( 'http://localhost/HealerZ/PHP/doctor/updateDrug.php', formData )
                .then( ( response ) =>
                {
                    console.log( 'Data send successfully!', response.data );
                    // console.log( formData );
                    if ( response.data.success )
                    {
                        toast.success( response.data.message );
                        setUpdate(false);
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
        setUpdate( true );
        setFormData( ( prevFormData ) => ( {
            ...prevFormData,
            [ name ]: value,
        } ) );
    };

    const handleDelete = ( e ) =>
    {
        e.preventDefault();
        axios.post( 'http://localhost/HealerZ/PHP/doctor/deleteDrug.php', { Prescription_list_ID: records.Prescription_list_ID } )
            .then( ( response ) =>
            {
                console.log( 'Data send successfully!', response.data );
                if ( response.data.success )
                {
                    toast.success( response.data.message );
                } else
                {
                    toast.error( response.data.message );
                }

            } )
            .catch( ( error ) =>
            {
                console.error( 'Error sending data:', error );

            } );
    }

    return (
        <tr>
            <div className='d-flex justify-content-between' >
                <div>
                    <div className='d-flex justify-content-between'>
                        <td><p className='p-1 mb-0 fw-bold '>{ records.Drug_Name }</p></td>
                        <td><p className='p-1 mb-0 ms-4'>{ records.Drug_dosage }</p></td>
                        <td><p className='p-1 mb-0 ms-4'>{ records.Category }</p></td>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div className='d-flex justify-content-between'>
                            <input className='form-control border-0' style={ { width: "150px" } } list="tdsOptions" id="tds" type="text" aria-label="TDS" placeholder='TDS' name="tds" value={ formData.tds } onChange={ handleChange } />

                            <datalist id="tdsOptions">
                                <option value="1+1+1">1+1+1</option>
                                <option value="1+0+1">1+0+1</option>
                                <option value="0+1+1">0+1+1</option>
                                <option value="1+0+0">1+0+0</option>
                                <option value="0+0+1">0+0+1</option>
                                <option value="0+1+0">0+1+0</option>
                                <option value="1+1+0">1+1+0</option>
                                <option value="when needed">when needed</option>
                            </datalist>
                            <p className='p-0 mb-0 ms-4'>tacke for <input className='border-0 text-center' style={ { width: "50px" } } id="Days" type="number" aria-label="Days" placeholder='Days' name="days" value={ formData.days } onChange={ handleChange } /> { formData.days>1?' days':" day" }</p>

                            <input className='ms-3 form-control border-0' style={ { width: "200px" } } list="timeOptions" id="time" type="text" aria-label="Time" placeholder='Time' name="time" value={ formData.time } onChange={ handleChange } />

                            <datalist id="timeOptions">
                                <option value="Atfer Meal">Atfer Meal</option>
                                <option value="Before Meal">Before Meal</option>
                                <option value="Any Time">Any Time</option>
                                <option value="Before Sleep">Before Sleep</option>
                                <option value="On empty stomach">On empty stomach</option>
                                <option value="when needed">when needed</option>
                            </datalist>
                            { update ? (
                                <button className='ms-5 p-1 btn btn-success' id="update" type='submit'>Update</button>
                            ) : null }

                        </div>
                    </form>
                </div>
                <div className='d-flex justify-content-between'>
                    <form onSubmit={ handleDelete }>
                        <button className='mx-2 p-1 btn rounded-pill icon-btn' id="delete" type='submit'><FeatherIcon icon="trash-2" className='text-danger m-0 p-0' type="button" /></button>
                    </form>
                </div>
            </div>
            <hr className='m-0 p-0' />
        </tr>
    )
}
