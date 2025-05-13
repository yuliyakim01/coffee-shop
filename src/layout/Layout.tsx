import Header from '@/components/Header-components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer-components/Footer';

function Layout() {
  return (
    <div
      className="max-w-[1440px] w-full flex flex-col items-center px-5 
    "
    >
      <Header />
      <div className="w-full flex-1 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
