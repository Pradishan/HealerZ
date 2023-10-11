import React from 'react'
import ClubLayout from '../../layouts/ClubLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CHvacciReg from './CHvacciReg';
import CHbloodReg from './CHbloodReg';
export default function Registration() {
  return (
    <ClubLayout>
      <div className="row" style={{padding:'50px',gap:'20px',}}>
      
         <div className="col-5">
             <CHvacciReg/>
             </div>
      <div className="col-5">
             <CHbloodReg/>
      </div>
      </div>     
          
    </ClubLayout>
  )
}
