import React from 'react';
import { Button } from 'antd';

const Main = () => {
    return (
        <div className="bg-red-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
                    <div className="w-full md:w-1/2 lg:w-1/2">
                        <img 
                            src="https://templatekit.jegtheme.com/redirect/wp-content/uploads/sites/141/2021/08/UVG5CCF-768x925.jpeg" 
                            alt="Blood donation illustration"
                            className="rounded-lg shadow-xl object-cover w-full h-full"
                        />
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-6 md:p-8">
                        <h1 className='text-4xl lg:text-5xl font-bold text-red-600 leading-tight'>
                            Donate Your Blood to Us,<br/>
                            <span className="text-gray-800">Save More Life Together</span>
                        </h1>
                        
                        <p className='text-lg text-gray-600 max-w-md'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
                            ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis 
                            dis parturient montes.
                        </p>
                        
                        <div className='flex gap-4'>
                            <Button 
                                type="primary" 
                                danger 
                                size="small"
                                className='bg-red-600 hover:bg-red-700 text-white h-12 md:px-8 px-4 rounded-lg font-semibold'
                            >
                                Learn More
                            </Button>
                            <Button 
                                size="small"
                                className='border-red-600 text-red-600 h-12 md:px-8 px-4 rounded-lg font-semibold hover:text-white hover:bg-red-600'
                            >
                                Donate Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;