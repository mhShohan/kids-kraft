import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader dark={true} full={true} />;
  }

  if (user) return children;

  return (
    <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
  );
};

export default PrivateRoute;
