import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { MyContext } from '../../../../../Provider/Myprovider';

const Profile = () => {
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://blood-donar-server-production.up.railway.app/users/${user?.uid}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user?.uid) {
      fetchProfile();
    }
  }, [user?.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to check if any field is missing
    if (
      !profile.displayName ||
      !profile.phoneNumber ||
      !profile.bloodGroup ||
      !profile.state ||
      !profile.city ||
      !profile.zipCode
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all the required fields!',
      });
      return;
    }

    // Add the donor: 'yes' field before sending the request
    const profileWithDonor = { ...profile, donor: 'yes' };

    try {
      const res = await axios.put(`https://blood-donar-server-production.up.railway.app/users/${user?.uid}`, profileWithDonor);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: res.data.message,
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response ? error.response.data : error.message,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg mt-0">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Please complete all required fields to register as a blood donor.
      </h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full sm:w-1/2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 w-full sm:w-1/2">
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={profile.zipCode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-3 space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-transform duration-200 transform hover:scale-105"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-2xl mx-auto ">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Profile Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FiUser className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">Name: <span className="font-semibold">{profile.displayName || 'N/A'}</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <FiMail className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">Email: <span className="font-semibold">{profile.email || 'N/A'}</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <FiPhone className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">Phone Number: <span className="font-semibold">{profile.phoneNumber || 'N/A'}</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <FiUser className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">Blood Group: <span className="font-semibold">{profile.bloodGroup || 'N/A'}</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <FiMapPin className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">State: <span className="font-semibold">{profile.state || 'N/A'}</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <FiMapPin className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">City: <span className="font-semibold">{profile.city || 'N/A'}</span></p>
            </div>
            <div className="flex items-center space-x-4">
              <FiMapPin className="text-blue-500 w-6 h-6" />
              <p className="text-lg font-medium text-gray-700">Zip Code: <span className="font-semibold">{profile.zipCode || 'N/A'}</span></p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
              onClick={() => setIsEditing(true)}
            >
              <FiEdit className="inline-block mr-2" /> Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
