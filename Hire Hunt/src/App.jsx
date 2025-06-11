import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeDashboard from './components/dashboard/EmployeDashboard';
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/employerDash" element={<EmployeDashboard />} />
          <Route path="/jobseekerDash" element={<JobSeekerDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App