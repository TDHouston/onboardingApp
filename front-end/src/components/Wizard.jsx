import React, { useState } from "react";
import { useSelector } from "react-redux";
import StepOne from "./steps/StepOne";
import Birthdate from "./forms/BirthDate";
import AboutMe from "./forms/AboutMe";
import Address from "./forms/Address";

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
        <div>
          {step2Components.map((component) => renderComponent(component))}
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          {step3Components.map((component) => renderComponent(component))}
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Wizard;
