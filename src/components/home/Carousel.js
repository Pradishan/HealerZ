import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  
  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % slides.length);
  };

  useEffect(() => {
    Axios.get('http://localhost/Healerz/PHP/club/sliderget.php')
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
    
    const intervalId = setInterval(nextSlide, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [activeSlide]);

  return (
    <div id="carouselExampleCaptions" className="carousel slide" style={{ marginTop: '70px' }}>
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            aria-label={`Slide ${index + 1}`}
            className={index === activeSlide ? 'active' : ''}
            aria-current={index === activeSlide}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item${index === activeSlide ? ' active' : ''}`}>
            <img src={`data:image/png;base64,${slide}`} alt="HealerZ" style={{ width: '100%' }} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <FeatherIcon icon="chevron-left" className="carousel-control-iconnn" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <FeatherIcon icon="chevron-right" className="carousel-control-iconnn" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

