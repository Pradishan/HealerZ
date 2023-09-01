import React,{useState} from 'react';
import { Modal } from "react-bootstrap";
import Status from '../algorithms/Status';

export default function MedRequestModal(props) {
  const { show, onHide, data } = props;

  const{status,setStaus} = useState(data.status);

  return (
    <>
      <Modal size='lg' show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Medical Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-6'>
              <div className='d-flex align-items-center justify-content-center mb-2'>
                <div className='d-flex align-items-center justify-content-center ms-2'>
                  <img src={"https://source.unsplash.com/random/2"} alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                  <div>
                    <h4 className='m-0'>FirstName</h4>
                    <p className='fs-5 m-0'>cst20001</p>
                  </div>
                </div>
              </div>
              <div>
                <div className='d-lg-flex flex-md-colum justify-content-between'>
                  <p className='m-0'>31 Aug 2000</p>
                  <p className='text-muted m-0'>22 years</p>
                </div>

                <div className='d-lg-flex flex-md-colum justify-content-between'>
                  <p className='text-muted m-0 me-2 fs-7'>No31 newyork ,Sri Lanka</p>
                  <p className='m-0 fs-7'>0704470004</p>
                </div>

              </div>

            </div>

            <div className='col-6 ms-0 ps-0'>
              <div className='d-flex'>
                <div className='pe-3' style={{ borderLeft: '1px solid gray', height: '10rem', }}></div>

                <div>
                  <h5>Request</h5>
                  <div className='d-lg-flex flex-md-colum justify-content-between'>
                    <p className='m-0 me-3'>Consulted Date</p>
                    <p className='m-0 fw-bold'>{data.date}</p>
                  </div>
                  {/* <MedRecordModal /> */}
                  <div className='d-lg-flex flex-md-colum justify-content-between'>
                    <p className='m-0'>Duration</p>
                    <p className='m-0 fw-bold'>{data.duration} {data.duration === 1 ? 'day' : 'days'}</p>
                  </div>
                  <div className='d-lg-flex flex-md-colum align-items-center justify-content-between mt-2'>
                    <p className='m-0 me-4'>Status</p>
                    <Status primary={'Requested'} success={'Approved'} danger={'Rejected'} status={status} />
                  </div>

                  <div className="btn-group mt-1" role="group" aria-label="Basic radio toggle button group">

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
                    <label className="btn btn-outline-success" for="btnradio1">Approve</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                    <label className="btn btn-outline-danger" for="btnradio2">Reject</label>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4>Description</h4>
          <p style={{ maxHeight: '10rem', overflow: 'auto', }}>{data.description}</p>

          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" id="messaagefromdoctor" style={{ height: '100px' }}></textarea>
            <label htmlFor="floatingTextarea2">Message</label>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <img src='https://source.unsplash.com/random/1' alt="avatar" height='38px' width='38px' className='rounded-circle me-2' />
              <p className='m-0'>DR.V.K.Pradishan MBBS</p>
            </div>
            <button className='btn text-white shadow my-3 btn-gr' onClick={onHide} >Done</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
