import React from 'react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// Your Card
import Card from './_card/Card';

export default function Campaigns() {
  const campaignData = [
    {
      image:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg',
      heading: 'Save Lives Today',
      content:
        'Join our blood donation campaign and be the reason someone gets a second chance at life. Every drop counts!',
      date: '28 Oct',
    },
    {
      image:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample24.jpg',
      heading: 'Donate Blood, Save Lives',
      content:
        'Your donation can help those in emergencies, surgeries, and chronic illnesses. Give the gift of life today!',
      date: '12 Nov',
    },
    {
      image:
        'https://img.freepik.com/free-photo/stethoscope-frame-with-heart_23-2147612259.jpg',
      heading: 'Become a Hero',
      content:
        'By donating blood, you are becoming a hero to someone in need. Take part in our mission to save lives.',
      date: '5 Dec',
    },
    {
      image:
        'https://img.freepik.com/premium-photo/realistic-national-doctors-day-background-with-stethoscope-medical-equipment_636537-308393.jpg',
      heading: 'One Pint, Many Lives',
      content:
        'It only takes one pint of blood to save up to three lives. Make your donation count, join our cause.',
      date: '19 Nov',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-red-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold md:text-4xl  bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400 text-center mb-12">
          Popular Campaigns
        </h2>

        <Swiper
          slidesPerView={3}
          spaceBetween={40}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          modules={[Pagination]}
          className="py-8"
        >
          {campaignData.map((item) => (
            <SwiperSlide key={item.date} className="flex justify-center">
              <div className="w-full max-w-sm">
                <Card
                  heading={item.heading}
                  image={item.image}
                  des={item.content}
                  date={item.date}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
