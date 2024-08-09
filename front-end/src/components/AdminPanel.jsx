import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setComponents } from "../features/admin/adminSlice";

const AdminPanel = () => {
  const [step2Components, setStep2] = useState([]);
  const [step3Components, setStep3] = useState([]);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(setComponents({ step2Components, step3Components }));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Step 2 Components</h3>
        {/* Add options for selecting components */}
        <button onClick={handleSave}>Save Configuration</button>
      </div>
      <div>
        <h3>Step 3 Components</h3>
        {/* Add options for selecting components */}
      </div>
    </div>
  );
};

export default AdminPanel;
