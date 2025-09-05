import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StepOne from "./StepOne";
import Birthdate from "./ui/BirthDate";
import AboutMe from "./ui/AboutMe";
import Address from "./ui/Address";
import Summary from "./ui/Summary";
import apiClient from "../features/apiClient";
import { fetchComponentConfig } from "../features/admin/adminSlice";

const Wizard = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aboutMe: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    birthDate: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const { step2Components, step3Components, loading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchComponentConfig());
  }, [dispatch]);

  const handleEmailSubmit = async (email, password) => {
    try {
      const response = await apiClient.post("/users/create", {
        email,
        password,
      });

      const { sessionId, formData: savedFormData, currentStep: savedStep } = response.data;

      // Store session info
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("email", email);
      
      // Update state with saved data if exists
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData);
          setFormData((prevData) => ({
            ...prevData,
            email,
            password,
            ...parsedData,
          }));
        } catch (parseError) {
          console.error("Error parsing saved form data:", parseError);
          setFormData((prevData) => ({
            ...prevData,
            email,
            password,
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          email,
          password,
        }));
      }
      
      // Update step and progress
      const stepToSet = savedStep || 1;
      setCurrentStep(stepToSet);
      updateProgress(stepToSet);
      
      return response.data;
    } catch (error) {
      console.error("Error in handleEmailSubmit:", error);
      throw error;
    }
  };

  const saveProgress = (updatedFormData = formData) => {
    const sessionId = localStorage.getItem("sessionId");
    apiClient
      .post(`/users/saveProgress`, {
        sessionId,
        step: currentStep,
        formData: JSON.stringify(updatedFormData),
      })
      .then(() => console.log("Progress saved successfully."))
      .catch((error) => console.error("Error saving progress:", error));
  };

  const saveStepData = (data) => {
    setFormData((prevData) => {
      const newData = { ...prevData, ...data };
      saveProgress(newData);
      return newData;
    });
  };

  const updateProgress = (step) => {
    const totalSteps = 3;
    const newProgress = Math.round((step / totalSteps) * 100);
    setProgress(newProgress);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateProgress(nextStep);
      saveProgress();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateProgress(prevStep);
    }
  };

  const submitForm = async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      console.error("Session ID is missing.");
      return;
    }

    try {
      const formattedData = {
        sessionId,
        email: formData.email,
        password: formData.password,
        aboutMe: formData.aboutMe,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        birthDate: formData.birthDate,
        formData: JSON.stringify(formData),
      };

      await apiClient.put(`/users/submit`, formattedData);

      setShowMessage(true);
      localStorage.removeItem("sessionId");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleCloseForm = () => {
    setShowMessage(false);
    setCurrentStep(0);
    setFormData({
      email: "",
      password: "",
      aboutMe: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      birthDate: "",
    });
    setProgress(0);
  };

  const renderComponent = (component) => {
    switch (component) {
      case "Birthdate":
        return <Birthdate saveStepData={saveStepData} formData={formData} />;
      case "AboutMe":
        return <AboutMe saveStepData={saveStepData} formData={formData} />;
      case "Address":
        return <Address saveStepData={saveStepData} formData={formData} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading wizard configuration...</p>
        </div>
      </div>
    );
  }

  if (showMessage) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-bounce-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="font-bold text-2xl text-gray-800 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8">
            Your information has been submitted successfully. Welcome aboard!
          </p>
          <button
            onClick={handleCloseForm}
            className="w-full text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm px-6 py-3 focus:outline-none transition-all duration-200"
          >
            Start New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Onboarding
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete your profile in just a few simple steps. Your progress is automatically saved.
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-blue-600">{progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gray-900 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep === step
                      ? 'bg-gray-900 text-white'
                      : currentStep > step
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    step + 1
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step ? 'bg-gray-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </header>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto transition-all duration-300">
          {currentStep === 0 && (
            <StepOne
              nextStep={nextStep}
              saveStepData={saveStepData}
              handleEmailSubmit={handleEmailSubmit}
            />
          )}
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
                <p className="text-gray-600">Tell us more about yourself</p>
              </div>
              
              {step2Components.map((component, index) => (
                <div key={index} className="animate-fade-in">
                  {renderComponent(component)}
                </div>
              ))}
              
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
                  onClick={() => {
                    saveStepData({});
                    nextStep();
                  }}
                  className="flex-1 flex items-center justify-center px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-xl transition-all duration-200 focus:outline-none"
                >
                  Continue
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Additional Details</h2>
                <p className="text-gray-600">Just a few more details to complete your profile</p>
              </div>
              
              {step3Components.map((component, index) => (
                <div key={index} className="animate-fade-in">
                  {renderComponent(component)}
                </div>
              ))}
              
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
                  onClick={() => {
                    saveStepData({});
                    nextStep();
                  }}
                  className="flex-1 flex items-center justify-center px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-xl transition-all duration-200 focus:outline-none"
                >
                  Review & Submit
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <Summary
              formData={formData}
              prevStep={prevStep}
              submitForm={submitForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
