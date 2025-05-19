import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,             // Enables automatic sliding
    autoplaySpeed: 2400
  };
  return (
    <Slider {...settings}>
      <div>
        <img src="https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000" alt="slik" />
      </div>
      <div>
        <img src="https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000" alt="slik" />
      </div>
      <div>
        <img src="https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000" alt="slik" />
      </div>
      <div>
        <img src="https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000" alt="slik" />
      </div>
      <div>
        <img src="https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000" alt="slik" />
      </div>
      <div>
        <img src="https://www.funcorp.in/cdn/shop/files/Funcorp-Summer-Sale-3.1.jpg?v=1746452706&width=2000" alt="slik" />
      </div>
    </Slider>
  );
}