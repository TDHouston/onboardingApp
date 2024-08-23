import React, { useEffect, useState } from "react";

const Address = ({ saveStepData, formData }) => {
  const [street, setStreet] = useState(formData.street || "");
  const [city, setCity] = useState(formData.city || "");
  const [state, setState] = useState(formData.state || "");
  const [zipCode, setZipCode] = useState(formData.zipCode || "");

  useEffect(() => {
    saveStepData({ street, city, state, zipCode });
  }, [street, city, state, zipCode, saveStepData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "street") setStreet(value);
    if (name === "city") setCity(value);
    if (name === "state") setState(value);
    if (name === "zipcode") setZipCode(value);
  };

  return (
    <form className="flex flex-col items-center">
      <div>
        <label
          htmlFor="street"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Street
        </label>
        <div>
          <input
            id="street"
            name="street"
            type="text"
            autoComplete="street-address"
            value={street}
            onChange={handleChange}
            className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1 mt-2">
        <label
          htmlFor="city"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          City
        </label>
        <div>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={city}
            onChange={handleChange}
            className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2 mt-2">
        <label
          htmlFor="state"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          State
        </label>
        <div>
          <input
            id="state"
            name="state"
            type="text"
            autoComplete="state"
            value={state}
            onChange={handleChange}
            className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2 mt-2">
        <label
          htmlFor="zipcode"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          ZIP / Postal code
        </label>
        <div>
          <input
            id="zipcode"
            name="zipcode"
            type="text"
            autoComplete="zipcode"
            value={zipCode}
            onChange={handleChange}
            className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </form>
  );
};

export default Address;
