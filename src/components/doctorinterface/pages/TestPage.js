import React, { useState } from 'react';
import CurrentTime from '../CurrentTime';
import Drug from '../Drug';
import MedicalForm from '../MedicalForm';
import DrugDisplay from '../DrugDisplay';
import { ToastContainer } from 'react-toastify';

// Get the current date and time
const currentDate = new Date();

// Get individual date and time components
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to the month as it's zero-based
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Format the date (YYYY-MM-DD HH:mm:ss format)
const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 

export default function TestPage (props)
{
  const { selectedId } = props;

  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
       <MedicalForm selectedId={ selectedId } time={ time } />
        <div className='row'>
          <div className='col'>
            <div className='d-flex align-items-center justify-content-between'>
              <h5 className='mt-2'>Prescription</h5>
              <div className='d-flex align-items-center'>
                <Drug selectedId={ selectedId } />
              </div>
              <div className='d-md-none d-lg-flex align-items-center'>
                <p className='m-0 fw-bold mx-1'>Sharoon</p>|<p className='text-success m-0 fw-bold mx-1'>22 years</p> | <p className='text-primary m-0 fw-bold mx-1'>Male</p> | <div className='mx-1'><CurrentTime /></div>
              </div>
            </div>
            <div className='m-2'>
              <DrugDisplay selectedId={ selectedId } />
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
