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
    <nav className="bg-white border-gray-200 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center md:justify-center justify-end mx-auto p-4">
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center absolute top-5 text-sm text-gray-500 rounded-lg md:hidden bg-neutral-200 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={toggleNav}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            toggleNav ? "absolute top-0 right-2 w-32 z-50" : "hidden"
          } md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                aria-current="page"
                onClick={closeNavbar}
              >
                Wizard
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                onClick={closeNavbar}
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                to="/data"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                onClick={closeNavbar}
              >
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
