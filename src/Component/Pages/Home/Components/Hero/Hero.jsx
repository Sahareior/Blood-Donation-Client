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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4 md:py-10">
      <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800">
        Blood Donation Overview
      </h1>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-[90vw] md:w-[80vw]">
        {data.map((item, index) => (
          <div 
            key={index}
            className="bg-white shadow-md rounded-md p-3 md:p-6 hover:shadow-lg transform transition-all duration-300 ease-in-out"
          >
            <img 
              src={item.image} 
              alt={item.heading} 
              className="w-full h-24 md:h-40 object-cover rounded-md mb-2 md:mb-4"
            />
            <div className="text-center">
              <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                {item.heading}
              </h3>
              <p className="text-xs md:text-base text-gray-600">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
