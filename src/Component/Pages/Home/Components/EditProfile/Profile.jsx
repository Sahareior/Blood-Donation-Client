import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'antd'; // Import Ant Design Modal and Button
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { MyContext } from '../../../../../Provider/Myprovider';


const Profile = ({navigate}) => {
  const [profile, setProfile] = useState({
    displayName: '',
    phoneNumber: '',
    bloodGroup: '',
    state: '',
    city: '',
    zipCode: '',
  });
  const { user } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalWidth, setModalWidth] = useState('80%');

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768; // Tailwind's md breakpoint
      setModalWidth(isDesktop ? '50%' : '80%');
    };

    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://blood-donar-server-zf9x.onrender.com/users/${user?.uid}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user?.uid) {
      fetchProfile();
    }
  }, [user?.uid]);

  if(!user?.email){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "please sign in first",
      showConfirmButton: false,
      timer: 2500,
     
    });
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.displayName || !profile.phoneNumber || !profile.bloodGroup || !profile.state || !profile.city || !profile.zipCode) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all the required fields!',
      });
      return;
    }

    const profileWithDonor = { ...profile, donor: 'yes' };

    try {
      const res = await axios.put(`https://blood-donar-server-zf9x.onrender.com/users/${user?.uid}`, profileWithDonor);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: res.data.message,
      });
      setIsEditing(false);
      setIsModalVisible(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response ? error.response.data : error.message,
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="py-6">
      <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Please complete all required fields to register as a blood donor.
      </h1>

      {/* Card Layout */}
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
  <div className="flex flex-col items-center space-y-4">
    <div className="relative">
      <img
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
        src={profile.photoURL || 'https://via.placeholder.com/150'}
        alt={profile.displayName || 'Anonymous'}
      />
    </div>
    <h2 className="text-2xl font-bold text-gray-900">{profile.displayName || 'Anonymous'}</h2>

    <div className="w-full bg-gray-100 rounded-lg p-4 space-y-3 text-gray-700">
      <div className="flex items-center space-x-3">
        <FiPhone className="text-blue-500 text-lg" />
        <p className='font-bold'>{profile.phoneNumber || 'Not available'}</p>
      </div>
      <div className="flex items-center space-x-3">
        <FiMail className="text-blue-500 text-lg" />
        <p className='font-bold'>{profile.email || 'No email provided'}</p>
      </div>
      <div className="flex items-center space-x-3">
        <FiMapPin className="text-blue-500 text-lg" />
        <p className='font-bold'>{`${profile.city || 'N/A'}, ${profile.state || 'N/A'}, ${profile.zipCode || 'N/A'}`}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className="font-semibold">Blood Group:</span>
        <span className='text-red-600 font-bold'>{profile.bloodGroup || 'N/A'}</span>
      </div>
    </div>

    <Button
      type="primary"
      onClick={showModal}
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
    >
      <FiEdit className="inline-block mr-2" /> Edit Profile
    </Button>
  </div>
</div>







      {/* Modal for Editing */}
      <Modal
      title="Edit Profile"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={modalWidth}
    >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="displayName"
                value={profile.displayName}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={profile.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="ml-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-150"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
