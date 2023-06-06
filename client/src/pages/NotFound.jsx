import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Not Found!';
  }, []);

  return (
    <div className='flex items-center justify-center bg-zinc-700 min-h-screen'>
      <div className='bg-zinc-300 max-w-lg mx-auto p-8 rounded shadow-md text-center'>
        <h1 className='text-3xl font-bold mb-6'>404 Not Found!</h1>
        <p className='text-gray-700 mb-6'>
          The page you are looking for could not be found. Please check the URL
          or go back to the homepage.
        </p>
        <Link
          to='/'
          className='bg-cyan-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded inline-block'
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
