import React from 'react';
import { Link, type NavigateFunction, useNavigate } from 'react-router-dom';
import { logoutUser } from '@/utils/customerUtils';
import { LABELS, ROUTES } from '@/data/routes';
import { useCart } from '@/utils/useCart';

function ProfileModal() {
  const navigate: NavigateFunction = useNavigate();
  const { setCart } = useCart();

  const handleLogout = () => {
    logoutUser(setCart);
    navigate(ROUTES.main);
  };

  return (
    <div
      className=" w-[200px]  bg-brown p-6 flex flex-col items-center gap-4 rounded-xl shadow-lg animate-slideFade z-50"
      role="dialog"
    >
      <Link to={ROUTES.profile} className="text-americanSilver hover:text-white transition-colors duration-200">
        {LABELS.profile}
      </Link>
      <button onClick={handleLogout} className="text-americanSilver hover:text-white transition-colors duration-200">
        {LABELS.logout}
      </button>
    </div>
  );
}

export default ProfileModal;
