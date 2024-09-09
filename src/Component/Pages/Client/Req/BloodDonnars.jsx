import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../Provider/Myprovider';

const BloodDonors = ({ navigate }) => {
  // const [activeUsers, setActiveUsers] = useState([]);
  const { userData, user,activeUsers } = useContext(MyContext);

  const updateData = userData?.filter(items => items?.uid !== user?.uid)



  const userId = user?.uid;

  const handleMessageClick = (donorId) => {
    navigate(`/req/message?userId=${userId}&donorId=${donorId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
      {updateData?.map((item) => (
        <div key={item._id.$oid} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <div className="relative flex items-center space-x-6">
            <div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${activeUsers.includes(item.uid) ? 'bg-blue-500' : 'bg-gray-300'}`}
              style={{ zIndex: 10 }}
            ></div>
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-red-500"
              src={item.photoURL || 'https://via.placeholder.com/150'}
              alt={item.displayName}
            />
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-800">{item.displayName || 'Anonymous'}</h2>
              <p className="text-gray-600">{item.email || 'No email provided'}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Blood Group:</p>
              <span className="text-lg font-semibold text-red-600">{item.bloodGroup || 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500">Phone:</p>
              <span className="font-semibold">{item.phoneNumber || 'Not available'}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500">Address:</p>
              <span className="font-semibold">{item.address || 'No address provided'}</span>
            </div>

            <button
              onClick={() => handleMessageClick(item.uid)}
              className="w-full mt-5 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Message Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloodDonors;
