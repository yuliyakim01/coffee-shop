import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import cart from '../../assets/cart.png';
import burger from '../../assets/burger.png';
import close from '../../assets/close.png';

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
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/about">ABOUT</a>
            </li>
            <li>
              <a href="/menu">MENU</a>
            </li>
            <li>
              <a href="/products">PRODUCTS</a>
            </li>
            <li>
              <a href="/locations">LOCATIONS</a>
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          <a
            href="/login"
            className="bg-white text-black px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-200 transition"
          >
            LOGIN
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-red-600 w-full flex justify-between items-center pt-2">
      <div>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>

      {/* Desktop navigation */}
      <nav className="max-[900px]:hidden">
        <ul className="flex justify-center items-center gap-8 text-white text-lg">
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>
          <li>
            <a href="/menu">MENU</a>
          </li>
          <li>
            <a href="/products">PRODUCTS</a>
          </li>
          <li>
            <a href="/locations">LOCATIONS</a>
          </li>
        </ul>
      </nav>

      <div className="flex justify-center items-center">
        <div>
          <a href="/cart">
            <img src={cart} alt="cart" className="w-8 mr-8" />
          </a>
        </div>
        <div>
          <a href="/login" className="bg-LightTaupe px-4 py-2 rounded text-lg text-white max-[900px]:hidden">
            LOGIN
          </a>
        </div>
        <div className="flex justify-center items-center">
          <img src={burger} onClick={toggleMenu} alt="Burger-icon" className="hidden w-8 max-[900px]:flex" />
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
