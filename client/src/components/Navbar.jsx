import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { FaRegTimesCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [onHover, setOnHover] = useState(false);

  const handleLogout = () => {
    logOut();
    Swal.fire({
      icon: 'success',
      title: 'Log out!',
    });
    localStorage.removeItem('kidsKraft_token');
    navigate('/', { replace: true });
  };

  if (loading) return <Loader dark={true} full={true} />;

  return (
    <header className='header '>
      <nav className='container relative flex justify-between items-center text-pink-600'>
        <Link to='/'>
          <div className='logo'>
            <h1 className='text-cyan-400 font-extrabold'>
              Kids<span className='text-pink-600'>Kraft</span>
            </h1>
            <img src={logo} alt='Kids Kraft Logo' />
          </div>
        </Link>
        <div className='md:flex gap-5 text-xl font-semibold hidden'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/all-toys'>All Toys</NavLink>
          {user && (
            <>
              <NavLink to='/my-toys'>My Toys</NavLink>
              <NavLink to='/add-toy'>Add Toys</NavLink>
            </>
          )}
          <NavLink to='/blogs'>Blogs</NavLink>
        </div>
        <div className='md:flex items-center gap-5 text-xl font-bold hidden'>
          {!user ? (
            <>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/register'>Register</NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className='px-4 border-2 border-pink-700 rounded-full hover:text-cyan-400 hover:border-cyan-400 transition-all'
            >
              Logout
            </button>
          )}
          {user && (
            <>
              <div
                className='w-12 h-12 border-2 border-pink-600 rounded-full cursor-pointer relative'
                onMouseOver={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    className='w-full h-full object-contain rounded-full'
                  />
                )}
              </div>
              {onHover && (
                <div className='bg-slate-900 rounded-lg w-48 p-2 absolute top-[70px] right-0'>
                  <h1 className='text-center text-lg'>{user.displayName}</h1>
                </div>
              )}
            </>
          )}
        </div>
        <div className='flex md:hidden gap-3'>
          <button className='text-3xl' onClick={() => setShowMenu((p) => !p)}>
            <FaBars />
          </button>
          {user && (
            <>
              <div
                className='w-12 h-12 border-2 border-pink-600 rounded-full cursor-pointer relative'
                onMouseOver={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    className='w-full h-full object-contain rounded-full'
                  />
                )}
              </div>
              {onHover && (
                <div className='bg-slate-900 rounded-lg w-48 p-2 absolute top-[70px] right-0'>
                  <h1 className='text-center text-lg'>{user.displayName}</h1>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      {showMenu && (
        <MobileMenu
          user={user}
          handleLogout={handleLogout}
          setShowMenu={setShowMenu}
        />
      )}
    </header>
  );
};

export default Navbar;

const MobileMenu = ({ user, handleLogout, setShowMenu }) => {
  return (
    <div className='absolute  top-20 right-1'>
      <div className='relative bg-slate-900 p-5 py-20 text-white w-64 rounded-md flex flex-col items-center gap-3 text-2xl font-bold'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/all-toys'>All Toys</NavLink>
        <NavLink to='/blogs'>Blogs</NavLink>
        {!user ? (
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to='/my-toys'>My Toys</NavLink>
            <NavLink to='/add-toy'>Add Toys</NavLink>
            <button
              onClick={handleLogout}
              className='px-4 border-2 border-white-700 rounded-full hover:text-cyan-400 hover:border-cyan-400 transition-all'
            >
              Logout
            </button>
          </>
        )}
        <button
          className='absolute top-4 right-4 text-4xl hover:text-red-600'
          onClick={() => setShowMenu(false)}
        >
          <FaRegTimesCircle />
        </button>
      </div>
    </div>
  );
};
