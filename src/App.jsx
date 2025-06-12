import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<div className='p-10 text-center'>Go to <a class='text-blue-600 underline' href='/admin'>/admin</a> to view the dashboard.</div>} />
      </Routes>
    </Router>
  );
}

export default App;