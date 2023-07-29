import React from 'react';
import logo from '../../assets/logo.png';



const Carousel = () => {
    return (
          
    <div id="carouselExampleCaptions" className="carousel slide">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" className="active" aria-current="true"></button>
    </div>
    <div className="carousel-inner ">
      <div className="carousel-item">
      <img src={logo} alt="HealerZ" height={450} width="100%" />
        
      </div>
      <div className="carousel-item">
      <img src={logo} alt="HealerZ" height={450} width="100%" />
        
      </div>
      <div className="carousel-item active">
      <img src={logo} alt="HealerZ" height={450} width="100%" />
       
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  
    );
  };
  
  export default Carousel;
  