import React from 'react';
import BackButton from '@/components/Login-registration-components/BackButton';
import RegistrationFormComponent from '@/components/Login-registration-components/RegistrationFormComponent';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7]">
      <div className="flex flex-col items-center w-[40rem] p-12 bg-[#e6d7c2] rounded-2xl shadow-xl mt-10">
        <div className="fixed top-8 left-8 z-50">
          <BackButton />
        </div>
        <h1 className="font-semibold text-4xl mb-8">Create an account</h1>

        <RegistrationFormComponent />
      </div>
    </div>
  );
};

export default Register;
