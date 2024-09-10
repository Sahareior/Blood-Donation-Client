import React from 'react';
import CountUp from 'react-countup';
import './Counter.css'

const Counter = () => {
  return (
    <div
      className='w-full h-screen'
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/medical-stethoscope-isolated-with-black-background-medical-concept-stethoscope-black-background-with-space-text-health-concept-medical-conceptual_1391-769.jpg?t=st=1725819529~exp=1725823129~hmac=4e0f35df57ec720b05084f915fd56f7959cc4e85c4f16a06c8ae6e0e1f416724&w=740")',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: ''
      }}
    >
      {/* Flexbox container for centering */}
      <div className="flex flex-col justify-center -mt-5 items-center h-full">
        <div className="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-20">
          <div className="counter-item p-2 md:p-5 rounded-lg shadow-lg text-center text-red-500 bg-white bg-opacity-80">
            <h3 className="md:text-3xl text-2xl font-bold mb-2">Experience</h3>
            <CountUp end={10} duration={8} className="text-2xl md:text-3xl font-semibold" />
            <p className="text-red-400 text-sm mt-1">Years</p>
          </div>
          <div className="counter-item p-2 md:p-4 rounded-lg shadow-lg text-center text-red-500 bg-white bg-opacity-80">
            <h3 className="md:text-3xl text-2xl font-bold mb-2">Donors</h3>
            <CountUp end={1500} duration={8} className="text-2xl md:text-3xl font-semibold" />
            <p className="text-red-400 texy-sm mt-1">People</p>
          </div>
          <div className="counter-item p-2 md:p-4 rounded-lg shadow-lg text-center text-red-500 bg-white bg-opacity-80">
            <h3 className="md:text-3xl text-2xl font-bold mb-2">Awards</h3>
            <CountUp end={25} duration={8} className="text-2xl md:text-3xl font-semibold" />
            <p className="text-red-400 text-sm mt-1">Awards</p>
          </div>
          <div className="counter-item md:p-5 p-2 rounded-lg shadow-lg text-center text-red-500 bg-white bg-opacity-40">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Happy Recipients</h3>
            <CountUp end={3000} duration={8} className="text-2xl md:text-3xl font-semibold" />
            <p className="text-red-400 text-sm mt-1">Recipients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
