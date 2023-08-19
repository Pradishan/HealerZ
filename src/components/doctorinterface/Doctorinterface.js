import React from "react";
import FeatherIcon from 'feather-icons-react';
import Dnav from "./Dnav";
import './doctor.css';
import Usercard from "./Usercard";
import Dtabs from "./Dtabs";
import CurrentTime from "./CurrentTime";

export default function Doctorinterface() {
  const timeLeft = {
    position: 'absolute',
    top:'6rem',
    right: '2rem',
  }
  return (<>
    <Dnav />
    <div className="row mt-5">
      <div className="col-3 m-3 mt-4" >
        <div className="mt-3 me-0">
          {/* search */}
          <div className='bg-white rounded shadow p-3' style={{minWidth: '230px'}}>
                <div className='input-group-text bg-gray border-0 rounded-pill' width='200px'>
                    <input type='text' className='form-control rounded-pill border-0 bg-gray' placeholder='Search ID' id='serarchId' />
                    <FeatherIcon icon="search" className='mx-2 text-muted icon-btn' type='button' />
                </div>
            </div>
        </div>
        <div className="my-3 me-0">
          <Usercard src={'https://source.unsplash.com/random/2'} />
        </div>
      </div>

      {/* {main tap} */}
      <div className="col-8 m-3 mt-5" >
          <div style={timeLeft}><CurrentTime /></div>
        <Dtabs />
      </div>
    </div>
  </>);
}
