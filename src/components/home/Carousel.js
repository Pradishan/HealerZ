import React from 'react';
import slider1 from '../../assets/slider1.png';
import slider2 from '../../assets/slider2.png';
import slider3 from '../../assets/slider3.png';
import slider4 from '../../assets/slider4.png';
import FeatherIcon from 'feather-icons-react';



const Carousel = () => {
    return (
          
    <div id="carouselExampleCaptions" className="carousel slide" style={{marginTop:'70px'}}>
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" className="" ></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 3" className="" ></button>
    </div>
    <div className="carousel-inner ">
      <div className="carousel-item active">
      <img src={slider1} alt="HealerZ"  width="100%" />
        
      </div>
      <div className="carousel-item">
      <img src={slider2} alt="HealerZ"  width="100%" />
        
      </div>
      <div className="carousel-item">
      <img src={slider3} alt="HealerZ"  width="100%" />
       
      </div>
      <div className="carousel-item">
      <img src={slider4} alt="HealerZ"  width="100%" />
       
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <FeatherIcon icon="chevron-left" className="carousel-control-iconnn"/>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <FeatherIcon icon="chevron-right"  className="carousel-control-iconnn"/>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  
    );
  };
  
  export default Carousel;
  