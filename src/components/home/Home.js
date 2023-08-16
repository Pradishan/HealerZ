import React from 'react';
import Hnav from './Hnav';
import Hfooter from './Hfooter';
import Carousel from './Carousel';
import Hcard from './Hcard';
import Hteam from './Hteam';
import logo from '../../assets/logo.png';
import { Icon } from '@iconify/react';



export default function Home() {
  return (
    <div>
       <div className='navigationH'>
         <Hnav/>
        </div>
        <div className='slider p-3'>
        <Carousel/>
        </div>

        <div className='Services' id='services'>
          <div className="container text-center mt-2">
            <h2 >OUR SERVICES</h2>
        <div className="row mt-2 align-items-start">
          <div className="col">
          <Icon icon="uil:file-medical" color="#3c4048" width="120" />
          <h4> Medical Service Management</h4>
           </div>
        <div className="col">
        <Icon icon="carbon:event" color="#3c4048" width="120" />
        <h4> Club Event Management </h4>
         </div>
        <div className="col">
        <Icon icon="wpf:doctors-bag" color="#3c4048" width="120" />
        <h4> Doctor-Patient Collaboration </h4>
        </div>
      </div>
        </div>
   </div>


   <div className="container" id='aboutus'>
     <div class="row mt-5 p-5 row1">
      <div class="col">
      <img src={logo} alt="HealerZ" height='250px' /> 
      </div>
     <div class="col">
      <h2> About us</h2>
       <p> The mission is to create a user-friendly University medical system that connects individuals with care,
          streamlines medical requests, enhances communication, and fosters community. 
          The team focuses on healthcare accessibility and efficiency through technology-assisted systems.
           Connecting Health and Care offers a platform for medical services, 
           allowing users to request and download approved reports, doctors to access patient details, and administrators to manage events and donations</p>
       </div>
      </div> 
    </div>
    <div className="team">
      <Hteam/>
    </div>

    <div className="events">
      <Hcard/>
    </div>
      <div  className="Hfooter bottom">
        <Hfooter/>
      </div>
  </div>
  )
}
