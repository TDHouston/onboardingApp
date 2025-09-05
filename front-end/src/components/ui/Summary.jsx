import React from "react";

const Summary = ({ formData, prevStep, submitForm }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-gray-600">Please review your details before submitting</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Email</div>
            <div className="text-gray-900">{formData.email || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Password</div>
            <div className="text-gray-900">••••••••</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Birth Date</div>
            <div className="text-gray-900">{formData.birthDate || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">About Me</div>
            <div className="text-gray-900">{formData.aboutMe || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Street</div>
            <div className="text-gray-900">{formData.street || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">City</div>
            <div className="text-gray-900">{formData.city || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">State</div>
            <div className="text-gray-900">{formData.state || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">ZIP Code</div>
            <div className="text-gray-900">{formData.zipCode || 'Not provided'}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <button
          onClick={prevStep}
          className="flex items-center justify-center px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-xl transition-all duration-200 focus:outline-none"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back
        </button>
        <button
          onClick={submitForm}
          className="flex-1 flex items-center justify-center px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-xl transition-all duration-200 focus:outline-none"
        >
          Submit Application
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Summary;
