import React, { useEffect, useState } from "react";

const AboutMe = ({ saveStepData, formData }) => {
  const [aboutMe, setAboutMe] = useState(formData.aboutMe || "");

  useEffect(() => {
    saveStepData({ aboutMe });
  }, [aboutMe, saveStepData]);

  const handleChange = (e) => {
    setAboutMe(e.target.value);
  };

  return (
    <div className="p-5">
      <label
        for="aboutMe"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        Tell us something about yourself:
      </label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
        value={aboutMe}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default AboutMe;
