import React, { useContext } from 'react';
import { MyContext } from '../../../../Provider/Myprovider';

const AllDonors = ({ navigate }) => {
  const { userData, user, activeUsers } = useContext(MyContext);

  const updateData = userData?.filter(
    items => items?.uid !== user?.uid && items.donor === 'yes'
  );
  
  const userId = user?.uid;

  const handleMessageClick = (donorId) => {
    navigate(`/req/message?userId=${userId}&donorId=${donorId}`);
  };

  return (
    <div className="max-h-screen w-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {
        updateData.length === 0 && <h3 className='text-3xl flex justify-center font-bold text-red-500 text-center'>Please be a donar currently we don't have anyone </h3>
      }
      {updateData?.map((item) => (
        <div
          key={item._id.$oid}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="relative flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div
                className={`absolute -top-2 left-24 w-5 h-5 rounded-full ${
                  activeUsers.includes(item.uid) ? 'bg-green-500' : 'bg-gray-600'
                }`}
              ></div>
              <img
                className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-red-500"
                src={item.photoURL || 'https://via.placeholder.com/150'}
                alt={item.displayName}
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.displayName || 'Anonymous'}</h2>
              <p className="text-gray-500 text-sm">{item.email || 'No email provided'}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Blood Group:</p>
              <span className="text-lg font-semibold text-red-600">{item.bloodGroup || 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Phone:</p>
              <span className="font-semibold text-gray-700">{item.phoneNumber || 'Not available'}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Address:</p>
              <span className="font-semibold text-gray-700">{item.address || 'No address provided'}</span>
            </div>

            <button
              onClick={() => handleMessageClick(item.uid)}
              className="w-44 flex justify-center items-center mt-4 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Message Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDonors;
