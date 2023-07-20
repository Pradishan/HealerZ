import React from "react";
import Dnav from "./Dnav";
import './doctor.css';
import Dsearch from "./Dsearch";
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
          <Dsearch />
        </div>
        <div className="my-3 scrollable-column">
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
