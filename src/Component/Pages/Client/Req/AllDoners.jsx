import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../Provider/Myprovider';
import { Avatar, Tooltip, Pagination } from 'antd';
import { FaPhoneAlt } from 'react-icons/fa';
import { UserOutlined } from '@ant-design/icons';
import { Discuss } from 'react-loader-spinner';

const AllDonors = ({ navigate }) => {
  const { userData, user, setName, activeUsers,loading,setLoading } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
 
  const donorsPerPage = 6;
console.log(loading)
  // Filter out the current user & get all donors
  const updateData = userData?.filter(
    (items) => items?.uid !== user?.uid && items.donor === 'yes'
  );

  const userId = user?.uid;

  const handleMessageClick = (donorId, name) => {
    setName(name);
    navigate(`/req/message?userId=${userId}&donorId=${donorId}`);
  };

  // Simulate initial loading


  // Pagination calculations
  const totalPages = Math.ceil(updateData?.length / donorsPerPage);
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = updateData?.slice(indexOfFirstDonor, indexOfLastDonor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 🌀 Show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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

  // ❌ No donors case
  if (!loading && updateData?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-center px-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-red-500">
            😞 Please be a donor — currently we don’t have anyone.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-16 md:pb-6 w-full bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-6">      <h2 className="text-center font-bold text-xl md:text-3xl text-gray-800 mb-6">
        🙌 All Registered Donors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-10">
        {currentDonors?.map((item) => (
          <div
            key={item._id?.$oid}
            onClick={() => handleMessageClick(item.uid, item.displayName)}
            className="bg-white/80 backdrop-blur-md border relative border-gray-200 rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            {/* Header */}
            <div className="flex  items-center  gap-4 mb-4">
              <div className="">
                <Tooltip title={activeUsers.includes(item.uid) ? 'Online' : 'Offline'}>
                  <span className={`absolute top-2 right-3 md:w-4 md:h-4 w-3 h-3 rounded-full ${activeUsers.includes(item.uid) ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white`} />
                </Tooltip>
                <Avatar
                  size={64}
                  src={item.photoURL || undefined}
                  icon={!item.photoURL && <UserOutlined />}
                  className="border border-red-500"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[180px]">
                  {item.displayName || 'Anonymous'}
                </h3>
                <p className="text-sm text-gray-500 truncate max-w-[180px]">
                  {item.email || 'No email provided'}
                </p>
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
                <a href={`tel:${item.phoneNumber}`} className="flex items-center text-blue-600 hover:text-blue-800 truncate">
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

      {/* Pagination */}
<div className="flex justify-center mt-4 mb-8 md:mb-0">
  <Pagination
    current={currentPage}
    total={totalPages * 10}
    pageSize={10}
    onChange={paginate}
    showSizeChanger={false}
    responsive={true}
  />
</div>
    </div>
  );
};

export default AllDonors;
