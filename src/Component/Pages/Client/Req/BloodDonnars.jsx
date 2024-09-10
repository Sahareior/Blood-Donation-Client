import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../Provider/Myprovider';
import { Discuss } from 'react-loader-spinner';

const BloodDonors = ({ navigate }) => {
  // const [activeUsers, setActiveUsers] = useState([]);
  const { userData, user,activeUsers,setName,setActiveUsers,socket,setIsLoading,isLoading} = useContext(MyContext);


  useEffect(() => {
    if (socket.current) {
      socket.current.emit('addUser', user);

      socket.current.on('getUsers', (users) => {
        setActiveUsers(users.map(user => user.uid)); 
        setIsLoading(false)
      });
    }

  
    return () => {
      if (socket.current) {
        socket.current.off('getUsers');
      }
    };
  }, [user, socket]);

  const updateData = userData?.filter(items => items?.uid !== user?.uid)
  console.log(activeUsers)
 
  const newData = updateData.filter(
    data => activeUsers.includes(data.uid) && data.donor === 'yes'
  );
  

  if(isLoading){
    return(
      <div className='flex justify-center items-center h-screen'>
        <Discuss
  visible={true}
  height="80"
  width="80"
  ariaLabel="discuss-loading"
  wrapperStyle={{}}
  wrapperClass="discuss-wrapper"
  color="#fff"
  backgroundColor="#F4442E"
  />
      </div>
    )
  }


  const userId = user?.uid;

  const handleMessageClick = (donorId,name) => {
    setName(name)
    navigate(`/req/message?userId=${userId}&donorId=${donorId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
      {
        newData.length === 0 && <h3 className='text-2xl text-center text-red-500'>No one is active this moment</h3>
      }
      {newData?.map((item) => (
        <div key={item._id.$oid} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <div className="relative flex items-center space-x-6">
            <div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${activeUsers.includes(item.uid) ? 'bg-green-500' : 'bg-gray-600'}`}
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
             <div className='flex gap-2'>
             <span className="font-semibold">{item.state || 'No address provided'},</span>
             <span className="font-semibold">{item.city || 'No address provided'},</span>
             <span className="font-semibold">{item.zipCode || 'No address provided'}</span>
             </div>
            </div>

            <button
              onClick={() => handleMessageClick(item.uid,item.displayName)}
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
