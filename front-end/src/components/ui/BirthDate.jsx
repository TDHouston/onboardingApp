import React, { useState, useEffect } from "react";

const BirthDate = ({ saveStepData, formData }) => {
  const [birthDate, setBirthDate] = useState(formData.birthDate || "");

  useEffect(() => {
    saveStepData({ birthDate });
  }, [birthDate, saveStepData]);

  const handleChange = (e) => {
    setBirthDate(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-42 md:w-46">
        <label
          htmlFor="birthdate"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Birth Date:
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            value={birthDate}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default BirthDate;
