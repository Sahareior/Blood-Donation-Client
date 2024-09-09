import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../../Provider/Myprovider';

const Profile = () => {
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
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
        const res = await axios.get(`http://localhost:5000/users/${user?.uid}`);
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
    console.log('Submitting form with data:', profile);  // Add this line
    try {
      const res = await axios.put(`http://localhost:5000/users/${user?.uid}`, profile);
      console.log('Response:', res.data);
      alert(res.data.message);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  };
  
  
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h1>
      {isEditing ? (
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-1/2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
    
        {/* Right Column */}
        <div className="flex flex-col gap-6 w-1/2">
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={profile.state}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={profile.zipCode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="ml-4 px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-all"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
    
      ) : (
        <div>
          <p className="text-lg font-medium">Name: {profile.displayName || 'N/A'}</p>
          <p className="text-lg font-medium">Email: {profile.email || 'N/A'}</p>
          <p className="text-lg font-medium">Phone Number: {profile.phoneNumber || 'N/A'}</p>
          <p className="text-lg font-medium">Blood Group: {profile.bloodGroup || 'N/A'}</p>
          <p className="text-lg font-medium">State: {profile.state || 'N/A'}</p>
          <p className="text-lg font-medium">City: {profile.city || 'N/A'}</p>
          <p className="text-lg font-medium">Zip Code: {profile.zipCode || 'N/A'}</p>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
