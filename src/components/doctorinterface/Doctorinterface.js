import React from "react";
import Dnav from "./Dnav";
import './doctor.css';
import Dsearch from "./Dsearch";
import Usercard from "./Usercard";

export default function Doctorinterface() {
  
  return (<>
    <Dnav />
    <div className="row">
      <div className="col-3 m-3 vh-100 fixed-top mt-5" >
        <div className="mt-5">
        {/* search */}
        <Dsearch />
        </div>
        <div className="my-3">
          <Usercard src={'https://source.unsplash.com/random/2'} />;
        </div>


      </div>
    </div>
  </>);
}
