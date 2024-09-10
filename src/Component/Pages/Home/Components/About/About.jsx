import React from 'react';

const About = () => {
    return (
        <div className='pb-10 bg-gray-100 min-h-screen flex flex-col items-center justify-center'>
            {/* Flex container for mobile and desktop */}
            <div className='flex pb-9 flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg p-4 md:p-8 space-y-6 md:space-y-0 md:space-x-8 w-full md:w-[90%] lg:w-[80%]'>
                {/* Image Section */}
                <img
                    src="https://croptheme.com/tm/blut/blut-ltr/assets/images/organization-illustration.png"
                    alt="Organization Illustration"
                    className='w-60 h-auto md:w-1/2 rounded-lg shadow-md'
                />
                {/* Text Section */}
                <div className='w-full'>
                    <p className='text-red-500 text-base md:text-lg font-semibold mb-2 text-center md:text-left'>
                        Help The People in Need
                    </p>
                    <h2 className='text-xl md:text-2xl lg:text-3xl font-bold md:mb-4 mb-2 text-center md:text-left'>
                        Welcome to Blood Donors Organization
                    </h2>
                    <p className='text-gray-700 text-xs md:text-base md:mb-4 mb-2 text-center md:text-left'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse the gravida. Risus commodo viverra maecenas.
                    </p>
                    <ul className='list-disc list-inside space-y-2 mb-4 text-gray-800 text-sm md:text-base'>
                        <li>Good Service</li>
                        <li>Help People</li>
                        <li>Hygiene Tools</li>
                        <li>Blood Bank</li>
                        <li>Health Check</li>
                    </ul>
                    <div className="flex justify-center md:justify-start">
                        <button className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300'>
                            Explore More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
