import React from "react";
import Marquee from "react-fast-marquee";

const Volunteer = () => {
  const volunteers = [
    {
      name: "John Doe",
      image: "https://img.freepik.com/free-photo/top-view-notebook-stethoscope_23-2148160902.jpg?w=740",
    },
    {
      name: "Jane Smith",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Mike Johnson",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emma Wilson",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="Volunteers bg-gray-100 h-screen py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Meet Our Top Volunteers</h1>
        <p className="text-lg mt-2">These are some of our most dedicated volunteers!</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Marquee speed={50} delay={0}>
          {volunteers.map((volunteer, index) => (
            <div
              key={index}
              className="volunteer-card mx-5 bg-white shadow-lg rounded-lg p-4 text-center"
              style={{
                width: "250px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={volunteer.image}
                alt={volunteer.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h3 className="text-xl font-semibold">{volunteer.name}</h3>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Volunteer;
