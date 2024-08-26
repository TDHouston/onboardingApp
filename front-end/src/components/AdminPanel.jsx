import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep2Components,
  setStep3Components,
  fetchComponentConfig,
  submitComponentConfig,
} from "../features/admin/adminSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const availableComponents = useSelector(
    (state) => state.admin.availableComponents
  );
  const step2Components = useSelector((state) => state.admin.step2Components);
  const step3Components = useSelector((state) => state.admin.step3Components);
  const [canSubmit, setCanSubmit] = useState(false);
  const [configMessage, setConfigMessage] = useState("");

  useEffect(() => {
    dispatch(fetchComponentConfig());
  }, [dispatch]);

  useEffect(() => {
    setCanSubmit(step2Components.length > 0 && step3Components.length > 0);
  }, [step2Components, step3Components]);

  const handleStep2Change = (component) => {
    let updatedComponents = [...step2Components];
    if (updatedComponents.includes(component)) {
      updatedComponents = updatedComponents.filter((c) => c !== component);
    } else {
      updatedComponents.push(component);
    }
    dispatch(setStep2Components(updatedComponents));
  };

  const handleStep3Change = (component) => {
    let updatedComponents = [...step3Components];
    if (updatedComponents.includes(component)) {
      updatedComponents = updatedComponents.filter((c) => c !== component);
    } else {
      updatedComponents.push(component);
    }
    dispatch(setStep3Components(updatedComponents));
  };

  const handleSubmit = () => {
    const payload = [
      ...step2Components.map((component, index) => ({
        componentName: component,
        pageNumber: 2,
        position: index,
      })),
      ...step3Components.map((component, index) => ({
        componentName: component,
        pageNumber: 3,
        position: index,
      })),
    ];

    dispatch(submitComponentConfig(payload))
      .then(() => {
        setConfigMessage("Configuration saved successfully!");
        setTimeout(() => setConfigMessage(""), 3000);
      })
      .catch((error) => {
        setConfigMessage("Failed to save configuration.");
        setTimeout(() => setConfigMessage(""), 3000);
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-4">Admin Panel</h2>
        <div className="mb-4 flex flex-col items-center">
          <h3 className="text-lg font-medium">Select Components for Step 2</h3>
          <div className="w-32 flex flex-col items-start">
            {availableComponents.map((component) => (
              <div className="flex flex-col py-1" key={component}>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={step2Components.includes(component)}
                    onChange={() => handleStep2Change(component)}
                    disabled={step3Components.includes(component)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {component}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium">Select Components for Step 3</h3>
          <div className="w-32 flex flex-col items-start">
            {availableComponents.map((component) => (
              <div className="flex flex-col py-1" key={component}>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={step3Components.includes(component)}
                    onChange={() => handleStep3Change(component)}
                    disabled={step2Components.includes(component)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {component}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`text-white ${
            canSubmit
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          } focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4`}
        >
          Save Configuration
        </button>

        {configMessage && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-green-600">
              {configMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
