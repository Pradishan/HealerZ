import React from 'react';
import FeatherIcon from 'feather-icons-react';

const scrollMedTable = {
  maxHeight: '10rem',
  overflowY: 'auto'
}

export default function EmailPage() {
  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        Email Page
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='mt-2'>Prescription</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Drug' />
              <FeatherIcon icon="search" className='me-2 text-muted' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */}
        <table class="table table-hover px-2">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">DATE</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody style={scrollMedTable}>
            <tr className=''>
              <td>cst20001</td>
              <td>Mark</td>
              <td>26-12-2013</td>
              <td>Technophobia Virus" or "Technophobia Syndrome"</td>
              <td>requested</td>
              <td><button className='btn text-white shadow btn-gr p-1'>View</button></td>
            </tr>
            <tr className=''>
              <td>cst20001</td>
              <td>Mark</td>
              <td>26-12-2013</td>
              <td>Technophobia Virus" or "Technophobia Syndrome"</td>
              <td>requested</td>
              <td><button className='btn text-white shadow btn-gr p-1'>View</button></td>
            </tr>
            <tr className=''>
              <td>cst20001</td>
              <td>Mark</td>
              <td>26-12-2013</td>
              <td>Technophobia Virus" or "Technophobia Syndrome"</td>
              <td>requested</td>
              <td><button className='btn text-white shadow btn-gr p-1'>View</button></td>
            </tr>
            <tr className=''>
              <td>cst20001</td>
              <td>Mark</td>
              <td>26-12-2013</td>
              <td>Technophobia Virus" or "Technophobia Syndrome"</td>
              <td>requested</td>
              <td><button className='btn text-white shadow btn-gr p-1'>View</button></td>
            </tr>
            <tr className=''>
              <td>cst20001</td>
              <td>Mark</td>
              <td>26-12-2013</td>
              <td>Technophobia Virus" or "Technophobia Syndrome"</td>
              <td>requested</td>
              <td><button className='btn text-white shadow btn-gr p-1'>View</button></td>
            </tr>
          </tbody>
        </table>
        <div className='d-flex align-items-center'>
          <h5 className='m-2'>Email</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Receptionists' />
              <FeatherIcon icon="at-sign" className='me-2 text-muted'/>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='m-0'>DR.V.K.Pradishan MBBS</p>
          <button className='btn w-25 text-white shadow btn-gr'>Send</button>
        </div>
      </div>
    </>
  )
}
