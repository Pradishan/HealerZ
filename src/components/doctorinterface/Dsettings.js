import React from 'react';
import { Modal, Accordion } from "react-bootstrap";

export default function Dsettings ( props )
{
    const { show, onHide } = props;
    return (
        <>
            <Modal size='md' show={ show } onHide={ onHide } backdrop="static" keyboard={ false }>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='d-flex align-items-center justify-content-center mb-2'>
                        <div className='d-flex align-items-center justify-content-center ms-2'>
                            <img src={ 'https://source.unsplash.com/random/1' } alt='avatar' className='rounded-circle me-2' width='100px' height='100px' />
                        </div>

                        <div className='d-flex align-items-center justify-content-center'>
                            <div>
                                <h4 className='m-0'>Pradishan</h4>
                                <p className='fs-5 m-0'>Pradishan@info.com</p>
                            </div>
                        </div>
                    </div>

                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Change profile picture</Accordion.Header>
                            <Accordion.Body>
                                <div className="form-floating mb-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" />
                                </div>
                                <button className='btn w-100 text-white shadow btn-gr' >
                                    Update Profile
                                </button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Change Password</Accordion.Header>
                            <Accordion.Body>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword1" placeholder="name@example.com" />
                                    <label htmlFor="floatingPassword1">Current password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword2" placeholder="name@example.com" />
                                    <label htmlFor="floatingPassword2">New password</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword3" placeholder="Password" />
                                    <label htmlFor="floatingPassword3">Confirm Password</label>
                                </div>
                                <button className='btn w-100 text-white shadow my-3 btn-gr'  >Change Password</button>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </Modal.Body>
            </Modal>
        </>
    )
}
