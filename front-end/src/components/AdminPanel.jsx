import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep2Components,
  setStep3Components,
} from "../features/admin/adminSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const availableComponents = useSelector(
    (state) => state.admin.availableComponents
  );
  const step2Components = useSelector((state) => state.admin.step2Components);
  const step3Components = useSelector((state) => state.admin.step3Components);

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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-4">Admin Panel</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Select Components for Step 2</h3>
          {availableComponents.map((component) => (
            <div className="flex flex-col items-center py-1" key={component}>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  checked={step2Components.includes(component)}
                  onChange={() => handleStep2Change(component)}
                  disabled={step3Components.includes(component)}
                />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {component}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-medium">Select Components for Step 3</h3>
          {availableComponents.map((component) => (
            <div className="flex flex-col items-center py-1" key={component}>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  checked={step3Components.includes(component)}
                  onChange={() => handleStep3Change(component)}
                  disabled={step2Components.includes(component)}
                />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {component}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
