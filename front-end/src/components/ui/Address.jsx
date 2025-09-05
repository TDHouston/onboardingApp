import React, { useEffect, useState } from "react";

const Address = ({ saveStepData, formData }) => {
  const [street, setStreet] = useState(formData?.street || "");
  const [city, setCity] = useState(formData?.city || "");
  const [state, setState] = useState(formData?.state || "");
  const [zipCode, setZipCode] = useState(formData?.zipCode || "");

  useEffect(() => {
    const data = { street, city, state, zipCode };
    saveStepData(data);
  }, [street, city, state, zipCode, saveStepData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "street":
        setStreet(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "zipCode":
        setZipCode(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Address</h3>
        <p className="text-gray-600 text-sm">Help us know where to reach you</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
            Street Address
          </label>
          <div className="relative">
            <input
              id="street"
              name="street"
              type="text"
              autoComplete="street-address"
              value={street}
              onChange={handleChange}
              placeholder="Enter your street address"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
              State / Province
            </label>
            <input
              id="state"
              name="state"
              type="text"
              autoComplete="address-level1"
              value={state}
              onChange={handleChange}
              placeholder="Enter your state"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
            ZIP / Postal Code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            autoComplete="postal-code"
            value={zipCode}
            onChange={handleChange}
            placeholder="Enter your ZIP code"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Address Preview */}
      {(street || city || state || zipCode) && (
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-900">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">Address Preview:</p>
              <div className="text-sm text-gray-600">
                {street && <div>{street}</div>}
                {(city || state || zipCode) && (
                  <div>
                    {city}{city && (state || zipCode) ? ', ' : ''}
                    {state} {zipCode}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
