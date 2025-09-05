import React, { useState, useEffect } from "react";

const BirthDate = ({ saveStepData, formData }) => {
  const [birthDate, setBirthDate] = useState(formData?.birthDate || "");

  useEffect(() => {
    saveStepData({ birthDate });
  }, [birthDate]);

  const handleChange = (e) => {
    setBirthDate(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm6-6V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Birthday</h3>
        <p className="text-gray-600 text-sm">When were you born?</p>
      </div>

      <div className="max-w-sm mx-auto">
        <label
          htmlFor="birthdate"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Birth Date
        </label>
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          value={birthDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 text-gray-900"
        />
        
        {birthDate && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600">
              <strong>Selected:</strong> {new Date(birthDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthDate;
