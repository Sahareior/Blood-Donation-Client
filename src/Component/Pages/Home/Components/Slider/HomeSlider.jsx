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
    image: "https://i.imgur.com/ZXBtVw7.jpg",
   
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",

  },
  {
    title: "Phasellus volutpat metus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    button: "Buy now",
    image: "https://i.imgur.com/DvmN8Hx.jpg",
 
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
