import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import SocialMediaLogin from '../components/SocialMediaLogin';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
  useTitle('Register');

  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    if (data.password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Password Must Have 6 Characters!' });
      return;
    } else {
      registerUser(data);
      reset();
    }
  };

  return (
    <div className='flex items-center justify-center py-10 bg-slate-400'>
      <div className='w-full max-w-sm border-2 border-gray-400 p-6 rounded bg-white shadow-md'>
        <form onSubmit={handleSubmit(handleRegister)} className='mb-4'>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name*
            </label>
            <input
              className={`${
                errors['name'] && 'border-red-600'
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id='name'
              type='text'
              name='name'
              {...register('name', { required: true })}
              placeholder='Enter your name'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email*
            </label>
            <input
              className={`${
                errors['email'] && 'border-red-600'
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id='email'
              type='email'
              name='email'
              {...register('email', { required: true })}
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='photoUrl'
            >
              Photo URL
            </label>
            <input
              className={`${
                errors['photUrl'] && 'border-red-600'
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type='text'
              name='photoUrl'
              {...register('photoUrl')}
              placeholder='Enter your photoUrl'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password*
            </label>
            <input
              className={`${
                errors['password'] && 'border-red-600'
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id='password'
              type='password'
              name='password'
              {...register('password', { required: true })}
              placeholder='Enter your password'
            />
          </div>

          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Register
            </button>
          </div>
          <p className='text-center font-semibold mt-2'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-700'>
              Login Here
            </Link>
          </p>
        </form>
        <div className='divider'>
          <span className='divider-text'>or</span>
        </div>

        <SocialMediaLogin />
      </div>
    </div>
  );
};

export default Register;
