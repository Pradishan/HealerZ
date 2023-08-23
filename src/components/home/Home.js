import React, { useState } from 'react';
import Hnav from './Hnav';
import Carousel from './Carousel';
import Hcard from './Hcard';
import Hteam from './Hteam';
import logo from '../../assets/logo.png';
import { Icon } from '@iconify/react';
import './Home.css';



export default function Home() {
  const [showTeam, setShowTeam] = useState(false);

  const Teammem = () => {
    setShowTeam(!showTeam); // Toggle the visibility of the team section
  }
  return (
    <div>
      <div className='navigationH'>
        <Hnav />
      </div>
      <div className='slider p-3'>
        <Carousel />
      </div>

      
      <div className='services' id='services'>
      <h1 className='serhed'>Healerz</h1>
     
        <div className="container text-center mt-2">
          
          <h1 className='serhed'>OUR SERVICES</h1>
          <div className="container text-center mt-2 contgap1">
            <div className="row  cardcontainer1">
              <div className="col">
                <div className="card cardWrap1">
                  <Icon icon="uil:file-medical" color="#3c4048" width="100" className='iconn' />
                  <h4> Medical Service Management</h4>
                </div>
              </div>
              <div className="col">
                <div className="card cardWrap1">
                  <Icon icon="carbon:event" color="#3c4048" width="100" className='iconn' />
                  <h4> Club Event Management </h4>
                </div>
              </div>
              <div className="col">
                <div className="card cardWrap1">
                  <Icon icon="wpf:doctors-bag" color="#3c4048" width="100" className='iconn' />
                  <h4> Doctor-Patient Collaboration </h4>
                </div>
              </div>
             
            </div>
           
          </div>
        </div>
      </div>
      
     

      <div className="container" id='aboutus'>
        <div class="row mt-5 p-5 row1">
          <div class="col">
            <img src={logo} alt="HealerZ" height='200px' style={{ marginTop: '180px' }} />
          </div>
          <div class="col">
            <h2 className='serhed'> ABOUT US</h2>
            <p> The mission is to create a user-friendly University medical system that connects individuals with care,
              streamlines medical requests, enhances communication, and fosters community.
              The team focuses on healthcare accessibility and efficiency through technology-assisted systems.
              Connecting Health and Care offers a platform for medical services,
              allowing users to request and download approved reports, doctors to access patient details, and administrators to manage events and donations</p>
            <hr />
            <button className='btn btn-primary w-100' onClick={Teammem}>Meet Our Team</button>
          </div>

          <div className="team">
            {showTeam && <Hteam onClose={Teammem} />}
          </div>
        </div>
      </div>
    

      <div className="events">
        <Hcard />
      </div>

      <div className="Hfooter bottom">
      <footer bgColor='light' className='text-center text-lg-left'>
          <div className='text-center p-3' style={{ backgroundColor: '#fff' }}>
          <a className='text-dark' href='https://HealerZ.com/'>
          <img src={logo} alt="HealerZ" height='30px' />
           </a>
            &copy; {new Date().getFullYear()} Copyright. All rights reserved.{' '}
            
          </div>
        </footer>
      </div>
    </div>
  )
}
