import React from 'react';
import FeatherIcon from 'feather-icons-react';
import MedicalRequest from '../utilites/MedicalRequest';

export default function MedicalPage() {

  const medRequests = [];

  for (let i = 0; i < 20; i++) {
    medRequests.push({
      id:`cst200${i}`,
      name:`Name${i}`,
      date:'26-12-2013',
      description:'Technophobia Virus" or "Technophobia Syndrome"',
      status: Math.floor(Math.random() * 3) + 1, // Random status between 1 and 3
    });
  }

  const scroll = {
    overflowY: 'scroll',
    maxHeight: '10vh',
}

  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='mt-2'>Medical Request</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Request' id='requestSearch' />
              <FeatherIcon icon="search" className='me-2 text-muted' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */}
        <div className={"table-container border-0 shadow-none mt-2"} style={{overflow: 'auto',}}>
        <table className="table table-hover px-2" style={{minWidth: '800px',}}>
          <thead className='top-0 position-sticky h-70' style={{zIndex:1,}}>
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
            {
              medRequests.map((requs)=>(<MedicalRequest id={requs.id} name={requs.name} date={requs.date} description={requs.description} status={requs.status} />
                )
              )
            }
          </tbody>
        </table>
        </div>
      </div>
    </>
  )
}
