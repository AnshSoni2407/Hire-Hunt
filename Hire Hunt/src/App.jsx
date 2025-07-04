import React from 'react'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeDashboard from './components/dashboard/EmployeDashboard';
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';
import SavedJobs from './components/JobSeeker/SavedJobs';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/employerDash" element={<EmployeDashboard />} />
          <Route path="/jobseekerDash" element={<JobSeekerDashboard />} />
          <Route path='/saveJobsPage' element={<SavedJobs/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App