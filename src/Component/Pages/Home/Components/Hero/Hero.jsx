import React from 'react';
import { Card, Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const Hero = () => {
  const data = [
    {
      image: "https://img.freepik.com/free-photo/close-up-volunteer-teamwork-join-hands-environment-conservation-volunteering-world-environment-day_640221-254.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
      heading: "Become a Donor",
      content: "Join us in saving lives through the power of blood donation. One donation can save up to three lives!",
    },
    {
      image: "https://img.freepik.com/premium-photo/three-volunteers-come-together-community-collecting-donations-charity-spreading-hope-happiness_1103944-15670.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
      heading: "Why Give Blood?",
      content: "Every two seconds someone needs blood. Your donation helps hospitals, surgeries, and emergency care.",
    },
    {
      image: "https://img.freepik.com/free-photo/environment-volunteer-teamwork-concept_23-2147807229.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid",
      heading: "How Donations Help",
      content: "Blood donations are essential for treatments, surgeries, and supporting those with chronic illnesses.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-red-50 to-white py-10 px-4 min-h-screen flex flex-col items-center justify-start">
      <h1 className="text-xl md:text-4xl font-bold text-center text-red-600 mb-3 tracking-tight">
        💉 Blood Donation Overview
      </h1>
      <p className="text-sm md:text-lg text-gray-600 text-center max-w-xl mb-8">
        Empower lives by giving hope. Learn how your contribution makes a difference.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {data.map((item, index) => (
          <Card
            key={index}
            hoverable
            cover={
              <img
                alt={item.heading}
                src={item.image}
                className="h-52 object-cover"
              />
            }
            className="rounded-xl py-5 shadow-lg transition-transform duration-300 hover:scale-[1.03]"
            actions={[
              <Button type="primary" icon={<HeartFilled />} size="small" key="donate">
                Learn More
              </Button>,
            ]}
          >
            <Card.Meta
              title={<span className="text-lg font-semibold text-red-700">{item.heading}</span>}
              description={<p className="text-gray-600 text-sm mt-2">{item.content}</p>}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hero;
