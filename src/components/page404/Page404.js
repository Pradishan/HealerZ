import React from 'react';
import logo from '../../assets/logo.png';
import img from '../../assets/Error-404.svg';

export default function Page404() {
  return (
      <>
        <div className="container mt-5 text-center">
            <div className="row justify-content-center mt-5 align-items-center">
              {/* <div className='col-md-8'>
              <img src={logo} alt="avatar" height='200px' className='mb-3 mt-5' />
              </div> */}
                <div className="col-md-4">
                  <img src={img} alt='error 404' className='fluid mt-3'/>
                </div>
            </div>
        </div>
      </>
  )
}
