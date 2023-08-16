import React from 'react'
import './Hteam.css'
import nusnan from '../../assets/nusnan.jpeg'

const Hteam = () => {
  return (
    < div className="container text-center mu-auto teamele">
      <h3 className="title"> Team Members</h3>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
        <img src={nusnan} class="card-img-top img" style={{width:"8rem",height:"8rem"}} alt="..."/>
     </div>
  )
}

export default Hteam