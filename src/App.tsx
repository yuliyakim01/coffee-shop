import React from 'react';
import ProductPage from '@/pages/ProductPage';
import HomePage from '@/pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import About from './pages/About';
import Menu from './pages/Menu';
import Location from './pages/Location';
import Login from './pages/Login';
import Register from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/locations',
        element: <Location />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
