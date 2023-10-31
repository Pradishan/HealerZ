import React from 'react'
import ClubLayout from '../../layouts/ClubLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CEReg from './CEReg';
export default function Registration() {
  return (
    <ClubLayout>
      <div className="row" style={{marginLeft:'200px',padding:'20px',gap:'70px',}}>
      
         <div className="col-5">
             <CEReg/>
       </div>     
      </div>    
    </ClubLayout>
  )
}
