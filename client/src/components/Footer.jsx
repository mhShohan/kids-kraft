import logo from '../assets/logo.png';
import { FaGithub, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer py-8 px-2'>
      <div className='container mx-auto md:flex justify-between items-center'>
        <div>
          <div className='logo'>
            <h1 className='text-cyan-400 font-extrabold'>
              Kids<span className='text-pink-600'>Kraft</span>
            </h1>
            <img src={logo} alt='Kids Kraft Logo' />
          </div>
          <div className='flex gap-5'>
            <a
              className='text-3xl text-cyan-600 cursor-pointer'
              href='https://github.com/mhShohan'
              target='_blank'
            >
              <FaGithub />
            </a>
            <a
              className='text-3xl text-cyan-600 cursor-pointer'
              href='https://www.linkedin.com/in/mehdi-hasan-shohan/'
              target='_blank'
            >
              <FaLinkedin />
            </a>
            <a
              className='text-3xl text-cyan-600 cursor-pointer'
              href='https://www.facebook.com/mhshohan17'
              target='_blank'
            >
              <FaFacebook />
            </a>
            <a
              className='text-3xl text-cyan-600 cursor-pointer'
              href='https://twitter.com/mehdi_hasan17'
              target='_blank'
            >
              <FaTwitter />
            </a>
          </div>
          <p className='mt-4 text-cyan-600 font-semibold'>
            &copy;2023 KidsKraft. All rights reserved by{' '}
            <a
              href='https://www.linkedin.com/in/mehdi-hasan-shohan/'
              className='text-pink-700 font-bold'
            >
              mhShohaN
            </a>
          </p>
        </div>
        <div className='text-cyan-700 font-semibold my-3'>
          <p>Contact Information:</p>
          <p>Email:mehdihasanshohan25@gmail.com</p>
          <p>Phone: +8801721146655</p>
        </div>
        <div className='text-cyan-700 font-semibold my-3'>
          <p>Address:</p>
          <p>BSMRSTU, Gopalganj, Dhaka</p>
          <p>ZIP Code: 8100</p>
          <p>Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
