import React from 'react';

export default function MedicalRecords(props) {
    const date = props.date;
    const complain = props.complain;
    const examination = props.examination;
    const tests = props.tests;
    const diagnosis = props.diagnosis;
    return (
        <>
            <tr>
                <td style={{ minWidth: '100px', }}>{date}</td>
                <td className='text-truncate' style={{ maxWidth: '150px', }}>{complain}</td>
                <td className='text-truncate' style={{ maxWidth: '150px', }}>{examination}</td>
                <td className='text-truncate' style={{ maxWidth: '150px', }}>{tests}</td>
                <td className='text-truncate' style={{ maxWidth: '150px', }}>{diagnosis}</td>
                <td className='text-center'><button className='btn text-white btn-gr p-1'>Prescription</button></td>
                <td className='text-center'><button className='btn text-white btn-gr p-1'>View</button></td>
            </tr>
        </>
    )
}
