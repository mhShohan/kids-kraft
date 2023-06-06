import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../utils/firebase.config';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider(auth);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);

  //login with google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  // email/password register
  const registerUser = ({ email, password, name, photoUrl }) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        const newData = {
          email,
          name,
          photoUrl,
          password,
        };

        fetch('https://kids-kraft.vercel.app/users/register', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(newData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });

        updateProfile(currentUser.user, {
          displayName: name,
          photoURL: photoUrl,
        }).then((a) => {
          setLoading(false);
          logOut();
          Swal.fire({
            icon: 'success',
            title: 'Successfully Registered!',
            text: 'Login Now',
          });
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          Swal.fire({
            icon: 'error',
            title: 'Email Already in Use!',
          });
          return;
        }
      });
  };

  // email/password login
  const logIn = ({ email, password }) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const authHandler = {
    user,
    loading,
    setLoading,
    setUpdate,
    googleLogin,
    registerUser,
    logIn,
    logOut,
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      fetch('https://kids-kraft.vercel.app/users/token', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: currentUser?.email,
          name: currentUser?.displayName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem('kidsKraft_token', data.token);
          }
        });

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [update]);

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
