import React from 'react'

import Header from "../Reusable.jsx/Header";
import CardContainer from "../Reusable.jsx/CardContainer";
import Footer from "../Reusable.jsx/Footer";
import SearchJob from "../Reusable.jsx/SearchJob";

const JobSeekerDashboard = () => {
  return (
    <div>
      <Header />
      <SearchJob />
      <CardContainer />
      <Footer />
    </div>
  );
}

export default JobSeekerDashboard