import React, { useEffect, useState } from "react";

const AboutMe = ({ saveStepData, formData }) => {
  const [aboutMe, setAboutMe] = useState(formData.aboutMe || "");

  useEffect(() => {
    saveStepData({ aboutMe });
  }, [aboutMe]);

  const handleChange = (e) => {
    setAboutMe(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">About You</h3>
        <p className="text-gray-600 text-sm">Tell us a little about yourself</p>
      </div>

      <div>
        <label
          htmlFor="aboutMe"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          About Me
        </label>
        <textarea
          id="aboutMe"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
          placeholder="Tell us about your interests, hobbies, or anything you'd like to share..."
          value={aboutMe}
          onChange={handleChange}
        ></textarea>
        
        {aboutMe && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">Character count: {aboutMe.length}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
