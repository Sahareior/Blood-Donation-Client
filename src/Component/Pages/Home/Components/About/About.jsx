import React from 'react';
import { Button, Card, Statistic, Row, Col } from 'antd';
import { InfoCircleOutlined, HeartFilled, TeamOutlined, MedicineBoxFilled, DropboxOutlined } from '@ant-design/icons';
import { useInView } from 'react-intersection-observer';
import { CountUp } from 'use-count-up';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { value: 12500, title: 'Lives Saved', icon: <HeartFilled />, color: 'text-red-500' },
    { value: 8500, title: 'Active Donors', icon: <TeamOutlined />, color: 'text-blue-500' },
    { value: 42, title: 'Cities Covered', icon: <MedicineBoxFilled />, color: 'text-green-500' },
    { value: 98, title: 'Satisfaction Rate', icon: <DropboxOutlined />, color: 'text-purple-500', suffix: '%' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12">
            <div className="flex items-center mb-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Help The People in Need
              </span>
            </div>
            
            <h2 className="text-xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              Welcome to <span className="text-red-600">Blood Donors</span> Organization
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              We are committed to saving lives and building stronger communities through blood donation. 
              Your contribution makes a powerful impact on people in need during critical moments.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <HeartFilled className="text-blue-600 text-lg" />
                </div>
                <span className="text-gray-700">Excellent Service</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <TeamOutlined className="text-blue-600 text-lg" />
                </div>
                <span className="text-gray-700">Support for People</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <MedicineBoxFilled className="text-blue-600 text-lg" />
                </div>
                <span className="text-gray-700">Sanitary Equipment</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <DropboxOutlined className="text-blue-600 text-lg" />
                </div>
                <span className="text-gray-700">Blood Bank Access</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="primary" 
                icon={<InfoCircleOutlined />} 
                size="large"
                className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 border-none shadow-md"
              >
                Explore More
              </Button>
              <Button 
                size="large"
                className="h-12 px-8 rounded-lg border-blue-600 text-blue-600 hover:text-blue-700 hover:border-blue-700"
              >
                Become a Donor
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 h-full relative">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-community-spirit-illustration_23-2150194854.jpg"
              alt="Community Spirit"
              className="w-full h-auto lg:h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Every Drop Counts</h3>
              <p className="text-sm opacity-90">Join our community of life-savers today</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={ref} className="mt-20 my- grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center border-none shadow-md hover:shadow-lg transition-shadow duration-300"
              hoverable
            >
              <div className={`text-4xl mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <Statistic
                title={stat.title}
                value={inView ? stat.value : 0}
                formatter={(value) => (
                  <CountUp isCounting end={value} duration={2.5} suffix={stat.suffix || ''} />
                )}
                className="font-bold text-3xl"
              />
            </Card>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-gradient-to-r from-pink-600 to-purple-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-3xl font-bold mb-6 text-center">What Our Donors Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 border-none backdrop-blur-sm">
                <p className="italic text-white mb-4">"The most organized blood donation drive I've ever participated in. The staff was professional and caring."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-400 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-white">Sarah Johnson</h4>
                    <p className="text-sm opacity-80 text-white">Regular Donor</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-white/10 border-none backdrop-blur-sm">
                <p className="italic text-white mb-4">"My family needed emergency blood last year. This organization saved my father's life. Forever grateful!"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-400 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-white">Michael Chen</h4>
                    <p className="text-sm opacity-80 text-white">Recipient Family</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;