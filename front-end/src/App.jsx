import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wizard from "./components/Wizard";
import AdminPanel from "./components/AdminPanel";
import DataTable from "./components/DataTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wizard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/data" element={<DataTable />} />
      </Routes>
    </Router>
  );
};

export default App;
