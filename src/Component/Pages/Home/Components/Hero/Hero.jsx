import React from 'react';

const Hero = () => {
  const data = [
    {
      image: "https://croptheme.com/tm/blut/blut-ltr/assets/images/overview/donor.png",
      heading: "Become a Donor",
      content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give pleasure",
    },
    {
      image: "https://croptheme.com/tm/blut/blut-ltr/assets/images/overview/donor.png",
      heading: "Why Give Blood?",
      content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give pleasure",
    },
    {
      image: "https://croptheme.com/tm/blut/blut-ltr/assets/images/overview/donor.png",
      heading: "How Donations Helps",
      content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give pleasure",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Blood Donation Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.heading}
              className="w-full h-60 mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2">{item.heading}</h2>
            <p className="text-gray-600 text-center">{item.content}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
