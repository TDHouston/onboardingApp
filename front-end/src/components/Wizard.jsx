import React, { useState } from "react";
import { useSelector } from "react-redux";
import StepOne from "./StepOne";
import Birthdate from "./ui/BirthDate";
import AboutMe from "./ui/AboutMe";
import Address from "./ui/Address";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const step2Components = useSelector((state) => state.admin.step2Components);
  const step3Components = useSelector((state) => state.admin.step3Components);

  const updateProgress = (step) => {
    const totalSteps = 3;
    const newProgress = (step / totalSteps) * 100;
    setProgress(newProgress);
  };

  const nextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    updateProgress(nextStep);
  };

  const prevStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    updateProgress(prevStep);
  };

  const renderComponent = (component) => {
    switch (component) {
      case "Birthdate":
        return <Birthdate />;
      case "AboutMe":
        return <AboutMe />;
      case "Address":
        return <Address />;
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <header className="w-full py-3">
        <h1 className="flex justify-center font-semibold py-2">
          Welcome To The Onboarding Wizard
        </h1>
        <div className="w-full flex justify-center">
          <div className="w-2/4 bg-gray-200 rounded-full dark:bg-gray-700 mb-4">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </header>

      {currentStep === 0 && <StepOne nextStep={nextStep} />}
      {currentStep === 1 && (
        <div className="w-7/12 md:w-1/3" >
          {step2Components.map((component) => renderComponent(component))}
          <div className="w-full flex flex-row justify-between mt-5">
            <button
              onClick={prevStep}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="w-7/12 md:w-1/3" >
          {step3Components.map((component) => renderComponent(component))}
          <div className="w-full flex flex-row justify-between mt-5">
            <button
              onClick={prevStep}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wizard;
