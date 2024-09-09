import React from 'react';
import CountUp from 'react-countup';
import './Counter.css'; // Ensure this file contains necessary styling

const Counter = () => {
  return (
    <div className="container flex  justify-center h-screen">
      <div className="flex justify-center space-x-4">
        <div className="counter-item p-5 rounded-lg shadow-lg text-center text-red-500">
          <h3 className="text-2xl font-bold mb-2">Experience</h3>
          <CountUp end={10} duration={8} className="text-3xl font-semibold" />
          <p className="text-red-400">Years</p>
        </div>
        <div className="counter-item p-4 rounded-lg shadow-lg text-center text-red-500">
          <h3 className="text-2xl font-bold mb-2">Donors</h3>
          <CountUp end={1500} duration={8} className="text-3xl font-semibold" />
          <p className="text-red-400">People</p>
        </div>
        <div className="counter-item p-4 rounded-lg shadow-lg text-center text-red-500">
          <h3 className="text-2xl font-bold mb-2">Awards</h3>
          <CountUp end={25} duration={8} className="text-3xl font-semibold" />
          <p className="text-red-400">Awards</p>
        </div>
        <div className="counter-item p-4 rounded-lg shadow-lg text-center text-red-500">
          <h3 className="text-2xl font-bold mb-2">Happy Recipients</h3>
          <CountUp end={3000} duration={8} className="text-3xl font-semibold" />
          <p className="text-red-400">Recipients</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
