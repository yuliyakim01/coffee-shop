import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import cart from '../../assets/cart.png';
import burger from '../../assets/burger.png';
import close from '../../assets/close.png';
import loginIcon from '../../assets/login-icon.svg';
import registerIcon from '../../assets/register-icon.svg';
import { LABELS, ROUTES } from '@/data/routes';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const modal = () => {
    return (
      <div>
        <nav>
          <ul className="flex flex-col items-center gap-8 text-white text-lg">
            <li>
              <Link to={ROUTES.main} className="uppercase">
                {LABELS.home}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.about} className="uppercase">
                {LABELS.about}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.menu} className="uppercase">
                {LABELS.menu}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.products} className="uppercase">
                {LABELS.products}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.locations} className="uppercase">
                {LABELS.locations}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          <Link
            to={ROUTES.login}
            className="flex items-center justify-center gap-2 w-fit mx-auto uppercase bg-white text-black px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-200 transition"
          >
            <img src={loginIcon} alt="Login icon" className="w-5 h-5" />
            {LABELS.login}
          </Link>
        </div>
        <div className="mt-8">
          <Link
            to={ROUTES.register}
            className="flex items-center justify-center gap-2 w-fit mx-auto uppercase bg-white text-black px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-200 transition"
          >
            <img src={registerIcon} alt="Register icon" className="w-5 h-5" />
            {LABELS.register}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="z-10 w-full flex justify-between items-center pt-2">
      <div>
        <Link to={ROUTES.main}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* Desktop navigation */}
      <nav className="max-[900px]:hidden">
        <ul className="flex justify-center items-center gap-8 text-white text-lg">
          <li>
            <Link to={ROUTES.main} className="uppercase">
              {LABELS.home}
            </Link>
          </li>
          <li>
            <Link to={ROUTES.about} className="uppercase">
              {LABELS.about}
            </Link>
          </li>
          <li>
            <Link to={ROUTES.menu} className="uppercase">
              {LABELS.menu}
            </Link>
          </li>
          <li>
            <Link to={ROUTES.products} className="uppercase">
              {LABELS.products}
            </Link>
          </li>
          <li>
            <Link to={ROUTES.locations} className="uppercase">
              {LABELS.locations}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex justify-center items-center">
        <div>
          <Link to={ROUTES.cart}>
            <img src={cart} alt="cart" className="w-8 mr-8" />
          </Link>
        </div>
        <div>
          <Link
            to={ROUTES.login}
            className="uppercase bg-LightTaupe px-4 py-2 rounded text-lg text-white max-[900px]:hidden flex items-center gap-2"
          >
            <img src={loginIcon} alt="Login icon" className="w-5 h-5" />
            {LABELS.login}
          </Link>
        </div>
        <div className="ml-2">
          <Link
            to={ROUTES.register}
            className="uppercase bg-LightTaupe px-4 py-2 rounded text-lg text-white max-[900px]:hidden flex items-center gap-2"
          >
            <img src={registerIcon} alt="Register icon" className="w-5 h-5" />
            {LABELS.register}
          </Link>
        </div>

        <div className="flex justify-center items-center pr-5">
          <img
            src={burger}
            onClick={toggleMenu}
            alt="Burger-icon"
            className="hidden w-8 max-[900px]:flex cursor-pointer"
          />
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-10 flex">
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu} />

          {/* Modal content */}
          <div className="relative z-20 bg-LightTaupe w-[70%] h-full flex flex-col justify-center items-center gap-8">
            <img
              src={close}
              alt="Close-icon"
              onClick={closeMenu}
              className="w-8 absolute top-5 right-5 cursor-pointer"
            />
            {modal()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
