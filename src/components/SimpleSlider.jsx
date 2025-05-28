import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    "https://cdn.vectorstock.com/i/500p/08/36/happy-kids-standing-behind-the-bushes-in-paper-cut-vector-41930836.jpg",
    "https://cdn.vectorstock.com/i/500p/08/36/happy-kids-standing-behind-the-bushes-in-paper-cut-vector-41930836.jpg",
    "https://cdn.vectorstock.com/i/500p/08/36/happy-kids-standing-behind-the-bushes-in-paper-cut-vector-41930836.jpg",
    "https://cdn.vectorstock.com/i/500p/08/36/happy-kids-standing-behind-the-bushes-in-paper-cut-vector-41930836.jpg",
  ];

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img className="slider-image" src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
