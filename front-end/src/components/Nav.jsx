import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav class="bg-white border-gray-200 w-full ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                aria-current="page"
              >
                Wizard
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                to="/data"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
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
