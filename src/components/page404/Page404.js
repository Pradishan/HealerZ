import React from 'react';
import img from '../../assets/Error-404.svg';

export default function Page404() {
  return (
      <>
            <div className="row justify-content-center align-items-center" style={{"height": "100vh"}}>
                <div className="col-md-4">
                  <img src={img} alt='error 404' className='fluid'/>
                </div>
            </div>
      </>
  )
}
