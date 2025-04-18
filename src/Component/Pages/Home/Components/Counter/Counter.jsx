import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Card, Row, Col } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  TrophyOutlined,
  SmileOutlined,
} from '@ant-design/icons';

const stats = [
  { label: 'Years Experience',    value: 10,   icon: <CalendarOutlined /> },
  { label: 'Donors',               value: 1500, icon: <TeamOutlined />     },
  { label: 'Awards',               value: 25,   icon: <TrophyOutlined />   },
  { label: 'Happy Recipients',     value: 3000, icon: <SmileOutlined />    },
];

const Counter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/medical-stethoscope-isolated-with-black-background-medical-concept_1391-769.jpg")',
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-12">
          Our Impact in Numbers
        </h2>

        <Row gutter={[24, 24]}>
          {stats.map(({ label, value, icon }) => (
            <Col key={label} xs={24} sm={12} md={6}>
              <Card
                hoverable
                className="bg-white bg-opacity-90 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="text-red-500 text-5xl mb-4">{icon}</div>
                <div className="text-4xl font-extrabold text-gray-800">
                  {inView ? (
                    <CountUp end={value} duration={2.5} separator="," />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="mt-2 text-gray-600 uppercase font-medium">
                  {label}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Counter;
