import React from 'react';
import FeatherIcon from 'feather-icons-react';

export default function MedicalPage() {
  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='mt-2'>Medical Request</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Request'id='requestSearch' />
              <FeatherIcon icon="search" className='me-2 text-muted' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */}
        <table className="table table-hover px-2">
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
          <tbody>
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
      </div>
    </>
  )
}
