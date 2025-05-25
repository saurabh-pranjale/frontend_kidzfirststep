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
    "https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000",
    "https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000",
    "https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000",
    "https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000",
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
