import React from 'react';
import { Modal } from "react-bootstrap";

export default function Dsettings(props) {
    const { show, onHide } = props;
    return (
        <>
            <Modal size='md' show={show} onHide={onHide} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='d-flex align-items-center justify-content-center mb-2'>
                        <div className='d-flex align-items-center justify-content-center ms-2'>
                            <img src={'https://source.unsplash.com/random/1'} alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                        </div>

                        <div className='d-flex align-items-center justify-content-center'>
                            <div>
                                <h4 className='m-0'>Pradishan</h4>
                                <p className='fs-5 m-0'>Pradishan@info.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="accordion accordion-flush" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#profile" aria-expanded="false" aria-controls="collapseOne">
                                    Change profile picture
                                </button>
                            </h2>
                            <div id="profile" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="input-group mb-3">
                                        <input type="file" className="form-control" id="inputGroupFile02" />
                                    </div>
                                    <button className='btn w-100 text-white shadow btn-gr'>Save</button>
                                </div>
                            </div>
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#password" aria-expanded="false" aria-controls="collapseOne">
                                    Change Password
                                </button>
                            </h2>
                            <div id="password" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label for="floatingInput">Current password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label for="floatingInput">New password</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingPassword">Confirm Password</label>
                                    </div>
                                    <button className='btn w-100 text-white shadow my-3 btn-gr'  >Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
