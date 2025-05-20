import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '@/utils/customerUtils';

function ProfileModal() {
  return (
    <div className=" w-[200px]  bg-brown p-6 flex flex-col items-center gap-4 rounded-xl shadow-lg animate-slideFade z-50">
      <Link to="/profile" className="text-americanSilver hover:text-white transition-colors duration-200">
        Profile
      </Link>
      <button onClick={logoutUser} className="text-americanSilver hover:text-white transition-colors duration-200">
        Log Out
      </button>
    </div>
  );
}

export default ProfileModal;
