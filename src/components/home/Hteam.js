import React from 'react';
import './Hteam.css';
import nusnan from '../../assets/nusnan.jpg';
import powsi from '../../assets/Powsi.jpg';
import thanu from '../../assets/thanu.jpg';
import pradi from '../../assets/pradi.jpg';
import farhath from '../../assets/farhath.jpg';
import jana from '../../assets/jana.jpg';
import joshi from '../../assets/joshi.jpg';

const Hteam = () => {
  return (
    < div className="container text-center mu-auto teamele">
      <h3 className='serhed'> Team Members</h3>
        <img src={nusnan} class="card-img-top img" alt="..."/>
        <img src={pradi} class="card-img-top img" alt="..."/>
        <img src={thanu} class="card-img-top img" alt="..."/>
        <img src={powsi} class="card-img-top img"  alt="..."/>
        <img src={farhath} class="card-img-top img" alt="..."/>
        <img src={jana} class="card-img-top img" alt="..."/>
        <img src={joshi} class="card-img-top img" alt="..."/>
     </div>
  )
}

export default Hteam