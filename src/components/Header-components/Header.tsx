import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LABELS, ROUTES } from '@/data/routes';
import { Nav } from './Nav';
import logo from '../../assets/logo.png';
import cart from '../../assets/cart.png';
import burger from '../../assets/burger.png';
import close from '../../assets/close.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="z-10 w-full flex justify-between items-center pt-2">
      <div>
        <Link to={ROUTES.main}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="max-[900px]:hidden">
        <Nav />
      </div>

      <div className="flex justify-center items-center">
        <div>
          <Link to={ROUTES.cart}>
            <img src={cart} alt="cart" className="w-8 mr-8" />
          </Link>
        </div>
        <div>
          <Link
            to={ROUTES.login}
            className="uppercase bg-LightTaupe px-4 py-2 rounded text-lg text-white max-[900px]:hidden"
          >
            {LABELS.login}
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

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-10 flex">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu} />
          <div className="relative z-20 bg-LightTaupe w-[70%] h-full flex flex-col justify-center items-center gap-8">
            <img
              src={close}
              alt="Close-icon"
              onClick={closeMenu}
              className="w-8 absolute top-5 right-5 cursor-pointer"
            />
            <Nav isVertical onItemClick={closeMenu} />
            <div className="mt-8">
              <Link
                to={ROUTES.login}
                className="block w-fit mx-auto uppercase bg-white text-black px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-200 transition"
                onClick={closeMenu}
              >
                {LABELS.login}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
