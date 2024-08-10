import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full py-4 bg-blue-600">
      <div className="flex justify-center space-x-4">
        <Link to="/" className="text-white font-semibold">
          Wizard
        </Link>
        <Link to="/admin" className="text-white font-semibold">
          Admin
        </Link>
        <Link to="/data" className="text-white font-semibold">
          Database
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
