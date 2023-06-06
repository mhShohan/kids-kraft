import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import SocialMediaLogin from '../components/SocialMediaLogin';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
  useTitle('Login');
  const { logIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';
  //navigate(from, { replace: true });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    if (data.password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Password Must Have 6 Characters!' });
      return;
    } else {
      logIn(data);
      reset();
      navigate(from, { replace: true });
    }
  };

  return (
    <div className='flex items-center justify-center py-10 bg-slate-400'>
      <div className='w-full max-w-sm border-2 border-gray-400 p-6 rounded bg-white shadow-md'>
        <form onSubmit={handleSubmit(handleLogin)} className='mb-4'>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
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
              Login
            </button>
          </div>
          <p className='text-center font-semibold mt-2'>
            Don't have any account?{' '}
            <Link to='/register' className='text-blue-700'>
              Register Here
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

export default Login;
