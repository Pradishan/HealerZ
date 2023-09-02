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
      duration: Math.floor(Math.random() * 7) + 1,// Random status between 1 and 7
      description:'"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
      status: Math.floor(Math.random() * 3) + 1, // Random status between 1 and 3
    });
  }

  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <div className='d-flex align-items-center justify-content-between'>
          <h5 className='mt-2'>Medical Request</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Request' id='requestSearch' />
              <FeatherIcon icon="search" className='mx-2 text-muted icon-btn' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */}
        <div className={"table-container border-0 shadow-none mt-2"} style={{overflow: 'auto',}}>
        <table className="table table-hover px-2" style={{minWidth: '800px',}}>
          <thead className='top-0 position-sticky' style={{zIndex:1,}}>
            <tr className='bg-white'>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Duration</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              medRequests.map((requs)=>(<MedicalRequest id={requs.id} name={requs.name} date={requs.date} duration={requs.duration} description={requs.description} status={requs.status} />
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
