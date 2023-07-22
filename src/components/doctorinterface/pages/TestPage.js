import React from 'react';
import FeatherIcon from 'feather-icons-react';
import CurrentTime from '../CurrentTime';

export default function TestPage() {
  return (
    <>
      <div className='bg-white p-3 rounded m-0 '>
        <div className='row p-2'>
          <div className='col-6'>
            <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea1" style={{ height: '100px' }}></textarea>
              <label htmlFor="floatingTextarea2">Patient complain</label>
            </div>
          </div>
          <div className='col-6'>
            <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
              <label htmlFor="floatingTextarea2">On examination</label>
            </div>
          </div>
        </div>
        <div className='row p-2'>
          <div className='col-6'>
            <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea3" style={{ height: '100px' }}></textarea>
              <label htmlFor="floatingTextarea2">Tests</label>
            </div>
          </div>
          <div className='col-6'>
            <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea4" style={{ height: '100px' }}></textarea>
              <label htmlFor="floatingTextarea2">Confirmed diagnosis</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='d-flex align-items-center justify-content-between'>
              <h5 className='mt-2'>Prescription</h5>
              <div className='d-flex align-items-center'>
                <div className='input-group-text bg-gray border-0 rounded-pill'>
                  <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search Drug' id='searchDrug' />
                  <FeatherIcon icon="plus-circle" className='me-2 text-success' type='button' />
                </div>
              </div>
              <div className='d-md-none d-lg-flex align-items-center'>
                <p className='m-0 fw-bold mx-1'>Sharoon</p>|<p className='text-success m-0 fw-bold mx-1'>22 years</p> | <p className='text-primary m-0 fw-bold mx-1'>Male</p> | <div className='mx-1'><CurrentTime /></div>
              </div>
            </div>
            <div className='m-2'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td className='d-flex justify-content-end'><FeatherIcon icon="trash-2" className='me-2 text-danger' type='button' /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <p className='m-0'>DR.V.K.Pradishan MBBS</p>
              <button className='btn w-25 text-white shadow btn-gr'>Done</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
