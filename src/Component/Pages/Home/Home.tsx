import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel'; // Ensure Mousewheel styles are included
import { Pagination, Mousewheel } from 'swiper/modules';
import Slider from './Components/Slider/HomeSlider';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Counter from './Components/Counter/Counter';
import Campaigns from './Components/Campaigns/Campaigns';
import Volunteers from './Components/Volunteers/Volunteers';
import { MyContext } from '../../../Provider/MyProvider';
import Main from './Components/Main/Main';

export default function Home() {


  return (
    <>
     {/* <Slider /> */}
     <Main />
     <Hero />
     <About />
  
     <Campaigns />
     <Volunteers />

    </>
  );
}
