import React, { useState, useEffect, useRef } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./slider-animations.css";
import "./styles.css";

const content = [
  {
    title: "Vulputate Mollis Ultricies Fermentum Parturient",
    description:
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
    button: "Read More",
    image: "https://img.freepik.com/free-vector/illustration-people-donating-blood_23-2148246357.jpg?t=st=1725979985~exp=1725983585~hmac=38e91f481f7cdad1017f5b1ad680711ec2910665d3d250c909b58cd84c76e345&w=740",
   
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://img.freepik.com/premium-vector/poster-campaign-world-blood-donor-day-papercut-style-3d-isometric-white-background_36555-996.jpg?w=740",

  },
  {
    title: "Phasellus volutpat metus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    button: "Buy now",
    image: "https://img.freepik.com/free-psd/donate-blood-campaign-banner-style_23-2148690139.jpg?t=st=1725980102~exp=1725983702~hmac=7cd3b38d82c515e7ad0e70b5b1fe17b731828f9a4ebc2ce4f2f593bdc7308080&w=826",
 
  }
];

const HomeSlider = () => {
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.next(); // Move to the next slide
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <Slider className="slider-wrapper" ref={sliderRef}>
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
            <div className="inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>{item.button}</button>
            </div>
          
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
