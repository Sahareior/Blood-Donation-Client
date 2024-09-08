import React from 'react';

const DonorCard = ({ name, image, phone, address, bloodGroup, navigate }) => {
  const handleMessageClick = () => {
    // Hardcoded IDs for testing
    const userId = 'user123';  // Hardcoded user ID
    const donorId = 'donor456'; // Hardcoded donor ID

    // Navigate to the message component with the conversation ID
    navigate(`/req/message?userId=${userId}&donorId=${donorId}`);
  };

  return (
    <div className="max-w-xs bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
          src={image}
          alt={name}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Blood Group:</p>
            <span className="font-bold text-red-600 text-lg">{bloodGroup}</span>
          </div>
          <div>
            <button
              onClick={handleMessageClick}
              className="bg-blue-500 text-white px-3 py-1 rounded-full"
            >
              Message Now
            </button>
          </div>
        </div>
        <p className="mt-3 text-gray-600">
          Phone: <span className="font-medium">{phone}</span>
        </p>
      </div>
    </div>
  );
};

export default DonorCard;
