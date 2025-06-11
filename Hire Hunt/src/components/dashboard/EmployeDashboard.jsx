import React from "react";
import Header from "../Reusable.jsx/Header";
import CardContainer from "../Reusable.jsx/CardContainer";
import Footer from "../Reusable.jsx/Footer";
import SearchJob from "../Reusable.jsx/SearchJob";
import CreateJob from "../Admin/CreateJob";
import CreatedJobTable from "../Admin/MidSection";
import MidSection from "../Admin/MidSection";

const EmployeDashboard = () => {
  return (
    <div>
      <Header />
      <MidSection />
      <Footer />
    </div>
  );
};

export default EmployeDashboard;
