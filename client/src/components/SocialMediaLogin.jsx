import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const SocialMediaLogin = () => {
  const { googleLogin, setLoading } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = () => {
    googleLogin()
      .then((currUser) => {
        const { displayName, email, photoURL } = currUser.user;

        fetch('https://kids-kraft.vercel.app/users/social-login', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ displayName, email, photoURL }),
        })
          .then((res) => res.json())
          .then((data) => {});

        setLoading(false);
        navigate(from, { replace: true });
        Swal.fire({ icon: 'success', title: 'Successfully Login' });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };

  return (
    <div className='flex items-center justify-between flex-col gap-2 mt-4'>
      <button
        className='flex items-center gap-2 bg-cyan-800 hover:bg-pink-700 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={handleGoogleLogin}
      >
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default SocialMediaLogin;
