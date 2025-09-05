import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wizard from "./components/Wizard";
import AdminPanel from "./components/AdminPanel";
import DataTable from "./components/DataTable";
import Nav from "./components/Nav";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="transition-all duration-300">
          <Routes>
            <Route path="/" element={<Wizard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/data" element={<DataTable />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
