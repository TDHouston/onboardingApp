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

    let sessionId = localStorage.getItem("sessionId");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      createUserOrLoadExisting(email, password);
    } else if (sessionId) {
      loadSessionProgress(sessionId);
    }
  }, [dispatch]);

  const createUserOrLoadExisting = async (email, password) => {
    try {
      const response = await apiClient.post(`/users/create`, {
        email,
        password,
      });
      const { sessionId, formData, currentStep } = response.data;

      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      setCurrentStep(currentStep);
      setFormData((prevData) => ({
        ...prevData,
        ...JSON.parse(formData),
      }));
      updateProgress(currentStep);
    } catch (error) {
      console.error("Error creating user or loading existing data:", error);
    }
  };

  const loadSessionProgress = async (sessionId) => {
    try {
      const response = await apiClient.get(`/users/progress/${sessionId}`);
      const { currentStep, formData } = response.data;

      setCurrentStep(currentStep);
      setFormData((prevData) => ({
        ...prevData,
        ...JSON.parse(formData),
      }));
      updateProgress(currentStep);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found, starting fresh.");
      } else {
        console.error("Error loading progress:", error);
      }
    }
  };

  const generateSessionId = () => {
    return Math.random().toString(36).substr(2, 9);
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
    return <div>Loading...</div>;
  }

  if (showMessage) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h2 className="font-bold text-xl mb-4">
          Thank you! Your data has been submitted successfully.
        </h2>
        <button
          onClick={handleCloseForm}
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <header className="w-full py-3">
        <h1 className="flex justify-center font-semibold py-4 text-2xl">
          Welcome To The Onboarding Wizard
        </h1>
        <div className="w-full flex justify-center">
          <div className="w-3/4 md:w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </header>

      {currentStep === 0 && (
        <StepOne nextStep={nextStep} saveStepData={saveStepData} />
      )}
      {currentStep === 1 && (
        <div className="w-11/12 md:w-5/6">
          {step2Components.map((component) => renderComponent(component))}
          <div className="w-full flex flex-row justify-between mt-5">
            <button
              onClick={prevStep}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Back
            </button>
            <button
              onClick={() => {
                saveStepData({});
                nextStep();
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="w-11/12 md:w-5/6">
          {step3Components.map((component) => renderComponent(component))}
          <div className="w-full flex flex-row justify-between mt-5">
            <button
              onClick={prevStep}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Back
            </button>
            <button
              onClick={() => {
                saveStepData({});
                nextStep();
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
            >
              Next
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
  );
};

export default Wizard;
