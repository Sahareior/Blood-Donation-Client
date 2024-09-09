import React from 'react';

const About = () => {
    return (
        <div className='p-1 bg-gray-100 min-h-screen flex flex-col items-center'>
            <div className='flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg p-8 md:p-1 space-y-6 md:space-y-0 md:space-x-8'>
                <img
                    src="https://croptheme.com/tm/blut/blut-ltr/assets/images/organization-illustration.png"
                    alt="Organization Illustration"
                    className='w-full md:w-1/2 rounded-lg shadow-md'
                />
                <div className='w-full md:w-96'>
                    <p className='text-red-500 text-lg font-semibold mb-2'>Help The People in Need</p>
                    <h2 className='text-2xl md:text-3xl font-bold mb-4'>Welcome to Blood Donors Organization</h2>
                    <p className='text-gray-700 mb-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse the gravida. Risus commodo viverra maecenas.
                    </p>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <li className='text-gray-800'>Good Service</li>
                        <li className='text-gray-800'>Help People</li>
                        <li className='text-gray-800'>Hygiene Tools</li>
                        <li className='text-gray-800'>Blood Bank</li>
                        <li className='text-gray-800'>Health Check</li>
                    </ul>
                    <button className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300'>
                        Explore More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
