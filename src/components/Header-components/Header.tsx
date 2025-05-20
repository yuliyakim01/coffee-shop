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
              <Link
                to={ROUTES.main}
                onClick={closeMenu}
                className="group uppercase transition-transform duration-500 ease-in-out"
              >
                <span className="inline-block transition-transform duration-500 ease-in-out group-hover:scale-110">
                  {LABELS.home}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.about}
                onClick={closeMenu}
                className="group uppercase transition-transform duration-500 ease-in-out"
              >
                <span className="inline-block transition-transform duration-500 ease-in-out group-hover:scale-110">
                  {LABELS.about}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.menu}
                onClick={closeMenu}
                className="group uppercase transition-transform duration-500 ease-in-out"
              >
                <span className="inline-block transition-transform duration-500 ease-in-out group-hover:scale-110">
                  {LABELS.menu}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.products}
                onClick={closeMenu}
                className="group uppercase transition-transform duration-500 ease-in-out"
              >
                <span className="inline-block transition-transform duration-500 ease-in-out group-hover:scale-110">
                  {LABELS.products}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.locations}
                onClick={closeMenu}
                className="group uppercase transition-transform duration-500 ease-in-out"
              >
                <span className="inline-block transition-transform duration-500 ease-in-out group-hover:scale-110">
                  {LABELS.locations}
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <Link
            to={ROUTES.login}
            onClick={closeMenu}
            className="group flex items-center justify-center gap-2 w-fit mx-auto uppercase bg-LightTaupe text-white px-6 py-2 rounded-md text-lg font-medium transition-transform duration-500 ease-in-out"
          >
            <img src={loginIcon} alt="Login icon" className="w-5 h-5" />
            <span className="transition-transform duration-500 ease-in-out group-hover:scale-110">{LABELS.login}</span>
          </Link>
        </div>

        <div className="mt-4">
          <Link
            to={ROUTES.register}
            onClick={closeMenu}
            className="group flex items-center justify-center gap-2 w-fit mx-auto uppercase bg-LightTaupe text-white px-6 py-2 rounded-md text-lg font-medium transition-transform duration-500 ease-in-out"
          >
            <img src={registerIcon} alt="Register icon" className="w-5 h-5" />
            <span className="transition-transform duration-500 ease-in-out group-hover:scale-110">
              {LABELS.register}
            </span>
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
        <div className="flex gap-2 max-[900px]:hidden">
          <Link
            to={ROUTES.login}
            className="group uppercase bg-LightTaupe px-3 py-1.5 rounded-md text-base text-white flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:scale-[1.03] hover:bg-[#bc8f7a]"
          >
            <img
              src={loginIcon}
              alt="Login icon"
              className="w-4 h-4 transition-opacity duration-500 group-hover:opacity-90"
            />
            {LABELS.login}
          </Link>

          <Link
            to={ROUTES.register}
            className="group uppercase bg-LightTaupe px-3 py-1.5 rounded-md text-base text-white flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:scale-[1.03] hover:bg-[#bc8f7a]"
          >
            <img
              src={registerIcon}
              alt="Register icon"
              className="w-4 h-4 transition-opacity duration-500 group-hover:opacity-90"
            />
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

      {/* Modal Overlay - Always Mounted */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-10 flex transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay background */}
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500" onClick={closeMenu} />

        {/* Modal content */}
        <div
          className={`relative z-20 bg-LightTaupe w-[70%] h-full flex flex-col justify-center items-center gap-8 
      transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <img src={close} alt="Close-icon" onClick={closeMenu} className="w-8 absolute top-5 right-5 cursor-pointer" />
          {modal()}
        </div>
      </div>
    </div>
  );
}

export default Header;
