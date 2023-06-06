import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-tabs/style/react-tabs.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/homepage/Home.jsx';
import AddToy from './pages/AddToy.jsx';
import AllToys from './pages/allToys/AllToys.jsx';
import MyToys from './pages/MyToys.jsx';
import Blogs from './pages/Blogs.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import ToyDetails from './pages/ToyDetails.jsx';
import UpdateToy from './pages/updateToy.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/add-toy',
        element: (
          <PrivateRoute>
            <AddToy />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-toys',
        element: (
          <PrivateRoute>
            <MyToys />
          </PrivateRoute>
        ),
      },
      {
        path: '/all-toys',
        element: <AllToys />,
      },
      {
        path: '/update-toy/:id',
        element: (
          <PrivateRoute>
            <UpdateToy />
          </PrivateRoute>
        ),
      },
      {
        path: '/all-toys/:id',
        element: (
          <PrivateRoute>
            <ToyDetails />
          </PrivateRoute>
        ),
      },
      { path: '/blogs', element: <Blogs /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
