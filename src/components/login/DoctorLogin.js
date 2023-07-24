import React from 'react';
import logo from '../../assets/logo.png'

export default function DoctorLogin() {

    return (
        <>
            
            <div className="container mt-5 text-center">
            <img src={logo} alt="avatar" height='100px' className='mb-3' />
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card border-0 shadow">
                            <div className="card-header bg-white text-center">
                                <h3>Login As Doctor</h3>
                            </div>
                            <div className="card-body">
                                <form action='/Doctor' className='py-2'>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    <div className='text-center'>
                                        <button type='submit' className='btn text-white shadow btn-gr mt-3 w-100' style={{ background: 'linear-gradient(90deg, rgba(75, 20, 141, 1) 0%, rgba(224, 64, 253, 1) 100%)', }}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
