import React from "react";

const BirthDate = () => {
  return (
    <div>
      <label
        htmlFor="birthdate"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Birth Date
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default BirthDate;
