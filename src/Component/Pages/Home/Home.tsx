import React from 'react';
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

export default function Home() {
  return (
    <>
    <Swiper
      direction={'vertical'}
      
      pagination={{ clickable: true }}
      mousewheel={true}
      modules={[Pagination, Mousewheel]}
      className="mySwiper"
      style={{ height: '100vh' }}
      
    >
        <SwiperSlide>
          <Slider />
        </SwiperSlide>
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <About />
        </SwiperSlide>
        <SwiperSlide>
          <Counter />
        </SwiperSlide>
        <SwiperSlide>
          <Campaigns />
        </SwiperSlide>
        <SwiperSlide>
          <Volunteers />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
