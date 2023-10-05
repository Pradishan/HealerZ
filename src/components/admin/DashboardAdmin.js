import React, { useEffect, useRef } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "./Admin.css";
// import nusnan from "../../assets/nusnan.jpg";
// import pradi from "../../assets/pradi.jpg";
// import thanu from "../../assets/thanu.jpg";
// import powsi from "../../assets/Powsi.jpg";
// import farhath from "../../assets/farhath.jpg";
// import jana from "../../assets/jana.jpg";
// import joshi from "../../assets/joshi.jpg";
import BarChart from "./additional/Barchart";


export default function DashboardAdmin() {

  return (
    <AdminLayout>
      <div className="barchartcontainer">
      <BarChart/>
      </div>
      
      {/* <div className="container text-center mu-auto teamele teaaaaam">
        <h3 className="serhett">MEET OUR TEAM</h3>
        <img src={nusnan} className="card-img-top img" alt="..." />
        <img src={pradi} className="card-img-top img" alt="..." />
        <img src={thanu} className="card-img-top img" alt="..." />
        <img src={powsi} className="card-img-top img" alt="..." />
        <img src={farhath} className="card-img-top img" alt="..." />
        <img src={jana} className="card-img-top img" alt="..." />
        <img src={joshi} className="card-img-top img" alt="..." />
      </div> */}
    </AdminLayout>
  );
}
