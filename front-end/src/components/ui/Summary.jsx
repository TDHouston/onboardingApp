import React from "react";

const Summary = ({ formData, prevStep, submitForm }) => {
  return (
    <div className="w-7/12 md:w-1/3">
      <h2 className="font-bold mb-4">Review Your Information:</h2>

      <div className="mb-4">
        <strong>Email:</strong> {formData.email}
      </div>
      <div className="mb-4">
        <strong>Password:</strong> {formData.password}
      </div>
      <div className="mb-4">
        <strong>Birthdate:</strong> {formData.birthDate}
      </div>
      <div className="mb-4">
        <strong>About Me:</strong> {formData.aboutMe}
      </div>
      <div className="mb-4">
        <strong>Street:</strong> {formData.street}
      </div>
      <div className="mb-4">
        <strong>City:</strong> {formData.city}
      </div>
      <div className="mb-4">
        <strong>State:</strong> {formData.state}
      </div>
      <div className="mb-4">
        <strong>ZIP / Postal Code:</strong> {formData.zipCode}
      </div>

      <div className="w-full flex flex-row justify-between mt-5">
        <button
          onClick={prevStep}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Back
        </button>
        <button
          onClick={submitForm}
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Summary;
