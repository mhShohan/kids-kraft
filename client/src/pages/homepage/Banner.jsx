import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='banner'>
      <div className='banner-overlay center'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl lg:text-6xl font-bold text-white'>
            Welcome to{' '}
            <span className='text-cyan-400 font-extrabold'>
              Kids<span className='text-pink-600'>Kraft</span>
            </span>
          </h1>
          <p className='text-xl lg:text-2xl text-white mb-2'>
            Explore a world of amazing superhero toys!!!
          </p>
          <Button>
            <Link to='/all-toys'>View All Toys</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
