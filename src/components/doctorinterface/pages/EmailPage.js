import React from 'react';
import FeatherIcon from 'feather-icons-react';
import Demail from '../Demail';
import MedicalRecords from '../utilites/MedicalRecords';

let drugList = [];
drugList.length = 10;
export default function EmailPage() {
  let medicalRecords = [];
  for (let i = 0; i < 20; i++) {
    medicalRecords.push({
      date: '26-12-2013',
      complain: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
      examination: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
      tests: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
      diagnosis: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
      prescription: '"Technophobia Virus" or "Technophobia Syndrome": This fictional disease is often portrayed in comedic settings where individuals exhibit an irrational fear or aversion to technology. It can lead to humorous situations as characters struggle to cope with modern devices and advancements.',
    })
  }
  return (
    <>
      <div className='bg-white p-3 rounded'>
        <div className='d-flex align-items-center justify-content-between m-2'>
          <h5 className='mt-2'>Medical Records</h5>
          <div className='d-flex align-items-center'>
            <div className='input-group-text bg-gray border-0 rounded-pill'>
              <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Records' id='searchRecord' />
              <FeatherIcon icon="search" className='mx-2 text-muted icon-btn' type='button' />
            </div>
          </div>
        </div>

        {/* tabele */}
        <div className={"table-container border-0 shadow-none mt-2"} style={{ maxHeight:'30vh',overflow: 'auto', }}>
          <table className="table table-hover" style={{ minWidth: '900px', }}>
            <thead className='top-0 position-sticky' style={{ zIndex: 1, }}>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Patient complain</th>
                <th scope="col">On examination  </th>
                <th scope="col">Tests</th>
                <th scope="col">Dignosis</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody >
              {
                medicalRecords.map((record) => {
                  return <MedicalRecords date={record.date} complain={record.complain} examination={record.examination} tests={record.tests} diagnosis={record.tests} prescription={record.prescription} />;
                })
              }
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
