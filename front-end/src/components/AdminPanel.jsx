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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Panel
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Configure which components appear in each step of the onboarding wizard
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {configMessage && (
            <div className={`p-4 rounded-xl border-l-4 ${configMessage.includes('successfully') ? 'bg-gray-50 border-gray-900 text-gray-900' : 'bg-red-50 border-red-500 text-red-700'}`}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {configMessage.includes('successfully') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  )}
                </svg>
                {configMessage}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 2 Configuration */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Step 2 Components
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Select which components to show in the second step
              </p>
              
              <div className="space-y-3">
                {availableComponents.map((component) => (
                  <div key={component} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                    <input
                      type="checkbox"
                      id={`step2-${component}`}
                      checked={step2Components.includes(component)}
                      onChange={() => handleStep2Change(component)}
                      disabled={step3Components.includes(component)}
                      className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-500 focus:ring-2 disabled:opacity-50"
                    />
                    <label
                      htmlFor={`step2-${component}`}
                      className={`ml-3 text-sm font-medium cursor-pointer ${
                        step3Components.includes(component) 
                          ? 'text-gray-400' 
                          : step2Components.includes(component)
                          ? 'text-gray-900'
                          : 'text-gray-700'
                      }`}
                    >
                      {component}
                      {step3Components.includes(component) && (
                        <span className="text-xs text-gray-400 ml-2">(Used in Step 3)</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <div className="text-sm text-gray-900">
                  <strong>Selected:</strong> {step2Components.length > 0 ? step2Components.join(', ') : 'None'}
                </div>
              </div>
            </div>

            {/* Step 3 Configuration */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Step 3 Components
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Select which components to show in the third step
              </p>
              
              <div className="space-y-3">
                {availableComponents.map((component) => (
                  <div key={component} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                    <input
                      type="checkbox"
                      id={`step3-${component}`}
                      checked={step3Components.includes(component)}
                      onChange={() => handleStep3Change(component)}
                      disabled={step2Components.includes(component)}
                      className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-500 focus:ring-2 disabled:opacity-50"
                    />
                    <label
                      htmlFor={`step3-${component}`}
                      className={`ml-3 text-sm font-medium cursor-pointer ${
                        step2Components.includes(component) 
                          ? 'text-gray-400' 
                          : step3Components.includes(component)
                          ? 'text-gray-900'
                          : 'text-gray-700'
                      }`}
                    >
                      {component}
                      {step2Components.includes(component) && (
                        <span className="text-xs text-gray-400 ml-2">(Used in Step 2)</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <div className="text-sm text-gray-900">
                  <strong>Selected:</strong> {step3Components.length > 0 ? step3Components.join(', ') : 'None'}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-8 border-t">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                canSubmit
                  ? "text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-300"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              {canSubmit ? (
                <>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Save Configuration
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  Select components for both steps
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700">How it works</span>
            </div>
            <p className="text-sm text-gray-600">
              Each component can only be used in one step. Configure which forms appear in steps 2 and 3 of the onboarding wizard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
