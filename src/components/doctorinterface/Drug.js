import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import FeatherIcon from 'feather-icons-react';
import { toast } from 'react-toastify';

export default function Drug ( props )
{
    const { selectedId } = props;
    const [ drugs, setDrugs ] = useState( [] );


    const fetchData = useCallback( async () =>
    {
        try
        {
            const response = await axios.post( 'http://localhost/HealerZ/PHP/doctor/loadDrugs.php' );
            setDrugs( response.data );
            // console.log( response.data );
        } catch ( error )
        {
            console.error( 'Error fetching data:', error );
        }
    }, [] );

    useEffect( () =>
    {
        fetchData();
    }, [ fetchData ] );



    const [ formData, setFormData ] = useState( {
        patient_ID: selectedId,
        drug: "",
        doctor_ID: 'D001',
    } );

    formData.patient_ID = selectedId;

    const handleSubmit1 = ( e ) =>
    {

        e.preventDefault();

        if ( formData.drug === '' || formData.drug === null )
        {
            toast.error( "Please Select a drug" );
        } else
        {
            axios.post( 'http://localhost/HealerZ/PHP/doctor/addDrug.php', formData )
                .then( ( response ) =>
                {
                    // console.log( 'Data send successfully!', response.data );
                    // console.log( formData );
                    if ( response.data.success1 )
                    {
                        toast.success( response.data.message );
                        console.log( formData );
                        setFormData( {
                            patient_ID: selectedId,
                            drug: "",
                            doctor_ID: 'D001',
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

        <form className="d-flex" role="search" onSubmit={ handleSubmit1 }>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
                <input className='form-control rounded-pill border-0 bg-gray' list="drugsOptions" id="medDataList" type="search" aria-label="Search" placeholder='Search Drug' name="drug" value={ formData.drug } onChange={ handleChange } />
                <button className='mx-2 p-1 btn rounded-pill icon-btn' type='submit'><FeatherIcon icon="plus-circle" className='text-success m-0 p-0' /></button>
            </div>
            <datalist id="drugsOptions" className="bg-white text-muted" style={ { maxHeight: '10rem' } }>
                { Array.isArray( drugs ) ? (
                    drugs.map( ( drug ) =>
                    {
                        return <option value={ drug.Drug_Name } />;
                    } )
                ) : (
                    <option value="No Drugs to display." />
                ) }
            </datalist>
        </form>
    )
}
