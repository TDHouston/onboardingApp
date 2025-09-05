import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [toggleNav, setToggleNav] = useState(false);

  const toggleNavbar = () => {
    setToggleNav(!toggleNav);
  };

  const closeNavbar = () => {
    setToggleNav(false);
  };

  // Close nav when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#navbar-default") &&
        !event.target.closest('button[aria-controls="navbar-default"]')
      ) {
        setToggleNav(false);
      }
    };

    if (toggleNav) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleNav]);

  return (
    <nav className="bg-white border-b border-gray-200 w-full sticky top-0 z-40">
      <div className="max-w-7xl flex flex-wrap items-center md:justify-between justify-end mx-auto px-6 py-4">
        {/* Logo/Brand */}
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-gray-900">
            Onboarding
          </h1>
        </div>
        
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
          aria-controls="navbar-default"
          aria-expanded={toggleNav}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${toggleNav ? 'rotate-90' : ''}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {toggleNav ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div
          className={`${
            toggleNav ? "absolute top-full right-4 w-48 z-50 animate-slide-down" : "hidden"
          } md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-2 md:mt-0 bg-white md:bg-transparent border border-gray-100 md:border-0 rounded-xl md:rounded-none shadow-xl md:shadow-none md:flex-row md:space-x-1 space-y-2 md:space-y-0">
            <li>
              <Link
                to="/"
                className="flex items-center py-3 px-4 text-gray-700 rounded-lg hover:bg-gray-100 md:hover:bg-gray-100 md:py-2 md:px-4 transition-all duration-200 font-medium"
                onClick={closeNavbar}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Wizard
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="flex items-center py-3 px-4 text-gray-700 rounded-lg hover:bg-gray-100 md:hover:bg-gray-100 md:py-2 md:px-4 transition-all duration-200 font-medium"
                onClick={closeNavbar}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin
              </Link>
            </li>
            <li>
              <Link
                to="/data"
                className="flex items-center py-3 px-4 text-gray-700 rounded-lg hover:bg-gray-100 md:hover:bg-gray-100 md:py-2 md:px-4 transition-all duration-200 font-medium"
                onClick={closeNavbar}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                Database
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
