import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../Provider/Myprovider';
import { Discuss } from 'react-loader-spinner';
import { Avatar, Tooltip, Pagination } from 'antd';
import { FaPhoneAlt } from 'react-icons/fa';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

import Swal from 'sweetalert2';

const BloodDonors = ({ navigate }) => {
  const [loading, setLoading] = useState(true);
  const { userData, user, activeUsers, setName, setActiveUsers, socket  } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 6; // Number of donors per page
  

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'No User Found',
        text: 'Please log in to view blood donors.',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/reg'); // or your login route
      });
    }
  }, [user]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // adjust the delay if needed
  
    return () => clearTimeout(timer);
  }, [userData, activeUsers]); // re-run if these change
  
  

  const updateData = userData?.filter(items => items?.uid !== user?.uid);
  const newData = updateData.filter(data => activeUsers.includes(data.uid) && data.donor === 'yes');

  // Pagination logic
  const totalPages = Math.ceil(newData.length / donorsPerPage); // Calculate total pages
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = newData.slice(indexOfFirstDonor, indexOfLastDonor); // Slice data to show only current page's donors

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Discuss
          visible={true}
          height="80"
          width="80"
          ariaLabel="discuss-loading"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </div>
    );
  }
  
  if (!loading && newData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-center px-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">🚫 No active donors at this moment.</h2>
          <p className="text-gray-500 mt-2">Please check back later or invite others to join!</p>
        </div>
      </div>
    );
  }

  const userId = user?.uid;

  const handleMessageClick = (donorId, name) => {
    setName(name);
    navigate(`/req/message?userId=${userId}&donorId=${donorId}`);
  };

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] px-4 py-6">
    <h2 className='text-center font-bold text-xl md:text-3xl text-gray-800 mb-6'>
      🩸 All Active Donors
    </h2>



    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {currentDonors?.map((item) => (
        <div
          key={item._id.$oid}
          onClick={() => handleMessageClick(item.uid, item.displayName)}
          className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Tooltip title={activeUsers.includes(item.uid) ? "Online" : "Offline"}>
                <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${activeUsers.includes(item.uid) ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white`} />
              </Tooltip>
              <Avatar
                size={64}
                src={item.photoURL || undefined}
                icon={!item.photoURL && <UserOutlined />}
                className="border border-red-400"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.displayName || 'Anonymous'}</h3>
              <p className="text-sm text-gray-500">{item.email || 'No email provided'}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Blood Group:</span>
              <span className="font-semibold text-red-600">{item.bloodGroup || 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Phone:</span>
              <a href={`tel:${item.phoneNumber}`} className="flex items-center text-blue-600 hover:text-blue-800">
                <FaPhoneAlt className="mr-1" />
                {item.phoneNumber || 'Not available'}
              </a>
            </div>

            <div>
              <span className="font-medium">Location:</span>
              <div className="text-gray-800 font-semibold">
                {`${item.city || 'N/A'}, ${item.state || 'N/A'}`}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMessageClick(item.uid, item.displayName);
            }}
            className="mt-5 w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
          >
            💬 Message
          </button>
        </div>
      ))}
    </div>

    {/* Ant Design Pagination */}
    <div className="flex justify-center mt-10 max-w-7xl mx-auto">
      <Pagination
        current={currentPage}
        total={totalPages * 10}
        pageSize={10}
        onChange={paginate}
        showSizeChanger={false}
      />
    </div>
  </div>
  );
};

export default BloodDonors;
