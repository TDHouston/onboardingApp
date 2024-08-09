import React, { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
      {currentStep === 1 && <StepTwo nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 2 && (
        <StepThree prevStep={prevStep} nextStep={nextStep} />
      )}
    </div>
  );
};

export default Wizard;
