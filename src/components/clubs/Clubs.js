import React from 'react';
import ClubLayout from '../../layouts/ClubLayout';
import Eventslider from './Eventslider';
import '../admin/Admin.css';
import EventIncome from "./EventIncome";

export default function Clubs() {



  return (
     <ClubLayout>
        <div className="summarycatcont" style={{marginTop:'50px'}}>
          <div className="catbarchartt">
            <EventIncome />
          </div>
        </div>

        <div className="col d-flex justify-content-center" >
        <Eventslider/>
        </div>
    
     </ClubLayout>

  )
}
