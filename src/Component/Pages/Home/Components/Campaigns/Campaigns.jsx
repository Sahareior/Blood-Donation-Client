import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import Card from './_card/Card';

export default function Campaigns() {
    const campaignData = [
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg",
          heading: "Save Lives Today",
          content: "Join our blood donation campaign and be the reason someone gets a second chance at life. Every drop counts!",
          date: "28 Oct",
        },
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample24.jpg",
          heading: "Donate Blood, Save Lives",
          content: "Your donation can help those in emergencies, surgeries, and chronic illnesses. Give the gift of life today!",
          date: "12 Nov",
        },
        {
          image: "https://img.freepik.com/free-photo/stethoscope-frame-with-heart_23-2147612259.jpg?t=st=1725847681~exp=1725851281~hmac=0ff16ff1dc3de98de886a15378e1c428069e54f032bb44c5013f53b891adb50f&w=740",
          heading: "Become a Hero",
          content: "By donating blood, you are becoming a hero to someone in need. Take part in our mission to save lives.",
          date: "5 Dec",
        },
        {
          image: "https://img.freepik.com/premium-photo/realistic-national-doctors-day-background-with-stethoscope-medical-equipment_636537-308393.jpg?w=740",
          heading: "One Pint, Many Lives",
          content: "It only takes one pint of blood to save up to three lives. Make your donation count, join our cause.",
          date: "19 Nov",
        },
  
      ];
      
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl text-center mb-8">Popular Campaigns</h2>
      <Swiper
  slidesPerView={3}  // Default for large screens
  spaceBetween={30}
  pagination={{
    clickable: true,
  }}
  breakpoints={{
    // Adjust the number of slides per view for different screen sizes
    320: {
      slidesPerView: 1,  // For small screens like mobile
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,  // For medium-sized screens like tablets
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,  // For larger screens
      spaceBetween: 30,
    },
  }}
  modules={[Pagination]}
  className="mySwiper"
  style={{ width: '80%', height: '70vh' }}  // Increased the height for larger cards
>
 {
    campaignData.map(items => (
        <SwiperSlide key={items.date}>
        <Card heading={items.heading} image={items.image} des={items.content} date={items.date} />
        </SwiperSlide>
    ))
 }
      </Swiper>
    </div>
  );
}
