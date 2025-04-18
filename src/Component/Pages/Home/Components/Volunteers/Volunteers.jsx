import React from "react";
import Marquee from "react-fast-marquee";
import { StarFilled, TeamOutlined } from "@ant-design/icons";

const Volunteer = () => {
  const volunteers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Volunteer",
      image: "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
      hours: 320,
      location: "New York, NY"
    },
    {
      name: "Michael Chen",
      role: "Blood Drive Coordinator",
      image: "https://img.freepik.com/free-photo/portrait-confident-young-male-doctor_329181-9255.jpg",
      hours: 285,
      location: "Los Angeles, CA"
    },
    {
      name: "Emma Wilson",
      role: "Community Outreach",
      image: "https://img.freepik.com/free-photo/young-female-nurse-looking-camera_1303-17871.jpg",
      hours: 410,
      location: "Chicago, IL"
    },
    {
      name: "David Miller",
      role: "Emergency Response",
      image: "https://img.freepik.com/free-photo/attractive-young-male-nurse-uniform_176420-17569.jpg",
      hours: 380,
      location: "Houston, TX"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <TeamOutlined className="text-red-600 md:text-4xl mr-3 bg-white p-3 rounded-full shadow-lg" />
            <h1 className="text-xl font-bold md:text-4xl  bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
              Our Heroic Volunteers
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Dedicated individuals making life-saving contributions through their 
            selfless service and commitment to our cause.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-20 pointer-events-none" />
          <Marquee speed={40} gradient={false} pauseOnHover>
            {volunteers.map((volunteer, index) => (
              <div
                key={index}
                className="group relative mx-4 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg w-72 h-96 flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src={volunteer.image}
                      alt={volunteer.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-red-100 shadow-lg"
                    />
                    <div className="absolute -bottom-2 right-0 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <StarFilled className="mr-1 text-yellow-300" />
                      {volunteer.hours}+ hrs
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {volunteer.name}
                  </h3>
                  <p className="text-red-500 font-medium mb-3">{volunteer.role}</p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg 
                      className="w-5 h-5 mr-2 text-red-400"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {volunteer.location}
                  </div>
                  <div className="mt-auto w-full">
                    <div className="h-2 bg-red-100 rounded-full mb-2">
                      <div 
                        className="h-2 bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${(volunteer.hours / 500) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">Service Progress</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-red-200">
            Join Our Volunteer Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;