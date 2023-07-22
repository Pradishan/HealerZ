import React from 'react';
import FeatherIcon from 'feather-icons-react';
import Demail from '../Demail';

const scrollMedTable = {
  maxHeight: '10rem',
  overflowY: 'auto'
}
let drugList = [];
drugList.length = 10;
export default function EmailPage() {
  return (
    <>
      <div className='bg-white p-3 rounded'>
        <div className='d-flex align-items-center justify-content-between m-2'>
          <h5 className='mt-2'>Medical Records</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Records' id='searchRecord' />
              <FeatherIcon icon="search" className='me-2 text-muted' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */}
        <div className={"table-container border-0 shadow-none mt-2"} style={{overflow: 'scroll',}}>
          <table className="table table-hover" style={{minWidth: '900px',}}>
            <thead className='top-0 position-sticky h-45' style={{zIndex:1,}}>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">DATE</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody >
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
        </div>

        {/* Email */}
        <Demail />

        <div className='d-flex justify-content-between align-items-center m-2'>
          <p className='m-0'>DR.V.K.Pradishan MBBS</p>
          <button className='btn w-25 text-white shadow btn-gr'>Send</button>
        </div>
      </div>
    </>
  )
}
