import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from '../assets/banner.png'
import "./SimpleSlider.css"; // custom styles

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const images = [
    Banner1,
    Banner1,
    Banner1,
  ];

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img className="slider-image" src={img} alt={`Slide ${index + 1}`} loading="lazy"/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
