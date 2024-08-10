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
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
        <div className="mb-4">
          <h3>Select Components for Step 2</h3>
          {availableComponents.map((component) => (
            <div key={component}>
              <label>
                <input
                  type="checkbox"
                  checked={step2Components.includes(component)}
                  onChange={() => handleStep2Change(component)}
                  disabled={step3Components.includes(component)}
                />
                {component}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h3>Select Components for Step 3</h3>
          {availableComponents.map((component) => (
            <div key={component}>
              <label>
                <input
                  type="checkbox"
                  checked={step3Components.includes(component)}
                  onChange={() => handleStep3Change(component)}
                  disabled={step2Components.includes(component)}
                />
                {component}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
